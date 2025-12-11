// src/components/admin/StatCard.jsx
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
  color,
  change,
  changeType,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            changeType === "positive"
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
        {value}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{title}</p>

      {/* Progress Bar */}
      <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;
