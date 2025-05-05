// NOTE: Do NOT include "use client" here so that the helper functions can be imported on the server.

import { Alchemy, Network } from "alchemy-sdk";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SystemProgram,
} from "@solana/web3.js";
import { toast } from "react-toastify";
import { createPublicClient, http } from "viem";
import { abstractMainnet } from "../../config/customNetworks";

// Candy Machine Constants (Solana)
const CANDY_MACHINE_V2_PROGRAM_ID = new PublicKey(
  "cndyAnrLdpYLZNwNaGfRhsH1ygmX6oK4y2m5qHna9YF"
);
const CANDY_GUARD_PROGRAM_ID = new PublicKey(
  "oZAovKovuXbQ87ocHb5RorJ3XkpZjENzShTaWd5xhLR"
);

let alchemyEvm = null;
let solanaConnection = null;
let abstractClient = null;
let isInitialized = false;

export async function initializeHelper() {
  if (isInitialized) {
    console.log("Alchemy/Solana/Abstract Helper is already initialized.");
    return;
  }
  try {
    // --- EVM - Ethereum ---
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    if (!apiKey) {
      console.warn("ALCHEMY_API_KEY is not set");
    } else {
      alchemyEvm = new Alchemy({
        apiKey,
        network: Network.ETH_MAINNET,
      });
      console.log("Alchemy (EVM) initialized successfully via Ethers SDK.");
    }

    // --- Solana - Use Devnet for Candy Machine testing ---
    const solRpc =
      process.env.NEXT_PUBLIC_SOL_DEVNET_RPC_ENDPOINT ||
      "https://api.devnet.solana.com";
    solanaConnection = new Connection(solRpc, "confirmed");
    console.log("Solana devnet connection established:", solRpc);

    // --- Abstract ---
    const abstractRpc =
      process.env.NEXT_PUBLIC_ABSTRACT_MAINNET_RPC_URL ||
      "https://api.mainnet.abs.xyz";
    abstractClient = createPublicClient({
      chain: abstractMainnet,
      transport: http(abstractRpc),
    });
    console.log("Abstract (Viem) client initialized with RPC:", abstractRpc);

    isInitialized = true;
  } catch (error) {
    console.error("Error initializing multi-chain helper:", error);
    toast.error("Failed to initialize multi-chain connections.");
  }
}

export async function getEthereumWalletBalance(ethAddress) {
  if (!alchemyEvm) return "0";
  try {
    const balanceWei = await alchemyEvm.core.getBalance(ethAddress, "latest");
    return alchemyEvm.utils.formatEther(balanceWei);
  } catch (err) {
    console.error("Error fetching ETH balance:", err);
    return "0";
  }
}

export async function getSolanaWalletBalance(solAddress) {
  if (!solanaConnection) {
    console.error("Solana connection uninitialized");
    return 0;
  }
  try {
    const pubkey = new PublicKey(solAddress);
    const lamports = await solanaConnection.getBalance(pubkey);
    return lamports / 1e9;
  } catch (err) {
    console.error("Error fetching SOL balance:", err);
    return 0;
  }
}

export async function getAbstractWalletBalance(abstractAddress) {
  if (!abstractClient) {
    console.error("Abstract client not initialized");
    return "0";
  }
  try {
    const balance = await abstractClient.getBalance({ address: abstractAddress });
    return balance; // Typically in ETH decimals
  } catch (err) {
    console.error("Error fetching Abstract balance:", err);
    return "0";
  }
}

export async function fetchCandyMachineMintedCount(candyMachineId) {
  if (!solanaConnection) {
    console.error("No solanaConnection. Call initializeHelper() first");
    return 0;
  }
  try {
    const candyMachinePubkey = new PublicKey(candyMachineId);
    const accountInfo = await solanaConnection.getAccountInfo(candyMachinePubkey);
    if (!accountInfo) {
      console.error("Candy Machine not found on chain");
      return 0;
    }
    const data = accountInfo.data;
    console.log(data, ' see mine');
    
    const offset = 324; // Typical offset for hidden settings
    const itemsRedeemed = data.readUInt32LE(offset);
    console.log("Candy Machine itemsRedeemed:", itemsRedeemed);
    return itemsRedeemed;
  } catch (err) {
    console.error("Error reading CandyMachine minted count:", err);
    return 0;
  }
}

export async function buildCandyGuardMintTx({
  count = 1,
  userPublicKeyStr,
  candyMachineId,
  candyGuardId,
  groupLabel = null,
}) {
  if (!solanaConnection) {
    throw new Error("Solana connection not initialized");
  }
  if (!userPublicKeyStr) {
    throw new Error("User wallet public key required for CandyMachine mint");
  }
  try {
    const userPubkey = new PublicKey(userPublicKeyStr);
    const cmPubkey = new PublicKey(candyMachineId);
    const guardPubkey = new PublicKey(candyGuardId);

    const MINT_DISCRIMINATOR = Buffer.from([168, 95, 178, 72, 53, 254, 66, 59]);
    const labelBuffer = groupLabel ? Buffer.from(groupLabel, "utf8") : Buffer.from([]);

    const dataBuffer = Buffer.concat([
      MINT_DISCRIMINATOR,
      Buffer.from([labelBuffer.length]),
      labelBuffer,
    ]);

    const mintIx = new TransactionInstruction({
      programId: guardPubkey,
      keys: [
        { pubkey: userPubkey, isSigner: true, isWritable: true },
        { pubkey: cmPubkey, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_INSTRUCTIONS_PUBKEY, isSigner: false, isWritable: false },
      ],
      data: dataBuffer,
    });

    const transaction = new Transaction().add(mintIx);
    transaction.feePayer = userPubkey;
    return transaction;
  } catch (err) {
    console.error("Error building Candy Guard mint transaction:", err);
    throw err;
  }
}

export async function finalizeCandyMachineMint(transaction) {
  try {
    const txSig = await solanaConnection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });
    await solanaConnection.confirmTransaction(txSig, "confirmed");
    console.log("Mint Transaction Confirmed:", txSig);
    return txSig;
  } catch (err) {
    console.error("Error finalizing CandyMachine mint:", err);
    throw err;
  }
}

export { alchemyEvm, solanaConnection, abstractClient };
