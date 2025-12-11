import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Clock, PenTool, Search, User } from "lucide-react";
import { formateDate } from "../../utils/DateFormatter";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal";
import { useState } from "react";

function HeroSection({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  itemVariants,
}) {
  const authData = useAuth().getValue();
  const token = authData?.token;
  const [showModal, setShowModal] = useState(false);

  function handleWriteArticle() {
    if (!token) {
      setShowModal(true);
    } else {
      window.location.href = "dashboard/create-post";
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Login Required"
          description="Please log in to write an article."
          buttonText1={"Close"}
          buttonText2={"Login"}
          onButtonClick1={() => setShowModal(false)}
          onButtonClick2={() => (window.location.href = "/auth/login")}
        />
      )}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-purple-500 to-pink-500 opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to BlogSpace
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Discover insights, tutorials, and trends in modern world
            </p>

            {/* Two Button Explore & Write */}
            <div className="flex justify-center space-x-4 mb-8">
              <Link
                to="/categories"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  Explore Articles
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-purple-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>

              <button
                onClick={handleWriteArticle}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <PenTool size={20} className="mr-2" />
                  Write Article
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for posts, tags, or categories..."
                  className="w-full px-6 py-4 pr-14 rounded-2xl glass shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Search Results */}
            {searchQuery && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  Search Results for "{searchQuery}"
                </h2>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((post) => (
                      <motion.div
                        key={post._id}
                        variants={itemVariants}
                        className="card"
                      >
                        <Link to={`/posts/${post._id}`}>
                          <div className="aspect-video overflow-hidden rounded-xl mb-4">
                            <img
                              src={
                                post?.thumbnail ||
                                "https://via.placeholder.com/400x225"
                              }
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar size={14} className="mr-1" />
                              {formateDate(post?.createdAt)}
                              <span className="mx-2">•</span>
                              <Clock size={14} className="mr-1" />
                              {post.readingTime} min read
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                              {post.description}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <User size={14} className="mr-1" />
                                {post.author.name}
                              </div>
                              <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full">
                                {post?.categories[0]?.name || "Uncategorized"}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No posts found matching your search. Try different
                      keywords.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
