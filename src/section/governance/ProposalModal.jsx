import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther,
} from "ethers"; // Ethers v6 import
import { daoAbi } from "./daoABI"; // DAO ABI
import { createProposal as createProposalOffChain } from "@/app/api/governance/supabaseHelper"; // Off-chain storage

const DAOContractAddress = "0xc9AB3cB23929E0935bD410a67FF4bceD4701Ca24"; // Hardcoded DAO contract

const ProposalModalWrapper = styled.div`
  .modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .modal-content {
    background-color: #1e1f35;
    padding: 20px;
    width: 400px;
    border-radius: 10px;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .modal-header h2 {
    font-size: 24px;
    color: #fff;
  }
  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  .modal-body input,
  .modal-body select,
  .modal-body textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #2e2f4a;
    color: #fff;
  }
  .modal-body button {
    width: 100%;
    padding: 10px;
    background-color: #6d4afe;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .modal-body button:hover {
    background-color: #5843d1;
  }
`;

const proposalTypes = [
  "General",
  "Investment",
  "Donation",
  "NFTSale",
  "SocialFiFeature",
  "ClothingLine",
  "AddNFTCollection",
  "RemoveNFTCollection",
];

const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const ProposalModal = ({ isOpen, onClose, user }) => {
  const [title, setTitle] = useState(""); // Title field
  const [description, setDescription] = useState("");
  const [proposalType, setProposalType] = useState("General");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposalFee, setProposalFee] = useState("0.001"); // Default fee in ETH (fallback)

  useEffect(() => {
    // Fetch proposal fee dynamically from the contract
    const fetchProposalFee = async () => {
      try {
        if (!window.ethereum) return; // No wallet
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(DAOContractAddress, daoAbi, signer);
        const fee = await contract.proposalFee();
        setProposalFee(formatEther(fee)); // Convert to ETH string
      } catch (error) {
        console.error("Error fetching proposal fee:", error);
      }
    };
    fetchProposalFee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please connect your wallet.");
      return;
    }
    if (!title || title.trim() === "") {
      alert("Proposal title is required.");
      return;
    }
    try {
      setLoading(true);
      if (!window.ethereum) {
        alert("No wallet detected. Please install MetaMask or similar.");
        setLoading(false);
        return;
      }
      // Ethers v6 approach
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(DAOContractAddress, daoAbi, signer);

      // Calculate voting deadline
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + parseInt(duration, 10));
      const formattedDeadline = deadline.toISOString();

      // Submit on-chain
      const tx = await contract.createProposal(
        description,
        proposalTypes.indexOf(proposalType),
        DAOContractAddress, // Hardcoded for now
        {
          value: parseEther(proposalFee), // Ethers v6 => parseEther(...)
        }
      );
      const receipt = await tx.wait();

      // Off-chain in Supabase
      await createProposalOffChain(
        title,
        description,
        formattedDeadline,
        proposalTypes.indexOf(proposalType),
        receipt.transactionHash,
        DAOContractAddress
      );

      alert("Proposal submitted successfully on-chain!");
      onClose();
    } catch (error) {
      console.error("Error submitting proposal:", error);
      // Example error check
      if (error.code === "INSUFFICIENT_FUNDS") {
        alert("Insufficient funds for gas and transaction costs.");
      } else {
        alert("Error submitting proposal. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ProposalModalWrapper>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create New Proposal</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Proposal Title */}
              <label>Proposal Title:</label>
              <input
                type="text"
                placeholder="Enter proposal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {/* Description */}
              <textarea
                placeholder="Proposal Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />

              {/* Proposal Type Dropdown */}
              <label>Proposal Type:</label>
              <select
                value={proposalType}
                onChange={(e) => setProposalType(e.target.value)}
              >
                {proposalTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Dynamically fetched fee */}
              <label>Proposal Fee (ETH):</label>
              <input type="text" value={proposalFee} disabled />

              {/* Hardcoded DAO Contract Address */}
              <label>Target Address (DAO Contract):</label>
              <input type="text" value={shortenAddress(DAOContractAddress)} disabled />

              {/* Duration in days */}
              <label>Voting Duration (Days):</label>
              <input
                type="number"
                placeholder="Duration (days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProposalModalWrapper>
  );
};
