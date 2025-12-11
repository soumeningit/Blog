import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "../../admin/AdminContext";

const Dashboard = () => {
  const { admin } = useAdmin();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {admin?.name}. Here's what's happening with your blog
          today.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Dashboard;
