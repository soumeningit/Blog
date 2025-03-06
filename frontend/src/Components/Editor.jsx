import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { getCategories } from "../Service/API/CategoryAPI";
import { getSubCategories } from "../Service/API/SubCategoryAPI";
import { createBlogAPI } from "../Service/API/BlogAPI";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";

function Editor({ placeholder }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const editor = useRef(null);
  const navigate = useNavigate();
  const [contentDetails, setContentDetails] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    subCategory: [],
  });

  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  async function fetchSubCategories(categoryId) {
    try {
      if (!categoryId) return;
      const response = await getSubCategories(token, categoryId);
      if (response.data.success) {
        setSubCategories(response.data.subCategories);
      }
    } catch (error) {
      console.log("Error in fetchSubCategories : ", error);
    }
  }

  function handleSubCategoryChange(id, name) {
    setContentDetails((prev) => {
      if (prev.subCategory.some((sub) => sub.id === id)) return prev;
      return {
        ...prev,
        subCategory: [...prev.subCategory, { name, id }],
      };
    });
  }

  function removeSubCategory(id) {
    setContentDetails((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((sub) => sub.id !== id),
    }));
  }

  async function submitContent(e) {
    e.preventDefault();
    console.log("contentDetails : " + JSON.stringify(contentDetails));
    if (contentDetails.description.trim().split(/\s+/).length > 50) {
      setError("Description should not be more than 50 words.");
      return;
    }
    const toastId = toast.loading("Creating blog...");
    try {
      const response = await createBlogAPI(contentDetails, token);
      toast.dismiss(toastId);
      console.log("response : " + JSON.stringify(response));
      if (response.data.success) {
        toast.success("Blog created successfully");
        navigate(`/dashboard/file-upload/${response.data.data._id}`);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Error in submitContent : ", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories(token);
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error in fetchCategories : ", error);
      }
    }
    fetchCategories();
  }, []);

  // async function handleImageUpload() {
  //   console.log("file : " + file);
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("thumbnail", file);
  //   formData.append("userId", user.userId);
  // }
  return (
    <>
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md border bg-white">
        <h2 className="text-2xl font-semibold mb-4">Text Editor</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-600 font-semibold">*</span>
        </label>
        <input
          type="text"
          name="title"
          onChange={(e) =>
            setContentDetails({ ...contentDetails, title: e.target.value })
          }
          placeholder="Enter a title..."
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        <textarea
          name="description"
          onChange={(e) =>
            setContentDetails({
              ...contentDetails,
              description: e.target.value,
            })
          }
          placeholder="Write a brief description (max 50 words)..."
          required
          className="w-full p-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Thumbnail <span className="text-red-600 font-semibold">*</span>
        <span className="text-sm text-red-500 ml-2">
          Supported Format:.jpg,jpeg,.png
        </span>
      </label>
      <div className="flex items-center gap-2 relative">
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full p-2 border rounded-md mb-4 pr-10" // Add padding-right to avoid text overlap
        />
        <IoCloudUploadOutline
          className="absolute right-2 top-1/2 transform -translate-y-4 h-4"
          onClick={handleImageUpload}
        />
      </div> */}

        <select
          name="category"
          onChange={(e) => {
            setContentDetails({
              ...contentDetails,
              category: e.target.value,
              subCategory: [],
            });
            fetchSubCategories(e.target.value);
          }}
          required
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {contentDetails.category && (
          <>
            <select
              onChange={(e) => {
                const selectedSub = subCategories.find(
                  (sub) => sub._id === e.target.value
                );
                if (selectedSub)
                  handleSubCategoryChange(selectedSub._id, selectedSub.name);
              }}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select a Sub Category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {contentDetails.subCategory.map((data) => (
                <span
                  key={data.id}
                  className="px-3 py-1 cursor-pointer bg-gray-200 text-sm rounded-full flex items-center gap-2"
                >
                  {data.name}
                  <button
                    onClick={() => removeSubCategory(data.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-base"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </>
        )}

        <JoditEditor
          ref={editor}
          value={contentDetails.content}
          config={{
            readonly: false,
            placeholder: placeholder || "Start typing...",
            height: 300,
          }}
          onChange={(value) =>
            setContentDetails({ ...contentDetails, content: value })
          }
          className="w-full border rounded-md bg-white text-sm"
        />

        <button
          onClick={submitContent}
          className="mt-4 w-full py-3 bg-blue-600 cursor-pointer text-white font-medium text-lg rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      {/* {showFileUpload && (
        <FileUpload
          showFileUpload={showFileUpload}
          setShowFileUpload={setShowFileUpload}
          blogId={blogId}
        />
      )} */}
    </>
  );
}

export default Editor;
