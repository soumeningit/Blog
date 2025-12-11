import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  FileText,
  Edit,
  PlusSquare,
  Users,
  Folder,
  MessageSquare,
  Settings,
  Home,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onClose, isMobile, isTablet, isDesktop }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: BarChart2,
      label: "Dashboard",
      description: isOpen ? "Overview & stats" : "",
    },
    {
      path: "/admin/analytics",
      icon: TrendingUp,
      label: "Analytics",
      description: isOpen ? "Traffic & metrics" : "",
    },
    {
      path: "/admin/posts",
      icon: Edit,
      label: "Posts",
      description: isOpen ? "Manage posts" : "",
    },
    {
      path: "/admin/create",
      icon: PlusSquare,
      label: "Create",
      description: isOpen ? "Write new post" : "",
    },
    {
      path: "/admin/users",
      icon: Users,
      label: "Users",
      description: isOpen ? "User management" : "",
    },
    {
      path: "/admin/categories",
      icon: Folder,
      label: "Categories",
      description: isOpen ? "Content categories" : "",
    },
    {
      path: "/admin/comments",
      icon: MessageSquare,
      label: "Comments",
      description: isOpen ? "Moderate comments" : "",
    },
    {
      path: "/admin/settings",
      icon: Settings,
      label: "Settings",
      description: isOpen ? "Site settings" : "",
    },
  ];

  // If on desktop and sidebar is closed, don't render sidebar contents
  if (isDesktop && !isOpen) {
    return null;
  }

  return (
    <div className=" flex flex-col rounded-md">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-2xl flex-shrink-0"
        >
          🛡️
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-bold gradient-text whitespace-nowrap">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                BlogSpace Control
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto sidebar-scrollbar">
        <motion.ul
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.path}
                onClick={() => (isMobile || isTablet) && onClose()}
                className={({ isActive }) => `
                  group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon - Always visible */}
                <span className="relative text-lg transition-transform group-hover:scale-110 flex-shrink-0">
                  {(() => {
                    const Icon = item.icon;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </span>

                {/* Text and Description - Animated */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex-1 min-w-0"
                    >
                      <span className="font-medium block truncate">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs opacity-75 block truncate">
                          {item.description}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isOpen && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                  />
                )}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
      >
        <NavLink
          to="/"
          onClick={() => (isMobile || isTablet) && onClose()}
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-105"
        >
          <span className="text-lg group-hover:scale-110 transition-transform flex-shrink-0">
            🏠
          </span>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative flex-1"
              >
                <span className="font-medium block">Back to Site</span>
                <span className="text-xs opacity-75 block">View blog</span>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-2"
            >
              <div className="text-xs text-gray-500 text-center">
                © 2024 BlogSpace Admin
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdminSidebar;
