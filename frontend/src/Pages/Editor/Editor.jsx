import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import ImageResize from "./ImageResize";
import lowlight from "./lowlightConfig";
import Toolbar from "./Toolbar";
import ImageModal from "./ImageModal";
import HoverPreview from "./HoverPreview";
import { useImagePreview } from "./useImagePreview";
import { Eye, Save } from "lucide-react";
import { fileUploadAPI } from "../../service/operations/ContentOpern";
import { useAuth } from "../../contexts/AuthContext";

function Editor({
  content,
  onChange,
  onSubmit,
  onPreview,
  isSubmitting,
  showSaveButton = true,
  showPreviewButton = true,
  darkMode,
}) {
  const [showImageModal, setShowImageModal] = React.useState(false);
  const { hoveredLink, mousePosition, handleMouseMove, handleMouseLeave } =
    useImagePreview();

  const authData = useAuth().getValue();
  const token = authData?.token;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: "text-blue-500 underline hover:text-blue-700",
          },
        },
      }),
      ImageResize,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "tiptap-content",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    handleKeyDown: ({ event }) => {
      if (event.key === "Tab") {
        event.preventDefault();
        if (editor.isActive("codeBlock")) {
          editor.chain().focus().insertContent("\t").run();
          return true;
        }
      }
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        if (editor.isActive("codeBlock")) {
          editor.chain().focus().outdent("codeBlock").run();
          return true;
        }
      }
      return false;
    },
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fileUploadAPI(token, formData);
    console.log("response : " + response);
    if (response.status === 200) {
      return response.data;
    }
  };

  const insertImage = async (file) => {
    try {
      const response = await handleImageUpload(file);
      if (response.url) {
        editor.chain().focus().setImage({ src: response.url }).run();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar with Preview and Save buttons */}
      <div
        className={`flex justify-end items-center gap-2 p-3 border-b ${
          darkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        {showPreviewButton && (
          <button
            onClick={onPreview} // Uses the onPreview prop
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Eye size={18} />
            Preview
          </button>
        )}
        {showSaveButton && (
          <button
            onClick={onSubmit} // Uses the onSubmit prop
            disabled={isSubmitting} // Disabled by the isSubmitting prop
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? ( // Shows loading text based on isSubmitting prop
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save
              </>
            )}
          </button>
        )}
      </div>

      <Toolbar
        editor={editor}
        onImageUpload={() => setShowImageModal(true)}
        darkMode={darkMode}
      />

      <div
        className={`flex-1 overflow-y-auto p-6 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <EditorContent
          editor={editor}
          className="tiptap-content prose prose-lg max-w-none focus:outline-none dark:prose-invert"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      {showImageModal && (
        <ImageModal
          onClose={() => setShowImageModal(false)}
          onUpload={insertImage}
        />
      )}
      {hoveredLink && (
        <HoverPreview url={hoveredLink} mousePosition={mousePosition} />
      )}
    </div>
  );
}

export default Editor;
