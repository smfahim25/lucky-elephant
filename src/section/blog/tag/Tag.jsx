import { useEffect, useState } from "react";
import Link from "next/link";
import TagStyleWrapper from "./tag.style";
import { fetchAllTags } from "@/app/api/blog/supabaseHelper"; // Import the helper function

const Tags = () => {
  const [tags, setTags] = useState([]); // Store fetched tags

  // Load tags on component mount
  useEffect(() => {
    const loadTags = async () => {
      try {
        const fetchedTags = await fetchAllTags(); // Fetch all unique tags
        setTags(fetchedTags); // Set the tags in state
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    loadTags(); // Call the function
  }, []);

  return (
    <TagStyleWrapper className="tag_items">
      {tags.length > 0 ? (
        tags.map((tag, i) => (
          <Link key={i} href={`/tag/${tag}`}>
            {tag}
          </Link>
        ))
      ) : (
        <p>No tags available.</p> // Fallback if no tags found
      )}
    </TagStyleWrapper>
  );
};

export default Tags;
