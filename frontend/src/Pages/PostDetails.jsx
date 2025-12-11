import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CommentSection from "../components/CommentSection";
import ShareButtons from "../components/ShareButtons";
import RelatedPosts from "../components/RelatedPosts";
import AISummary from "../components/AISummary";
import AuthorDetailsModal from "../components/dashboard/AuthorDetailsModal";
import { getBlogByIdAPI } from "../service/operations/GeneralOpern";
import { formateDate } from "../utils/DateFormatter";
import {
  Bookmark,
  CalendarDays,
  Clock4,
  Copy,
  Folder,
  Heart,
  User,
  UserPlus,
  CheckCircle,
  Share2,
} from "lucide-react";
import { useToast } from "../components/ToastProvider";
import { useAuth } from "../contexts/AuthContext";
import {
  likePostAPI,
  savePostAPI,
  followAuthorAPI,
} from "../service/operations/ContentOpern";
import { useView } from "../contexts/ViewContext";
import ShareModal from "../components/ShareModal";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const toast = useToast();
  const auth = useAuth().getValue();
  const token = auth?.token || null;
  const userId = auth?.user?.id || auth?.user?.userId || null;

  const { handleView } = useView();

  const [showAuthorDetailsModal, setShowAuthorDetailsModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setTimeout(() => {
      handleView(id);
    }, 5000);
  }, [id]);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const response = await getBlogByIdAPI(id, userId);
        if (response.status === 200) {
          const fetched = response.data.data.post;
          setPost(fetched);
          // initialize states if backend provides flags
          setLiked(Boolean(fetched.isLiked || fetched.likedByCurrentUser));
          setBookmarked(Boolean(fetched.isSaved || fetched.savedByCurrentUser));
          setFollowing(Boolean(fetched.isFollowingAuthor || false));
          setComments(response.data.data.comments || []);
          setRelatedPosts(response.data.data.relatedPosts || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // Handlers for actions
  const handleLikeClick = async () => {
    if (!token) {
      toast.info("Please log in to like posts.");
      return;
    }

    // optimistic toggle
    setLiked((prev) => {
      const newVal = !prev;
      setPost((p) => ({
        ...p,
        likesCount: (p.likesCount || 0) + (newVal ? 1 : -1),
      }));
      return newVal;
    });

    try {
      const resp = await likePostAPI(token, { postId: post._id });
      toast.success(resp?.data?.message || "Updated like status");
    } catch (err) {
      console.error(err);
      // revert on error
      setLiked((prev) => {
        const newVal = !prev;
        setPost((p) => ({
          ...p,
          likesCount: (p.likesCount || 0) + (newVal ? 1 : -1),
        }));
        return newVal;
      });
      toast.error(err.response?.data?.message || "Could not update like.");
    }
  };

  const handleSaveClick = async () => {
    if (!token) {
      toast.info("Please log in to save posts.");
      return;
    }
    setBookmarked((prev) => !prev);
    try {
      const resp = await savePostAPI(token, { postId: post._id });
      toast.success(resp?.data?.message || "Saved post");
    } catch (err) {
      console.error(err);
      setBookmarked((prev) => !prev);
      toast.error(err.response?.data?.message || "Could not save post.");
    }
  };

  const handleFollowClick = async () => {
    if (!token) {
      toast.info("Please log in to follow authors.");
      return;
    }

    const authorId =
      post?.author?.id ||
      post?.author?._id ||
      post?.authorId ||
      post?.author ||
      null;
    if (!authorId) {
      toast.error("Unable to determine author id to follow.");
      return;
    }

    try {
      const resp = await followAuthorAPI(token, { authorId });
      if (resp && resp.status === 200) {
        setFollowing(true);
        toast.success(resp.data?.message || "Following author");
      } else {
        toast.error(resp?.data?.message || "Could not follow author.");
      }
    } catch (err) {
      console.error("Follow error:", err);
      toast.error(err.response?.data?.message || "Could not follow author.");
    }
  };

  function handleShowAuthorDetails(username) {
    setShowAuthorDetailsModal(true);
  }

  function handleCopyUserName(username) {
    navigator.clipboard.writeText(`@${username}`);
    setCopiedField("username");
    toast.show({
      type: "success",
      message: "Username copied to clipboard!",
      duration: 2000,
    });
    setTimeout(() => setCopiedField(null), 2000);
  }

  function handleShare() {
    setShareUrl(window.location.href);
    setShowShareModal(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="skeleton h-8 w-3/4 mb-4 rounded"></div>
          <div className="skeleton h-4 w-1/2 mb-8 rounded"></div>
          <div className="skeleton h-96 mb-8 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="skeleton h-4 w-full rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
            <div className="skeleton h-4 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-purple-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-purple-600 hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/categories"
                className="text-purple-600 hover:underline"
              >
                Categories
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={`/categories/${post.categories[0]?.name.toLowerCase()}`}
                className="text-purple-600 hover:underline"
              >
                {post.categories[0]?.name || post.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-600">{post.title}</li>
          </ol>
        </nav>

        {/* Post Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <User /> {post.author.name}
            </span>
            <span className="flex items-center gap-2">
              <span>
                <CalendarDays />
              </span>{" "}
              {formateDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <span>
                <Clock4 />
              </span>{" "}
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-2">
              <span>
                <Folder />
              </span>{" "}
              {post.categories[0]?.name}
            </span>
            <span className="flex items-center gap-2">
              <button
                onClick={handleLikeClick}
                className={`inline-flex items-center gap-2 ${
                  liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
                aria-pressed={liked}
              >
                <Heart /> {post.likesCount || 0} Likes
              </button>
            </span>

            <span className="flex items-center gap-2">
              <button
                onClick={handleSaveClick}
                className={`inline-flex items-center gap-2 ${
                  bookmarked
                    ? "text-yellow-500"
                    : "text-gray-600 hover:text-yellow-500"
                }`}
                aria-pressed={bookmarked}
              >
                <Bookmark /> {bookmarked ? "Saved" : "Save"}
              </button>
            </span>
            <span className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <Share2 /> Share
              </button>
            </span>
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={post.heroSectionImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* AI Summary */}
        <AISummary postId={id || post._id} />

        {/* Post Content */}
        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Share Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
          >
            Share this Post
          </motion.button>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative glass rounded-2xl p-6 mb-12 border border-white/20 dark:border-gray-700/30"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-red-600/5 rounded-2xl" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {post?.authorDetails?.profilePic ? (
                  <img
                    src={post?.authorDetails?.profilePic}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-purple-600 dark:border-purple-500 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-3 border-purple-600 dark:border-purple-500 shadow-lg">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {post.author.name}
                </h3>

                {/* Username with copy button */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <button
                    onClick={() =>
                      handleShowAuthorDetails(post?.authorDetails?.username)
                    }
                    className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline transition-colors cursor-pointer"
                  >
                    @{post?.authorDetails?.username || ""}
                  </button>
                  <button
                    onClick={() =>
                      handleCopyUserName(post?.authorDetails?.username)
                    }
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    title="Copy username"
                  >
                    {copiedField === "username" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Email */}
                {post?.authorDetails?.email && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {post?.authorDetails?.email}
                  </p>
                )}

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {post?.authorDetails?.about ||
                    "Passionate writer. Sharing knowledge to help others grow."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-col gap-3 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleShowAuthorDetails(post?.authorDetails?.username)
                  }
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md whitespace-nowrap"
                >
                  View Profile
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFollowClick}
                  className={`px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 shadow-md whitespace-nowrap ${
                    following
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <UserPlus className="inline mr-2 w-4 h-4" />
                  {following ? "Following" : "Follow"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Author Details Modal */}
        <AuthorDetailsModal
          isOpen={showAuthorDetailsModal}
          authorDetails={post?.authorDetails}
          onClose={() => setShowAuthorDetailsModal(false)}
        />

        {/* Related Posts */}
        <RelatedPosts relatedPosts={relatedPosts} />

        {/* Comments Section */}
        <CommentSection comments={comments} postId={post._id} />
      </div>
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          shareURL={shareUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </motion.div>
  );
}

export default PostDetails;
