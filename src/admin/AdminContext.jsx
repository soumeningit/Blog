// src/admin/AdminContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setAdmin(JSON.parse(adminData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const adminLogin = async (credentials) => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await mockAdminLogin(credentials);

      if (response.success) {
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("admin", JSON.stringify(response.admin));
        setAdmin(response.admin);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const value = {
    admin,
    loading,
    isAuthenticated,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// Mock API function (replace with real API call)
const mockAdminLogin = async (credentials) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    credentials.email === "admin@blogspace.com" &&
    credentials.password === "admin123"
  ) {
    return {
      success: true,
      token: "mock-admin-jwt-token",
      admin: {
        id: 1,
        name: "Admin User",
        email: "admin@blogspace.com",
        role: "super_admin",
        avatar: "👨‍💼",
      },
    };
  }
  return { success: false, error: "Invalid admin credentials" };
};
