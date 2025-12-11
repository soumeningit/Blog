import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, TrendingUp, User } from "lucide-react";
import SkeletonCard from "../SkeltonCard";
import { Link } from "react-router-dom";
import { formateDate } from "../../utils/DateFormatter";

function LatestpostSection({
  searchQuery,
  loading,
  latestPosts,
  containerVariants,
  itemVariants,
}) {
  return (
    <>
      {!searchQuery && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TrendingUp className="text-primary-600 mr-2" size={24} />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Latest Posts
            </h2>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {latestPosts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  className="card group"
                >
                  <Link to={`/post/details/${post._id}`}>
                    <div className="aspect-video overflow-hidden rounded-xl mb-4">
                      <img
                        src={
                          post.thumbnail ||
                          "https://via.placeholder.com/400x225"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User size={14} className="mr-1" />
                          {post.author?.name || post.author || "Unknown"}
                        </div>
                        <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full">
                          {post.categories?.[0]?.name || "Uncategorized"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="inline-flex items-center btn-primary"
            >
              View All Posts
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default LatestpostSection;
