/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import profile from "@/src/assets/images/icon/avater.svg";
import govCopy from "@/src/assets/images/icon/governance_copy.svg";
import steps from "@/src/assets/images/icon/steps.png";
import Footer from "@/src/section/footer/v1";
import { useParams } from "next/navigation";
import Link from "next/link";

import { BrowserProvider } from "ethers"; // Ethers v6 import
import { initializeHelper } from "@/src/utils/alchemyHelper";
import { getUserNFTBalance } from "@/src/section/governance/helper";

const GamFiVotingPage = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [selectedVote, setSelectedVote] = useState("yes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votingPower, setVotingPower] = useState(0);
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    forVotes: 0,
    againstVotes: 0,
    forPercentage: 0,
    againstPercentage: 0,
  });

  useEffect(() => {
    initializeHelper().then(() => {
      loadProposalDetails();
      loadVotingPower(); // Get NFT-based voting power
    });
  }, [id]);

  /**
   * Fetch proposal data from your local API route:
   * /api/governance/proposals/[id]
   */
  const loadProposalDetails = async () => {
    setLoading(true);
    
    if (!id) {
      console.error("Error: Proposal ID is undefined.");
      setLoading(false);
      return;
    }
  
    try {
      console.log(`Fetching proposal data from /api/governance/proposals/${id}`);
      
      // Use absolute URL for better debugging
      const response = await fetch(`/api/governance/proposals/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data?.proposal && data?.voters) {
        setProposal(data.proposal);
        setVoters(data.voters);
        calculateResults(data.voters);
      } else {
        console.error("Error: API response is missing expected data:", data);
      }
    } catch (error) {
      console.error("Error loading proposal details:", error);
      alert("Failed to load proposal. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  /**
   * Summarize yes/no votes into percentages
   */
  const calculateResults = (votersArr) => {
    const forVotes = votersArr
      .filter((v) => v.vote_type === 1)
      .reduce((acc, v) => acc + v.num_votes, 0);
    const againstVotes = votersArr
      .filter((v) => v.vote_type === 0)
      .reduce((acc, v) => acc + v.num_votes, 0);
    const total = forVotes + againstVotes;

    setResults({
      forVotes,
      againstVotes,
      forPercentage: total > 0 ? (forVotes / total) * 100 : 0,
      againstPercentage: total > 0 ? (againstVotes / total) * 100 : 0,
    });
  };

  /**
   * Load the user's NFT balance to determine voting power
   */
  const loadVotingPower = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // your helper to get NFT balance => voting power
      const balance = await getUserNFTBalance(address);
      setVotingPower(parseInt(balance, 10));
    } catch (error) {
      console.error("Error loading voting power:", error);
    }
  };

  /**
   * Simple circle for "Yes"/"No" selection
   */
  const VoteCircle = ({ isSelected }) => (
    <div
      className={`w-5 h-5 rounded-full border ${
        isSelected ? "bg-green-400 border-green-400" : "border-gray-400"
      } flex items-center justify-center mr-3`}
    >
      {isSelected && <Check className="w-4 h-4 text-black font-semibold" />}
    </div>
  );

  /**
   * Submits the vote (sign a message, POST to your /api route)
   */
  const handleSubmitVote = async () => {
    try {
      const voteType = selectedVote === "yes" ? 1 : 0;
      if (!window.ethereum) {
        alert("No Ethereum wallet found");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const message = `Proposal ID: ${id}, Vote: ${voteType}, Votes: ${votingPower}`;
      const signature = await signer.signMessage(message);

      const response = await fetch("/api/governance/vote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId: id,
          voterAddress: address,
          vote: voteType,
          numVotes: votingPower,
          signature,
        }),
      });
      const resData = await response.json();

      if (response.ok) {
        alert("Vote submitted successfully");
        loadProposalDetails(); // reload to see updated votes
      } else {
        alert(`Error: ${resData.error || "Submitting vote failed"}`);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Error submitting vote");
    }
  };

  /**
   * Modal for confirming the user's vote
   */
  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 transition-all duration-300 ease-in-out"
        onClick={onClose}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div
          className="bg-[#1c1830] p-12 w-full max-w-md transform transition-all duration-300 ease-in-out mt-20"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-20px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl mb-3 font-bold">Submit Vote</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-400 mb-4">
            Your vote is based on the number of LEC NFTs you hold.
          </p>
          <div className="mb-4">
            <p className="text-gray-400">Voting Power</p>
            <p className="text-xl font-bold my-4">{votingPower} Votes</p>
            <p className="text-gray-400">
              Vote: {selectedVote === "yes" ? "Yes" : "No"}
            </p>
          </div>
          <button
            className="w-full bg-[#7f5af0] text-white py-4 font-semibold hover:bg-[#6b4cd3]"
            onClick={handleSubmitVote}
          >
            CONFIRM VOTE
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading proposal details...</div>;
  }

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto text-white min-h-screen font-sans">
        <main className={`p-4 sm:p-8 ${isModalOpen ? "filter blur-sm" : ""}`}>
          <Link href="/governance" className="flex items-center gap-2 mb-6">
            <span className="text-3xl text-gray-400">←</span> <span>BACK</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* LEFT COLUMN */}
            <div className="order-2 md:order-1 md:col-span-1 lg:col-span-2">
              <h1 className="text-2xl sm:text-3xl font-bold my-6 sm:my-10">
                {`#${proposal.id} ${proposal.title || "LEC Proposal"}`}
              </h1>
              <p className="mb-4 sm:mb-8 font-normal text-base sm:text-lg">
                {proposal.description}
              </p>

              {/* Voting Section */}
              <div className="bg-[#1c1830] p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  CAST YOUR VOTE
                </h2>
                <div className="mb-4 sm:mb-6 -mx-4 sm:-mx-6">
                  <div className="bg-[#251f3f] flex flex-col sm:flex-row">
                    <button
                      className="flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-start text-white border-b sm:border-b-0 sm:border-r border-gray-600"
                      onClick={() => setSelectedVote("yes")}
                    >
                      <VoteCircle isSelected={selectedVote === "yes"} />
                      Yes, I'm in
                    </button>
                    <button
                      className="flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-start text-white"
                      onClick={() => setSelectedVote("no")}
                    >
                      <VoteCircle isSelected={selectedVote === "no"} />
                      No, I don't
                    </button>
                  </div>
                </div>
                <button
                  className="bg-[#7f5af0] text-white py-3 sm:py-5 px-6 sm:px-8 font-semibold hover:bg-[#6b4cd3] w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  SUBMIT VOTE
                </button>
              </div>

              {/* Voter Data */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    VOTES ({voters.length})
                  </h2>
                  <a href="#" className="text-base sm:text-xl font-semibold">
                    SEE ALL VOTES
                  </a>
                </div>
                <div className="space-y-4">
                  {voters.map((vote, index) => (
                    <div
                      key={index}
                      className="flex gap-12 justify-between items-center py-3 sm:py-4 border-b border-gray-700"
                    >
                      <div className="flex items-center md:flex-wrap lg:flex-nowrap mb-2 sm:mb-0">
                        <Image
                          src={profile}
                          alt="Profile"
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3"
                        />
                        <span className="font-semibold text-sm sm:text-base break-all">
                          {vote.voter_address}
                        </span>
                        <Image
                          src={govCopy}
                          alt="copy"
                          className="ml-2 mt-1 cursor-pointer"
                        />
                      </div>
                      <span className="text-white text-base sm:text-lg font-semibold text-left sm:text-center mb-2 sm:mb-0">
                        {vote.vote_type === 1 ? "Yes" : "No"}
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-left sm:text-right">
                        {vote.num_votes} Votes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="order-1 md:order-2 md:col-span-1 lg:col-span-1">
              {/* Current Results */}
              <div className="bg-[#1c1830] mb-6 sm:mb-8 p-4 sm:p-6 font-semibold text-sm sm:text-base">
                <div className="flex items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold mr-2">CURRENT RESULTS</h2>
                  <div className="w-16 mt-2 sm:w-20 h-3 sm:h-4">
                    <Image src={steps} alt="steps" />
                  </div>
                </div>

                <div className="current_results_progress_sect">
                  <div className="current_results_progress_content mb-4 sm:mb-6">
                    <p>
                      For: {results.forVotes} (
                      {results.forPercentage.toFixed(2)}%)
                    </p>
                    <div className="progress-line bg-gray-700 h-1 sm:h-1.5">
                      <div
                        className="progress-done bg-green h-1 sm:h-1.5"
                        style={{
                          width: `${results.forPercentage}%`,
                          transition: "width 1s ease-in-out",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="current_results_progress_content mb-4 sm:mb-6">
                    <p>
                      Against: {results.againstVotes} (
                      {results.againstPercentage.toFixed(2)}%)
                    </p>
                    <div className="progress-line bg-gray-700 h-1 sm:h-1.5">
                      <div
                        className="progress-done bg-red h-1 sm:h-1.5"
                        style={{
                          width: `${results.againstPercentage}%`,
                          transition: "width 1s ease-in-out",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Proposal Info */}
              <div className="bg-[#1c1830] p-4 sm:p-6 font-semibold text-base sm:text-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold mr-2">
                    INFORMATION
                  </h2>
                  <div className="w-16 sm:w-20 mt-2 h-3 sm:h-4">
                    <Image src={steps} alt="steps" />
                  </div>
                </div>
                <div className="flex gap-1 wrap justify-between mb-3 sm:mb-6">
                  <span className="text-gray-400">Address</span>
                  <span className="break-all text-right text-green-400">
                    {proposal.targetAddress}
                  </span>
                </div>
                <div className="flex gap-1 wrap justify-between mb-3 sm:mb-6">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-right">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-1 wrap justify-between mb-3 sm:mb-6">
                  <span className="text-gray-400">End Date</span>
                  <span className="text-right">
                    {new Date(proposal.deadline).toLocaleDateString()}
                  </span>
                </div>
                <button className="bg-[#251f3f] uppercase text-white w-full mt-6 sm:mt-10 mb-4 sm:mb-6 py-3 sm:py-5 px-4 sm:px-6 font-semibold hover:bg-[#3d2d6e]">
                  Discussion
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

      <Footer />
    </div>
  );
};

export default GamFiVotingPage;
