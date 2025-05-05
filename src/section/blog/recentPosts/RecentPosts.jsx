"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RecentPostsStyleWrapper from "./RecentPosts.style";
import SectionTitle from "@/src/common/sectionTitle";
import { fetchAllPosts } from "@/app/api/blog/supabaseHelper"; // Import the fetch function

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]); // State to hold recent posts

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const allPosts = await fetchAllPosts(); // Fetch all posts from Supabase

        // Sort posts by created_at date in descending order and take the top 3
        const sortedPosts = allPosts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        setRecentPosts(sortedPosts); // Set the top 3 posts to state
      } catch (error) {
        console.error("Error loading recent posts:", error);
      }
    };

    loadRecentPosts(); // Call the function on component mount
  }, []);

  if (recentPosts.length === 0) {
    return <div>No recent posts available</div>; // Handle empty state
  }

  return (
    <RecentPostsStyleWrapper className="recent_post_list">
      <SectionTitle subtitle="Recent Posts" className="widget_title" />
      {recentPosts.map((post, i) => (
        <div key={i} className="recent_post_item">
          <img
            src={post.thumbnail_url || "/default-thumbnail.png"} // Use thumbnail_url
            alt={post.title || "Recent post thumbnail"} // Fallback for title
          />
          <div className="post_title">
            <span>
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "Unknown Date"}
            </span>
            <Link href={`/post/${post.slug}`}>{post.title || "Untitled Post"}</Link> {/* Use slug for navigation */}
          </div>
        </div>
      ))}
    </RecentPostsStyleWrapper>
  );
};

export default RecentPosts;

