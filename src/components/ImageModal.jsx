import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const ImageModal = ({ isOpen, onClose, onInsert }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState({ width: "100%", height: "auto" });
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageUrl(file.name);
    }
  };

  const handleInsert = () => {
    if (imageUrl || previewUrl) {
      onInsert({
        url: previewUrl || imageUrl,
        width: imageSize.width,
        height: imageSize.height,
        alt: "Blog image",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setImageSize({ width: "100%", height: "auto" });
    setPreviewUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <motion.div
        className="glass rounded-2xl p-6 max-w-lg w-full relative z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Insert Image
          </h3>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary-500 transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload size={32} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or enter image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Image Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Width
              </label>
              <input
                type="text"
                value={imageSize.width}
                onChange={(e) =>
                  setImageSize((prev) => ({ ...prev, width: e.target.value }))
                }
                placeholder="100%"
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Height
              </label>
              <input
                type="text"
                value={imageSize.height}
                onChange={(e) =>
                  setImageSize((prev) => ({ ...prev, height: e.target.value }))
                }
                placeholder="auto"
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Preview */}
          {(previewUrl || imageUrl) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview
              </label>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                    style={{ width: imageSize.width, height: imageSize.height }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <ImageIcon size={20} />
                    <span className="text-sm">{imageUrl}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={handleClose} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!imageUrl && !previewUrl}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert Image
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
