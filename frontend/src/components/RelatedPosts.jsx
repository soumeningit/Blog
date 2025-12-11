import React from "react";
import { motion } from "framer-motion";
import RelatedPost from "./RelatedPost";
import { ArrowRight } from "lucide-react";

function RelatedPosts({ relatedPosts }) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Related Posts
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Discover more articles you might like
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-medium">
          View All <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Posts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {relatedPosts.slice(0, 6).map((post, index) => (
          <RelatedPost key={post._id || index} post={post} index={index} />
        ))}
      </motion.div>

      {/* View More Button */}
      {relatedPosts.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            View More Posts
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default RelatedPosts;
