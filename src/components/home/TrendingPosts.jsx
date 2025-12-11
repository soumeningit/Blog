import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Calendar, Clock, User } from "lucide-react";
import { formateDate } from "../../utils/DateFormatter";

function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching trending posts
    // In production, this would fetch from an API
    async function fetchTrendingPosts() {
      try {
        setLoading(true);
        // Placeholder - replace with actual API call
        setTimeout(() => {
          setTrendingPosts([]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
        setLoading(false);
      }
    }
    fetchTrendingPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Sample trending posts for demonstration
  const sampleTrendingPosts = [
    {
      _id: "1",
      title: "10 React Hooks Everyone Should Know",
      author: { name: "John Developer" },
      views: 15420,
      likes: 324,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      readingTime: 8,
    },
    {
      _id: "2",
      title: "Mastering CSS Grid Layout",
      author: { name: "Sarah Designer" },
      views: 12850,
      likes: 289,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      readingTime: 12,
    },
    {
      _id: "3",
      title: "Web Performance Optimization Tips",
      author: { name: "Mike Performance" },
      views: 11230,
      likes: 256,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readingTime: 15,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Trending Now
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Most viewed and loved posts this week
          </p>
        </motion.div>

        {/* Trending Posts List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {(trendingPosts.length > 0 ? trendingPosts : sampleTrendingPosts).map(
            (post, index) => (
              <motion.div
                key={post._id}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Link to={`/posts/${post._id}`}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    {/* Trending Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs font-bold">
                        <TrendingUp className="w-3 h-3" />#{index + 1} Trending
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formateDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm font-semibold">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                          <span>👁️</span>
                          <span>
                            {post.views?.toLocaleString() || "0"} views
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                          <span>❤️</span>
                          <span>{post.likes || "0"} likes</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:to-primary-600/5 transition-all duration-300 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default TrendingPosts;
