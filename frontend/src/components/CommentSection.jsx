import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";
import { useToast } from "./ToastProvider";
import { createCommentAPI } from "../service/operations/ContentOpern";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../utils/DateFormatter";

function CommentSection({ postId, comments }) {
  const [newComment, setNewComment] = useState({ name: "", message: "" });
  const [commentList, setCommentList] = useState(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMoodal, setShowMoodal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const authData = useAuth().getValue();
  const token = authData?.token || null;
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      // keep modal for login action, but also show a toast notification
      toast.info("Please log in to post a comment.");
      setShowMoodal(true);
      return;
    }
    if (newComment.name.trim() && newComment.message.trim()) {
      setIsSubmitting(true);

      const commentData = {
        postId: postId,
        message: newComment.message,
        commentType: "text",
      };
      try {
        const response = await createCommentAPI(token, commentData);
        console.log("Create Comment Response:", response);
        if (response.status === 201) {
          setSuccessMessage(
            response.data.message || "Comment posted successfully!"
          );
          toast.success(
            response.data.message || "Comment posted successfully!"
          );
          setCommentList((prev) => [...prev, response.data.data]);
          setNewComment({ name: "", message: "" });
          setErrorMessage("");
        }
      } catch (error) {
        setIsSubmitting(false);
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while posting your comment. Please try again."
        );
        toast.error(
          error.response?.data?.message ||
            "An error occurred while posting your comment. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-primary-600 mr-2" size={24} />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Comments ({commentList.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={newComment.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <textarea
            name="message"
            value={newComment.message}
            onChange={handleInputChange}
            placeholder="Share your thoughts..."
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 btn-primary flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Post Comment
              </>
            )}
          </button>
          {/* {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} */}
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {commentList.length > 0 ? (
            commentList.map((comment, index) => (
              <motion.div
                key={comment._id}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {comment?.commentorDetails?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {comment?.commentorDetails?.name}
                      </h4>
                      <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                        {formateDate(comment?.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare
                size={48}
                className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={showMoodal}
        onClose={() => setShowMoodal(false)}
        title="Authentication Required"
        description={"To post a comment, you need to log in first"}
        buttonText1={"Go to Login"}
        onButtonClick1={() => {
          navigate("/auth/login");
        }}
      />
    </>
  );
}

export default CommentSection;
