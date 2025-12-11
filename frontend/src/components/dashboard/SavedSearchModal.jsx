import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Loader2,
  BookmarkCheck,
  Clock,
  ExternalLink,
  Eye,
  Share2,
  Calendar,
} from "lucide-react";

function SavedSearchModal({
  isOpen,
  onClose,
  isSearching,
  searchTerm,
  searchResults = [],
  onSearchChange,
  onPostClick,
  onShare,
  onToggleSave,
  pagination = {},
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Search Saved Posts
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? `Results for "${searchTerm}"`
                    : "Start typing to search"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, tags..."
                value={searchTerm}
                onChange={onSearchChange}
                autoFocus
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isSearching ? (
              // Loading Skeleton
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {searchTerm ? "No results found" : "Start searching"}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  {searchTerm
                    ? "Try adjusting your search terms or filters"
                    : "Type something in the search box to find your saved posts"}
                </p>
              </div>
            ) : (
              // Search Results
              <div className="space-y-3">
                {searchResults.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md dark:hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={
                            post.thumbnail ||
                            "https://via.placeholder.com/128x96?text=No+Image"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime || 5} min read
                          </span>
                          {post.author?.name && (
                            <span className="flex items-center gap-1">
                              <span>By {post.author.name}</span>
                            </span>
                          )}
                          {post.createdAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => onPostClick?.(post._id)}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="View Post"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onShare?.(post._id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="Share"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onToggleSave?.(post._id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Remove from saved"
                        >
                          <BookmarkCheck className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Pagination Info */}
          {searchResults.length > 0 && !isSearching && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {searchResults.length} of {pagination.totalPosts || 0}{" "}
                  results
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SavedSearchModal;
