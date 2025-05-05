// config/customNetworks.ts

import { defineChain } from "@reown/appkit/networks";

// Solana Devnet
export const solanaDevnet = defineChain({
  id: 101,
  name: "Solana Devnet",
  rpcUrls: {
    default: {
      http: ["https://api.devnet.solana.com"],
      webSocket: ["wss://api.devnet.solana.com"],
    },
  },
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
  },
  blockExplorers: {
    default: { name: "Solana Explorer", url: "https://explorer.solana.com" },
  },
  chainNamespace: "solana",
  caipNetworkId: "solana:101",
});

// Solana Mainnet
export const solanaMainnet = defineChain({
  id: 102,
  name: "Solana Mainnet",
  rpcUrls: {
    default: {
      http: ["https://api.mainnet-beta.solana.com"],
      webSocket: ["wss://api.mainnet-beta.solana.com"],
    },
  },
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
  },
  blockExplorers: {
    default: { name: "Solana Explorer", url: "https://explorer.solana.com" },
  },
  chainNamespace: "solana",
  caipNetworkId: "solana:102",
});

// Abstract Mainnet
export const abstractMainnet = defineChain({
  id: 2741,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:2741",
  name: "Abstract Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Abstract Ether",
    symbol: "AETH",
  },
  rpcUrls: {
    default: {
      http: ["https://api.mainnet.abs.xyz"],
      webSocket: ["wss://ws.mainnet.abs.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Abstract Explorer", url: "https://explorer.abstract.xyz" },
  },
});

// Abstract Testnet
export const abstractTestnet = defineChain({
  id: 11124,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:11124",
  name: "Abstract Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Abstract Ether",
    symbol: "AETH",
  },
  rpcUrls: {
    default: {
      http: ["https://api.testnet.abs.xyz"],
      webSocket: ["wss://ws.testnet.abs.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Abstract Explorer Testnet",
      url: "https://explorer.testnet.abstract.xyz",
    },
  },
});