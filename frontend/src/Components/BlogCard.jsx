import React from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

function BlogCard({ image, title, description, likes, id, showEdit }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="w-full h-32 object-cover rounded-t-lg"
          src={image}
          alt="Blog Thumbnail"
        />
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
          {description.split(" ").slice(0, 10).join(" ")}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ❤️ {likes.length} Likes
          </span>
          {showEdit === true && (
            <CiEdit
              onClick={() => navigate(`/dashboard/edit-blog/${id}`)}
              className="text-gray-600 dark:text-gray-400 cursor-pointer"
            />
          )}
          <button
            onClick={() => navigate(`/blog/${id}`)}
            className="px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
