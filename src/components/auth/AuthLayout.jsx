import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Back to Home */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <span className="text-3xl">📝</span>
            <span className="text-2xl font-bold gradient-text">Streamline</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 shadow-2xl"
        >
          {children}
        </motion.div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 BlogSpace. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
