import { motion } from "framer-motion";
import { Shield, Lock, Eye, Mail, AlertCircle } from "lucide-react";

function Policy() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Account information (name, email, username, profile picture)",
        "User-generated content (blog posts, comments, preferences)",
        "Usage data (pages visited, time spent, search queries)",
        "Device information (browser type, IP address, device type)",
        "Social media information (when you connect accounts)",
        "Payment information (processed securely through third-party providers)",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our services",
        "Improve and personalize your experience",
        "Send newsletters and updates (with your consent)",
        "Respond to inquiries and customer support",
        "Detect and prevent fraud or security issues",
        "Comply with legal obligations",
        "Analyze usage patterns and trends",
      ],
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "We implement industry-standard encryption protocols",
        "All sensitive data is stored securely on protected servers",
        "Access to personal information is restricted to authorized personnel",
        "We conduct regular security audits and updates",
        "No method of transmission is 100% secure; we cannot guarantee absolute security",
        "You are responsible for maintaining password confidentiality",
      ],
    },
    {
      icon: Mail,
      title: "Sharing Your Information",
      content: [
        "We do NOT sell or share your personal data with third parties",
        "We may share information with service providers under strict confidentiality agreements",
        "We comply with law enforcement requests when legally required",
        "In case of merger or acquisition, users will be notified",
        "Aggregate and anonymized data may be used for analytics",
      ],
    },
    {
      icon: AlertCircle,
      title: "Your Rights & Choices",
      content: [
        "Access your personal data at any time",
        "Update or correct inaccurate information",
        "Request deletion of your data (subject to legal retention requirements)",
        "Opt-out of marketing communications",
        "Control cookie preferences through browser settings",
        "Request a copy of your data in portable format",
        "Withdraw consent for data processing",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Last updated: December 2024
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            We are committed to protecting your privacy. This policy explains
            how we collect, use, and protect your personal information.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-2">
                      {section.content.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="flex-shrink-0 h-6 w-6 text-purple-600 dark:text-purple-400 font-bold">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Additional Policies */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies & Tracking
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We use cookies to enhance your browsing experience, remember
              preferences, and analyze website traffic. You can disable cookies
              in your browser settings, though some features may not work
              properly.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Types of cookies:</strong> Essential (required for
              functionality), Analytical (usage tracking), Preferential
              (remember your choices), Marketing (for targeted ads).
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices. We recommend reviewing
              their privacy policies before providing personal information.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our services are not directed to anyone under 13 years old. We do
              not knowingly collect personal information from children. If we
              become aware that a child has provided information, we will delete
              it immediately.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Policy Changes
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this privacy policy from time to time. We will
              notify you of any material changes via email or prominent notice
              on our website. Your continued use of the platform constitutes
              acceptance of the updated policy.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-md p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-2">
              If you have questions about this privacy policy or our privacy
              practices:
            </p>
            <ul className="space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:privacy@blogplatform.com"
                  className="underline hover:opacity-90"
                >
                  privacy@blogplatform.com
                </a>
              </li>
              <li>
                📮 Address: Privacy Team, BlogPlatform Inc., 123 Tech Street,
                San Francisco, CA 94102
              </li>
              <li>🌐 Website: www.blogplatform.com/contact</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">
            By using our platform, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Policy;
