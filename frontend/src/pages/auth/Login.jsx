import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import { loginUserAPI } from "../../service/operations/AuthOpern";
import GoogleIcon from "../../assets/google-logo.svg";
import { useProfile } from "../../contexts/ProfileContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authData = useAuth();
  const profile = useProfile();
  const updateProfile = profile.setProfileFunc;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await loginUserAPI({
        email: formData.email,
        password: formData.password,
      });
      setLoading(false);
      if (response.status === 200) {
        authData.setValue(response.data.data.token, response.data.data.user);
        updateProfile(response.data.data.profile);
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("Login Error:", error);
      setLoading(false);
      setErrors({ general: error.response.data.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  async function handleSigninWithGoogle() {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");

    const backendUrl = import.meta.env.VITE_OAUTH_BACKEND_URL;

    // Redirect user to backend OAuth endpoint
    window.location.href = `${backendUrl}/auth/signin/google`;
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm"
          >
            {errors.general}
          </motion.div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 rounded" />
            <span className="text-sm">Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-purple-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>

        {/* Demo Account Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>Demo Account:</strong>
            <br />
            Email: test@example.com
            <br />
            Password: password
          </p>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
        {/* Google Sign In */}
        <motion.button
          type="button"
          onClick={handleSigninWithGoogle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:shadow-md transition-all"
        >
          <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </motion.button>
      </form>
    </AuthLayout>
  );
}

export default Login;
