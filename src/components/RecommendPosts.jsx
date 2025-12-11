import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const RecommendedPosts = ({ posts }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Recommended Posts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="card group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/posts/${post.id}`}>
              <div className="aspect-video overflow-hidden rounded-xl mb-4">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {post.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200 text-sm font-medium">
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
