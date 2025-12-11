// src/pages/admin/Analytics.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Analytics = () => {
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Analytics
        </h2>
        <div className="flex gap-2">
          {["24h", "7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                period === p
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Page Views
          </h3>
          {loading ? (
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              📊 Chart placeholder - Page Views over {period}
            </div>
          )}
        </motion.div>

        {/* Visitors Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Unique Visitors
          </h3>
          {loading ? (
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              📈 Chart placeholder - Visitors over {period}
            </div>
          )}
        </motion.div>

        {/* Top Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Top Posts
          </h3>
          <div className="space-y-3">
            {[
              "Getting Started with React 19",
              "The Future of AI",
              "Mastering Tailwind CSS",
            ].map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {post}
                </span>
                <span className="text-sm text-gray-500">
                  {1000 - index * 100} views
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {[
              { source: "Direct", percentage: 45 },
              { source: "Social Media", percentage: 30 },
              { source: "Search", percentage: 20 },
              { source: "Referral", percentage: 5 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.source}
                  </span>
                  <span className="text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
