import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "./ToastProvider";
import { generateSummaryAPI } from "../service/operations/LLMOpern";

function AISummary({ postId }) {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const authData = useAuth().getValue();
  const token = authData?.token;
  const toast = useToast();

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const response = await generateSummaryAPI(postId, token);
      console.log("Summary Response:", response);
      setLoading(false);
      if (response.status === 200) {
        setSummary(response.data.summary);
        setShowSummary(true);
        toast.success("Summary generated successfully!", "success");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setLoading(false);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <span>🤖</span> AI Summary
          </h3>
          {!showSummary && (
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Summary"}
            </button>
          )}
        </div>

        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
          >
            <p className="text-gray-700 dark:text-gray-300">{summary}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default AISummary;
