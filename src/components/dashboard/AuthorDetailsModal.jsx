import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Copy,
  MapPin,
  Link as LinkIcon,
  Calendar,
  CheckCircle,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";
import { formateDate } from "../../utils/DateFormatter";

function AuthorDetailsModal({ isOpen, authorDetails, onClose }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!authorDetails) return null;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const socialLinks = authorDetails?.socialLinks || {};
  const socialIcons = {
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    instagram: Instagram,
    github: Github,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] border border-gray-200 dark:border-gray-800 flex flex-col">
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-t-2xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 flex-1 overflow-y-auto">
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                  {authorDetails?.profilePic ? (
                    <img
                      src={authorDetails.profilePic}
                      alt={authorDetails.name}
                      className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-900 shadow-lg">
                      {authorDetails?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name and Username */}
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
                  {authorDetails?.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">
                    @{authorDetails?.username}
                  </p>
                  <button
                    onClick={() =>
                      handleCopy(authorDetails?.username, "username")
                    }
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    title="Copy username"
                  >
                    {copiedField === "username" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Bio */}
                {authorDetails?.about && (
                  <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    {authorDetails.about}
                  </p>
                )}

                {/* Details Section */}
                <div className="space-y-3 mb-6">
                  {/* Email */}
                  {authorDetails?.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Email
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {authorDetails.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(authorDetails.email, "email")}
                        className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy email"
                      >
                        {copiedField === "email" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Location */}
                  {authorDetails?.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Location
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {authorDetails.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {authorDetails?.website && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <LinkIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Website
                        </p>
                        <a
                          href={authorDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline truncate block"
                        >
                          {authorDetails.website}
                        </a>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(authorDetails.website, "website")
                        }
                        className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy website"
                      >
                        {copiedField === "website" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Join Date */}
                  {authorDetails?.createdAt && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Member Since
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formateDate(authorDetails.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {Object.values(socialLinks).some((link) => link) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-medium">
                        Follow On Social
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(socialLinks).map(([platform, url]) => {
                          const Icon = socialIcons[platform];
                          return (
                            url && (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                                title={`Visit ${platform}`}
                              >
                                {Icon && (
                                  <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                )}
                              </a>
                            )
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                {(authorDetails?.followers || authorDetails?.articlesCount) && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {authorDetails?.articlesCount !== undefined && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {authorDetails.articlesCount}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Articles
                        </p>
                      </div>
                    )}
                    {authorDetails?.followers !== undefined && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                          {authorDetails.followers}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Followers
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthorDetailsModal;
