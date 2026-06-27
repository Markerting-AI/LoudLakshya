import { useState } from "react";
import BlogHero from "@/sections/BlogHero";
import FeaturedPost from "@/sections/FeaturedPost";
import BlogGrid from "@/sections/BlogGrid";
import NewsletterCTA from "@/sections/NewsletterCTA";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <BlogHero
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {activeCategory === "All" && !searchQuery && <FeaturedPost />}
      <BlogGrid category={activeCategory} searchQuery={searchQuery} />
      <NewsletterCTA />
    </>
  );
}
