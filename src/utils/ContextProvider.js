"use client";
// src/utils/ContextProvider.js

import React, { useState, useEffect } from "react";
import { ModalContext } from "./ModalContext";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";

export default function ContextProvider({ children }) {
  const { isConnected, address } = useAppKitAccount();

  // Example local states for modals
  const [visibility, setVisibility] = useState(false);
  const [walletModalVisibility, setWalletModalVisibility] = useState(false);
  const [shareModalVisibility, setShareModalVisibility] = useState(false);
  const [isPopup, setPopup] = useState(true);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    if (isConnected && address && !accounts) {
      setAccounts(address);
      toast.success("Wallet connected successfully!");
    }
  }, [isConnected, address, accounts]);

  const mintModalHandle = () => setVisibility(!visibility);
  const walletModalHandle = () => setWalletModalVisibility(!walletModalVisibility);
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalVisibility(!shareModalVisibility);
  };
  const popupHandle = () => setPopup(!isPopup);

  const handleAccountConnect = (acc) => {
    setAccounts(acc);
    setWalletModalVisibility(false);
    toast.success("Account connected!");
  };
  const handleDisconnectWallet = () => {
    setAccounts(null);
    toast.info("Wallet disconnected.");
  };

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalVisibility,
        shareModalVisibility,
        shareModalHandle,
        isPopup,
        popupHandle,
        handleAccountConnect,
        accounts,
        disconnect: handleDisconnectWallet,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
