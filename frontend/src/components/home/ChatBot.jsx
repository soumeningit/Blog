import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import bot from "../../assets/bot.png";
import { askBotAPI } from "../../service/operations/LLMOpern";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useEffect, useRef, useState } from "react";

// Helper function to render markdown-style text with formatting
const renderMessageContent = (text, darkMode) => {
  // Split by lines and process each line
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    // Handle bold text (**text**)
    const boldRegex = /\*\*(.+?)\*\*/g;
    const withBold = line.replace(boldRegex, "<strong>$1</strong>");

    // Handle numbered lists and bullet points
    if (line.match(/^\d+\./)) {
      // Numbered list
      return (
        <div key={idx} className="ml-4 my-1">
          <span dangerouslySetInnerHTML={{ __html: withBold }} />
        </div>
      );
    } else if (line.match(/^[\-\*]\s/)) {
      // Bullet point
      const content = line.replace(/^[\-\*]\s/, "");
      return (
        <div key={idx} className="ml-4 my-1">
          <span>• </span>
          <span
            dangerouslySetInnerHTML={{
              __html: content.replace(boldRegex, "<strong>$1</strong>"),
            }}
          />
        </div>
      );
    } else if (line.trim() === "") {
      // Empty line - add spacing
      return <div key={idx} className="my-1" />;
    } else {
      // Regular text
      return (
        <div key={idx} className="my-1">
          <span dangerouslySetInnerHTML={{ __html: withBold }} />
        </div>
      );
    }
  });
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm your AI assistant. Ask me anything about this blog or any topic you're interested in!",
    },
  ]);
  const messagesEndRef = useRef(null);
  const { darkMode } = useDarkMode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChat = async () => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: query,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsGenerating(true);

    try {
      const response = await askBotAPI(query);

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text:
          response?.data?.message ||
          response?.data?.response ||
          "Sorry, I couldn't process your request. Please try again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in Chat Bot:", error);
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        text: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <>
      {/* Chat Button (Floating) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-40 transition-colors ${
          darkMode
            ? "bg-primary-600 hover:bg-primary-700"
            : "bg-primary-500 hover:bg-primary-600"
        }`}
      >
        <img src={bot} alt="Chat Bot" className="h-6 w-6 rounded-full" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-96 max-w-[90vw] h-96 z-50 rounded-lg shadow-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                backgroundColor: darkMode ? "#111827" : "#f9fafb",
              }}
            >
              <div className="flex items-center gap-2">
                <img src={bot} alt="Bot" className="h-6 w-6 rounded-full" />
                <h3
                  className="font-semibold text-sm"
                  style={{ color: darkMode ? "#f3f4f6" : "#1f2937" }}
                >
                  AI Assistant
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded hover:bg-gray-200 ${
                  darkMode ? "hover:bg-gray-700" : ""
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ backgroundColor: darkMode ? "#1f2937" : "#ffffff" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed ${
                      msg.type === "user"
                        ? darkMode
                          ? "bg-primary-600 text-white"
                          : "bg-primary-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-100"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.type === "bot" ? (
                      <div className="space-y-0.5">
                        {renderMessageContent(msg.text, darkMode)}
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div className="flex gap-1">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          darkMode ? "bg-gray-400" : "bg-gray-500"
                        } animate-bounce`}
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className={`h-2 w-2 rounded-full ${
                          darkMode ? "bg-gray-400" : "bg-gray-500"
                        } animate-bounce`}
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className={`h-2 w-2 rounded-full ${
                          darkMode ? "bg-gray-400" : "bg-gray-500"
                        } animate-bounce`}
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-4 border-t"
              style={{ borderColor: darkMode ? "#374151" : "#e5e7eb" }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask something..."
                  disabled={isGenerating}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-primary-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChat}
                  disabled={isGenerating || !query.trim()}
                  className={`p-2 rounded-lg transition-colors ${
                    isGenerating || !query.trim()
                      ? darkMode
                        ? "bg-gray-700 text-gray-500"
                        : "bg-gray-200 text-gray-400"
                      : darkMode
                      ? "bg-primary-600 hover:bg-primary-700 text-white"
                      : "bg-primary-500 hover:bg-primary-600 text-white"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;
