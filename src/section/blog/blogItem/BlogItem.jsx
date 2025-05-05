import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegComments } from "react-icons/fa";
import BlogItemStyleWrapper from "./BlogItem.style";

const BlogItem = ({
  slug,
  thumbnail_url,
  title,
  created_at,
  categories = [],
  excerpt,
}) => {
  const [categoryTitles, setCategoryTitles] = useState(categories);

  useEffect(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      setCategoryTitles(["Uncategorized"]); // Fallback to default category
    } else {
      setCategoryTitles(categories); // Store valid categories
    }
  }, [categories]);

  // Limit the displayed categories to 2
  const displayedCategories = categoryTitles.slice(0, 2); 

  return (
    <BlogItemStyleWrapper className="single_blog_item">
      {/* Thumbnail Section */}
      <div className="blog_thumb">
        <Link href={`/post/${slug}`}>
          <img
            src={thumbnail_url || "/default-thumbnail.png"}
            alt={title || "Blog thumbnail"}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="blog_content">
        <div className="blog_meta">
          {/* Render only the first 2 category titles */}
          {displayedCategories.map((title, i) => (
            <span key={i} className="category_title">
              {title}
              {i < displayedCategories.length - 1 && ", "}
            </span>
          ))}

          <span className="dot_separator"> • </span>

          {/* Timestamp */}
          <span className="time_stamp">
            {created_at ? new Date(created_at).toLocaleDateString() : "Unknown date"}
          </span>
        </div>

        {/* Blog Title */}
        <Link href={`/post/${slug}`} className="blog_title">
          {title || "Untitled Post"}
        </Link>

        {/* Excerpt */}
        <p>{excerpt || "No excerpt available."}</p>

        {/* Footer Section */}
        <div className="blog_footer">
          <div className="read_more_btn">
            <Link href={`/post/${slug}`}>Read more</Link>
          </div>
          <div className="comment_icon">
            <Link href="#">
              <FaRegComments />
            </Link>{" "}
            0
          </div>
        </div>
      </div>
    </BlogItemStyleWrapper>
  );
};

export default BlogItem;
