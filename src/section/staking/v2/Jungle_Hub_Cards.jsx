import React, { useEffect, useState } from "react";
import CardsWrappers from "./Cards.style";
import { getStakingRarityRank } from "../helper";

export default function Jungle_Hub_Cards({ userNfts }) {
  const [nftRanks, setNftRanks] = useState({});
  const collectionAddress = "0x42de23cc51a8425c248c9801395dd47bd1996152"; // NFT Collection Address

  useEffect(() => {
    const fetchAllRanks = async () => {
      if (!userNfts || userNfts.length === 0) {
        console.log("No NFTs found for user.");
        return;
      }

      // Fetch staking rarity rank for each NFT
      const rankPromises = userNfts.map(async (nft) => {
        const tokenId = nft?.tokenId || nft?.token_id;
        if (!tokenId) return { tokenId: "unknown", rank: "N/A" };

        const rank = await getStakingRarityRank(tokenId, collectionAddress);
        return { tokenId, rank };
      });

      const ranks = await Promise.all(rankPromises);

      // Convert array to object for easy lookup
      const rankMap = {};
      ranks.forEach(({ tokenId, rank }) => {
        rankMap[tokenId] = rank;
      });

      setNftRanks(rankMap);
    };

    fetchAllRanks();
  }, [userNfts, collectionAddress]);

  return (
    <CardsWrappers>
      <div className="Cards_Main">
        <hr className="divider" />
        <p className="JungleHub_heading">Lucky Jungle Hub</p>
        <div className="Cards_Data">
          {userNfts?.map((item, idx) => {
            const tokenId = item?.tokenId || item?.token_id;
            const rank = nftRanks[tokenId] || "N/A";

            /**
             * ✅ FIXED: Properly format NFT image URLs
             * - Priority 1: Alchemy `cachedUrl`
             * - Priority 2: `raw.metadata.image`, ensuring IPFS is formatted
             * - Priority 3: OpenSea metadata image as last fallback
             */
            let imageUrl = null;

            if (item?.image?.cachedUrl) {
              imageUrl = item.image.cachedUrl; // ✅ Alchemy Cached URL
            } else if (item?.raw?.metadata?.image) {
              imageUrl = item.raw.metadata.image.startsWith("ipfs://")
                ? item.raw.metadata.image.replace("ipfs://", "https://nftstorage.link/ipfs/")
                : item.raw.metadata.image;
            } else if (item?.contract?.openSeaMetadata?.imageUrl) {
              imageUrl = item.contract.openSeaMetadata.imageUrl;
            }

            // Debugging Log
            console.log(`NFT ${tokenId} Image URL:`, imageUrl);

            const nftName = `Lucky Elephant Club Jungleverse #${tokenId}`;

            return (
              <div key={idx} className="map_cards">
                <img
                  src={imageUrl}
                  loading="lazy"
                  alt={`NFT ${nftName}`}
                  className="Cards_Main_Img"
                  onError={(e) => (e.target.src = "/assets/svg/fallback-image.svg")}
                />
                <div className="text_heading">
                  <img
                    src="/assets/svg/Staking_Page/Dash.svg"
                    className="Dash_Img"
                    alt="NFT Dash"
                  />
                  <p>{nftName}</p> {/* Display the tokenId in the name */}
                </div>
                <div className="jungle_hub_earnings">
                  <div className="left_section">
                    <p className="earnings_heading">Daily Earnings</p>
                    <div>
                      <p>10 $pnuts</p> {/* Placeholder for earnings */}
                      <img
                        src="/assets/svg/Staking_Page/Graph.svg"
                        alt="graph_logo"
                      />
                    </div>
                  </div>
                  <div className="right_section">
                    <p className="input_heading">Rank</p>
                    <div>
                      <p>#{rank}</p> {/* Display the rank */}
                      <img
                        src="/assets/svg/Staking_Page/Star.svg"
                        alt="rank_star_logo"
                      />
                    </div>
                  </div>
                </div>
                <p className="rewards_heading">Total Rewards</p>
                <p className="pnuts_heading">0 $pnuts</p> {/* Placeholder for total rewards */}
                
                {/* Replace Claim Button with Change Name/Bio */}
                <button 
                  className="change_name_bio_btn" 
                  onClick={() => alert('Change Name & Bio feature is coming soon!')}
                >
                  <img src="/assets/svg/change_button.svg" alt="Change Name/Bio Button" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </CardsWrappers>
  );
}
