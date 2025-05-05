"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryWrapper from "./Category.style";
import SectionTitle from "@/src/common/sectionTitle";
import { fetchCategories, fetchAllPosts } from "@/app/api/blog/supabaseHelper"; // Import necessary functions

const Category = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [postCounts, setPostCounts] = useState({}); // Store category counts

  useEffect(() => {
    const loadCategoriesAndCounts = async () => {
      try {
        const fetchedCategories = await fetchCategories(); // Fetch categories from Supabase
        const posts = await fetchAllPosts(); // Fetch all posts

        // Calculate the post counts for each category
        const counts = {};
        posts.forEach((post) => {
          post.categories.forEach((cat) => {
            counts[cat] = (counts[cat] || 0) + 1; // Increment the count for each category
          });
        });

        setCategories(fetchedCategories); // Set categories in state
        setPostCounts(counts); // Set post counts in state
      } catch (error) {
        console.error("Error loading categories or posts:", error);
      }
    };

    loadCategoriesAndCounts(); // Call the function on mount
  }, []);

  return (
    <CategoryWrapper>
      <SectionTitle subtitle="Categories" className="widget_title" />

      <div className="category_list">
        {categories.map((category, i) => (
          <Link key={i} href={`/category/${category.id}`}>
            {category.title}
            <span>{`(${postCounts[category.title] || 0})`}</span> {/* Display the correct count */}
          </Link>
        ))}
      </div>
    </CategoryWrapper>
  );
};

export default Category;
