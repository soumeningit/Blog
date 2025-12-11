import React from "react";
import { motion } from "framer-motion";
import { Copy, Facebook, Linkedin, Twitter } from "lucide-react";

const ShareButtons = ({ post }) => {
  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Copy Link",
      icon: <Copy />,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      },
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <h3 className="text-lg font-semibold mb-4">Share this post</h3>
      <div className="flex flex-wrap gap-3">
        {shareOptions.map((option, index) => (
          <motion.button
            key={option.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              option.action
                ? option.action()
                : window.open(option.url, "_blank")
            }
            className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all"
          >
            <span>{option.icon}</span>
            <span>{option.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ShareButtons;
