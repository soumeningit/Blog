import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";

function StatisticsSection() {
  const stats = [
    {
      icon: BookOpen,
      label: "Articles Published",
      value: "5,234+",
      color: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: Users,
      label: "Active Authors",
      value: "892+",
      color: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      icon: TrendingUp,
      label: "Total Readers",
      value: "125K+",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      icon: Award,
      label: "Community Posts",
      value: "15.2K+",
      color: "from-orange-500 to-red-500",
      delay: 0.3,
    },
  ];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-white/90 text-lg">
            Join our thriving community of writers and readers
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ delay: stat.delay }}
              >
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center group border border-white/20">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center h-16 w-16 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Value */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-2"
                  >
                    <p className="text-4xl font-bold gradient-text">
                      {stat.value}
                    </p>
                  </motion.div>

                  {/* Label */}
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </p>

                  {/* Animated Bottom Line */}
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full mx-auto" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-white/80 text-lg"
        >
          And growing every day! Be part of our amazing community.
        </motion.p>
      </div>
    </motion.section>
  );
}

export default StatisticsSection;
