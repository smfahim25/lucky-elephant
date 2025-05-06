"use client";

import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import Header from "@/src/section/header/v2";
import Mint2d from "@/src/section/mint/2d/SolMint2D.tsx";

// Import Solana wallet adapter UI styles once in your entire app:
import "@solana/wallet-adapter-react-ui/styles.css";

import { SolanaTimeProvider } from "@/utils/SolanaTimeContext";
import { UmiProvider } from "@/utils/UmiProvider";
import { ToastContainer } from "react-toastify";
import StakeSection from "@/src/section/mint/2d/StakeSection";

export default function MintPageV1() {
  // If you have an ENV var, fallback to Devnet:
  const endpoint =
    process.env.SOL_CANDY_RPC_ENDPOINT || "https://api.devnet.solana.com";

  // Example single wallet. You can import more adapters (e.g., Solflare, Backpack, etc.).
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <UmiProvider endpoint={endpoint}>
          <WalletModalProvider>
            <SolanaTimeProvider>
              <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
              />

              <Header solana />

              <StakeSection />
            </SolanaTimeProvider>
          </WalletModalProvider>
        </UmiProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
