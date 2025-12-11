import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import LinkModal from "./LinkModal";
import { useState } from "react";

function Toolbar({ editor, onImageUpload, darkMode }) {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const activeBg = darkMode ? "bg-gray-700" : "bg-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const containerBorder = darkMode
    ? "border-gray-700 bg-gray-800 text-gray-200"
    : "border-gray-200 bg-gray-50 text-gray-700";
  const groupBorder = darkMode ? "border-gray-600" : "border-gray-300";

  if (!editor) {
    return null;
  }

  const handleAddLink = (text, url) => {
    if (url) {
      // Check if there is any text currently selected
      const { from, to } = editor.state.selection;
      const isTextSelected = from !== to;

      if (isTextSelected) {
        // If text is selected, wrap it with the link
        editor.chain().focus().setLink({ href: url }).run();
      } else {
        // If no text is selected, insert a new link with the provided text (or URL as a fallback)
        const linkText = text || url;
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${url}">${linkText}</a>`)
          .run();
      }
    }
    setShowLinkModal(false); // Close the modal after handling the link
  };

  const addCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const toggleHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className={`flex flex-wrap gap-2 p-4 border-b ${containerBorder}`}>
      <div className={`flex items-center border-r ${groupBorder} pr-2 mr-2`}>
        <button
          onClick={() => toggleHeading(1)}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("heading", { level: 1 }) ? activeBg : ""
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => toggleHeading(2)}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("heading", { level: 2 }) ? activeBg : ""
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => toggleHeading(3)}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("heading", { level: 3 }) ? activeBg : ""
          }`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
      </div>
      <div className={`flex items-center border-r ${groupBorder} pr-2 mr-2`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("bold") ? activeBg : ""
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("italic") ? activeBg : ""
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("underline") ? activeBg : ""
          }`}
          title="Underline"
        >
          <Underline size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("strike") ? activeBg : ""
          }`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
      </div>
      <div className={`flex items-center border-r ${groupBorder} pr-2 mr-2`}>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("code") ? activeBg : ""
          }`}
          title="Inline Code"
        >
          <Code size={18} />
        </button>
        <button
          onClick={addCodeBlock}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("codeBlock") ? activeBg : ""
          }`}
          title="Code Block"
        >
          <FileCode size={18} />
        </button>
      </div>
      <div className={`flex items-center border-r ${groupBorder} pr-2 mr-2`}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("bulletList") ? activeBg : ""
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("orderedList") ? activeBg : ""
          }`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("blockquote") ? activeBg : ""
          }`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
      </div>
      <div className={`flex items-center border-r ${groupBorder} pr-2 mr-2`}>
        <button
          onClick={() => setShowLinkModal(true)} // Open the modal on click
          className={`p-2 rounded-md ${hoverBg} ${
            editor.isActive("link") ? activeBg : ""
          }`}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={onImageUpload}
          className={`p-2 rounded-md ${hoverBg}`}
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-md ${hoverBg} disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-md ${hoverBg} disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
      {showLinkModal && (
        <LinkModal
          onClose={() => setShowLinkModal(false)}
          onSubmit={handleAddLink}
        />
      )}
    </div>
  );
}

export default Toolbar;
