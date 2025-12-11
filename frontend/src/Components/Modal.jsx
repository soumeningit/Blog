// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AlertCircle, X, CheckCircle, Info } from "lucide-react";

// const Modal = ({
//   isOpen,
//   onClose,
//   icon,
//   title,
//   description,
//   type = "info", // 'info', 'warning', 'success', 'error'
//   isButton = true,
//   buttonText1,
//   buttonText2,
//   onButtonClick1,
//   onButtonClick2,
//   showCheckbox = false,
//   checkboxText = "",
//   checkboxChecked = false,
//   onCheckboxChange,
// }) => {
//   const getIcon = () => {
//     if (icon) return icon;

//     switch (type) {
//       case "warning":
//         return <AlertCircle className="text-yellow-500" size={24} />;
//       case "success":
//         return <CheckCircle className="text-green-500" size={24} />;
//       case "error":
//         return <AlertCircle className="text-red-500" size={24} />;
//       default:
//         return <Info className="text-blue-500" size={24} />;
//     }
//   };

//   const getModalStyles = () => {
//     switch (type) {
//       case "warning":
//         return "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20";
//       case "success":
//         return "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20";
//       case "error":
//         return "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20";
//       default:
//         return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20";
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.2 }}
//       >
//         <div
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={onClose}
//         />

//         <motion.div
//           className={`glass rounded-2xl p-6 max-w-md w-full relative z-10 border ${getModalStyles()}`}
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//           >
//             <X size={18} className="text-gray-500" />
//           </button>

//           <div className="flex items-start mb-4">
//             <div className="mr-3 flex-shrink-0">{getIcon()}</div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                 {title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 text-sm">
//                 {description}
//               </p>
//             </div>
//           </div>

//           {showCheckbox && (
//             <div className="mb-4">
//               <label className="flex items-start cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={checkboxChecked}
//                   onChange={(e) =>
//                     onCheckboxChange && onCheckboxChange(e.target.checked)
//                   }
//                   className="mt-1 mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                 />
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   {checkboxText}
//                 </span>
//               </label>
//             </div>
//           )}

//           {isButton && (
//             <div className="flex justify-end space-x-3">
//               {buttonText2 && (
//                 <button
//                   onClick={onButtonClick2 || onClose}
//                   className="btn-secondary"
//                 >
//                   {buttonText2}
//                 </button>
//               )}
//               <button onClick={onButtonClick1} className="btn-primary">
//                 {buttonText1}
//               </button>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Modal;

// src/components/Modal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  type = "info",
  title,
  description,
  imageSrc,
  buttonText1,
  buttonText2,
  onButtonClick1,
  onButtonClick2,
  showCheckbox = false,
  checkboxText,
  checkboxChecked,
  onCheckboxChange,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case "error":
        return <X className="text-red-500" size={24} />;
      case "success":
        return <CheckCircle className="text-green-500" size={24} />;
      case "image":
        return <ImageIcon className="text-blue-500" size={24} />;
      default:
        return <Info className="text-blue-500" size={24} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "image":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${getBgColor()} border`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getIcon()}
                    <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {title}
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="text-gray-500" size={20} />
                  </button>
                </div>

                {/* Content */}
                {type === "image" ? (
                  <div className="mb-6">
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                )}

                {/* Checkbox */}
                {showCheckbox && (
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="modal-checkbox"
                      checked={checkboxChecked}
                      onChange={(e) => onCheckboxChange(e.target.checked)}
                      className="mr-2 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="modal-checkbox"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {checkboxText}
                    </label>
                  </div>
                )}

                {/* Buttons */}
                <div
                  className={`flex ${
                    buttonText2 ? "justify-between" : "justify-end"
                  }`}
                >
                  {buttonText2 && (
                    <button
                      onClick={onButtonClick2}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      {buttonText2}
                    </button>
                  )}
                  <button
                    onClick={onButtonClick1}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {buttonText1}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
