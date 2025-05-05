// src/section/staking/helper.js

export const getNfts = async (address) => {
  try {
    console.log(`Fetching NFTs for address: ${address}`);

    const response = await fetch(`/api/user-nfts?address=${address}`);
    const data = await response.json();

    if (!response.ok || !data.nfts) {
      throw new Error(data.error || "Failed to fetch NFTs and balance");
    }

    console.log(`Successfully fetched NFTs and $PNUT for ${address}`);
    return { nfts: data.nfts, pnutBalance: data.pnutBalance };
  } catch (error) {
    console.error("Error fetching NFTs from API:", error);
    return { nfts: [], pnutBalance: "0" };
  }
};

export const getStakingRarityRank = async (tokenId, collectionAddress) => {
  try {
    if (!collectionAddress) {
      throw new Error("Collection address is required for fetching rarity rank.");
    }
    console.log(
      `Fetching staking rarity rank for tokenId: ${tokenId}, collection: ${collectionAddress}`
    );

    const response = await fetch(
      `/api/staking-rarity?tokenId=${tokenId}&address=${collectionAddress}`
    );
    const data = await response.json();

    if (!response.ok || !data.nftRarity) {
      throw new Error(data.error || "Failed to fetch staking rarity rank");
    }
    console.log(`Successfully fetched rarity for tokenId: ${tokenId}`);
    return data.nftRarity.rank || "N/A";
  } catch (error) {
    console.error(
      `Error fetching staking rarity rank for token ${tokenId}:`,
      error
    );
    return "N/A";
  }
};

