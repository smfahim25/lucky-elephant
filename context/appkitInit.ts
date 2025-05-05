// context/appkitInit.ts
"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";

import { mainnet as ethereumMainnet } from "@reown/appkit/networks";
import {
  solanaDevnet,
  solanaMainnet,
  abstractMainnet,
  abstractTestnet,
} from "@/config/customNetworks";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import { projectId } from "@/config"; // from your .env => NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error("Project ID is not defined. Check .env => NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
}

// ----------------------
// Ethers Adapter for Ethereum/Abstract
// ----------------------
const ethersAdapter = new EthersAdapter();

// ----------------------
// Solana Wallet Adapters for Mainnet (production)
// ----------------------
const phantomMainnetAdapter = new PhantomWalletAdapter({
  network: WalletAdapterNetwork.Mainnet,
});
const solflareMainnetAdapter = new SolflareWalletAdapter({
  network: WalletAdapterNetwork.Mainnet,
});
const solanaMainnetAdapter = new SolanaAdapter({
  wallets: [
    phantomMainnetAdapter,
    solflareMainnetAdapter,
  ],
});

// ----------------------
// Solana Wallet Adapters for Devnet (for testing)
// ----------------------
const phantomDevnetAdapter = new PhantomWalletAdapter({
  network: WalletAdapterNetwork.Devnet,
});
const solflareDevnetAdapter = new SolflareWalletAdapter({
  network: WalletAdapterNetwork.Devnet,
});
const solanaDevnetAdapter = new SolanaAdapter({
  wallets: [
    phantomDevnetAdapter,
    solflareDevnetAdapter,
  ],
});

// ----------------------
// Metadata for AppKit
// ----------------------
const metadata = {
  name: "Lucky Elephant Club | NFT Minting, DAO Governance, & Rewards",
  description:
    "Join Lucky Elephant Club, an exclusive NFT DApp with DAO governance. Mint NFTs, participate in the DAO, and earn rewards across multiple blockchains.",
  url: "https://luckyelephant.io",
  icons: [
    "https://cdn.discordapp.com/attachments/933238594506752030/1286207320442929194/leclogo.png",
  ],
};

// ----------------------
// Create AppKit Instance with Tokens Configuration and Reordered Networks
// ----------------------
createAppKit({
  adapters: [
    ethersAdapter,              // For Ethereum/Abstract
    solanaMainnetAdapter,       // For Solana Mainnet (production) comes first
    solanaDevnetAdapter,        // For Solana Devnet (for testing) comes second
  ],
  projectId,
  networks: [
    // EVM Networks
    ethereumMainnet,      // Ethereum Mainnet
    abstractMainnet,      // Abstract Mainnet (EVM-based)
    abstractTestnet,      // Abstract Testnet (for testing)
    // Solana Networks: Mainnet first, then Devnet
    solanaMainnet,        // Solana Mainnet
    solanaDevnet,         // Solana Devnet
  ],
  // Default network remains Ethereum; users can switch via the modal.
  defaultNetwork: solanaDevnet,
  metadata,
  features: {
    analytics: true,
    onramp: true,
    swaps: false,
    connectMethodsOrder: ["wallet"],
  },
  // Tokens configuration: Instructs AppKit which token balance to display per chain.
  tokens: {
    // For Solana Mainnet, using CAIP chain id "solana:102".
    "solana:102": {
      address: "So11111111111111111111111111111111111111112",
      image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024",
    },
    // Optionally, for Solana Devnet (CAIP chain id "solana:101"):
    "solana:101": {
      address: "So11111111111111111111111111111111111111112",
      image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024",
    },
  },
});

console.log(
  "** Reown AppKit initialized with Ethers (Ethereum & Abstract) and Solana adapters (Mainnet prioritized) with tokens configuration for Solana. **"
);