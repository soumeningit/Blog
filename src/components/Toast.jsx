import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const Toast = ({
  id,
  type = "info",
  title,
  message,
  duration = 5000,
  icon,
  color,
  position = "top-right",
  showClose = true,
  onClose,
  targetElement = null, // NEW: Reference element to position below
  offset = { top: 20, left: 0 }, // NEW: Offset from target element
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [calculatedPosition, setCalculatedPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Calculate position relative to target element
  useEffect(() => {
    if (targetElement) {
      const element = document.getElementById(targetElement);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        switch (position) {
          case "top-left":
            top = rect.top + scrollTop - offset.top;
            left = rect.left + scrollLeft - offset.left;
            break;
          case "top-right":
            top = rect.top + scrollTop - offset.top;
            left = rect.right + scrollLeft + offset.left;
            break;
          case "bottom-left":
            top = rect.bottom + scrollTop + offset.top;
            left = rect.left + scrollLeft - offset.left;
            break;
          case "bottom-right":
            top = rect.bottom + scrollTop + offset.top;
            left = rect.right + scrollLeft + offset.left;
            break;
          case "top-center":
            top = rect.top + scrollTop - offset.top;
            left = rect.left + scrollLeft + rect.width / 2 + offset.left;
            break;
          case "bottom-center":
            top = rect.bottom + scrollTop + offset.top;
            left = rect.left + scrollLeft + rect.width / 2 + offset.left;
            break;
          default:
            // Default to top-right if no target
            top = 20;
            left = window.innerWidth - 320;
        }

        setCalculatedPosition({ top, left });
      }
    }
  }, [targetElement, position, offset]);

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={20} />;
      case "error":
        return <XCircle className="text-red-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case "info":
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getColorClasses = () => {
    if (color) return color;

    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Use calculated position if targetElement is provided
  const positionStyle = targetElement
    ? {
        top: `${calculatedPosition.top}px`,
        left: `${calculatedPosition.left}px`,
      }
    : {
        top: position.includes("bottom") ? "auto" : "20px",
        left: position.includes("right") ? "auto" : "20px",
        bottom: position.includes("top") ? "auto" : "20px",
        right: position.includes("left") ? "auto" : "20px",
        transform: position.includes("center") ? "translateX(-50%)" : "none",
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          style={positionStyle}
          className="fixed z-50"
        >
          <div
            className={`flex items-start gap-3 p-4 rounded-lg shadow-xl backdrop-blur-sm ${getColorClasses()} min-w-[300px] max-w-md`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">{getIcon()}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
              {message && <p className="text-sm opacity-90">{message}</p>}
            </div>

            {/* Close Button */}
            {showClose && (
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
