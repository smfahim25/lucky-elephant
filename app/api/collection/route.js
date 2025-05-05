/*****************************************************************************
 * FILE: app/api/collection/route.js
 *
 * PURPOSE:
 *  - If tokenId is provided, fetch that NFT’s metadata from Alchemy.
 *  - Otherwise, fetch up to "limit" from the entire collection.
 *  - Return data in the same shape (with .metadata).
 *  - Fetch full NFT metadata for a given collection.
 *  - Use the best available image source (rawMetadata.image or media.gateway).
 *  - Correctly handle IPFS URLs.
 *  - Force metadata refresh if necessary.
 *****************************************************************************/

import { NextResponse } from "next/server";
import { initializeHelper, alchemyEvm } from "@/src/utils/alchemyHelper";

// 🔧 Fix: Improved IPFS Handling
const formatIpfsUrl = (url) => {
  if (!url) return "/assets/images/Jungleverse.gif"; // Default fallback
  if (url.startsWith("ipfs://")) return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  if (url.includes("nftstorage.link/ipfs/")) return url.replace("https://nftstorage.link/ipfs/", "https://ipfs.io/ipfs/");
  return url;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const collectionAddress = searchParams.get("address");
  const tokenId = searchParams.get("tokenId");
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  if (!collectionAddress) {
    return NextResponse.json({ error: "Collection address is required" }, { status: 400 });
  }

  try {
    await initializeHelper();

    if (tokenId) {
      // 🔄 Fetch Single NFT Metadata
      const singleNft = await alchemyEvm.nft.getNftMetadata(collectionAddress, tokenId, { withOwners: true });
      if (!singleNft) return NextResponse.json({ error: "NFT not found" }, { status: 404 });

      const metadata = singleNft.rawMetadata || {};
      const attributes = metadata.attributes || singleNft.raw?.metadata?.attributes || [];
      let imageUrl = singleNft.image?.cachedUrl || formatIpfsUrl(metadata.image || singleNft.media?.[0]?.gateway);

      // ✅ Log NFT Metadata for Debugging
      console.log(`🔍 NFT #${tokenId} Metadata:`, metadata);
      console.log(`🔍 NFT #${tokenId} Attributes:`, attributes || "❌ No Attributes Found");

      // ✅ Force Metadata Refresh if Attributes Are Missing
      if (!attributes.length) {
        console.warn(`⚠️ Metadata missing for NFT #${tokenId}, requesting refresh...`);
        await alchemyEvm.nft.refreshNftMetadata(collectionAddress, tokenId);
      }

      return NextResponse.json({
        metadata: {
          name: metadata.name || `LEC Jungleverse #${tokenId}`,
          image: imageUrl,
          attributes,
        },
      });
    }

    // 🔄 Fetch Multiple NFTs from Collection
    const resp = await alchemyEvm.nft.getNftsForContract(collectionAddress, {
      pageSize: limit,
      withMetadata: true,
      withOwners: true,  // ✅ Add owner data
    });
    

    const nfts = resp.nfts.map((nft) => {
      let metadata = nft.rawMetadata || {};
      const attributes = metadata.attributes || nft.raw?.metadata?.attributes || [];
      let imageUrl = nft.image?.cachedUrl || formatIpfsUrl(metadata.image || nft.media?.[0]?.gateway);

      // ✅ Log NFT Metadata for Debugging
      console.log(`🔍 NFT #${nft.tokenId} Metadata:`, metadata);
      console.log(`🔍 NFT #${nft.tokenId} Attributes:`, attributes || "❌ No Attributes Found");

      return {
        tokenId: nft.tokenId,
        owner: nft.owners?.[0] || "Unknown",  // ✅ Add owner wallet address
        metadata: {
          name: nft.rawMetadata?.name || `LEC Jungleverse #${nft.tokenId}`,
          image: imageUrl,
          attributes: nft.rawMetadata?.attributes || [],
        },
      };
      
    });

    console.log(`✅ Successfully fetched ${nfts.length} NFTs from collection: ${collectionAddress}`);

    return NextResponse.json({
      nfts,
      cursor: resp.pageKey || null,
    });
  } catch (error) {
    console.error("❌ Error fetching collection NFTs:", error);
    return NextResponse.json({ error: "Failed to fetch collection data" }, { status: 500 });
  }
}
