import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase initialization (Ensure keys exist)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Function to handle GET request to fetch a proposal by ID
export async function GET(request, context) {
  try {
    // ✅ Await params before accessing `id`
    const { params } = context;
    if (!params?.id) {
      console.error("❌ Error: Proposal ID is undefined.");
      return NextResponse.json({ error: 'Invalid proposal ID' }, { status: 400 });
    }

    const id = params.id;

    console.log(`🔍 Fetching proposal ID: ${id}`);

    // ✅ Fetch proposal from Supabase
    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single();  

    if (proposalError || !proposal) {
      console.error("❌ Proposal not found:", proposalError);
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // ✅ Fetch voters from the votes table
    const { data: voters, error: votersError } = await supabase
      .from('votes')
      .select('*')
      .eq('proposal_id', id);

    if (votersError) {
      console.error("❌ Error fetching voters:", votersError);
      return NextResponse.json({ error: 'Error fetching voters' }, { status: 500 });
    }

    // ✅ Return structured response
    return NextResponse.json({
      proposal: {
        id: proposal.id,
        proposer: proposal.proposer,
        description: proposal.description,
        createdAt: proposal.created_at,
        deadline: proposal.deadline,
        snapshot: proposal.snapshot || 'Unknown',
        targetAddress: proposal.target_address,
        executed: proposal.executed,
      },
      voters: voters || [],
      votingPower: voters ? voters.length : 0,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

