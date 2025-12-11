import { motion } from "framer-motion";

const CategoryCard = ({ category, selected }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all ${
        selected ? "ring-4 ring-purple-500 shadow-2xl" : "hover:shadow-xl"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}
      ></div>
      <div className="relative z-10 text-white">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm opacity-90 mb-3">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">
            {category.postCount} posts
          </span>
          {selected && <span className="text-sm">✓ Selected</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
