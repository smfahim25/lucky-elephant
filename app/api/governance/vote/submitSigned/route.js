import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { recoverAddress, solidityPackedKeccak256, getBytes } from 'ethers'; // ✅ Correct Ethers v6 Imports
import { rateLimiter } from '@/src/utils/rateLimiter';

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    await rateLimiter.consume(request.ip); // ✅ Apply rate limiting

    const { proposalId, voterAddress, vote, numVotes, signature } = await request.json();

    // ✅ Validate input
    if (!proposalId || !voterAddress || ![0, 1].includes(vote) || numVotes <= 0 || !signature) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // ✅ Generate the signed message hash (Fixed for Ethers v6)
    const messageHash = solidityPackedKeccak256(['uint256', 'uint256'], [proposalId, vote]);
    const messageHashBytes = getBytes(messageHash);
    const recoveredSigner = recoverAddress(messageHashBytes, signature); // ✅ Fixed for Ethers v6

    if (recoveredSigner.toLowerCase() !== voterAddress.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // ✅ Insert vote into Supabase
    const { data, error } = await supabase
      .from('votes')
      .insert({
        proposal_id: proposalId,
        voter_address: voterAddress,
        vote_type: vote,      
        num_votes: numVotes,
        signature,
        timestamp: new Date(),
      });

    if (error) {
      console.error('Error inserting vote into Supabase:', error);
      return NextResponse.json({ error: 'Error submitting vote' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json({ error: 'Error submitting vote' }, { status: 500 });
  }
}
