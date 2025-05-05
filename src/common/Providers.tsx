"use client";
import "@/context/appkitInit"; // Ensure AppKit is initialized first

import React from "react";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig"; // Your wagmi config
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "@/src/utils/ContextProvider";

// Import WalletProvider from the correct package and enum value
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

// Use the enum value (e.g. Devnet for testing)
const solanaWallets = [
  new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
];

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <WalletProvider wallets={solanaWallets} autoConnect>
            {children}
          </WalletProvider>
        </ContextProvider>
        <ToastContainer />
      </QueryClientProvider>
    </WagmiConfig>
  );
}
