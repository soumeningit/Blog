// src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PostCard = ({ post, featured = false, horizontal = false }) => {
  if (horizontal) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl p-6 hover:shadow-2xl transition-all"
      >
        <Link to={`/posts/${post.id}`} className="flex gap-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-48 h-32 object-cover rounded-xl"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h3 className="text-xl font-bold mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {post.author} • {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
    >
      <Link to={`/posts/${post.id}`}>
        <div className="relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full">
              Featured
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-3">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {post.author} • {new Date(post.date).toLocaleDateString()}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
