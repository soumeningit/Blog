// src/pages/admin/CommentsManagement.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { comments } from "../../data/comments";

const CommentsManagement = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock comments with more data
    const mockComments = [
      ...comments,
      ...comments.map((c) => ({ ...c, id: c.id + 10, status: "pending" })),
      ...comments.map((c) => ({ ...c, id: c.id + 20, status: "spam" })),
    ];

    const timer = setTimeout(() => {
      setCommentsList(mockComments);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredComments = commentsList.filter((comment) => {
    return filterStatus === "all" || comment.status === filterStatus;
  });

  const handleApprove = (commentId) => {
    setCommentsList(
      commentsList.map((comment) =>
        comment.id === commentId ? { ...comment, status: "approved" } : comment
      )
    );
  };

  const handleReject = (commentId) => {
    setCommentsList(
      commentsList.map((comment) =>
        comment.id === commentId ? { ...comment, status: "rejected" } : comment
      )
    );
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setCommentsList(
        commentsList.filter((comment) => comment.id !== commentId)
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "spam":
        return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Comments Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Moderate and manage user comments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Comments</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {commentsList.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {commentsList.filter((c) => c.status === "pending").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {
              commentsList.filter((c) => c.status === "approved" || !c.status)
                .length
            }
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Spam</p>
          <p className="text-2xl font-bold text-red-600">
            {commentsList.filter((c) => c.status === "spam").length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Comments</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="spam">Spam</option>
        </select>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  {comment.username[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    {comment.username}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()} • Post ID:{" "}
                    {comment.postId}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                  comment.status
                )}`}
              >
                {comment.status || "approved"}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {comment.content}
            </p>

            <div className="flex items-center gap-2">
              {(!comment.status || comment.status === "pending") && (
                <button
                  onClick={() => handleApprove(comment.id)}
                  className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  ✅ Approve
                </button>
              )}
              {comment.status === "pending" && (
                <button
                  onClick={() => handleReject(comment.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  ❌ Reject
                </button>
              )}
              <button
                onClick={() => handleDelete(comment.id)}
                className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredComments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No comments found</p>
        </div>
      )}
    </div>
  );
};

export default CommentsManagement;
