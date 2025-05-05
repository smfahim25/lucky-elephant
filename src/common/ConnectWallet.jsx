"use client";
// src/common/ConnectWallet.jsx

import React, { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react"; // AppKit for wallet state
import { useSignMessage, useAccount, useDisconnect } from "wagmi"; // Wagmi for Ethereum/Abstract
import { toast } from "react-toastify";

export default function ConnectWallet() {
  const { isConnected, address, chainId } = useAppKitAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [hasSigned, setHasSigned] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true); // Ensures hydration doesn't mismatch
  }, []);

  useEffect(() => {
    const verifyConnection = async () => {
      if (!isConnected || !address || hasSigned) return;

      try {
        // ✅ Only sign if Ethereum or Abstract
        if (chainId === "eip155" || chainId === "abstract") {
          const message =
            "Welcome to Lucky Elephant Club! Please sign this message to verify your wallet connection.";

          // ✅ Ensure the Wagmi connector is ready before signing
          if (!signMessageAsync) {
            console.error("Connector is not ready for signing.");
            return;
          }

          const signature = await signMessageAsync({ message });

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-signature`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ address, message, signature }),
            }
          );

          if (response.ok) {
            setHasSigned(true);
            toast.success("Wallet verified successfully!");
          } else {
            throw new Error("Signature verification failed.");
          }
        } else if (chainId === "solana") {
          // ✅ Solana does NOT require signing
          toast.success("Solana wallet connected!");
        }
      } catch (error) {
        console.error("Error signing message:", error);
        toast.error("Failed to verify wallet connection.");
        disconnect();
      }
    };

    verifyConnection();
  }, [isConnected, address, hasSigned, signMessageAsync, chainId, disconnect]);

  return (
    <div>
      {clientReady && isConnected && (
        <>
          {chainId === "eip155" && <appkit-wallet-button wallet="metamask" balance="show" />}
          {chainId === "solana" && <appkit-wallet-button wallet="phantom" balance="show" />}
        </>
      )}
    </div>
  );
}
