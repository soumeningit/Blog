import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "../../admin/AdminContext";
import { useAuth } from "../../contexts/AuthContext";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { admin } = useAdmin();
  const location = useLocation();
  const auth = useAuth();
  const authData = auth.getValue();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      if (mobile) setSidebarOpen(false);
      else if (tablet) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || isDesktop) && (
          <>
            {/* Overlay only on mobile/tablet when open */}
            {(isMobile || isTablet) && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden rounded-md"
              />
            )}

            <motion.aside
              id="admin-sidebar"
              initial={
                isDesktop ? { width: sidebarOpen ? "16rem" : "0" } : { x: -300 }
              }
              animate={
                isDesktop
                  ? { width: sidebarOpen ? "16rem" : "0" }
                  : { x: sidebarOpen ? 0 : -300 }
              }
              exit={isDesktop ? { width: 0 } : { x: -300 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
                width: { duration: 0.25 },
              }}
              className={`fixed top-0 left-0 h-full rounded-md bg-white dark:bg-gray-800 shadow-xl z-50 overflow-hidden ${
                isDesktop && sidebarOpen ? "lg:relative lg:inset-0" : ""
              }`}
              style={{ width: sidebarOpen && isDesktop ? "16rem" : "0" }}
            >
              <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isMobile={isMobile}
                isTablet={isTablet}
                isDesktop={isDesktop}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out"
        initial={{ marginLeft: isDesktop && sidebarOpen ? "0rem" : 0 }}
        animate={{ marginLeft: isDesktop && sidebarOpen ? "0rem" : 0 }}
        transition={{ duration: 0.25 }}
      >
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          admin={admin}
          isMobile={isMobile}
          isTablet={isTablet}
          sidebarOpen={sidebarOpen}
          user={authData?.user}
        />

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-7xl mx-auto w-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}

export default AdminLayout;
