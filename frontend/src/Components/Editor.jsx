import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { getCategories } from "../Service/API/CategoryAPI";
import { getSubCategories } from "../Service/API/SubCategoryAPI";
import { createBlogAPI, thumbnailUploadAPI } from "../Service/API/BlogAPI";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Editor({ placeholder }) {
  const { token, user } = useSelector((state) => state.auth);
  const editor = useRef(null);
  const navigate = useNavigate();

  const [thumbnailUploadData, setThumbnailUploadData] = useState();
  const [contentDetails, setContentDetails] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    subCategory: [],
    contentId: "",
  });

  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [file, setFile] = useState(null);

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
    const wordCount = contentDetails.description
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    if (wordCount > 50) {
      setError("Description should not be more than 50 words.");
      return;
    }

    const toastId = toast.loading("Creating blog...");
    try {
      const response = await createBlogAPI(contentDetails, token);
      if (response.data.success) {
        toast.success("Blog created successfully");
        // navigate(`/dashboard/file-upload/${response.data.data._id}`);
      }
    } catch (error) {
      console.log("Error in submitContent : ", error);
      toast.error("Failed to create blog.");
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
  }, [token]);

  async function handleImageUpload() {
    if (!file) return;
    const formData = new FormData();
    formData.append("thumbnail", file);
    formData.append("userId", user?.userId);
    formData.append("title", contentDetails.title);
    formData.append("description", contentDetails.description);
    formData.append("profile", user?.additionalDetails);

    try {
      const response = await thumbnailUploadAPI(formData, token);
      if (response.data.success) {
        setContentDetails({
          ...contentDetails,
          thumbnail: response.data.data.thumbnail,
          contentId: response.data.data._id,
        });
        setThumbnailUploadData(response.data.data);
        toast.success("Thumbnail uploaded successfully");
      }
    } catch (error) {
      console.log("Error in handleImageUpload : ", error);
      toast.error("Thumbnail upload failed");
    }
  }

  const isSubmitDisabled =
    !contentDetails.title ||
    !contentDetails.description ||
    !contentDetails.content ||
    !contentDetails.category ||
    !file;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md border bg-white">
        <h2 className="text-2xl font-semibold mb-4">Text Editor</h2>

        {/* Title */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-600 font-semibold">*</span>
        </label>
        <input
          type="text"
          name="title"
          onChange={(e) =>
            setContentDetails({ ...contentDetails, title: e.target.value })
          }
          value={contentDetails.title}
          placeholder="Enter a title..."
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-600 font-semibold">*</span>
        </label>
        <textarea
          name="description"
          onChange={(e) =>
            setContentDetails({
              ...contentDetails,
              description: e.target.value,
            })
          }
          value={contentDetails.description}
          placeholder="Write a brief description (max 50 words)..."
          required
          className="w-full p-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Thumbnail Upload */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Thumbnail <span className="text-red-600 font-semibold">*</span>
          <span className="text-sm text-red-500 ml-2">
            Supported Format: .jpg, .jpeg, .png
          </span>
        </label>
        <div className="flex items-center gap-2 relative">
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full p-2 border rounded-md mb-4 pr-10 cursor-pointer"
          />
          <IoCloudUploadOutline
            className="absolute right-2 top-1/2 transform -translate-y-4 h-4 cursor-pointer"
            onClick={handleImageUpload}
          />
        </div>

        {/* Category */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category <span className="text-red-600 font-semibold">*</span>
        </label>
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

        {/* Sub Category */}
        {contentDetails.category && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Sub category{" "}
              <span className="text-red-600 font-semibold">*</span>
            </label>
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
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full flex items-center gap-2"
                >
                  {data.name}
                  <button
                    onClick={() => removeSubCategory(data.id)}
                    className="text-red-500 hover:text-red-700 text-base"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </>
        )}

        {/* Jodit Editor */}
        <JoditEditor
          ref={editor}
          value={contentDetails.content}
          config={{
            readonly: false,
            placeholder: placeholder || "Start typing...",
            height: 300,
          }}
          onChange={(newContent) => {
            setContentDetails({
              ...contentDetails,
              content: newContent,
            });
          }}
          className="w-full border rounded-md bg-white text-sm"
        />

        {/* Submit Button */}
        <button
          onClick={submitContent}
          disabled={isSubmitDisabled}
          className={`mt-4 w-full py-3 ${
            isSubmitDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium text-lg rounded-md cursor-pointer`}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Editor;
