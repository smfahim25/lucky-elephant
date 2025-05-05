"use server";

/*****************************************************************************
 * FILE: app/api/governance/stats/votingPower.js
 *****************************************************************************/

import { NextResponse } from "next/server";
import { JsonRpcProvider, Contract } from "ethers";
import { initializeHelper } from "@/src/utils/alchemyHelper";
import { daoAbi } from "@/src/section/governance/daoABI";
import { rateLimiter } from "@/src/utils/rateLimiter";

const DAO_CONTRACT_ADDRESS = "0xc9AB3cB23929E0935bD410a67FF4bceD4701Ca24";

// Static RPC for server side:
const provider = new JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);

export async function GET(request) {
  try {
    await rateLimiter.consume(request.ip);

    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Missing address" }, { status: 400 });
    }

    await initializeHelper();

    const contract = new Contract(DAO_CONTRACT_ADDRESS, daoAbi, provider);
    const votingPower = await contract.getVotingPower(address);

    return NextResponse.json({ votingPower: parseInt(votingPower, 10) });
  } catch (error) {
    console.error("Error fetching voting power:", error);
    return NextResponse.json({ error: "Error fetching voting power" }, { status: 500 });
  }
}
