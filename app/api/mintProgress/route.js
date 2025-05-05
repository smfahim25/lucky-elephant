import { NextResponse } from 'next/server';
import { initializeHelper, alchemyEvm } from '@/src/utils/alchemyHelper';

const CONTRACT_ADDRESS = "0x42de23cc51A8425C248C9801395DD47BD1996152";
const MAX_SUPPLY = 8888; // Replace with your actual max supply

export async function GET() {
  try {
    await initializeHelper();

    // 1) Try contract metadata first
    const meta = await alchemyEvm.nft.getContractMetadata(CONTRACT_ADDRESS);

    let totalItems;
    if (meta.totalSupply && meta.totalSupply !== "0") {
      totalItems = parseInt(meta.totalSupply, 10);
    } else {
      // Fallback to enumerating tokens
      const resp = await alchemyEvm.nft.getNftsForContract(CONTRACT_ADDRESS, { pageSize: 200 });
      totalItems = resp.nfts.length;
    }

    const mintProgress = ((totalItems / MAX_SUPPLY) * 100).toFixed(2);

    return NextResponse.json({ mintProgress });
  } catch (error) {
    console.error("Error fetching mintProgress from Alchemy:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
