import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LogInModal from "./Common/LogInModal";
import user_avtar from "../assets/user_avtar.png";
import { addCommentAPI, addReplyAPI } from "../Service/API/CommentAPI";
import toast from "react-hot-toast";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

function Comment({ blogId, comments, setComments }) {
  const [newComment, setNewComment] = useState("");
  const [showLogInModal, setLogInModal] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  const handleComment = async () => {
    if (!token) {
      setLogInModal(true);
      return;
    }
    const toastId = toast.loading("Adding comment...");
    try {
      const response = await addCommentAPI(
        {
          userId: user.userId,
          blogId,
          content: newComment,
          parentComment: null,
        },
        token
      );
      toast.dismiss(toastId);
      if (response.data.success) {
        setComments([...comments, response.data.data]);
        setNewComment("");
      }
    } catch (error) {
      toast.dismiss(toastId);
    }
  };

  async function handleAddLike(commentId) {}
  function handleReply(commentId) {
    setShowReplyInput(true);
  }

  async function handleAddReply(commentId) {
    if (!token) {
      setLogInModal(true);
      return;
    }
    const toastId = toast.loading("Adding reply...");
    try {
      const response = await addReplyAPI(
        {
          userId: user.userId,
          blogId,
          reply: replyInput,
          parentComment: commentId,
        },
        token
      );
      // console.log("Reply Response : " + JSON.stringify(response));
      toast.dismiss(toastId);
      if (response.data.success) {
        setComments(updatedComments);
        setReplyInput("");
        setShowReplyInput(false);
      }
    } catch (error) {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="bg-gray-800 mt-10 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        {`Comments (${comments.length})`}
      </h2>
      {/* Parent Comment */}
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex items-start space-x-4 mt-4 p-3 bg-gray-900 rounded-lg"
        >
          <img
            src={user_avtar}
            alt="user_image"
            className="w-10 h-10 rounded-full border-2 border-blue-400"
          />
          <div className="w-full">
            <p className="text-blue-300 font-semibold">
              {`${comment?.userDetail?.firstName || ""} ${
                comment?.userDetail?.lastName || ""
              }`}
            </p>
            <p className="text-gray-300">{comment?.content}</p>
            {/* Like and Reply and view reply*/}
            <div className="flex items-center space-x-4 mt-2">
              {/* <span className="flex items-center text-gray-400">
                <BiSolidLike
                  className="mt-1 mr-2 cursor-pointer hover:text-blue-400"
                  onClick={() => handleAddLike(comment._id)}
                />
                {comment?.likes}
              </span> */}
              <span
                className="cursor-pointer text-blue-300 hover:text-blue-500"
                onClick={() => handleReply(comment._id)}
              >
                Reply
              </span>
              {Array.isArray(comment?.replies) &&
                comment?.replies.length > 0 && (
                  <span
                    onClick={() => setShowReplies(!showReplies)}
                    className="cursor-pointer text-blue-300 hover:text-blue-500"
                  >
                    {showReplies
                      ? `Hide Replies`
                      : `View ${comment?.replies.length} Replies`}
                  </span>
                )}
            </div>
            {/* Reply Input */}
            {showReplyInput && (
              <div className="mt-4 flex flex-col bg-gray-800 p-3 rounded-lg relative">
                <TiDeleteOutline
                  onClick={() => setShowReplyInput(false)}
                  className="absolute right-2 text-xl font-semibold text-red-500 cursor-pointer"
                />
                <textarea
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Reply..."
                  className="w-full mt-2 px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAddReply(comment._id)}
                  className="mt-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md px-4 py-1 border border-blue-900 shadow-md self-end cursor-pointer"
                >
                  Send
                </button>
              </div>
            )}
            {/* Replies */}
            {showReplies && (
              <div className="mt-4 flex flex-col bg-gray-800 p-3 rounded-lg">
                {comment?.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="flex items-start space-x-4 mt-4 p-3 bg-gray-900 rounded-lg"
                  >
                    <img
                      src={user_avtar}
                      alt="user_image"
                      className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />
                    <div className="w-full">
                      <p className="text-blue-300 font-semibold">
                        {`${reply?.userDetail?.firstName || ""} ${
                          reply?.userDetail?.lastName || ""
                        }`}
                      </p>
                      <p className="text-gray-300">{reply?.content}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center text-gray-400">
                          <BiSolidLike
                            className="mt-1 mr-2 cursor-pointer hover:text-blue-400"
                            onClick={() => handleAddLike(reply._id)}
                          />
                          {reply?.likes}
                        </span>
                        <span
                          className="cursor-pointer text-blue-300 hover:text-blue-500"
                          onClick={() => handleReply(reply._id)}
                        >
                          Reply
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Add Comment */}
      <div className="mt-4 flex items-center bg-gray-900 p-3 rounded-lg">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
        <div className="ml-2 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white rounded-full p-3 shadow-md flex items-center justify-center">
          <FaArrowUpLong className="text-2xl" onClick={handleComment} />
        </div>
      </div>
      {/* If not log in */}
      {showLogInModal && (
        <LogInModal
          showLogInModal={showLogInModal}
          setLogInModal={setLogInModal}
        />
      )}
    </div>
  );
}

export default Comment;
