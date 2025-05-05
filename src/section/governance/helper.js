// src/section/governance/helper.js

import {
  JsonRpcProvider,
  BrowserProvider,
  Contract,
  Wallet,
  formatEther,
  parseEther,
  isAddress,
} from "ethers";
import { daoAbi } from "@/src/section/governance/daoABI"; // DAO ABI
import { nftAbi } from "@/src/section/governance/nftABI"; // NFT ABI
import { initializeHelper } from "@/src/utils/alchemyHelper";
import {
  logTransaction,
  createVote,
  submitMerkleRoot as logMerkleRoot,
  createProposal as createProposalOffChain,
} from "@/app/api/governance/supabaseHelper";

const DAO_CONTRACT_ADDRESS = "0xc9AB3cB23929E0935bD410a67FF4bceD4701Ca24";
const NFT_CONTRACT_ADDRESS = "0x42de23cc51A8425C248C9801395DD47BD1996152";

/** 
 * For server or read-only calls, you might do:
 * const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`);
 * 
 * For user-signer calls in the browser, do:
 * const provider = new BrowserProvider(window.ethereum)
 */

// ============== Helpers to instantiate contract ==============
const getDAOContract = (signerOrProvider) => {
  return new Contract(DAO_CONTRACT_ADDRESS, daoAbi, signerOrProvider);
};
const getNFTContract = (signerOrProvider) => {
  return new Contract(NFT_CONTRACT_ADDRESS, nftAbi, signerOrProvider);
};

// ============== Example: getUserNFTBalance ==============
export const getUserNFTBalance = async (address) => {
  try {
    if (!address) throw new Error("Invalid wallet address");
    await initializeHelper();

    // Browser-based approach:
    if (!window.ethereum) {
      console.warn("No window.ethereum found. Can't get NFT balance client-side.");
      return 0;
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const nftContract = getNFTContract(signer);
    const balance = await nftContract.balanceOf(address);
    return parseInt(balance.toString(), 10);
  } catch (error) {
    console.error("Error fetching NFT balance:", error);
    return 0;
  }
};

// ============== Example: getProposals ==============
export const getProposals = async () => {
  try {
    await initializeHelper();
    if (!window.ethereum) {
      console.warn("No window.ethereum for proposals. Using read-only approach.");
      // Possibly read-only with a static JSON RPC:
      const provider = new JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      );
      const contract = getDAOContract(provider);
      const proposalCount = await contract.numProposals();
      const proposals = [];
      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.proposals(i);
        proposals.push(proposal);
      }
      return proposals;
    }
    // If window.ethereum exists:
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);

    const proposalCount = await contract.numProposals();
    const proposals = [];
    for (let i = 0; i < proposalCount; i++) {
      const proposal = await contract.proposals(i);
      proposals.push(proposal);
    }
    return proposals;
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return [];
  }
};

// ============== Example: getProposalDetails ==============
export const getProposalDetails = async (proposalId) => {
  try {
    if (!proposalId) throw new Error("Invalid proposal ID");
    await initializeHelper();

    if (!window.ethereum) {
      console.warn("No window.ethereum. Using read-only approach for proposals.");
      const provider = new JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      );
      const contract = getDAOContract(provider);
      return await contract.proposals(proposalId);
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);
    const proposalDetails = await contract.proposals(proposalId);
    return proposalDetails;
  } catch (error) {
    console.error("Error fetching proposal details:", error);
    return null;
  }
};

// ============== Example: submitVote ==============
export const submitVote = async (proposalId, voteType, userAddress, signature) => {
  let txHash;
  try {
    if (!proposalId || ![0, 1].includes(voteType))
      throw new Error("Invalid vote type");

    await initializeHelper();
    if (!window.ethereum) {
      throw new Error("No window.ethereum found for submitVote");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);

    // Example: your contract might differ
    const tx = await contract.submitSignedVote(proposalId, voteType, 1, signature);
    txHash = tx.hash;
    await tx.wait();

    await logTransaction(txHash, proposalId, "pending");
    await createVote(proposalId, userAddress, voteType, 1, signature);
    await logTransaction(txHash, proposalId, "success");

    return true;
  } catch (error) {
    console.error("Error submitting vote:", error);
    if (txHash) await logTransaction(txHash, proposalId, "failed");
    return false;
  }
};

// ============== Example: createProposal ==============
export const createProposal = async (description, proposalType, targetNFTCollection) => {
  let txHash;
  try {
    if (!description || proposalType === undefined || !targetNFTCollection) {
      throw new Error("Invalid proposal data");
    }
    await initializeHelper();
    if (!window.ethereum) {
      throw new Error("No window.ethereum found for createProposal");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);

    // Example cost: 0.02 ETH
    const tx = await contract.createProposal(description, proposalType, targetNFTCollection, {
      value: parseEther("0.02"),
    });
    txHash = tx.hash;
    await logTransaction(txHash, null, "pending");
    const receipt = await tx.wait();

    await createProposalOffChain(description, receipt.transactionHash, proposalType, targetNFTCollection);
    await logTransaction(txHash, null, "success");

    return true;
  } catch (error) {
    console.error("Error creating proposal:", error);
    if (txHash) await logTransaction(txHash, null, "failed");
    return false;
  }
};

// ============== Example: executeProposal ==============
export const executeProposal = async (proposalIndex) => {
  let txHash;
  try {
    await initializeHelper();
    if (!window.ethereum) {
      throw new Error("No window.ethereum found for executeProposal");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);

    const tx = await contract.executeProposal(proposalIndex);
    txHash = tx.hash;
    await logTransaction(txHash, proposalIndex, "pending");
    await tx.wait();
    await logTransaction(txHash, proposalIndex, "success");

    return true;
  } catch (error) {
    console.error("Error executing proposal:", error);
    if (txHash) await logTransaction(txHash, proposalIndex, "failed");
    return false;
  }
};

// ============== Example: submitMerkleRoot ==============
export const submitMerkleRoot = async (proposalIndex, merkleRoot) => {
  let txHash;
  try {
    await initializeHelper();
    if (!window.ethereum) {
      throw new Error("No window.ethereum found for submitMerkleRoot");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getDAOContract(signer);

    const tx = await contract.submitMerkleRoot(proposalIndex, merkleRoot);
    txHash = tx.hash;
    await logTransaction(txHash, proposalIndex, "pending");
    await tx.wait();

    await logMerkleRoot(proposalIndex, merkleRoot);
    await logTransaction(txHash, proposalIndex, "success");
    return true;
  } catch (error) {
    console.error("Error submitting Merkle root:", error);
    if (txHash) await logTransaction(txHash, proposalIndex, "failed");
    return false;
  }
};

// ============== Example: getTotalProposals ==============
export const getTotalProposals = async () => {
  try {
    await initializeHelper();
    const provider = new JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    );
    const contract = getDAOContract(provider);
    const totalProposals = await contract.numProposals();
    return totalProposals;
  } catch (error) {
    console.error("Error fetching total proposals:", error);
    return 0;
  }
};
