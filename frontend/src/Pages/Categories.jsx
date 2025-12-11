import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  Search,
  Calendar,
  Clock,
  User,
  ChevronDown,
  Folder,
  FolderOpen,
  Tag,
  BookOpen,
} from "lucide-react";
import SkeletonCard from "../components/SkeltonCard";
import {
  getAllCategoriesAPI,
  getBlogPostsAPI,
} from "../service/operations/GeneralOpern";
import { formateDate } from "../utils/DateFormatter";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const response = await getAllCategoriesAPI();
        if (response.status === 200) {
          setCategoriesData(response?.data?.response || []);
        }
      } catch (error) {
        setLoading(false);
        setCategoriesData([]);
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await getBlogPostsAPI();
        setLoading(false);
        if (response.status === 200) {
          setPosts(response?.data?.data || []);
        }
      } catch (error) {
        setLoading(false);
        setPosts([]);
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
    fetchPosts();
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(null);
    setDropdownOpen(false);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setDropdownOpen(false);
    // In a real app, you would fetch posts for this specific subcategory
    // For now, we'll use the parent category posts
    // setSelectedCategory(
    //   enhancedCategories.find(
    //     (cat) => cat.subcategories.some((sub) => sub.name === subcategory)?.name
    //   )
    // );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the filtering effect
  };

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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Explore Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover content organized by topics and subtopics that interest you
            most
          </p>
        </motion.div>

        {/* Category Dropdown */}
        <motion.div
          className="mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Dropdown for categories */}
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full md:w-auto px-6 py-3 glass rounded-xl flex items-center justify-between hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors duration-200 min-w-[250px]"
              >
                <div className="flex items-center">
                  {selectedCategory ? (
                    <>
                      <FolderOpen className="text-primary-600 mr-2" size={20} />
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {selectedCategory}
                        {selectedSubcategory && (
                          <span className="text-primary-600">
                            {" "}
                            / {selectedSubcategory}
                          </span>
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="text-primary-600 mr-2" size={20} />
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        All Categories
                      </span>
                    </>
                  )}
                </div>
                <ChevronDown
                  className={`text-gray-500 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-full glass rounded-xl shadow-xl z-50 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2 max-h-[400px] overflow-y-auto">
                      {/* All Categories Option */}
                      <button
                        onClick={() => handleCategorySelect(null)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                          !selectedCategory
                            ? "bg-primary-100 dark:bg-primary-900"
                            : ""
                        }`}
                      >
                        <BookOpen className="mr-3 text-primary-600" size={18} />
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            All Categories
                          </div>
                        </div>
                      </button>

                      {/* Categories with Subcategories */}
                      {categoriesData.map((category) => (
                        <div key={category._id} className="mb-2">
                          <button
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                              selectedCategory === category.name
                                ? "bg-primary-100 dark:bg-primary-900"
                                : ""
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${category.color} mr-3 flex-shrink-0`}
                            ></div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {category.description}
                              </div>
                            </div>
                          </button>

                          {/* Subcategories */}
                          <div className="ml-7 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                            {category.subCategories.map((subcategory) => (
                              <button
                                key={subcategory._id}
                                onClick={() =>
                                  handleSubcategorySelect(subcategory.name)
                                }
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors duration-200 ${
                                  selectedSubcategory === subcategory.name
                                    ? "bg-primary-50 dark:bg-primary-900/50"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center">
                                  <Tag
                                    className="mr-2 text-gray-400"
                                    size={14}
                                  />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {subcategory.name}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {subcategory?.count}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex-1 md:flex-initial">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full md:w-80 px-4 py-2 pl-10 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </form>

              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(selectedCategory || selectedSubcategory) && (
          <motion.div
            className="mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Filter className="text-primary-600 mr-2" size={18} />
                <span className="text-gray-800 dark:text-gray-200">
                  {selectedCategory && (
                    <>
                      <span className="font-medium">{selectedCategory}</span>
                      {selectedSubcategory && (
                        <>
                          <span className="mx-2 text-gray-500">/</span>
                          <span className="text-primary-600">
                            {selectedSubcategory}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Clear Filter
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts Display */}
        {loading ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {posts.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {posts.map((post) => (
                  <motion.div
                    key={post._id}
                    variants={itemVariants}
                    className={`card group ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    <Link to={`/post/details/${post._id}`}>
                      <div
                        className={`aspect-video overflow-hidden rounded-xl mb-4 ${
                          viewMode === "list" ? "md:w-1/3 md:mb-0 md:mr-6" : ""
                        }`}
                      >
                        <img
                          src={post?.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`space-y-2 ${
                          viewMode === "list" ? "flex-1" : ""
                        }`}
                      >
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={14} className="mr-1" />
                          {formateDate(post?.createdAt)}
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          {post?.readingTime} min read
                        </div>
                        <h3
                          className={`font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ${
                            viewMode === "list" ? "text-xl" : "text-lg"
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post?.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <User size={14} className="mr-1" />
                            {post?.author?.name}
                          </div>
                          <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full">
                            {post?.categoryNames[0]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Filter
                  size={48}
                  className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Categories;
