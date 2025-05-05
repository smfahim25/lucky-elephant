/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FiShare2 } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import BlogDetailsStyleWrapper from "./BlogDestails.style";
import Tag from "../tag/Tag";
import Sidebar from "../sidebar/Sidebar";

const BlogDetails = ({ post }) => {
  if (!post) return <div>Post not found</div>; // Handle missing post

  return (
    <BlogDetailsStyleWrapper>
      <div className="blog_post_details_wrapper">
        <div className="container">
          <div className="row">
            {/* Post Details Column */}
            <div className="col-lg-8 col-md-12">
              {/* Thumbnail */}
              <div className="post_thumbnail">
                <img
                  src={post.thumbnail_url || "/default-thumbnail.png"}
                  alt={post.title || "Blog Post Thumbnail"}
                />
              </div>

              {/* Blog Meta */}
              <div className="blog_post_meta">
                <Link href="#">
                  <img
                    src={post.author_avatar || "/default-avatar.png"}
                    alt={post.author || "Author Avatar"}
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                  <span>{post.author || "Unknown Author"}</span>
                </Link>
                <span>
                  <FaCalendarAlt />{" "}
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : "Unknown Date"}
                </span>
              </div>

              {/* Blog Title */}
              <h1 className="post_title">{post.title || "Untitled Post"}</h1>

              {/* Blog Content with Markdown Support */}
              <div className="blog_description">
                {post.content?.sections?.map((section, index) => (
                  <div key={index} className="blog_section">
                    <h2>{section.title}</h2>

                    {/* Render section content as Markdown */}
                    <ReactMarkdown>{section.content}</ReactMarkdown>

                    {section.image_url && (
                      <img
                        src={section.image_url}
                        alt={section.title}
                        style={{ width: "100%", marginTop: "10px" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Blog Tags */}
              <div className="post_tags_list">
                {post.tags?.length > 0 && <Tag tags={post.tags} />}
                <div className="share_butn">
                  <Link href="#">
                    <FiShare2 /> Share
                  </Link>
                </div>
              </div>

              {/* Related Posts */}
              <div className="related_posts_wrapper">
                {post.related_post_slug1 && (
                  <Link href={`/post/${post.related_post_slug1}`}>
                    <div className="related_post">
                      <span>PREVIOUS</span>
                      <p>{post.related_post_title1 || "Previous Post"}</p>
                    </div>
                  </Link>
                )}
                {post.related_post_slug2 && (
                  <Link href={`/post/${post.related_post_slug2}`}>
                    <div className="related_post">
                      <span>NEXT</span>
                      <p>{post.related_post_title2 || "Next Post"}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-12">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </BlogDetailsStyleWrapper>
  );
};

export default BlogDetails;
