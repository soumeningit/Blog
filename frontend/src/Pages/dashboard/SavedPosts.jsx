import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Grid,
  List,
  FolderOpen,
  ExternalLink,
  Share2,
  CheckSquare,
  Square,
  Eye,
  ChevronDown,
  Star,
  Timer,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/ToastProvider";
import {
  getSavedPostsAPI,
  searchSavedPostsAPI,
  toggleSavePostAPI,
} from "../../service/operations/ProfileOpern";
import { useNavigate } from "react-router-dom";
import ShareModal from "../../components/ShareModal";
import SavedSearchModal from "../../components/dashboard/SavedSearchModal";

function SavedPosts() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [sortBy, setSortBy] = useState("saved-desc");
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({});
  const [posts, setPosts] = useState([]);
  const [shareURL, setShareURL] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchLimit, setSearchLimit] = useState(5);
  const [searchPagination, setSearchPagination] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);

  const auth = useAuth();
  const authData = auth.getValue();
  const token = authData?.token;

  const toast = useToast();

  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);

  // Debounce utility function
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Create debounced save toggle with useRef to persist across renders
  const debouncedToggleSaveRef = useRef(null);

  // Initialize debounced function on mount
  useEffect(() => {
    const originalHandleToogleSave = async (postId) => {
      try {
        const response = await toggleSavePostAPI(token, postId);
        if (response.status === 200) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
          );
          toast.success("Post removed from saved posts");
        }
      } catch (error) {
        console.error("Error toggling save post:", error);
        toast.error("Failed to toggle save post. Please try again.");
      }
    };

    debouncedToggleSaveRef.current = debounce(originalHandleToogleSave, 500);
  }, [token, debounce]);

  const handleToogleSaveDebounced = (postId) => {
    if (debouncedToggleSaveRef.current) {
      debouncedToggleSaveRef.current(postId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    async function fetchSavedPosts() {
      try {
        setLoading(true);
        const response = await getSavedPostsAPI(token, page, limit);
        setLoading(false);
        if (response.status === 200) {
          setPosts(response?.data?.data?.posts || []);
          setPagination(response?.data?.data?.pagination || {});
          setCollections(response?.data?.data?.collections || []);
          setFilteredPosts(response?.data?.data?.posts || []);
        }
      } catch (error) {
        console.log("Error fetching saved posts:", error);
        setLoading(false);
        toast.error("Failed to fetch saved posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSavedPosts();
  }, [token, page, limit]);

  const togglePostSelection = (postId) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  function handleNavigation(postId) {
    navigate(`/post/details/${postId}`);
  }

  async function handleShare(postId) {
    setSearchModalOpen(false);
    const post = posts?.find((p) => p?._id === postId);
    setShareURL(`${window.location.origin}/post/details/${postId}`);
    setShareTitle(post?.title || "Saved Post");
    setShareModalOpen(true);
  }

  // Debounced search handler
  const debouncedSearchRef = useRef(null);

  useEffect(() => {
    const performSearch = async (query) => {
      if (!query.trim()) {
        setSearchResponse([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const response = await searchSavedPostsAPI(
          token,
          query,
          searchPage,
          searchLimit
        );
        if (response.status === 200) {
          setSearchResponse(response?.data?.data?.posts || []);
          setSearchPagination(response?.data?.data?.pagination || {});
        }
      } catch (error) {
        console.error("Error searching posts:", error);
        toast.error("Failed to search posts. Please try again.");
      } finally {
        setIsSearching(false);
      }
    };

    debouncedSearchRef.current = debounce(performSearch, 500);
  }, [token, searchPage, searchLimit, debounce, toast]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(value);
    }
  };

  const handleSearchFocus = () => {
    setSearchModalOpen(true);
  };

  function handleCollectionSelect(collectionId) {
    setSelectedCollection(collectionId);
    if (collectionId === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        // Check if post's categories match the selected collection by id or slug
        return post.categories?.some(
          (cat) => cat._id === collectionId || cat.slug === collectionId
        );
      });
      setFilteredPosts(filtered);
    }
  }

  const getReadingProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress > 0) return "bg-yellow-500";
    return "bg-gray-300";
  };

  const getCollectionColor = (color) => {
    // Handle gradient colors from API (e.g., "from-indigo-500 to-purple-500")
    if (color && color.includes("from-")) {
      return `bg-gradient-to-r ${color} text-white dark:text-white`;
    }

    // Fallback to color name mapping
    const colors = {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      green:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      purple:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      yellow:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      pink: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
      indigo:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      orange:
        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      teal: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
      gray: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    };
    return colors[color] || colors.gray;
  };

  if (loading) {
    return (
      // Skelton
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Saved Posts
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your personal reading list and bookmarked articles
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedPosts.size > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
              >
                <CheckSquare className="h-4 w-4" />
                {selectedPosts.size} selected
              </motion.div>
            )}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collections */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Collections
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCollection("all")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCollection === "all"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              All Posts ({posts?.length || 0})
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => handleCollectionSelect(collection.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCollection === collection.id
                    ? getCollectionColor(collection.color)
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {collection.name} ({collection.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="saved-desc">Recently Saved</option>
              <option value="saved-asc">Oldest Saved</option>
              <option value="published-desc">Recently Published</option>
              <option value="published-asc">Oldest Published</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="progress-desc">
                Reading Progress (High to Low)
              </option>
              <option value="progress-asc">
                Reading Progress (Low to High)
              </option>
            </select>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedPosts.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {selectedPosts.size} post{selectedPosts.size > 1 ? "s" : ""}{" "}
                  selected
                </span>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Add to Collection
                  </button>
                  <span className="text-blue-300 dark:text-blue-600">•</span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Mark as Read
                  </button>
                  <span className="text-blue-300 dark:text-blue-600">•</span>
                  <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    Remove
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedPosts(new Set())}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts Grid/List */}
        <motion.div variants={itemVariants} className="space-y-4">
          {filteredPosts?.length === 0 ? (
            <div className="card text-center py-12">
              <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No saved posts found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(filteredPosts) &&
                    filteredPosts?.map((post) => (
                      <motion.div
                        key={post._id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className={`card overflow-hidden ${
                          selectedPosts.has(post._id)
                            ? "ring-2 ring-primary-500"
                            : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <div className="absolute top-3 left-3 z-10">
                          <button
                            onClick={() => togglePostSelection(post._id)}
                            className="p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                          >
                            {selectedPosts.has(post._id) ? (
                              <CheckSquare className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                            ) : (
                              <Square className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>

                        {/* Cover Image */}
                        <div className="relative h-48">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          {post?.featured && (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center gap-2 text-white text-xs">
                              <Timer className="h-3 w-3" />
                              {post?.readingTime} min read
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {post?.collections
                              ?.slice(0, 2)
                              .map((collectionId) => {
                                const collection = collections.find(
                                  (c) => c.id === collectionId
                                );
                                return collection ? (
                                  <span
                                    key={collectionId}
                                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCollectionColor(
                                      collection.color
                                    )}`}
                                  >
                                    {collection.name}
                                  </span>
                                ) : null;
                              })}
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {post.description}
                          </p>

                          {/* Reading Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>Reading Progress</span>
                              <span>{post?.readingProgres || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-300 ${getReadingProgressColor(
                                  post?.readingProgress || 0
                                )}`}
                                style={{
                                  width: `${post?.readingProgress || 0}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Author and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  post.author.profilePic ||
                                  `https://ui-avatars.com/api/?name=${post.author.name}&background=random&size=40`
                                }
                                alt={post.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {post.author.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleNavigation(post?._id)}
                                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleShare(post?._id)}
                                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleToogleSaveDebounced(post?._id)
                                }
                                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              >
                                <BookmarkCheck className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts?.map((post) => (
                    <motion.div
                      key={post._id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className={`card p-0 ${
                        selectedPosts.has(post._id)
                          ? "ring-2 ring-primary-500"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Checkbox */}
                        <div className="flex items-center justify-center p-4">
                          <button
                            onClick={() => togglePostSelection(post._id)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            {selectedPosts.has(post._id) ? (
                              <CheckSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                            ) : (
                              <Square className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>

                        {/* Cover Image */}
                        <div className="sm:w-48 h-32 sm:h-auto">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {post?.featured && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full">
                                    <Star className="h-3 w-3" />
                                    Featured
                                  </span>
                                )}
                                {post?.collections
                                  ?.slice(0, 2)
                                  .map((collectionId) => {
                                    const collection = collections.find(
                                      (c) => c.id === collectionId
                                    );
                                    return collection ? (
                                      <span
                                        key={collectionId}
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCollectionColor(
                                          collection.color
                                        )}`}
                                      >
                                        {collection.name}
                                      </span>
                                    ) : null;
                                  })}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {post?.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                <span>By {post.author.name}</span>
                                <span>•</span>
                                <span>{post.readTime} min read</span>
                                <span>•</span>
                                <span>
                                  Saved{" "}
                                  {new Date(post?.savedAt).toLocaleDateString()}
                                </span>
                              </div>

                              {/* Reading Progress */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <span>Reading Progress</span>
                                  <span>{post?.readingProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full transition-all duration-300 ${getReadingProgressColor(
                                      post?.readingProgress
                                    )}`}
                                    style={{
                                      width: `${post?.readingProgress}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {Array.isArray(post?.tags) &&
                                  post?.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleNavigation(post?._id)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleShare(post?._id)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleToogleSaveDebounced(post?._id)
                                }
                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              >
                                <BookmarkCheck className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination?.totalPages > 1 && (
                <motion.div variants={itemVariants} className="card">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Results Info & Limit Selector */}
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing{" "}
                        <span className="font-medium">
                          {(pagination.currentPage - 1) * pagination.limit + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            pagination.currentPage * pagination.limit,
                            pagination.totalPosts
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {pagination.totalPosts || 0}
                        </span>{" "}
                        saved posts
                      </p>

                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Per page:
                        </label>
                        <select
                          value={limit}
                          onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                          }}
                          className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={!pagination.hasPrevPage}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </motion.button>

                      <div className="flex items-center gap-1">
                        {[...Array(pagination.totalPages)].map((_, index) => {
                          const pageNum = index + 1;
                          const isCurrentPage =
                            pageNum === pagination.currentPage;
                          const showPage =
                            pageNum === 1 ||
                            pageNum === pagination.totalPages ||
                            Math.abs(pageNum - pagination.currentPage) <= 1;

                          if (!showPage) {
                            if (
                              pageNum === pagination.currentPage - 2 ||
                              pageNum === pagination.currentPage + 2
                            ) {
                              return (
                                <span
                                  key={pageNum}
                                  className="px-2 text-gray-500 dark:text-gray-400"
                                >
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <motion.button
                              key={pageNum}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setPage(pageNum)}
                              className={`w-10 h-10 rounded-lg transition-colors ${
                                isCurrentPage
                                  ? "bg-primary-600 text-white"
                                  : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                              }`}
                            >
                              {pageNum}
                            </motion.button>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!pagination.hasNextPage}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          shareURL={shareURL}
          title={shareTitle}
          onClose={() => setShareModalOpen(false)}
        />
      )}
      {searchModalOpen && (
        <SavedSearchModal
          isOpen={searchModalOpen}
          onClose={() => {
            setSearchModalOpen(false);
            setSearchTerm("");
            setSearchResponse([]);
          }}
          isSearching={isSearching}
          searchTerm={searchTerm}
          searchResults={searchResponse}
          onSearchChange={handleSearchChange}
          onPostClick={handleNavigation}
          onShare={handleShare}
          onToggleSave={handleToogleSaveDebounced}
          pagination={searchPagination}
        />
      )}
    </>
  );
}

export default SavedPosts;
