import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchAdminUserDetailsAPI,
  fetchAdminUsersAPI,
} from "../../service/operations/AdminOpern";
import { useAuth } from "../../contexts/AuthContext";
import { formateDate } from "../../utils/DateFormatter";
import { Edit3Icon, EyeIcon, Trash2 } from "lucide-react";
import ShowUserDetails from "./components/ShowUserDetails";

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({});
  const [ShowDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  const auth = useAuth();
  const authData = auth.getValue();
  const token = authData?.token;

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetchAdminUsersAPI(token, page, limit);
        setLoading(false);
        if (response.status === 200) {
          setUsers(response.data.data.users);
          setPagination(response.data.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page, limit, token]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  async function handleShowDetails(userId) {
    setSelectedUserDetails({});
    setShowDetailsModal(true);
    try {
      setLoadingDetails(true);
      const response = await fetchAdminUserDetailsAPI(token, userId);
      setLoadingDetails(false);
      if (response.status === 200) {
        setSelectedUserDetails(response.data.data.user);
      }
    } catch (error) {
      setLoadingDetails(false);
      toast.error(
        error?.response?.data?.message || "Failed to fetch user details"
      );
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingDetails(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {ShowDetailsModal && (
        <ShowUserDetails
          isOpen={ShowDetailsModal}
          loadingDetails={loadingDetails}
          userDetails={selectedUserDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Users Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {pagination.totalUsers || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">Authors</p>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "author").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500">New This Month</p>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="author">Authors</option>
            <option value="editor">Editors</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 capitalize">
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {user.status || "Not set"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.postCount || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formateDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShowDetails(user._id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <EyeIcon className="text-sm" />
                      </button>
                      {/* <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400">
                        <Edit3Icon className="text-sm" />
                      </button> */}
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400">
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Results Info & Limit Selector */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalUsers
                  )}{" "}
                  of {pagination.totalUsers} users
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Per page:
                  </label>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1); // Reset to first page when changing limit
                    }}
                    className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </motion.button>

                <div className="flex items-center gap-1">
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    const isCurrentPage = pageNum === pagination.currentPage;
                    const showPage =
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      Math.abs(pageNum - pagination.currentPage) <= 1;

                    if (!showPage) {
                      if (
                        pageNum === pagination.currentPage - 2 ||
                        pageNum === pagination.currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNum}
                            className="px-2 text-gray-500 dark:text-gray-400"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          isCurrentPage
                            ? "bg-purple-600 text-white"
                            : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersManagement;
