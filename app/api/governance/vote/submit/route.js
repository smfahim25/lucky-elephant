import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { verifyMessage } from 'ethers'; // ✅ Correct Ethers v6 Import

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const { proposalId, voterAddress, vote, numVotes, signature } = await request.json();

    // Validate the input
    if (!proposalId || !voterAddress || ![0, 1].includes(vote) || numVotes <= 0 || !signature) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Check if the user has already voted on this proposal
    const { data: existingVotes, error: voteCheckError } = await supabase
      .from('votes')
      .select('*')
      .eq('proposal_id', proposalId)
      .eq('voter_address', voterAddress);

    if (voteCheckError) {
      console.error('Error checking for existing votes:', voteCheckError);
      return NextResponse.json({ error: 'Error checking votes' }, { status: 500 });
    }

    if (existingVotes && existingVotes.length > 0) {
      console.log(`User ${voterAddress} has already voted on proposal ${proposalId}`);
      return NextResponse.json({ error: 'User has already voted on this proposal' }, { status: 403 });
    }

    // Verify the signature (Updated for Ethers v6)
    const message = `Proposal ID: ${proposalId}, Vote: ${vote}, Votes: ${numVotes}`;
    const recoveredSigner = verifyMessage(message, signature); // ✅ Fixed for Ethers v6

    if (recoveredSigner.toLowerCase() !== voterAddress.toLowerCase()) {
      console.error('Signature mismatch:', recoveredSigner, '!==', voterAddress);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Insert vote into Supabase
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

    // Return success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unhandled error submitting vote:', error);
    return NextResponse.json({ error: 'Error submitting vote' }, { status: 500 });
  }
}
