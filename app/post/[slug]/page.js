"use client"; // Ensures this is a Client Component
import { useModal } from "@/src/utils/ModalContext";
import { useParams } from "next/navigation"; // For getting the dynamic post slug
import { useEffect, useState } from "react"; // To fetch post details
import Header from "@/src/section/header/pageMenu/header";
import PageHeader from "@/src/common/pageHeader/v1";
import BlogDetails from "@/src/section/blog/blogDetails/BlogDetails";
//import CTA from "@/src/section/cta/v1";
import Footer from "@/src/section/footer/v1";
import Popup from "@/src/section/popup";
import MetamaskModal from "@/src/common/modal/metamaskModal/MetamaskModal";
import WalletModal from "@/src/common/modal/walletModal/WalletModal";
import { fetchPostBySlug } from "@/app/api/blog/supabaseHelper"; // Import the helper function

export default function Post() {
  const { metamaskModal, walletModalvisibility, isPopup, popupHandle } = useModal();
  const { slug } = useParams(); // Get the post slug from the URL
  const [post, setPost] = useState(null); // State to store the blog post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the blog post data when the slug is available
  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const data = await fetchPostBySlug(slug); // Fetch post by slug
          setPost(data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching blog post:", err);
          setError(err.message);
          setLoading(false);
        }
      };
      fetchData(); // Call the function to load the post
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; // Display error if any
  if (!post) return <div>Post not found</div>; // Handle case when no post is found

  return (
    <>
      {isPopup && <Popup popupHandle={popupHandle} />}
      {metamaskModal && <MetamaskModal />}
      {walletModalvisibility && <WalletModal />}
      <Header />
      <PageHeader title={post.title} /> {/* Set the title in PageHeader */}
      {/* Pass the fetched blog post details to BlogDetails */}
      <BlogDetails post={post} />
      <Footer />
    </>
  );
}
