"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogListStyleWrapper from "./BlogList.style";
import BlogItem from "../blogItem/BlogItem";
import Pagination from "../pagination/Pagination";
import { fetchAllPosts } from "@/app/api/blog/supabaseHelper"; // Correct import

const POSTS_PER_PAGE = 6; // Adjust the number of posts per page

const BlogList = () => {
  const [posts, setPosts] = useState([]); // State for blog posts
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(true); // Loading state

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the current page from query params, defaulting to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching

        const allPosts = await fetchAllPosts(); // Fetch all posts from Supabase

        // Calculate pagination data
        const totalPosts = allPosts.length;
        setTotalPages(Math.ceil(totalPosts / POSTS_PER_PAGE));

        // Slice the posts for the current page
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const paginatedPosts = allPosts.slice(start, start + POSTS_PER_PAGE);

        setPosts(paginatedPosts); // Set posts for the current page
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    loadPosts(); // Call the function to load posts when component mounts or page changes
  }, [currentPage]); // Re-run whenever the current page changes

  if (loading) return <div>Loading...</div>; // Show a loading state

  return (
    <BlogListStyleWrapper>
      <div className="blog_lists_wrapper">
        <div className="container">
          <div className="row blog_items_row">
            {/* Render the fetched blog posts */}
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <BlogItem {...post} />
                </div>
              ))
            ) : (
              <div>No posts available</div> // Handle case when no posts are found
            )}
          </div>
          <div className="row">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </BlogListStyleWrapper>
  );
};

export default BlogList;
