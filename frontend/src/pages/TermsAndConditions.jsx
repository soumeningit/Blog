import React from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

function TermsAndConditions() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using this blog platform, you accept and agree to be bound by the terms and conditions herein.",
        "If you do not agree to abide by the above, please do not use this service.",
        "We reserve the right to modify these terms at any time without notice.",
        "Your continued use of the platform following any changes constitutes your acceptance of the new terms.",
      ],
    },
    {
      icon: CheckCircle,
      title: "2. Use License",
      content: [
        "Permission is granted to temporarily download one copy of the materials (information or software) on the blog for personal, non-commercial transitory viewing only.",
        "This is the grant of a license, not a transfer of title, and under this license you may not:",
        "• Modify or copy the materials",
        "• Use the materials for any commercial purpose or for any public display",
        "• Attempt to decompile or reverse engineer any software contained on the blog",
        "• Remove any copyright or other proprietary notations from the materials",
        "• Transfer the materials to another person or 'mirror' the materials on any other server",
        "This license shall automatically terminate if you violate any of these restrictions",
      ],
    },
    {
      icon: AlertCircle,
      title: "3. Disclaimer of Warranties",
      content: [
        "The materials on the blog are provided on an 'as is' basis without warranties of any kind.",
        "We do not warrant that the materials are accurate, complete, or free of errors.",
        "We make no warranties regarding the operation of the blog or the quality of any products.",
        "Your use of the materials is entirely at your own risk.",
        "To the fullest extent permissible by law, we disclaim all warranties, express or implied.",
        "Some jurisdictions do not allow limitations on implied warranties, so this may not apply to you.",
      ],
    },
    {
      icon: XCircle,
      title: "4. Limitations of Liability",
      content: [
        "In no event shall our company or suppliers be liable for any damages arising from or connected with your use of the blog.",
        "This is a comprehensive limitation of liability that applies to all damages of any kind.",
        "Some jurisdictions do not allow limitations of liability, so this may not apply to you.",
        "We are not liable for: lost profits, lost data, business interruption, or indirect damages.",
        "Even if we have been notified of the possibility of such damages.",
      ],
    },
    {
      icon: Gavel,
      title: "5. User Conduct & Prohibitions",
      content: [
        "You agree not to post, transmit, or distribute any unlawful, threatening, abusive, defamatory, obscene, or objectionable material.",
        "You agree not to impersonate any person or entity or misrepresent your identity.",
        "You agree not to upload or share viruses, malware, or any other harmful code.",
        "You agree not to engage in spamming, harassment, or bullying of other users.",
        "You agree not to violate any intellectual property rights or laws.",
        "We reserve the right to remove any content that violates these terms without notice.",
        "Repeated violations may result in account suspension or termination.",
      ],
    },
    {
      icon: FileText,
      title: "6. Intellectual Property Rights",
      content: [
        "All content on this blog, including text, graphics, logos, and images, is the property of the blog or its content suppliers.",
        "Users grant us a worldwide, non-exclusive, royalty-free license to use content they post.",
        "You retain ownership of content you create, but grant us the right to display and distribute it.",
        "You must not reproduce, distribute, transmit, or modify any copyrighted material without permission.",
        "We respect intellectual property rights and respond to valid DMCA takedown notices.",
      ],
    },
    {
      icon: AlertCircle,
      title: "7. Links & Third-Party Content",
      content: [
        "The blog may contain links to third-party websites for your convenience.",
        "We are not responsible for the content, accuracy, or practices of linked sites.",
        "We do not endorse or sponsor any third-party websites.",
        "Your use of third-party sites is governed by their terms and privacy policies.",
        "We disclaim liability for any issues arising from third-party links or content.",
      ],
    },
    {
      icon: HelpCircle,
      title: "8. Comments & User Content",
      content: [
        "Users may post comments subject to our community guidelines.",
        "We reserve the right to moderate, edit, or delete any comments.",
        "Comments must be respectful and relevant to the post.",
        "Users are responsible for their own comments and assume all risks.",
        "We are not responsible for comments posted by users.",
        "Do not post spam, promotional content, or malicious links.",
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
            <Gavel className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Last updated: December 2024
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Please read these terms and conditions carefully before using our
            platform. These terms govern your use of our blog platform and all
            content and services offered.
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

          {/* Additional Sections */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Account Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We reserve the right to terminate your account at any time for any
              reason, including:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Violation of these Terms & Conditions</li>
              <li>• Repeated misuse of the platform</li>
              <li>• Illegal activity or fraud</li>
              <li>• Inactivity for an extended period</li>
              <li>• Breach of our community guidelines</li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Modifications to Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may modify, suspend, or discontinue the blog or any part
              thereof at any time without notice. We are not liable for any
              damages arising from such modifications or discontinuance.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Jurisdiction], and you irrevocably
              submit to the exclusive jurisdiction of the courts located
              therein.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              12. Severability
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If any provision of these terms is found to be invalid or
              unenforceable, the remaining provisions shall continue to be valid
              and enforceable.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-md p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
            <p className="mb-2">
              If you have questions or concerns about these terms:
            </p>
            <ul className="space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:legal@blogplatform.com"
                  className="underline hover:opacity-90"
                >
                  legal@blogplatform.com
                </a>
              </li>
              <li>
                📮 Mailing Address: Legal Department, BlogPlatform Inc., 123
                Tech Street, San Francisco, CA 94102
              </li>
              <li>🌐 Website: www.blogplatform.com/support</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-center"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">
            By using our platform, you acknowledge that you have read,
            understood, and agree to be bound by these Terms & Conditions in
            their entirety.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TermsAndConditions;
