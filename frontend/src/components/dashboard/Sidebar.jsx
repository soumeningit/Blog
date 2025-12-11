import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Settings,
  X,
  Edit,
  User,
  Heart,
  Home,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Profile", href: "/dashboard/my-profile", icon: User },
  { name: "Posts", href: "/dashboard/posts", icon: FileText },
  { name: "Create Post", href: "/dashboard/create-post", icon: Edit },
  { name: "Saved Posts", href: "/dashboard/saved-posts", icon: Heart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function Sidebar({ isMobile, onClose, isOpen = true }) {
  const auth = useAuth();
  const authData = auth.getValue();
  const location = useLocation();
  const profile = useProfile();
  const profileData = profile.profileData;
  const logout = auth.LogOut;

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -300,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      variants={isMobile ? sidebarVariants : {}}
      initial={isMobile ? (isOpen ? "open" : "closed") : "open"}
      animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
      className="w-64 bg-white dark:bg-gray-800 shadow-neumorphic dark:shadow-neumorphic-dark h-full flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {authData?.user?.name || "Dashboard"}
        </h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto sidebar-scrollbar">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <motion.div
                className="mr-3 flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive
                      ? "text-primary-500 dark:text-primary-400"
                      : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-0 w-1 h-8 bg-primary-500 rounded-l-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-9 w-9 rounded-full"
                  src={
                    profileData?.profile?.profilePic ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      authData?.user?.name || "U"
                    )}&background=random&size=64`
                  }
                  alt="User Avatar"
                />
              </div>
              <div className="ml-3 leading-tight">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {authData?.user?.name || "User"}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate max-w-[130px]">
                  {authData?.user?.email || null}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
