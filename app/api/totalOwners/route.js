/*****************************************************************************
 * FILE: app/api/totalOwners/route.js
 *
 * PURPOSE:
 *  - Fetches the set of unique token owners for an ERC721 or ERC1155 
 *    using Alchemy's "getOwnersForContract" (NFT API).
 *  - Returns count as "totalOwners".
 *
 * NOTE: This replaces Moralis's "getNFTCollectionStats"
 *       with Alchemy's "getOwnersForContract" approach. 
 *****************************************************************************/

import { NextResponse } from 'next/server';
import { initializeHelper, alchemyEvm } from '@/src/utils/alchemyHelper';

const CONTRACT_ADDRESS = "0x42de23cc51A8425C248C9801395DD47BD1996152";

export async function GET() {
  try {
    await initializeHelper();

    // Fetch owners set from Alchemy
    const ownersResponse = await alchemyEvm.nft.getOwnersForContract(CONTRACT_ADDRESS);
    const ownersArray = ownersResponse.owners || [];
    const totalOwners = ownersArray.length;

    return NextResponse.json({ totalOwners });
  } catch (error) {
    console.error("Error fetching totalOwners with Alchemy:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
