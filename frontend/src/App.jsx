import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Main Pages=
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Categories from "./pages/Categories";
import About from "./pages/About";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTPVerification from "./pages/auth/OTPVerification";
import UpdatePassword from "./pages/auth/UpdatePassword";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOverview from "./pages/admin/AdminOverview";
import Analytics from "./pages/admin/Analytics";
import PostsManagement from "./pages/admin/PostsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import CommentsManagement from "./pages/admin/CommentsManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Posts from "./pages/dashboard/Posts";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Setting";
import SavedPosts from "./pages/dashboard/SavedPosts";
import EditPost from "./pages/dashboard/EditPost";
import EditorMain from "./pages/Editor/EditorMain";
import ShowDetails from "./pages/dashboard/ShowDetails";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import TermsAndConditions from "./pages/TermsAndConditions";
import Policy from "./pages/Policy";
import CategoryDetails from "./pages/CategoryDetails";
import SubscribeNext from "./pages/SubscribeNext";

/* --------------------- LAYOUTS --------------------- */

// Layout for authentication pages
const AuthLayout = ({ children }) => <>{children}</>;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="post/details/:id" element={<PostDetails />} />
          <Route path="/editor-new" element={<EditorMain />} />
          <Route path="categories" element={<Categories />} />
          <Route
            path="category/:categoryName/c_id/:categoryId"
            element={<CategoryDetails />}
          />
          <Route path="about" element={<About />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="policy" element={<Policy />} />
          <Route path="subscribe/token/:token" element={<SubscribeNext />} />
        </Route>

        {/* ---------------- ADMIN ROUTES ---------------- */}
        <Route
          path="/admin/login"
          element={
            <AuthLayout>
              <AdminLogin />
            </AuthLayout>
          }
        />

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="posts" element={<PostsManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="comments" element={<CommentsManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ---------------- AUTH ROUTES ---------------- */}
        <Route
          path="/auth/*"
          element={
            <AuthLayout>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="verify-otp" element={<OTPVerification />} />
                <Route
                  path="update-password/:token"
                  element={<UpdatePassword />}
                />
                <Route path="oauth-success/verify" element={<OAuthSuccess />} />
              </Routes>
            </AuthLayout>
          }
        />

        {/* ---------------- DASHBOARD ROUTES ---------------- */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="my-profile" element={<Profile />} />
          <Route path="posts" element={<Posts />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="saved-posts" element={<SavedPosts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit-post/:postId" element={<EditPost />} />
          <Route path="show-details/:postId" element={<ShowDetails />} />
        </Route>

        {/* ---------------- 404 ---------------- */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
