import { NextResponse } from 'next/server';
import { supabase } from '@/app/api/blog/supabaseHelper'; // Correct import

export async function POST(req) {
  try {
    const body = await req.json();  // Parse incoming JSON request

    // Insert the post into the blog_posts table
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([body])
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ message: 'Failed to insert blog post', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Blog post created successfully', data }, { status: 201 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
