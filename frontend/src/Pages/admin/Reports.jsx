// src/pages/admin/Reports.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("");

  const reports = [
    {
      id: "content",
      name: "Content Performance",
      description: "Posts, pages, and media performance",
    },
    {
      id: "users",
      name: "User Activity",
      description: "User engagement and behavior",
    },
    {
      id: "seo",
      name: "SEO Report",
      description: "Search engine optimization metrics",
    },
    {
      id: "security",
      name: "Security Audit",
      description: "Security vulnerabilities and threats",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Reports
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate and view detailed reports about your blog performance
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedReport(report.id)}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {report.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {report.description}
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline">
              Generate Report →
            </button>
          </motion.div>
        ))}
      </div>

      {/* Selected Report Details */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {reports.find((r) => r.id === selectedReport)?.name}
            </h3>
            <button
              onClick={() => setSelectedReport("")}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            📊 Report preview for {selectedReport}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;
