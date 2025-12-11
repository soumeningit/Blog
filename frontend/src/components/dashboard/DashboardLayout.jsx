import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if we're on mobile and adjust sidebar accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - always mounted for smooth transitions; width animates on desktop, translate on mobile */}
      <motion.aside
        initial={
          isMobile ? { x: -300 } : { width: sidebarOpen ? "16rem" : "0" }
        }
        animate={
          isMobile
            ? { x: sidebarOpen ? 0 : -300 }
            : { width: sidebarOpen ? "16rem" : "0" }
        }
        exit={isMobile ? { x: -300 } : { width: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.7,
          width: { duration: 0.25 },
        }}
        className={`top-0 left-0 h-full z-50 bg-white dark:bg-gray-800 shadow-neumorphic dark:shadow-neumorphic-dark overflow-hidden ${
          isMobile ? "fixed w-64" : "relative"
        }`}
        style={{ width: isMobile ? undefined : sidebarOpen ? "16rem" : "0" }}
      >
        <Sidebar
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
          isOpen={sidebarOpen}
        />
      </motion.aside>

      {/* Main Content - animate left margin on desktop when sidebar opens/closes for smooth shift */}
      <motion.div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300 ease-in-out">
          <motion.div
            key={location.pathname}
            initial="pageTransitionEnter"
            animate="pageTransitionEnterActive"
            exit="pageTransitionExit"
            variants={{
              pageTransitionEnter: {
                opacity: 0,
                y: 20,
              },
              pageTransitionEnterActive: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.25, 1, 0.5, 1],
                },
              },
              pageTransitionExit: {
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                },
              },
            }}
            className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}

export default DashboardLayout;
