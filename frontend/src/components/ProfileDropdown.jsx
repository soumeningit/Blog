import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, User, LogOut, Book } from "lucide-react";

function ProfileDropdown({ user, isOpen, onLogout, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 top-12 w-56 glass rounded-xl p-2 shadow-2xl z-50"
    >
      {/* User Section */}
      <div className="px-4 py-3 border-b border-gray-200/30 dark:border-gray-700/40">
        <div className="font-medium text-sm">{user?.name || "User"}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {user?.email || ""}
        </div>
      </div>

      {/* Menu */}
      <div className="py-2">
        <Link
          to="/dashboard/my-profile"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LayoutDashboard size={16} /> Dashboard
        </Link>

        <Link
          to="/dashboard/posts"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Book size={16} /> Posts
        </Link>

        <div className="border-t border-gray-200/30 dark:border-gray-700/40 my-2"></div>

        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-500"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </motion.div>
  );
}

export default ProfileDropdown;
