import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ProductStyleWrapper from "./Product.style";
import { getStakingRarityRank } from "../helper"; // ✅ Ensure correct import

const Product = ({ thumb, title, owner, likes, tokenId, contractAddress }) => {
  const [flipped, setFlipped] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLikes, setUserLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [rarity, setRarity] = useState({ rank: "N/A", traits: [] });

  const validTokenId = tokenId ? tokenId.toString() : "0";
  const openSeaLink = `https://opensea.io/assets/ethereum/${contractAddress}/${validTokenId}`;

  // ✅ Display ENS name or shorten wallet address
  const displayOwner = owner
    ? owner.includes(".eth") 
      ? owner 
      : `${owner.slice(0, 6)}...${owner.slice(-4)}`
    : "Unknown Owner";


  // ✅ Ensure proper IPFS URL handling
  const getIpfsUrl = (url) => {
    if (!url) return "/assets/images/Jungleverse.gif";
    if (url.startsWith("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    if (url.startsWith("https://nftstorage.link/ipfs/")) {
      return url.replace("https://nftstorage.link/ipfs/", "https://ipfs.io/ipfs/");
    }
    return url;
  };

  const getChainName = (contractAddress) => {
    const chainMap = {
      "0x42de23cc51A8425C248C9801395DD47BD1996152": "ETH", // Ethereum
      "0x...": "SOL",  // Solana example contract
      "0x...": "ABSTRACT" // Abstract example contract
    };
  
    return chainMap[contractAddress] || "Unknown Chain";
  };
  

  // ✅ Load likes from LocalStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${validTokenId}`);
    const likedStatus = localStorage.getItem(`liked-${validTokenId}`);
    if (storedLikes) setUserLikes(parseInt(storedLikes));
    if (likedStatus) setHasLiked(likedStatus === "true");
  }, [validTokenId]);

  // ✅ Fetch NFT Metadata
  const fetchNFTMetadata = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/collection?address=${contractAddress}&tokenId=${validTokenId}&withOwners=true`
      );
      const data = await response.json();

      if (!response.ok || !data.metadata) {
        throw new Error("Metadata not found.");
      }

      const metadata = data.metadata || {};
      setAttributes(metadata.attributes || []);

      if (!metadata.attributes || metadata.attributes.length === 0) {
        setError("No metadata available for this NFT.");
      }
    } catch (error) {
      console.error("Error fetching NFT metadata:", error);
      setError("Failed to load NFT metadata.");
    }

    setLoading(false);
  };

  // ✅ Fetch Rarity Data
  const fetchNFTRarity = async () => {
    try {
      if (typeof getStakingRarityRank !== "function") {
        console.error("❌ getStakingRarityRank is not a function. Check the import.");
        return;
      }

      const rank = await getStakingRarityRank(validTokenId, contractAddress);
      setRarity({ rank: rank || "N/A", traits: [] });
    } catch (error) {
      console.error("Error fetching rarity data:", error);
      setRarity({ rank: "N/A", traits: [] });
    }
  };

  // ✅ Flip Card and Load Metadata
  const handleViewDetails = () => {
    setFlipped(!flipped);
    if (!flipped) {
      fetchNFTMetadata();
      fetchNFTRarity();
    }
  };

  // ✅ Handle Likes
  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = userLikes + 1;
      setUserLikes(newLikes);
      localStorage.setItem(`likes-${validTokenId}`, newLikes);
      localStorage.setItem(`liked-${validTokenId}`, "true");
      setHasLiked(true);
    } else {
      const newLikes = userLikes - 1;
      setUserLikes(newLikes);
      localStorage.setItem(`likes-${validTokenId}`, newLikes);
      localStorage.setItem(`liked-${validTokenId}`, "false");
      setHasLiked(false);
    }
  };

  return (
    <ProductStyleWrapper>
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          {/* Front of the Card */}
          <div className="flip-card-front">
            <div className="product_thumb">
              <img src={getIpfsUrl(thumb?.src)} alt="NFT Thumbnail" />
            </div>
            <div className="product_details">
              <Link href={openSeaLink} passHref>
                <h4>{title}</h4>
              </Link>
              <p>
              <strong>Chain:</strong> {getChainName(contractAddress)}
                <span>
                  {hasLiked ? (
                    <FaHeart style={{ color: "red" }} onClick={handleLike} />
                  ) : (
                    <FaRegHeart onClick={handleLike} />
                  )}
                  {userLikes}
                </span>
              </p>
              <div className="button-wrapper">
                <a href={openSeaLink} target="_blank" rel="noopener noreferrer">
                  <button className="buy_now_button">Buy Now</button>
                </a>
                <button className="view_details_button" onClick={handleViewDetails}>
                  {flipped ? "Back to Front" : "View Details"}
                </button>
              </div>
            </div>
          </div>

          {/* Back of the Card */}
          <div className="flip-card-back">
            <h4>{title}</h4>
            {loading ? (
              <p>Loading attributes...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul className="nft-attributes">
                {attributes.length > 0 ? (
                  attributes.map((attr, idx) => (
                    <li key={idx}>
                      <strong>{attr.trait_type}</strong>
                      <span>{attr.value}</span>
                    </li>
                  ))
                ) : (
                  <li><strong>⚠️ No attributes found</strong></li>
                )}
              </ul>

            )}

            {/* ✅ Rarity Rank Display */}
            <div className="rarity-info">
              <p>
                <strong>Rarity Rank: #</strong> {rarity.rank}
              </p>
            </div>

            <button className="back_front_button" onClick={() => setFlipped(false)}>
              Back to Front
            </button>
          </div>
        </div>
      </div>
    </ProductStyleWrapper>
  );
};

export default Product;
