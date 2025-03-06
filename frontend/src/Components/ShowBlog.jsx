import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addBookMarkAPI, getBlogByIdAPI } from "../Service/API/BlogAPI";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import Comment from "./Comment";
import user_avtar from "../assets/user_avtar.png";
import { useSelector } from "react-redux";
import { addLikeAPI } from "../Service/API/BlogAPI";
import BookMarkLikeModal from "./Common/BookMarkLikeModal";

const similarBlogs = [
  { _id: 1, title: "Blog 1", description: "Description 1" },
  { _id: 2, title: "Blog 2", description: "Description 2" },
  { _id: 3, title: "Blog 3", description: "Description 3" },
  { _id: 4, title: "Blog 4", description: "Description 4" },
];

function ShowBlog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [isalreadyLiked, setIsAlreadyLiked] = useState(false);
  const [isalReadyBookMarked, setIsAlreadyBookMarked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [value, setValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogByIdAPI(id);
        console.log("Blog Response : " + JSON.stringify(response));
        if (response.data.success) {
          setData(response.data.data);
          setComments(response.data.data.comments);
          const like = response.data.data.likes;
          console.log("Likes : " + JSON.stringify(like));
          const bookmark = response.data.data.bookmarkedBy;
          if (like.length > 0) {
            const isLiked = like.map((item) => item._id).includes(user.userId);
            if (isLiked) {
              setIsAlreadyLiked(true);
            }
          }
          if (bookmark.length > 0) {
            const isBookMarked = bookmark.includes(user.userId);
            if (isBookMarked) {
              setIsAlreadyBookMarked(true);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  async function handleAddLike() {
    const data = {
      blogId: id,
      userId: user.userId,
    };
    try {
      const response = await addLikeAPI(data, token);
      console.log("Like Response : " + JSON.stringify(response));
      if (response.data.success) {
        setIsAlreadyLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddBookMark() {
    const data = {
      blogId: id,
      userId: user.userId,
    };
    try {
      const response = await addBookMarkAPI(data, token);
      console.log("Bookmark Response : " + JSON.stringify(response));
      if (response.data.success) {
        setIsAlreadyBookMarked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveBookMark() {
    setShowModal(true);
    setText("Are you sure you want to remove bookmark?");
    setFunctionName("handleRemoveBookMark");
    const data = {
      blogId: id,
      userId: user.userId,
    };
    setValue(data);
  }

  async function handleRemoveLike() {
    setShowModal(true);
    setText("Are you sure you want to remove like?");
    setFunctionName("handleRemoveLike");
    const data = {
      blogId: id,
      userId: user.userId,
    };
    setValue(data);
  }

  if (!data) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row justify-center p-6 space-y-6 md:space-y-0 md:space-x-6 min-h-screen text-gray-200 bg-gradient-to-b from-blue-900 to-gray-900 overflow-x-hidden">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full md:w-3/5 overflow-y-auto">
        {/* Blog Section */}
        <div className="">
          <h1 className="text-4xl font-bold text-blue-400">{data.title}</h1>
          <div className="flex flex-col space-x-4 mt-4">
            <img
              src={data.userDetail.image || user_avtar}
              alt="user_image"
              className="w-12 h-12 rounded-full border-2 border-blue-400"
            />
            <div className="text-gray-300 text-lg">
              <span className="font-semibold text-white">
                {data.userDetail.firstName} {data.userDetail.lastName}
              </span>
              <span className="mx-2 text-blue-300">|</span>
              <span className="text-blue-200">
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-4">
            <button className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg shadow-md cursor-pointer">
              {isalReadyBookMarked ? (
                <FaBookmark className="mr-2" onClick={handleRemoveBookMark} />
              ) : (
                <FaRegBookmark className="mr-2" onClick={handleAddBookMark} />
              )}
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg shadow-md cursor-pointer">
              {isalreadyLiked ? (
                <BiSolidLike className="mr-2" onClick={handleRemoveLike} />
              ) : (
                <BiLike className="mr-2" onClick={handleAddLike} />
              )}
            </button>
            {showModal && (
              <BookMarkLikeModal
                showModal={showModal}
                setShowModal={setShowModal}
                text={text}
                value={value}
                functionName={functionName}
                setIsAlreadyBookMarked={setIsAlreadyBookMarked}
                setIsAlreadyLiked={setIsAlreadyLiked}
              />
            )}
          </div>

          {/* Blog Content */}
          <p className="mt-6 text-gray-300 leading-relaxed">
            {data.description}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="text-gray-300 mt-4"
          />
        </div>
        {/* Comments Section */}
        <Comment blogId={id} comments={comments} setComments={setComments} />
      </div>

      {/* Similar Blogs */}
      <div className="w-full md:w-2/5 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-400">Similar Blogs</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-4">
          {similarBlogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 bg-gray-700 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-blue-300">{blog.title}</h3>
              <p className="text-gray-300">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowBlog;
