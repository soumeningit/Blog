import { Eye, EyeOff, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function AdvanceSetting({
  passwordValue,
  setPassword,
  setHasChanges,
  handlePasswordUpdate,
  isUpdatingPassword,
  handleDeleteAccount,
}) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Update Password
          </h3>
          <form className="space-y-4">
            {/* Old Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={passwordValue.oldPassword}
                  onChange={(e) =>
                    setPassword({
                      ...passwordValue,
                      oldPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                    errors.oldPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                  placeholder="Your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showOldPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordValue.newPassword}
                  onChange={(e) =>
                    setPassword({
                      ...passwordValue,
                      newPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                    errors.newPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                  placeholder="Create a new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordValue.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...passwordValue,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Update Password Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handlePasswordUpdate}
              disabled={isUpdatingPassword}
              className="w-[10rem] mt-6 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUpdatingPassword ? (
                <>
                  <svg
                    className="mr-3 animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Processing…
                </>
              ) : (
                "Update Password"
              )}
            </motion.button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="card border-red-200 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h3>
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
            <div>
              <h4 className="font-medium text-red-600 dark:text-red-400">
                Delete Account
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <motion.button
              onClick={handleDeleteAccount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2 font-medium"
            >
              <Trash2 size={16} />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvanceSetting;
