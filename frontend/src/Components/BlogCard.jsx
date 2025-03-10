import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteModal from "./Common/DeleteModal";

function BlogCard({ image, title, description, likes, id, showEdit }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
      <a href="#">
        <img
          className="w-full h-32 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
          src={image}
          alt="Blog Thumbnail"
        />
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-200 hover:text-blue-500 cursor-pointer">
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

          {/* Edit Button */}
          {showEdit === true && (
            <CiEdit
              onClick={() => navigate(`/dashboard/edit-blog/${id}`)}
              className="text-gray-600 dark:text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-125"
            />
          )}

          {/* Delete Button */}
          <div
            onClick={() => setShowDeleteModal(true)}
            className="flex flex-col items-center justify-center h-6 w-6 rounded-full border-1 border-cyan-600 bg-red-200 hover:bg-red-400 transition-all duration-150 scale-105 cursor-pointer"
          >
            <AiTwotoneDelete className="text-xl text-red-600 dark:text-red-400 transition-transform duration-200 hover:scale-125" />
          </div>

          {/* Read More Button */}
          <button
            onClick={() => navigate(`/blog/${id}`)}
            className="px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            Read more
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          id={id}
          showDeleteModal={showDeleteModal}
          setDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}

export default BlogCard;
