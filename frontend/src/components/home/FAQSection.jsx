import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I get started with Streamline?",
      answer:
        "Getting started is easy! Sign up for a free account, verify your email, and you're ready to start writing. Our onboarding guide will walk you through the basics.",
    },
    {
      question: "Is there a free tier or trial?",
      answer:
        "Yes! We offer a generous free tier with unlimited articles, basic analytics, and community features. Premium plans unlock advanced features and priority support.",
    },
    {
      question: "Can I import articles from another platform?",
      answer:
        "Absolutely! We support importing from popular blogging platforms. Use our import tool to migrate your existing content in just a few clicks.",
    },
    {
      question: "How do I monetize my blog?",
      answer:
        "Streamline offers multiple monetization options: ad networks, sponsored content, premium subscriptions, and affiliate programs. Set it up in your settings.",
    },
    {
      question: "What analytics and metrics are available?",
      answer:
        "Track comprehensive metrics including page views, unique visitors, engagement rate, bounce rate, traffic sources, and reader demographics with our advanced dashboard.",
    },
    {
      question: "Is my content secure and backed up?",
      answer:
        "Yes, we use enterprise-grade security with SSL encryption, regular backups, and DDoS protection. Your data is stored in secure data centers.",
    },
    {
      question: "Can I customize my blog design?",
      answer:
        "Of course! Choose from professional templates or use our visual editor to create a custom design. No coding knowledge required.",
    },
    {
      question: "How do I get support?",
      answer:
        "We offer 24/7 support through email, live chat, and our community forum. Premium members get priority support with faster response times.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find answers to common questions about Streamline
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <h3 className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
                  >
                    <p className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-4 opacity-90">
            Our support team is here to help. Reach out anytime.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FAQSection;
