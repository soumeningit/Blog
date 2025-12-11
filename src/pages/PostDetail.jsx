import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostById, getPostsByCategory } from "../data/posts";
import { getCommentsByPostId } from "../data/comments";
import { getAISummary } from "../data/aiData";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  MessageSquare,
  Share2,
  Bookmark,
  ThumbsUp,
  Send,
  Bot,
  Tag,
  Heart,
} from "lucide-react";
import CommentSection from "../components/CommentSection";
import RecommendedPosts from "../components/RecommendPosts";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const postData = getPostById(id);
        if (postData) {
          setPost(postData);
          setComments(getCommentsByPostId(id));
          setAiSummary(getAISummary(id));

          // Get related posts from the same category
          const related = getPostsByCategory(postData.category)
            .filter((p) => p.id !== parseInt(id))
            .slice(0, 3);
          setRelatedPosts(related);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
              <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full flex items-center"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {post.readingTime} min read
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  liked
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Heart size={18} className={liked ? "fill-current" : ""} />
                {liked ? "Liked" : "Like"}
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  bookmarked
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Bookmark
                  size={18}
                  className={bookmarked ? "fill-current" : ""}
                />
                {bookmarked ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </motion.header>

          {/* Cover Image */}
          <motion.div
            className="aspect-video overflow-hidden rounded-2xl mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* AI Summary */}
          <motion.div
            className="glass rounded-2xl p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Bot className="text-primary-600 mr-2" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                AI Summary
              </h3>
            </div>

            {showSummary ? (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {aiSummary}
                </p>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Hide Summary
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSummary(true)}
                className="btn-primary"
              >
                Generate AI Summary
              </button>
            )}
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CommentSection postId={post.id} comments={comments} />
          </motion.div>

          {/* Recommended Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RecommendedPosts posts={relatedPosts} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
