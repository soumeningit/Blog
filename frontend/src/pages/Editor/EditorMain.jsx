import { useState } from "react";
import Editor from "./Editor";
import "./styles.css";

function EditorMain() {
  const [content, setContent] = useState(
    `<h1>Welcome to the Tiptap Editor</h1>
    <p>This is a <strong>production-ready</strong> rich text editor built with React, TailwindCSS, and Tiptap. It combines the best features of Notion and Medium.</p>
    <h2>Key Features</h2>
    <p>You can format text in <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s>. You can also use <code>inline code</code> for snippets.</p>
    <h3>Lists and Quotes</h3>
    <p>Here are examples of lists:</p>
    <ul>
      <li>This is a bullet list.</li>
      <li>It's great for unordered items.</li>
    </ul>
    <ol>
      <li>This is an ordered list.</li>
      <li>Perfect for step-by-step instructions.</li>
    </ol>
    <blockquote>
      "This is a blockquote. It's useful for highlighting quotes or important information from other sources."
    </blockquote>
    <h2>Links and Images</h2>
    <p>You can add links, like this one to <a href="https://tiptap.dev">Tiptap's documentation</a>.</p>
    <p>Hovering over a link that points to an image, like <a href="https://picsum.photos/seed/tiptap/400/300.jpg">this one</a>, will show a preview.</p>
    <p>Images can be inserted and resized directly in the editor:</p>
    <img src="https://picsum.photos/seed/editor-demo/800/400.jpg" alt="Demo image" width="100%">
    <h2>Code Blocks</h2>
    <p>Here is a JavaScript code block with syntax highlighting:</p>
    <pre><code class="language-javascript">// A simple function to greet a user
function greet(name) {
  if (!name) {
    console.log('Hello, stranger!');
  } else {
    console.log(\`Hello, \${name}!\`);
  }
}

// Call the function
greet('World');</code></pre>
    <p>Start editing to see all the features in action!</p>`
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-screen flex flex-col" style={{ maxHeight: "90vh" }}>
          <Editor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}

export default EditorMain;
