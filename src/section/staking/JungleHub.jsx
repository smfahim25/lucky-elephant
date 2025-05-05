/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Header from "../header/pageMenu/header";
import Footer from "../footer/v1";
import Jungle_Hub from "./v1/Jungle_Hub";
import Jungle_Hub_Cards from "./v2/Jungle_Hub_Cards";
import { useAccount } from "wagmi";
import { getNfts } from "./helper"; // Ensure this function is updated to use Moralis API

export default function JungleHub() {
  const [userNfts, setUserNfts] = useState([]); // Store user NFTs
  const [loading, setLoading] = useState(false); // Loading state (start as false)
  const [error, setError] = useState(null); // Error state
  const { address } = useAccount(); // Get connected wallet address

  // Function to fetch user's NFTs
  const ownedNftsHandler = async (address) => {
    if (address) {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state before fetching

        const { nfts } = await getNfts(address); // Fetch NFTs via Moralis API route
        console.log("Fetched NFTs:", nfts); // Debugging

        if (nfts?.length > 0) {
          setUserNfts(nfts); // Set user NFTs if available
        } else {
          setUserNfts([]); // Set empty array if no NFTs found
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("Failed to fetch NFTs. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  // Fetch NFTs when the address changes
  useEffect(() => {
    if (address) {
      ownedNftsHandler(address);
    }
  }, [address]);

  return (
    <div>
      <Header />
      <Jungle_Hub />
      {address ? (
        loading ? (
          <div style={styles.centerMessage}>
            <p style={styles.messageText}>Loading your NFTs...</p>
          </div>
        ) : error ? (
          <div style={styles.centerMessage}>
            <p style={styles.messageText}>{error}</p>
          </div>
        ) : userNfts.length > 0 ? (
          <Jungle_Hub_Cards userNfts={userNfts} />
        ) : (
          <div style={styles.centerMessage}>
            <p style={styles.messageText}>No NFTs found in your wallet.</p>
          </div>
        )
      ) : (
        <div style={styles.centerMessage}>
          <p style={styles.messageText}>Please connect your wallet to view NFTs.</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

// CSS-in-JS for centering
const styles = {
  centerMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh", // Adjust height to center vertically
    textAlign: "center",
  },
  messageText: {
    fontSize: "1.5rem",
    color: "white", // Adjust color to match your theme
  },
};
