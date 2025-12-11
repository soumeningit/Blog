// src/components/admin/RecentActivity.jsx
import React from "react";
import { motion } from "framer-motion";

const activities = [
  {
    id: 1,
    type: "comment",
    message: 'New comment on "Getting Started with React 19"',
    time: "2 minutes ago",
    icon: "💬",
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "user",
    message: "New user registered: John Doe",
    time: "15 minutes ago",
    icon: "👤",
    color: "text-green-500",
  },
  {
    id: 3,
    type: "post",
    message: 'Post published: "The Future of AI in Web Development"',
    time: "1 hour ago",
    icon: "📝",
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "view",
    message: 'Post reached 1000 views: "Mastering Tailwind CSS"',
    time: "2 hours ago",
    icon: "👁️",
    color: "text-orange-500",
  },
  {
    id: 5,
    type: "like",
    message: 'Post received 50 likes: "Building Scalable Node.js Applications"',
    time: "3 hours ago",
    icon: "❤️",
    color: "text-red-500",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className={`text-xl ${activity.color}`}>{activity.icon}</span>
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-4 w-full text-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
