// src/pages/admin/Overview.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/admin/StatCard";
import RecentActivity from "../../components/admin/RecentActivity";
import { posts } from "../../data/posts";
import { comments } from "../../data/comments";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAdminProfileAPI } from "../../service/operations/AdminOpern";
import { formateDate } from "../../utils/DateFormatter";

function AdminOverview() {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const auth = useAuth();
  const authData = auth.getValue();
  const token = authData?.token;

  useEffect(() => {
    async function fetchAdminData() {
      try {
        setLoading(true);
        const response = await fetchAdminProfileAPI(token);
        console.log("Admin Profile Response:", response);
        setLoading(false);
        if (response.status === 200) {
          const data = response.data.data;
          console.log("Admin Profile Data:", data);
          console.log("data?.stats?.totalPosts:", data?.stats?.totalPosts);
          setStats(data.stats);
          setRecentPosts(data.recentPosts || []);
          setRecentActivities(data.recentActivities || []);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching admin profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, []);

  console.log("stats:", stats);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts}
          icon="📝"
          color="from-blue-500 to-cyan-500"
          change="+12%"
          changeType="positive"
          loading={loading}
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers.toLocaleString()}
          icon="👥"
          color="from-purple-500 to-pink-500"
          change="+23%"
          changeType="positive"
          loading={loading}
        />
        <StatCard
          title="Comments"
          value={stats?.totalComments.toLocaleString()}
          icon="💬"
          color="from-green-500 to-emerald-500"
          change="+8%"
          changeType="positive"
          loading={loading}
        />
        <StatCard
          title="Total Views"
          value={stats?.totalViews.toLocaleString()}
          icon="👁️"
          color="from-orange-500 to-amber-500"
          change="+15%"
          changeType="positive"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Recent Posts
          </h3>
          <div className="space-y-3">
            {recentPosts.map((post, index) => (
              <div
                key={post._id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {post?.author?.name} • {formateDate(post?.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full capitalize ${
                    post?.status === "published"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : post?.status === "draft"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      : post?.status === "archived"
                      ? "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {post?.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white"
      >
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all hover:scale-105">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-medium">Create New Post</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all hover:scale-105">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="font-medium">View Analytics</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all hover:scale-105">
            <span className="text-2xl mb-2 block">⚙️</span>
            <span className="font-medium">Site Settings</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminOverview;
