import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAISummary, getRandomBlogIdeas } from "../data/aiData";
import {
  Bot,
  FileText,
  Lightbulb,
  Send,
  Copy,
  Check,
  Sparkles,
  Zap,
  Brain,
} from "lucide-react";

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState("summarize");
  const [postId, setPostId] = useState("1");
  const [summary, setSummary] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateSummary = () => {
    setLoading(true);
    setTimeout(() => {
      setSummary(getAISummary(postId));
      setLoading(false);
    }, 1500);
  };

  const handleGenerateIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      setIdeas(getRandomBlogIdeas(5));
      setLoading(false);
    }, 1500);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full mb-4">
              <Bot size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Leverage the power of AI to summarize content and generate
              creative ideas
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab("summarize")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  activeTab === "summarize"
                    ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <FileText size={18} className="mr-2" />
                Summarize Post
              </button>
              <button
                onClick={() => setActiveTab("ideas")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  activeTab === "ideas"
                    ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Lightbulb size={18} className="mr-2" />
                Blog Ideas
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            className="glass rounded-2xl p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activeTab === "summarize" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <Brain className="mr-2 text-primary-600" size={24} />
                    AI Post Summarizer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select a post to generate an AI-powered summary
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="1">
                      The Future of Web Development in 2024
                    </option>{" "}
                    <option value="2">
                      Building Responsive Layouts with Modern CSS
                    </option>
                    <option value="3">
                      JavaScript Performance Optimization Techniques
                    </option>
                    <option value="4">
                      Introduction to React Server Components
                    </option>
                    <option value="5">
                      Accessibility Best Practices for Modern Web Apps
                    </option>
                    <option value="6">
                      State Management in Modern React Applications
                    </option>
                  </select>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    className="btn-primary flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="mr-2" />
                        Generate Summary
                      </>
                    )}
                  </button>
                </div>

                {summary && (
                  <motion.div
                    className="mt-6 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        AI Summary
                      </h4>
                      <button
                        onClick={() => handleCopyToClipboard(summary)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {summary}
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <Zap className="mr-2 text-primary-600" size={24} />
                    Blog Idea Generator
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get creative suggestions for your next blog post
                  </p>
                </div>

                <button
                  onClick={handleGenerateIdeas}
                  disabled={loading}
                  className="btn-primary flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb size={18} className="mr-2" />
                      Generate Ideas
                    </>
                  )}
                </button>

                {ideas.length > 0 && (
                  <motion.div
                    className="mt-6 space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Suggested Blog Topics
                      </h4>
                      <button
                        onClick={() =>
                          handleCopyToClipboard(ideas.join("\n\n"))
                        }
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    {ideas.map((idea, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0 mr-3">
                            <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {idea}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="mt-8 glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  About This AI Assistant
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  This AI assistant uses advanced language models to provide
                  summaries of blog posts and generate creative blog ideas. The
                  summaries highlight key points and main ideas from the
                  content, while the blog ideas are tailored to current trends
                  and topics in web development and technology.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistant;
