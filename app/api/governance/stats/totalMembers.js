"use server";

/*****************************************************************************
 * FILE: app/api/governance/stats/totalMembers.js
 *****************************************************************************/

import { NextResponse } from "next/server";
import { JsonRpcProvider, Contract } from "ethers";
import { initializeHelper } from "@/src/utils/alchemyHelper";
import { daoAbi } from "@/src/section/governance/daoABI";
import { rateLimiter } from "@/src/utils/rateLimiter";

const DAO_CONTRACT_ADDRESS = "0xc9AB3cB23929E0935bD410a67FF4bceD4701Ca24";

// On the server, we can’t use window.ethereum, so we use a static RPC:
const provider = new JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);

export async function GET(request) {
  try {
    await rateLimiter.consume(request.ip);

    await initializeHelper(); // Multi-chain init if needed

    // Use your private key or a public provider if you only need read:
    // For read-only calls, no wallet needed:
    const contract = new Contract(DAO_CONTRACT_ADDRESS, daoAbi, provider);

    const totalMembers = await contract.getTotalMembers();

    return NextResponse.json({ totalMembers: parseInt(totalMembers, 10) });
  } catch (error) {
    console.error("Error fetching total members:", error);
    return NextResponse.json({ error: "Error fetching total members" }, { status: 500 });
  }
}
