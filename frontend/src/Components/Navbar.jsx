import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";
import { Cpu, Edit, Grid, Home, Info, Mail } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.png";
import logo_svg from "../assets/logo.svg";
import { useProfile } from "../contexts/ProfileContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const auth = useAuth();
  const logout = auth.LogOut;
  const location = useLocation();
  const navigate = useNavigate();
  const authData = auth.getValue();
  const token = authData?.token;
  const userData = authData?.user;
  const profile = useProfile();
  const profileData = profile?.profileData;

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home size={18} className="text-gray-600 dark:text-gray-300" />,
    },
    {
      label: "Categories",
      path: "/categories",
      icon: <Grid size={18} className="text-gray-600 dark:text-gray-300" />,
    },
    {
      label: "About",
      path: "/about",
      icon: <Info size={18} className="text-gray-600 dark:text-gray-300" />,
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Mail size={18} className="text-gray-600 dark:text-gray-300" />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  // Don't show navbar on auth pages
  if (location.pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-white/20 dark:border-gray-700/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={darkMode ? logo_svg : logo_svg}
              alt="BlogSpace Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold gradient-text">BlogSpace</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {profileData?.profile?.profilePic ? (
                    <img
                      src={profileData.profile.profilePic}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userData?.name || "User"
                      )}&background=random&size=32&rounded=true`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}

                  <span className="hidden sm:block text-sm font-medium">
                    {userData?.name}
                  </span>
                </button>

                <ProfileDropdown
                  user={userData}
                  isOpen={isProfileOpen}
                  onLogout={handleLogout}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="space-y-1">
                <div
                  className={`w-6 h-0.5 bg-current transition-all ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-current transition-all ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-current transition-all ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}

            {!token && (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-purple-600 dark:text-purple-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-purple-600 dark:text-purple-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
