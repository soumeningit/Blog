import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import { registerUserAPI } from "../../service/operations/AuthOpern";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const authData = useAuth();
  const { otpData } = authData;
  // console.log("OTP Data from Context:", otpData);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter all 6 digits" });
      return;
    }
    setLoading(true);

    const data = {
      ...otpData,
      otp: otpValue,
    };

    try {
      const response = await registerUserAPI(data);
      setLoading(false);
      if (response.status === 201 || response.status === 200) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("OTP Verification Error:", error);
      setLoading(false);
      setErrors({
        general: error.response.data.message || "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    // Handle resend OTP logic here
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Display */}
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Code sent to: <strong>{email}</strong>
          </p>
        </div>

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

        {/* OTP Input Fields */}
        <div>
          <label className="block text-sm font-medium mb-4">
            Enter OTP Code
          </label>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-bold rounded-lg bg-white/50 dark:bg-gray-800/50 border ${
                  errors.otp
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {errors.otp}
            </p>
          )}
        </div>

        {/* Timer */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Resend code in{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-purple-600 hover:underline font-semibold"
            >
              Resend Code
            </button>
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
          {loading ? "Verifying..." : "Verify Email"}
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

export default OTPVerification;
