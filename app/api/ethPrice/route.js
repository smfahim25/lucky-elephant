// app/api/ethPrice/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch Ethereum price in USD from CoinGecko
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();

    // Extract the Ethereum price in USD
    const ethPriceInUSD = data.ethereum.usd;

    return NextResponse.json({ ethPriceInUSD });
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    return NextResponse.json({ error: 'Failed to fetch Ethereum price' }, { status: 500 });
  }
}
