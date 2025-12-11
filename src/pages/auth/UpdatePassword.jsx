import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import { resetPasswordAPI } from "../../service/operations/AuthOpern";

function UpdatePassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token: resetToken } = useParams();

  const token = resetToken;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await resetPasswordAPI({
        token,
        newPassword: formData.newPassword,
      });
      setLoading(false);
      if (response.status === 200) {
        navigate("/auth/login");
      }
    } catch (error) {
      setLoading(false);
      setErrors({
        general:
          error?.response?.data?.message ||
          "Failed to update password. Please try again.",
      });
    }
  };

  return (
    <AuthLayout title="Update Password" subtitle="Create your new password">
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

        {/* Success Message */}
        {token && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✅ Reset link verified! Please create your new password.
            </p>
          </div>
        )}

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}

          {/* Password Requirements */}
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">Password must contain:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li
                className={
                  formData.newPassword.length >= 6 ? "text-green-500" : ""
                }
              >
                ✓ At least 6 characters
              </li>
              <li
                className={
                  /[A-Z]/.test(formData.newPassword) ? "text-green-500" : ""
                }
              >
                ✓ One uppercase letter (recommended)
              </li>
              <li
                className={
                  /[0-9]/.test(formData.newPassword) ? "text-green-500" : ""
                }
              >
                ✓ One number (recommended)
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </motion.button>

        {/* Back to Login */}
        <p className="text-center text-sm">
          <Link to="/auth/login" className="text-purple-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default UpdatePassword;
