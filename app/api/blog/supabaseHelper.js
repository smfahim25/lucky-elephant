import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize the Supabase client (singleton pattern)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key.");
}

// Properly export the supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Rest of the helper functions...
export const insertNewPost = async (post) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .single();

    if (error) throw new Error(`Error inserting post: ${error.message}`);
    return data;
  } catch (error) {
    console.error('Error inserting new post:', error);
    throw error;
  }
};

// Function to fetch all blog posts
export const fetchAllPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) throw new Error(`Error fetching posts: ${error.message}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Fetch post by slug
export const fetchPostBySlug = async (slug) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  // Fetch all categories from the 'blog_categories' table
export const fetchCategories = async () => {
    const { data, error } = await supabase.from("blog_categories").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
    return data;
  };

export const fetchPaginatedPosts = async (page = 1, limit = 5) => {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
  
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' }) // Fetch total count
        .order('created_at', { ascending: false })
        .range(from, to);
  
      if (error) throw error;
  
      return { posts: data, total: count };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      throw error;
    }
  };
  
// Fetch all unique tags from 'blog_posts' table
export const fetchAllTags = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .neq('tags', null); // Only fetch posts with non-null tags
  
      if (error) throw new Error(`Error fetching tags: ${error.message}`);
  
      // Flatten and deduplicate the tags across all posts
      const allTags = [...new Set(data.flatMap((post) => post.tags || []))];
      return allTags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  };