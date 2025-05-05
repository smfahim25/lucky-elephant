import { createClient } from '@supabase/supabase-js';
import retry from 'async-retry'; // Retry package for handling retries

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- TRANSACTION LOGGING ---
// Function to log the on-chain transaction
export const logTransaction = async (txHash, proposalId = null, status = 'pending') => {
  const { data, error } = await supabase
    .from('transaction_log')
    .insert({
      tx_hash: txHash,
      proposal_id: proposalId,
      status,
    })
    .select();

  if (error) throw new Error(`Error logging transaction: ${error.message}`);
  console.log(`Transaction logged: ${txHash} (Status: ${status})`);
  return data;
};

// Function to update the transaction log status
export const updateTransactionStatus = async (txHash, status) => {
  const { error } = await supabase
    .from('transaction_log')
    .update({ status })
    .eq('tx_hash', txHash);

  if (error) throw new Error(`Error updating transaction status: ${error.message}`);
  console.log(`Transaction ${txHash} updated to status: ${status}`);
};

// --- PROPOSAL OPERATIONS ---
// Function to create a proposal after an on-chain transaction
export const createProposal = async (title, description, deadline, proposalType, txHash, targetNFTCollection) => {
  const { data, error } = await supabase
    .from('proposals')
    .insert({
      title, // Added title field
      description,
      proposal_type: proposalType,
      target_address: targetNFTCollection,
      tx_hash: txHash,
      deadline,
    })
    .select();

  if (error) throw new Error(`Error creating proposal: ${error.message}`);
  console.log('Proposal created:', data);
  return data;
};

// Function to fetch all proposals
export const fetchProposals = async () => {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Error fetching proposals: ${error.message}`);
  return data;
};

// --- RETRY MECHANISM FOR OFF-CHAIN LOGGING ---
// Retry function to log the proposal off-chain
export const retryPostToBackend = async (proposalData) => {
  await retry(async () => {
    const response = await fetch('/api/governance/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proposalData),
    });

    if (!response.ok) {
      throw new Error('Failed to post proposal to backend');
    }
  }, { retries: 3 });
};

// --- VOTE OPERATIONS ---
// Function to create a vote record
export const createVote = async (proposalId, voterAddress, voteType, numVotes, signature) => {
  const { data, error } = await supabase
    .from('votes')
    .insert({
      proposal_id: proposalId,
      voter_address: voterAddress,
      vote_type: voteType,
      num_votes: numVotes,
      signature,
    })
    .select();

  if (error) throw new Error(`Error creating vote: ${error.message}`);
  console.log('Vote created:', data);
  return data;
};

// --- USER OPERATIONS ---
// Function to check if a user exists or create a new user
export const createUser = async (walletAddress) => {
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress);

  if (fetchError) throw new Error(`Error fetching user: ${fetchError.message}`);
  if (existingUser.length > 0) return existingUser[0];

  // If not, create a new user
  const { data, error } = await supabase
    .from('users')
    .insert({ wallet_address: walletAddress })
    .select();

  if (error) throw new Error(`Error creating user: ${error.message}`);
  return data;
};

// --- MERKLE ROOT OPERATIONS ---
// Function to submit a Merkle root entry in the database
export const submitMerkleRoot = async (proposalId, merkleRoot) => {
  const { data, error } = await supabase
    .from('merkle_roots')
    .insert({
      proposal_id: proposalId,
      merkle_root: merkleRoot,
    })
    .select();

  if (error) throw new Error(`Error submitting Merkle root: ${error.message}`);
  console.log('Merkle root submitted:', data);
  return data;
};

// --- FETCH ALL PROPOSALS, VOTES, AND MERKLE ROOTS ---
// Fetch all votes for a proposal
export const getVotesForProposal = async (proposalId) => {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('proposal_id', proposalId);

  if (error) throw new Error(`Error fetching votes: ${error.message}`);
  return data;
};

// Fetch all Merkle roots for a proposal
export const getMerkleRoots = async (proposalId) => {
  const { data, error } = await supabase
    .from('merkle_roots')
    .select('*')
    .eq('proposal_id', proposalId);

  if (error) throw new Error(`Error fetching Merkle roots: ${error.message}`);
  return data;
};
