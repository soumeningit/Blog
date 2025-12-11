// import { Node, mergeAttributes } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import { NodeViewWrapper } from '@tiptap/react';
// import React, { useState, useRef } from 'react';
// import { X, Maximize2 } from 'lucide-react';

// const ImageResizeComponent = ({ node, updateAttributes, deleteNode }) => {
//     const [isResizing, setIsResizing] = useState(false);
//     const [width, setWidth] = useState(node.attrs.width || '100%');
//     const containerRef = useRef(null);

//     const handleResizeStart = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setIsResizing(true);

//         const startX = e.clientX;
//         const startWidth = containerRef.current.offsetWidth;

//         const handleResize = (e) => {
//             const newWidth = startWidth + (e.clientX - startX);
//             if (newWidth > 100) {
//                 setWidth(`${newWidth}px`);
//             }
//         };

//         const handleResizeEnd = () => {
//             setIsResizing(false);
//             document.removeEventListener('mousemove', handleResize);
//             document.removeEventListener('mouseup', handleResizeEnd);
//             updateAttributes({ width });
//         };

//         document.addEventListener('mousemove', handleResize);
//         document.addEventListener('mouseup', handleResizeEnd);
//     };

//     const handleDelete = () => {
//         deleteNode();
//     };

//     const handleResetSize = () => {
//         setWidth('100%');
//         updateAttributes({ width: '100%' });
//     };

//     return (
//         <NodeViewWrapper className="relative inline-block my-4 w-full">
//             <div
//                 ref={containerRef}
//                 className="relative group"
//                 style={{ width }}
//             >
//                 <img
//                     src={node.attrs.src}
//                     alt={node.attrs.alt || ''}
//                     className="max-w-full h-auto rounded-md"
//                 />
//                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
//                     <button
//                         onClick={handleResetSize}
//                         className="bg-white rounded-full p-1 shadow-md"
//                         title="Reset size"
//                     >
//                         <Maximize2 size={16} />
//                     </button>
//                     <button
//                         onClick={handleDelete}
//                         className="bg-white rounded-full p-1 shadow-md"
//                         title="Delete image"
//                     >
//                         <X size={16} />
//                     </button>
//                 </div>
//                 <div
//                     className={`absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity ${isResizing ? 'opacity-100' : ''}`}
//                     onMouseDown={handleResizeStart}
//                 />
//             </div>
//         </NodeViewWrapper>
//     );
// };

// const ImageResize = Node.create({
//     name: 'image',

//     group: 'block',

//     draggable: true,

//     addAttributes() {
//         return {
//             src: {
//                 default: null,
//             },
//             alt: {
//                 default: null,
//             },
//             title: {
//                 default: null,
//             },
//             width: {
//                 default: '100%',
//             },
//         };
//     },

//     parseHTML() {
//         return [
//             {
//                 tag: 'img[src]',
//             },
//         ];
//     },

//     renderHTML({ HTMLAttributes }) {
//         return ['img', mergeAttributes(HTMLAttributes)];
//     },

//     addNodeView() {
//         return ReactNodeViewRenderer(ImageResizeComponent);
//     },
// });

// export default ImageResize;

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import React, { useState, useRef } from "react";
import { X, Maximize2 } from "lucide-react";

const ImageResizeComponent = ({ node, updateAttributes, deleteNode }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(node.attrs.width || "100%");
  const containerRef = useRef(null);

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = containerRef.current.offsetWidth;

    const handleResize = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 100) {
        setWidth(`${newWidth}px`);
      }
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
      updateAttributes({ width });
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleDelete = () => {
    deleteNode();
  };

  const handleResetSize = () => {
    setWidth("100%");
    updateAttributes({ width: "100%" });
  };

  return (
    <NodeViewWrapper className="relative inline-block my-4 w-full">
      <div ref={containerRef} className="relative group" style={{ width }}>
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className="max-w-full h-auto rounded-md"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <button
            onClick={handleResetSize}
            className="bg-white rounded-full p-1 shadow-md"
            title="Reset size"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white rounded-full p-1 shadow-md"
            title="Delete image"
          >
            <X size={16} />
          </button>
        </div>
        <div
          className={`absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity ${
            isResizing ? "opacity-100" : ""
          }`}
          onMouseDown={handleResizeStart}
        />
      </div>
    </NodeViewWrapper>
  );
};

const ImageResize = Node.create({
  name: "image",

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "100%",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  // THIS IS THE CRITICAL FIX
  // We are defining the `setImage` command here.
  addCommands() {
    return {
      setImage:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .insertContent({ type: this.name, attrs: attributes })
            .run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent);
  },
});

export default ImageResize;
