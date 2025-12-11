import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";
import { getAllCategoriesAPI } from "../../service/operations/GeneralOpern";

function CategoriesOverview() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await getAllCategoriesAPI();
        if (response?.status === 200) {
          setCategories(response.data.response || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const categoryColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-rose-500 to-pink-500",
    "from-teal-500 to-cyan-500",
    "from-amber-500 to-orange-500",
  ];

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto text-primary-600" />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Explore Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover content across various topics and interests
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.slice(0, 8).map((category, index) => (
            <motion.div
              key={category._id || index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <Link
                to={`/category/${category.name.toLowerCase()}/c_id/${
                  category._id
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-xl h-32 bg-gradient-to-br ${
                    categoryColors[index % categoryColors.length]
                  } shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                    <h3 className="text-xl font-bold text-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {category.postCount || 0} posts
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CategoriesOverview;
