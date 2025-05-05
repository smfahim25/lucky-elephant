import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { pnutAbi } from "@/src/section/staking/pnutAbi";
import { alchemyEvm, initializeHelper } from "@/src/utils/alchemyHelper";

const PNUT_CONTRACT_ADDRESS = "0xd6eb4830f5c278E017c0F0aab59c7a51140Ec7EF";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    await initializeHelper();

    const nftsForOwner = await alchemyEvm.nft.getNftsForOwner(address, {
      omitMetadata: false,
      pageSize: 1000,
      refreshCache: true,
    });

    const nfts = nftsForOwner?.ownedNfts || [];
    console.log(`Fetched ${nfts.length} NFTs for ${address}`);

    // ✅ Log NFT metadata for debugging missing images
    console.log("NFT Metadata Sample:", JSON.stringify(nfts.slice(0, 3), null, 2));

    let pnutBalance = "0";
    try {
      const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
      const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);
      const pnutContract = new ethers.Contract(PNUT_CONTRACT_ADDRESS, pnutAbi, provider);
      const rawBalance = await pnutContract.balanceOf(address);
      pnutBalance = ethers.formatUnits(rawBalance, 18);
    } catch (err) {
      console.warn(`Error fetching PNUT balance: ${err.message}`);
    }

    return NextResponse.json({ nfts, pnutBalance });
  } catch (error) {
    console.error("Error fetching user data from Alchemy:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
