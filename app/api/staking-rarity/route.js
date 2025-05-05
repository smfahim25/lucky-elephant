/*****************************************************************************
 * FILE: app/api/staking-rarity/route.js
 * PURPOSE:
 *   Local "staking" rarity calculation using Alchemy with pagination
 *****************************************************************************/

import { NextResponse } from "next/server";
import { initializeHelper, alchemyEvm } from "@/src/utils/alchemyHelper";

// Trait frequency-based rarity calc
function calculateRarityForStaking(nfts) {
  const traitFrequency = {};

  // 1) Count trait frequencies
  nfts.forEach((nft) => {
    const attributes = nft.rawMetadata?.attributes || [];
    attributes.forEach((trait) => {
      const traitKey = `${trait.trait_type}:${trait.value}`;
      traitFrequency[traitKey] = (traitFrequency[traitKey] || 0) + 1;
    });
  });

  const totalNFTs = nfts.length;

  // 2) Calc rarity score
  const rarityScores = nfts.map((nft) => {
    let rarityScore = 0;
    const attributes = nft.rawMetadata?.attributes || [];
    attributes.forEach((trait) => {
      const traitKey = `${trait.trait_type}:${trait.value}`;
      const frequency = traitFrequency[traitKey];
      const rarity = 1 / (frequency / totalNFTs);
      rarityScore += rarity;
    });
    return {
      tokenId: nft.tokenId, // e.g. "0x218"
      rarityScore: rarityScore.toFixed(2),
    };
  });

  // 3) Sort descending & assign rank
  rarityScores.sort((a, b) => b.rarityScore - a.rarityScore);
  rarityScores.forEach((item, index) => {
    item.rank = index + 1;
  });

  return rarityScores;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tokenIdDecimalStr = searchParams.get("tokenId");
  const address = searchParams.get("address");

  if (!address || !tokenIdDecimalStr) {
    return NextResponse.json(
      { error: "address and tokenId are required" },
      { status: 400 }
    );
  }

  const tokenIdDecimal = parseInt(tokenIdDecimalStr, 10);
  if (isNaN(tokenIdDecimal)) {
    return NextResponse.json(
      { error: `Invalid tokenId format: ${tokenIdDecimalStr}` },
      { status: 400 }
    );
  }

  // decimal => hex
  const tokenIdHex = "0x" + tokenIdDecimal.toString(16);

  try {
    // 1) Init Alchemy
    await initializeHelper();

    // 2) Single NFT check
    const singleNft = await alchemyEvm.nft.getNftMetadata(address, tokenIdHex);
    if (!singleNft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    // 3) Gather entire collection via pagination
    let allNfts = [];
    let pageKey = null;

    while (true) {
      const resp = await alchemyEvm.nft.getNftsForContract(address, {
        pageSize: 1000,
        pageKey: pageKey || undefined,
      });
      allNfts = allNfts.concat(resp.nfts || []);

      if (!resp.pageKey) break;
      pageKey = resp.pageKey; // next page
    }

    if (!allNfts.length) {
      return NextResponse.json(
        { error: "No NFTs found in the collection" },
        { status: 404 }
      );
    }

    // 4) Calculate rarity across entire set
    const rarityData = calculateRarityForStaking(allNfts);

    // 5) Find the requested token
    const nftRarity = rarityData.find(
      (item) => parseInt(item.tokenId, 16) === tokenIdDecimal
    );
    if (!nftRarity) {
      return NextResponse.json(
        { error: `Rarity data not found for token ID ${tokenIdDecimalStr}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ nftRarity });
  } catch (error) {
    console.error("Error calculating staking rarity with Alchemy:", error);
    return NextResponse.json(
      { error: "Failed to calculate staking rarity" },
      { status: 500 }
    );
  }
}
