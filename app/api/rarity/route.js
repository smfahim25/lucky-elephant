/*****************************************************************************
 * FILE: app/api/rarity/route.js
 *
 * PURPOSE:
 *  - Generic rarity scoring route using trait frequency from entire collection.
 *  - Replaces Moralis calls with Alchemy NFT API calls.
 *****************************************************************************/

import { NextResponse } from 'next/server';
import { initializeHelper, alchemyEvm } from '@/src/utils/alchemyHelper';

// Helper function to compute rarity
function calculateRarity(nfts) {
  const traitFrequency = {};
  const totalNFTs = nfts.length;

  // 1) Trait frequency
  nfts.forEach((nft) => {
    const attributes = nft.rawMetadata?.attributes || [];
    attributes.forEach((trait) => {
      const traitKey = `${trait.trait_type}:${trait.value}`;
      traitFrequency[traitKey] = (traitFrequency[traitKey] || 0) + 1;
    });
  });

  // 2) Rarity for each NFT
  const rarityScores = nfts.map((nft) => {
    let rarityScore = 0;
    const attributes = nft.rawMetadata?.attributes || [];

    const traitPercentages = attributes.map((trait) => {
      const traitKey = `${trait.trait_type}:${trait.value}`;
      const frequency = traitFrequency[traitKey];
      const rarityPercentage = ((frequency / totalNFTs) * 100).toFixed(2);
      return {
        traitType: trait.trait_type,
        traitValue: trait.value,
        rarityPercentage,
      };
    });

    attributes.forEach((trait) => {
      const traitKey = `${trait.trait_type}:${trait.value}`;
      const freq = traitFrequency[traitKey];
      const rarity = 1 / (freq / totalNFTs);
      rarityScore += rarity;
    });

    return {
      tokenId: nft.tokenId,
      rarityScore: rarityScore.toFixed(2),
      rarityPercentage: traitPercentages,
    };
  });

  // 3) Sort by rarityScore desc
  rarityScores.sort((a, b) => b.rarityScore - a.rarityScore);
  rarityScores.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return rarityScores;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const collectionAddress = searchParams.get('address');
  const limit = parseInt(searchParams.get('limit') || '100', 10);

  if (!collectionAddress) {
    return NextResponse.json({ error: 'Collection address is required' }, { status: 400 });
  }

  try {
    // 1) Init Alchemy
    await initializeHelper();

    // 2) Fetch up to 'limit' NFTs from the contract
    //    For large collections, you'd need pagination with pageKey
    const res = await alchemyEvm.nft.getNftsForContract(collectionAddress, {
      pageSize: limit,
    });
    const nfts = res.nfts || [];

    if (!nfts.length) {
      return NextResponse.json({ error: 'No NFTs found in the collection' }, { status: 404 });
    }

    // 3) Calculate rarity
    const rarityData = calculateRarity(nfts);
    return NextResponse.json({ rarityData });
  } catch (error) {
    console.error('Error calculating rarity with Alchemy:', error);
    return NextResponse.json({ error: 'Failed to calculate rarity' }, { status: 500 });
  }
}
