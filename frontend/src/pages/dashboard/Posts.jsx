import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Copy,
  Calendar,
  ChevronDown,
  MoreVertical,
  CheckSquare,
  Square,
  Clock,
  Send,
  FileText,
  TrendingUp,
  Heart,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getPostsByAuthorAPI } from "../../service/operations/ContentOpern";
import { getAllCategoriesAPI } from "../../service/operations/GeneralOpern";
import { useToast } from "../../components/ToastProvider";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const authData = useAuth().getValue();
  const token = authData?.token || null;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["all"]);

  const toast = useToast();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategoriesAPI();
        if (response && response.status === 200) {
          setCategories([...response?.data?.response, "all"]);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch categories."
        );
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const fetchPosts = useCallback(
    async (page = 1, limit = pagination.limit) => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPostsByAuthorAPI(token, page, limit);
        if (response && response.status === 200) {
          const data = response.data;
          const fetchedPosts = data.posts || data.data?.posts || [];
          const pg = data.pagination || data.data?.pagination || {};
          setPosts(fetchedPosts);
          setPagination((prev) => ({
            ...prev,
            page: pg.page || page,
            limit: pg.limit || limit,
            total: pg.total || fetchedPosts.length,
            totalPages: pg.totalPages || 1,
          }));
        } else {
          setError("Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    },
    [token, pagination.limit]
  );

  useEffect(() => {
    fetchPosts(pagination.page, pagination.limit);
  }, [fetchPosts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const title = (post.title || "").toString();
      const excerpt = (post.excerpt || post.description || "").toString();
      const authorName =
        typeof post.author === "string" ? post.author : post.author?.name || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        authorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || post.status === selectedStatus;
      const postCategory = post.category || post.categories?.[0]?.name || "";
      const matchesCategory =
        selectedCategory === "all" || postCategory === selectedCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case "date-asc":
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "views-desc":
          return b.views - a.views;
        case "views-asc":
          return a.views - b.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchTerm, selectedStatus, selectedCategory, sortBy]);

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

  const togglePostSelection = (postId) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  const toggleAllPosts = () => {
    if (selectedPosts.size === filteredAndSortedPosts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(
        new Set(filteredAndSortedPosts.map((post) => post._id || post.id))
      );
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <Send className="h-4 w-4" />;
      case "draft":
        return <FileText className="h-4 w-4" />;
      case "scheduled":
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "";
    }
  };

  return (
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
            Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize your blog posts
          </p>
        </div>
        <div className="flex items-center gap-3">
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard/create-post")}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Post
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="views-desc">Most Viewed</option>
            <option value="views-asc">Least Viewed</option>
          </select>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden pt-4 border-t border-gray-200 dark:border-gray-700 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "published", "draft", "scheduled"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedStatus === status
                              ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(
                      (category) => (
                        console.log("Category:", category),
                        (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              selectedCategory === category
                                ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {typeof category === "string"
                              ? category.charAt(0).toUpperCase() +
                                category.slice(1)
                              : category.name.charAt(0).toUpperCase() +
                                category.name.slice(1)}
                          </button>
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Posts List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        ) : (
          <>
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
                      {selectedPosts.size} post
                      {selectedPosts.size > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Edit
                      </button>
                      <span className="text-blue-300 dark:text-blue-600">
                        •
                      </span>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Delete
                      </button>
                      <span className="text-blue-300 dark:text-blue-600">
                        •
                      </span>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Change Status
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

            {/* Post Cards */}
            <div className="space-y-4">
              {filteredAndSortedPosts.map((post) => (
                <motion.div
                  key={post._id || post.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className={`card p-0 overflow-hidden ${
                    selectedPosts.has(post._id || post.id)
                      ? "ring-2 ring-primary-500"
                      : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Checkbox */}
                    <div className="flex items-center justify-center p-4">
                      <button
                        onClick={() => togglePostSelection(post._id || post.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        {selectedPosts.has(post._id || post.id) ? (
                          <CheckSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Cover Image */}
                    <div className="sm:w-64 h-32 sm:h-auto">
                      <img
                        src={
                          post.thumbnail ||
                          post.coverImage ||
                          post.heroSectionImage ||
                          `https://picsum.photos/seed/${
                            post._id || post.id
                          }/400/250`
                        }
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {post.featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                                <TrendingUp className="h-3 w-3" />
                                Featured
                              </span>
                            )}
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                post.status
                              )}`}
                            >
                              {getStatusIcon(post.status)}
                              {post.status.charAt(0).toUpperCase() +
                                post.status.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {post.excerpt ||
                              post.description ||
                              "No description available."}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>
                              By{" "}
                              {post.author?.name ||
                                post.author ||
                                (post.authorId ? "Author" : "Unknown")}
                            </span>
                            <span>•</span>
                            <span>
                              {post.categories && post.categories[0]?.name
                                ? post.categories[0].name
                                : post.category || "Uncategorized"}
                            </span>
                            <span>•</span>
                            <span>
                              Updated{" "}
                              {post.updatedAt
                                ? new Date(post.updatedAt).toLocaleDateString()
                                : post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : "-"}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              navigate(`/dashboard/show-details/${post?._id}`);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/dashboard/edit-post/${post._id}`);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Eye className="h-4 w-4" />
                          {(post.views || 0).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Heart className="h-4 w-4" />
                          {(
                            (post.likes && post.likes.length) ||
                            post.likesCount ||
                            0
                          ).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <MessageSquare className="h-4 w-4" />
                          {post.commentsCount ||
                            (post.comments && post.comments.length) ||
                            0}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">
                  {Math.min(
                    (pagination.page - 1) * pagination.limit + 1,
                    pagination.total || 0
                  )}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total || 0
                  )}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (pagination.page > 1) {
                      fetchPosts(pagination.page - 1, pagination.limit);
                    }
                  }}
                  disabled={pagination.page <= 1}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (pagination.page < pagination.totalPages) {
                      fetchPosts(pagination.page + 1, pagination.limit);
                    }
                  }}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Posts;
