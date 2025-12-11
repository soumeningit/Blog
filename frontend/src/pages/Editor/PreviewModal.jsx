import { X } from "lucide-react";

function PreviewModal({ content, onClose, darkMode }) {
  // If `darkMode` is controlled by a provider, we also add the `dark` class
  // to the modal wrapper so Tailwind's `dark:` utilities apply inside it.
  const outerClass = darkMode ? "dark" : "";

  return (
    <div
      className={`${outerClass} fixed inset-0 flex items-center justify-center z-50 p-4`}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60" />

      <div className="relative bg-white dark:bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Preview
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close preview"
          >
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 prose prose-lg max-w-none text-gray-900 dark:text-gray-100 dark:prose-invert">
          {/* Apply the same .tiptap-content class here to ensure styles are applied. */}
          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
