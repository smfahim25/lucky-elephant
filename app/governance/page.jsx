/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import Footer from "@/src/section/footer/v1";
import GovernanceBanner from "@/src/section/governance/Banner";
import Header from "@/src/section/header/pageMenu/header";
import GovernanceCard from "./Page.style";
import { Dropdown_data } from "@/src/_mock/data";
import { getUserNFTBalance } from "@/src/section/governance/helper";
import { ProposalModal } from "@/src/section/governance/ProposalModal";
import { initializeHelper } from "@/src/utils/alchemyHelper";
import Link from "next/link";
import { fetchProposals, getVotesForProposal } from "@/app/api/governance/supabaseHelper";

export default function Governance() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [proposals, setProposals] = useState([]);
  const [nftsOwned, setNftsOwned] = useState(0);
  const [votingPower, setVotingPower] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      initializeHelper().then(() => {
        loadProposals();
        fetchUserNFTs();
      });
    }
  }, [isConnected, address]);

  const loadProposals = async () => {
    try {
      const result = await fetchProposals();
      if (result && result.length > 0) {
        // Fetch votes for each proposal and include in the proposal object
        const proposalsWithVotes = await Promise.all(
          result.map(async (proposal) => {
            const votes = await getVotesForProposal(proposal.id); // Fetch votes for each proposal
            const forVotes = votes.filter(vote => vote.vote_type === 1).reduce((acc, vote) => acc + vote.num_votes, 0);
            const againstVotes = votes.filter(vote => vote.vote_type === 2).reduce((acc, vote) => acc + vote.num_votes, 0);
            return { ...proposal, forVotes, againstVotes };
          })
        );
        setProposals(proposalsWithVotes);
      } else {
        console.error("No proposals available.");
      }
    } catch (error) {
      console.error("Error loading proposals:", error);
    }
  };

  const fetchUserNFTs = async () => {
    try {
      const nftBalance = await getUserNFTBalance(address);
      setNftsOwned(nftBalance);
      setVotingPower(nftBalance);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  return (
    <>
      <Header />
      <GovernanceBanner />
      <div className="">
        <GovernanceCard>
          <div className="governance_main_div">
            <div className="governance_banner_left_section">
              <div className="proposals_searchBar">
                <p>Proposals</p>
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="proposals_dropdown"
                >
                  <p>All Proposals</p>
                  <img
                    src="/assets/images/arrow_down.png"
                    className="down_arrow"
                    alt=""
                  />
                  {isOpen && (
                    <div className="dropdown_data">
                      {Dropdown_data.map((item, idx) => (
                        <div key={idx} className="dropdown_selectable_titles">
                          <p>{item.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                {proposals.length > 0 ? (
                  proposals.map((item, idx) => {
                    const totalVotes = item.forVotes + item.againstVotes;
                    const forPercentage = totalVotes ? (item.forVotes / totalVotes) * 100 : 0;
                    const againstPercentage = totalVotes ? (item.againstVotes / totalVotes) * 100 : 0;

                    return (
                      <div key={idx} className="governanc_content_left_hash_card mt-8">
                        <h2>
                          <Link href={`/governance-details/${item.id}`}>
                            <span>{`#${item.id}`}</span>
                            <p className="card_heading">{item.title || item.description.substring(0, 50) + '...'}</p>
                          </Link>
                        </h2>
                        <h3>
                          Voting Time: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Invalid Date'} - {new Date(item.deadline).toLocaleDateString()}
                        </h3>
                        <div className="governanc_content_left_hash_card_stutas">
                          <h4>Status: <span className="white">{item.executed ? "Executed" : "Pending"}</span></h4>
                          <div className={`stutas_${item.executed ? "live" : "pending"}`}>
                            <div className="video__icon">
                              <div className="circle--outer"></div>
                              <div className="circle--inner"></div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bars for For and Against Votes */}
                        <ul className="vote_progress_bars">
                          {/* For Votes */}
                          <li>
                            <div className="progress-line">
                              <div
                                className="progress-done bg-green"
                                style={{
                                  width: `${forPercentage}%`,
                                  opacity: 1,
                                  transition: "width 1s ease-in-out"
                                }}
                              ></div>
                            </div>
                            <h5>
                              For: <span>{item.forVotes || 0}</span>{" "}
                              <span>({forPercentage.toFixed(1)}%)</span>
                            </h5>
                          </li>

                          {/* Against Votes */}
                          <li>
                            <div className="progress-line">
                              <div
                                className="progress-done bg-red"
                                style={{
                                  width: `${againstPercentage}%`,
                                  opacity: 1,
                                  transition: "width 1s ease-in-out"
                                }}
                              ></div>
                            </div>
                            <h5>
                              Against: <span>{item.againstVotes || 0}</span>{" "}
                              <span>({againstPercentage.toFixed(1)}%)</span>
                            </h5>
                          </li>
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-proposals-message">
                    No Proposals Available at the Moment.
                  </p>
                )}
              </div>
            </div>

            <div className="power_banner">
              <div className="powers_section_heading">
                <p>Your Powers</p>
                <img
                  src="/assets/images/stacking_page/breadcrumbs-side-img.png"
                  alt=""
                />
              </div>
              <small>
                Voting power is based on the number of NFTs you own from the collection.
              </small>
              <div className="power_data">
                <p>Available Balance</p>
                <p>
                  {balanceData?.formatted
                    ? Number(balanceData.formatted).toFixed(4)
                    : 0}{" "}
                  ETH
                </p>
              </div>

              <div className="power_data">
                <p>Voting Power</p>
                <p>{votingPower}</p>
              </div>

              <div className="Power_Banner_Buttons">
                <button
                  disabled={!isConnected || nftsOwned === 0}
                  className={`py-4 px-8 font-semibold ${
                    !isConnected || nftsOwned === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#7f5af0] hover:bg-[#6b4cd3] text-white"
                  }`}
                  onClick={() => setModalOpen(true)}
                >
                  Make a Proposal
                </button>
              </div>
            </div>
          </div>
        </GovernanceCard>
      </div>

      <Footer />

      <ProposalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        user={address}
      />
    </>
  );
}
