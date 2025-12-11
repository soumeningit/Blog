import React from "react";
import { motion } from "framer-motion";
import { Zap, Share2, Lock, Lightbulb, Users, Sparkles } from "lucide-react";

function FeaturesHighlights() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant loading and smooth scrolling",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your articles across multiple platforms with one click",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "Your content and data are protected with industry-standard encryption",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Lightbulb,
      title: "Smart Search",
      description:
        "Intelligent search engine to find exactly what you're looking for",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with fellow writers and readers, build your audience",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get smart suggestions and AI-powered writing assistance",
      color: "from-rose-500 to-pink-500",
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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why Choose Streamline?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Experience a modern blogging platform designed for writers and
            readers alike
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group">
                  {/* Icon Container */}
                  <div
                    className={`inline-flex items-center justify-center h-16 w-16 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Ready to start your blogging journey?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FeaturesHighlights;
