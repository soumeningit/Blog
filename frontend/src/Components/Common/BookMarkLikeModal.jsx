import React from "react";
import toast from "react-hot-toast";
import { logOutAPI } from "../../Service/API/AuthAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { removeBookMarkAPI, removeLikeAPI } from "../../Service/API/BlogAPI";

function BookMarkLikeModal({
  showModal,
  setShowModal,
  text,
  value,
  functionName,
  setIsAlreadyBookMarked,
  setIsAlreadyLiked,
}) {
  const { token } = useSelector((state) => state.auth);

  async function handleRemoveBookMark() {
    try {
      console.log("Inside handleRemoveBookMark function" + value);
      const response = await removeBookMarkAPI(value, token);
      console.log("Remove BookMark Response : " + JSON.stringify(response));
      if (response.data.success) {
        setIsAlreadyBookMarked(false);
        toast.success("Bookmark removed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveLike = async () => {
    try {
      console.log("Inside handleRemoveLike function" + value);
      const response = await removeLikeAPI(value, token);
      console.log("Remove Like Response : " + JSON.stringify(response));
      if (response.data.success) {
        setIsAlreadyLiked(false);
        toast.success("Like removed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {text}
                </h3>
                <button
                  onClick={() => {
                    if (functionName === "handleRemoveBookMark") {
                      handleRemoveBookMark();
                    } else if (functionName === "handleRemoveLike") {
                      handleRemoveLike();
                    }
                    setShowModal(false);
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookMarkLikeModal;
