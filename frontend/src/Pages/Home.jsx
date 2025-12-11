import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import ChatBot from "../components/home/ChatBot";
import {
  getHomePageDataAPI,
  searchPostsAPI,
} from "../service/operations/GeneralOpern";
import HeroSection from "../components/home/HeroSection";
import FeaturedSection from "../components/home/FeaturedSection";
import LatestpostSection from "../components/home/LatestpostSection";
import CategoriesOverview from "../components/home/CategoriesOverview";
import TrendingPosts from "../components/home/TrendingPosts";
import FeaturesHighlights from "../components/home/FeaturesHighlights";
import StatisticsSection from "../components/home/StatisticsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import { useDarkMode } from "../contexts/DarkModeContext";

function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getHomePageDataAPI();
        setLoading(false);
        if (response.status === 200) {
          const payload = response?.data?.data || {};
          setFeaturedPosts(payload.featuredPosts || payload.featured || []);
          setLatestPosts(
            payload.latestPosts || payload.recentPosts || payload.recent || []
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const results = await searchPostsAPI(searchQuery);
        setLoading(false);
        if (results.status === 200) {
          setSearchResults(results.data.data);
        }
      } catch (error) {
        setLoading(false);
        setSearchResults([]);
        console.error("Error searching posts:", error);
      }
    }
  };

  // Debounced live search: trigger searchPostsAPI when `searchQuery` changes, after a short delay.
  useEffect(() => {
    const delay = 300; // ms
    const query = (searchQuery || "").trim();
    if (!query) {
      // clear previous results when query is empty
      setSearchResults([]);
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const results = await searchPostsAPI(query);
        if (cancelled) return;
        if (results?.status === 200) {
          setSearchResults(results.data.data || []);
          setLoading(false);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        if (!cancelled) setSearchResults([]);
        console.error("Debounced search error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleSearch={handleSearch}
        itemVariants={itemVariants}
      />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Featured Posts */}
      <FeaturedSection
        searchQuery={searchQuery}
        loading={loading}
        featuredPosts={featuredPosts}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      {/* Trending Posts */}
      {/* <TrendingPosts /> */}

      {/* Latest Posts */}
      <LatestpostSection
        searchQuery={searchQuery}
        loading={loading}
        latestPosts={latestPosts}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      {/* Categories Overview */}
      <CategoriesOverview />

      {/* Features Highlights */}
      <FeaturesHighlights />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}

export default Home;
