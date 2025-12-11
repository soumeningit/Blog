import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail } from "lucide-react";
import { subscribeFromctaAPI } from "../../service/operations/GeneralOpern";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await subscribeFromctaAPI(email);
      if (response.status === 200) {
        setSuccess(true);
        setEmail("");
        setLoading(false);
        setTimeout(() => setSuccess(false), 3000);
      }
      if (response.status === 1048) {
        setError(response.data.message);
        setLoading(false);
        setTimeout(() => setError(null), 5000);
        navigate("/auth/login");
      }
      if (response.status === 1050) {
        setError(response.data.message);
        setLoading(false);
        setTimeout(() => setError(null), 5000);
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setLoading(false);
      setTimeout(() => setError(null), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-purple-600/10 to-pink-600/10 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-primary-400 to-purple-400 dark:from-primary-700 dark:to-purple-700 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 rounded-full blur-3xl"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-6"
          >
            <Sparkles className="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </motion.div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Start{" "}
            <span className="gradient-text">Your Blogging Journey?</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of writers and creators who are already sharing their
            stories. Get unlimited articles, advanced analytics, and premium
            features. Start free today!
          </p>

          {/* Email Signup Form */}
          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8 max-w-xl mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !email}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  {success ? "✓ Subscribed!" : "Get Started"}
                  {!success && <ArrowRight className="w-5 h-5" />}
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium inline-block"
            >
              ✓ Welcome! Check your email for next steps.
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg text-sm font-medium inline-block"
            >
              ✗ {error}
            </motion.div>
          )}

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-200 dark:border-gray-700"
          >
            {[
              { emoji: "🚀", text: "Launch Instantly" },
              { emoji: "📊", text: "Smart Analytics" },
              { emoji: "🎨", text: "Beautiful Themes" },
              { emoji: "🔒", text: "Fully Secure" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-3xl">{feature.emoji}</div>
                <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CTASection;
