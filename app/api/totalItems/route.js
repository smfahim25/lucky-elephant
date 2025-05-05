// app/api/totalItems/route.js

import { NextResponse } from 'next/server';
import { initializeHelper, alchemyEvm } from '@/src/utils/alchemyHelper';

const CONTRACT_ADDRESS = "0x42de23cc51A8425C248C9801395DD47BD1996152";

export async function GET() {
  try {
    await initializeHelper();

    const meta = await alchemyEvm.nft.getContractMetadata(CONTRACT_ADDRESS);
    if (meta.totalSupply && meta.totalSupply !== "0") {
      const totalItems = meta.totalSupply;
      return NextResponse.json({ totalItems });
    }
    throw new Error("No totalSupply found in contract metadata; fallback not implemented.");
  } catch (error) {
    console.error("Error fetching totalItems from Alchemy:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
