import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock4, Folder, User } from "lucide-react";
import { formateDate } from "../../utils/DateFormatter";
import { getBlogByIdAPI } from "../../service/operations/GeneralOpern";
import CommentSection from "../../components/CommentSection";
import ShareButtons from "../../components/ShareButtons";
import RelatedPosts from "../../components/RelatedPosts";
import AISummary from "../../components/AISummary";

function ShowDetails() {
  const { postId } = useParams();
  console.log("Post ID from URL:", postId);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBlogByIdAPI(postId);
        if (response.status === 200) {
          setPost(response.data.data.post);
        } else {
          throw new Error("Failed to fetch post details.");
        }
      } catch (err) {
        console.error("Error fetching post for author:", err);
        setError(err.message || "Could not load post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

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

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-gray-600 mb-4">{error || "Post not found."}</p>
          <Link to="/dashboard" className="text-purple-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // --- Render the post details for the author ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Edit Button for Author */}
        <div className="flex justify-end mb-4">
          <Link
            to={`/dashboard/edit-post/${post._id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-file-pen-line-icon lucide-file-pen-line"
            >
              <path d="m18.226 5.226-2.52-2.52A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.351" />
              <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              <path d="M8 18h1" />
            </svg>
            Edit Post
          </Link>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/dashboard" className="text-purple-600 hover:underline">
                Dashboard
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
              <CalendarDays /> {formateDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock4 /> {post.readingTime} min read
            </span>
            <span className="flex items-center gap-2">
              <Folder /> {post.categories[0]?.name}
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
        <AISummary postId={post.id} />

        {/* Post Content */}
        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Share Buttons */}
        <ShareButtons post={post} />

        {/* Author Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold">{post.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Passionate writer and tech enthusiast. Sharing knowledge to help
                others grow.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <RelatedPosts currentPost={post} />

        {/* Comments Section */}
        <CommentSection comments={post.comments || []} postId={post._id} />
      </div>
    </motion.div>
  );
}

export default ShowDetails;
