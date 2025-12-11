import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { formateDate } from "../utils/DateFormatter";

function RelatedPost({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link
        to={`/post/details/${post._id || post.id}`}
        className="block h-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-48">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Category Badge */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  {post.categories[0]?.name || "Article"}
                </span>
              </div>
            )}
            {/* Arrow Icon */}
            <div className="absolute bottom-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <ArrowUpRight className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Title */}
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {post.title}
            </h3>

            {/* Description/Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
              {post.description ||
                post.excerpt ||
                "Interesting article to read"}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formateDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="px-2.5 py-1 text-purple-600 dark:text-purple-400 text-xs font-medium">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default RelatedPost;
