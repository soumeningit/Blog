import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import { requestResetPasswordAPI } from "../../service/operations/AuthOpern";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
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
      const response = await requestResetPasswordAPI({ email: email });
      setLoading(false);
      if (response.status === 200) {
        setIsSubmitted(true);
        localStorage.setItem("resetEmail", email);
      }
    } catch (error) {
      setLoading(false);
      setIsSubmitted(false);
      setErrors({
        general:
          error?.response?.data?.message ||
          "Failed to send reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout title="Email Sent" subtitle="Check your inbox for reset link">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-6xl">📧</div>
          <h3 className="text-xl font-semibold">Password Reset Email Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            We've sent a password reset link to
            <br />
            <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-purple-600 hover:underline"
            >
              try again
            </button>
          </p>

          {/* <div className="pt-4">
            <Link
              to="/auth/update-password"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Open Reset Link
            </Link>
          </div> */}

          <p className="text-sm">
            <Link to="/auth/login" className="text-purple-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset password"
    >
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

        {/* Instructions */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Enter your registered email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Enter your registered email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>

        {/* Back to Login */}
        <p className="text-center text-sm">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
