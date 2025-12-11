import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, MapPin } from "lucide-react";
import author from "../assets/author.png";

function About() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            About BlogSpace
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 dark:bg-gray-700">
                  <img
                    src={`https://ui-avatars.com/api/?name=Soumen+Pal&background=random&size=128`}
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Soumen Pal
                </h2>
                <p className="text-primary-600 dark:text-primary-400 mb-4">
                  Full-Stack Developer & Tech Writer
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:contact@blogspace.com"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Our Story
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  BlogSpace was created in 2024 with a simple mission: to share
                  knowledge and insights about modern web development. As
                  technology evolves at an unprecedented pace, we believe in
                  creating a space where developers of all levels can learn,
                  grow, and stay updated with the latest trends.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  What started as a personal blog has grown into a community
                  resource for developers worldwide. We cover everything from
                  fundamental concepts to cutting-edge technologies, always with
                  a focus on practical, real-world applications.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Our Focus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        01
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Modern Web Technologies
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Exploring the latest frameworks, libraries, and tools
                        shaping the future of web development
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        02
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Best Practices
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Sharing proven techniques and patterns for writing
                        maintainable, scalable code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        03
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Performance & Accessibility
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Creating fast, responsive, and inclusive web experiences
                        for all users
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        04
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Career Development
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Insights on growing as a developer and navigating the
                        tech industry
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions, suggestions, or want to contribute? We'd love to
              hear from you!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  contact@blogspace.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  West Bengal, India
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
