/*=====================================
  FILE: config/index.tsx
=====================================*/

/********************************************************************
 *  - Provide "wagmiAdapter" for Ethereum, referencing your .env's
 *    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.
 *  - The Reown docs mention a WagmiAdapter from '@reown/appkit-adapter-wagmi'.
 ********************************************************************/

import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("Project ID not defined — set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env");
}

// Basic metadata object
const metadata = {
  name: "Lucky Elephant Club | NFT Minting, DAO Governance, & Rewards",
  description:
    "Join Lucky Elephant Club, an exclusive NFT DApp with DAO governance. Mint NFTs, participate in governance, and earn rewards on the Ethereum Mainnet",
  url: "https://luckyelephant.io",
  icons: [
    "https://cdn.discordapp.com/attachments/933238594506752030/1286207320442929194/leclogo.png",
  ],
};

// EVM networks to use. We only define mainnet, but you can also import testnets.
const networks = [mainnet];

// Create a WagmiAdapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks, // EVM networks from Reown
});

// Export wagmiAdapter.wagmiConfig => used by your top-level provider
export const config = wagmiAdapter.wagmiConfig;

console.log("** WagmiAdapter created with projectId:", projectId);
