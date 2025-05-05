"use client";
// context/index.tsx

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import Ethers+Solana AppKit initialization once in a client file
import "@/context/appkitInit";

const queryClient = new QueryClient();

export default function Web3ModalProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
