import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Anderson",
      role: "Content Creator",
      image:
        "https://ui-avatars.com/api/?name=Sarah+Anderson&background=random&size=100",
      rating: 5,
      text: "Streamline has completely transformed how I manage my blog. The UI is intuitive and the features are exactly what I needed. Highly recommended!",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Mike Chen",
      role: "Tech Writer",
      image:
        "https://ui-avatars.com/api/?name=Mike+Chen&background=random&size=100",
      rating: 5,
      text: "The SEO optimization features and analytics dashboard are outstanding. I've seen a 40% increase in my blog traffic since switching to Streamline.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Emma Rodriguez",
      role: "Lifestyle Blogger",
      image:
        "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=random&size=100",
      rating: 5,
      text: "Perfect platform for sharing my passion. The community here is supportive, and the tools make publishing a breeze. Love it!",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "James Wilson",
      role: "Tech Enthusiast",
      image:
        "https://ui-avatars.com/api/?name=James+Wilson&background=random&size=100",
      rating: 5,
      text: "Fast, reliable, and feature-rich. The customer support team is incredibly responsive. This is my go-to platform for all my writing needs.",
      color: "from-orange-500 to-red-500",
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
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real feedback from writers and content creators around the world
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                {/* Background Gradient Accent */}
                <div
                  className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br ${testimonial.color} opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 opacity-50" />

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 relative z-10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-600/20"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            Read More Reviews
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default TestimonialsSection;
