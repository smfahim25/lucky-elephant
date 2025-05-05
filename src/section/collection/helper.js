// src/section/collection/helper.js

// ✅ Fetch NFTs by Collection Address with a limit of 100 NFTs per page using the new API route
export const getNFTsByCollection = async (address, limit = 100, cursor = null) => {
  try {
    const response = await fetch(`/api/collection?address=${address}&limit=${limit}&cursor=${cursor}`);
    if (!response.ok) {
      throw new Error("Failed to fetch NFTs from the collection");
    }
    const data = await response.json();

    return {
      nfts: data.nfts || [], // Ensure nfts is an array
      cursor: data.cursor || null, // Cursor for pagination
    };
  } catch (error) {
    console.error("❌ Error fetching NFTs:", error);
    return { nfts: [], cursor: null };
  }
};

// ✅ Fetch Staking Rarity Rank for an NFT
export const getStakingRarityRank = async (tokenId, collectionAddress) => {
  try {
    if (!collectionAddress) {
      throw new Error("Collection address is required for fetching rarity rank.");
    }

    console.log(`🔍 Fetching staking rarity rank for Token ID: ${tokenId}, Collection: ${collectionAddress}`);

    const response = await fetch(`/api/staking-rarity?tokenId=${tokenId}&address=${collectionAddress}`);
    const data = await response.json();

    if (!response.ok || !data.nftRarity) {
      throw new Error(data.error || "Failed to fetch staking rarity rank");
    }

    console.log(`✅ Successfully fetched rarity for Token ID: ${tokenId}, Rank: ${data.nftRarity.rank}`);
    return data.nftRarity.rank || "N/A";
  } catch (error) {
    console.error(`❌ Error fetching staking rarity rank for Token ${tokenId}:`, error);
    return "N/A";
  }
};
