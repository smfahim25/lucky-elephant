import { NextResponse } from 'next/server';
import { JsonRpcProvider, Wallet, isAddress } from 'ethers'; // ✅ Correct Ethers v6 imports
import { initializeHelper } from '@/src/utils/alchemyHelper';
import { daoAbi } from '@/src/section/governance/daoABI';
import { rateLimiter } from '@/src/utils/rateLimiter';
import { logTransaction, updateTransactionStatus, createProposal, fetchProposals } from '../supabaseHelper';
import retry from 'async-retry';
import { createClient } from '@supabase/supabase-js';

const DAO_CONTRACT_ADDRESS = '0xc9AB3cB23929E0935bD410a67FF4bceD4701Ca24';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Ethereum provider using Alchemy
let provider;
try {
  provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
} catch (error) {
  console.error('Error initializing Ethereum provider:', error);
  throw new Error('Could not initialize Ethereum provider.');
}

// Proposal types enum for validation
const proposalTypes = [
  "General", "Investment", "Donation", "NFTSale", "SocialFiFeature",
  "ClothingLine", "AddNFTCollection", "RemoveNFTCollection"
];

// --- Handle POST request (Create Proposal) ---
export async function POST(request) {
  let txHash;
  try {
    // Rate limiting
    await rateLimiter.consume(request.headers.get('x-forwarded-for') || request.ip);

    // Extract data from request body
    const { description, proposalType, targetNFTCollection, duration } = await request.json();

    // Validate required fields
    if (!description || proposalType === undefined || !targetNFTCollection || !duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check that proposalType is valid
    const proposalTypeIndex = parseInt(proposalType, 10);
    if (isNaN(proposalTypeIndex) || proposalTypeIndex < 0 || proposalTypeIndex >= proposalTypes.length) {
      return NextResponse.json({ error: 'Invalid proposal type' }, { status: 400 });
    }

    // Validate targetNFTCollection as a valid Ethereum address
    if (!isAddress(targetNFTCollection)) {
      return NextResponse.json({ error: 'Invalid target NFT collection address' }, { status: 400 });
    }

    // On-chain transaction
    await initializeHelper();
    const signer = new Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbi, signer);

    // Fetch the proposal fee and submit the proposal on-chain
    const proposalFee = await contract.proposalFee();
    const tx = await contract.createProposal(description, proposalTypeIndex, targetNFTCollection, {
      value: proposalFee,
    });
    txHash = tx.hash; // Get the transaction hash immediately after submitting on-chain

    // Step 1: Log the transaction with pending status
    await logTransaction(txHash, null, 'pending');

    // Wait for the transaction to be confirmed on-chain
    const receipt = await tx.wait();

    // Step 2: Calculate deadline and prepare proposal data for the database
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + parseInt(duration));

    const proposalData = {
      description,
      proposalType: proposalTypeIndex,
      targetNFTCollection,
      txHash: receipt.transactionHash,
      deadline,
    };

    // Step 3: Off-chain operation (Insert proposal into the database) with retry mechanism
    await retry(async () => {
      await createProposal(proposalData.description, proposalData.deadline, proposalData.proposalType, proposalData.txHash, proposalData.targetNFTCollection);
    }, { retries: 3 });

    // Step 4: Update transaction status to success
    await updateTransactionStatus(txHash, 'success');

    return NextResponse.json({ success: true, txHash: receipt.transactionHash });
  } catch (error) {
    console.error('Error creating proposal:', error);

    // If we have the transaction hash, update the status to failed
    if (txHash) {
      await updateTransactionStatus(txHash, 'failed');
    }

    return NextResponse.json({ error: 'Error creating proposal' }, { status: 500 });
  }
}

// --- Handle GET request (Fetch Proposals) ---
export async function GET(request) {
  try {
    // Rate limiting
    await rateLimiter.consume(request.headers.get('x-forwarded-for') || request.ip);

    // Fetch proposals from Supabase
    const proposals = await fetchProposals();

    // Convert proposal type indices back to their string representations
    const formattedProposals = proposals.map(row => ({
      id: row.id,
      description: row.description,
      proposalType: proposalTypes[row.proposal_type], // Convert stored index back to proposal type string
      targetAddress: row.target_address,
      txHash: row.tx_hash,
      createdAt: row.created_at,
      deadline: row.deadline || null,  // Ensure deadline is set in the DB
      executed: row.executed === 1,
    }));

    return NextResponse.json({ proposals: formattedProposals });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ error: 'Error fetching proposals' }, { status: 500 });
  }
}

// --- Handle PATCH request (Execute Proposal) ---
export async function PATCH(request) {
  let txHash;
  try {
    // Rate limiting
    await rateLimiter.consume(request.headers.get('x-forwarded-for') || request.ip);

    const { proposalId } = await request.json();
    if (!proposalId) {
      return NextResponse.json({ error: 'Missing proposalId' }, { status: 400 });
    }

    // Initialize Moralis and connect to the blockchain
    await initializeHelper();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbi, signer);

    // Execute proposal on-chain
    const tx = await contract.executeProposal(proposalId);
    txHash = tx.hash; // Get transaction hash

    // Step 1: Log the execution transaction with pending status
    await logTransaction(txHash, proposalId, 'pending');

    const receipt = await tx.wait();  // Wait for transaction confirmation

    // Step 2: Mark transaction as successful after on-chain confirmation
    await updateTransactionStatus(txHash, 'success');

    return NextResponse.json({ success: true, txHash: receipt.transactionHash });
  } catch (error) {
    console.error('Error executing proposal:', error);

    // Mark the transaction as failed if there was a hash
    if (txHash) {
      await updateTransactionStatus(txHash, 'failed');
    }

    return NextResponse.json({ error: 'Error executing proposal' }, { status: 500 });
  }
}

// --- Handle DELETE request (Delete Proposal) ---
export async function DELETE(request) {
  try {
    // Rate limiting
    await rateLimiter.consume(request.headers.get('x-forwarded-for') || request.ip);

    const { proposalId } = await request.json();
    if (!proposalId) {
      return NextResponse.json({ error: 'Missing proposalId' }, { status: 400 });
    }

    // Delete proposal from Supabase
    const { error } = await supabase.from('proposals').delete().eq('id', proposalId);
    if (error) {
      console.error('Error deleting proposal:', error);
      return NextResponse.json({ error: 'Error deleting proposal' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    return NextResponse.json({ error: 'Error deleting proposal' }, { status: 500 });
  }
}
