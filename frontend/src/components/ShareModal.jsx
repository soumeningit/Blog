import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Link2,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

function ShareModal({ isOpen = true, shareURL = "", title = "", onClose }) {
  const [copied, setCopied] = useState(false);
  const encodedURL = encodeURIComponent(shareURL || "");
  const encodedTitle = encodeURIComponent(title || "Check out this post!");

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const shareLinks = [
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      icon: Twitter,
      color:
        "border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: Facebook,
      color:
        "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
      icon: Linkedin,
      color:
        "border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedURL}`,
      icon: MessageCircle,
      color:
        "border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-200",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedURL}`,
      icon: Mail,
      color:
        "border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-200",
    },
  ];

  const canUseNativeShare = typeof navigator !== "undefined" && navigator.share;

  const handleNativeShare = async () => {
    if (!canUseNativeShare) return;
    try {
      await navigator.share({
        title: title || "Saved Post",
        text: "Check out this post!",
        url: shareURL,
      });
      onClose?.();
    } catch (err) {
      console.error("Native share failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Share
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Share this saved post
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            {/* URL copy */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Share link
              </p>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {shareURL}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    copied
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  }`}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Social buttons */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share via
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {shareLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Native share */}
            {canUseNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg transition-all"
              >
                <Send className="h-4 w-4" />
                Share via device
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ShareModal;
