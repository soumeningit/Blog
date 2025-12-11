import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";

function SocialLinks({
  socialLinks,
  setSocialLinks,
  isEditing,
  copyToClipboard,
  getSocialIcon,
  handleEditMap,
}) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Social Media Links
      </h3>
      <div className="space-y-4">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <div key={platform}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
              {platform} URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getSocialIcon(platform)}
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setSocialLinks({
                      ...socialLinks,
                      [platform]: e.target.value,
                    });
                    handleEditMap("socialLinks", {
                      [platform]: e.target.value,
                    });
                  }}
                  placeholder={`https://${platform}.com/username`}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {url && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(url)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;
