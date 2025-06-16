import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { editBlogAPI, getBlogByIdAPI } from "../Service/API/BlogAPI";
import { getSubCategories } from "../Service/API/SubCategoryAPI";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function EditBlog() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  if (!id) return <h1>Blog not found</h1>;
  const { user } = useSelector((state) => state.auth);

  const [error, setError] = useState(null);
  const [contentDetails, setContentDetails] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    categoryName: "",
    subCategory: [],
  });

  const [subCategories, setSubCategories] = useState([]);

  // Fetch blog data and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogByIdAPI(id);
        if (response.data.success) {
          const blogData = response.data.data;

          setContentDetails({
            title: blogData.title,
            description: blogData.description,
            content: blogData.content,
            category: blogData.category._id,
            categoryName: blogData.category.name,
            subCategory: blogData.subCategory.map((sub) => ({
              id: sub._id,
              name: sub.name,
            })),
          });

          const subCategoryResponse = await getSubCategories(
            token,
            blogData.category._id
          );
          if (subCategoryResponse.data.success) {
            setSubCategories(subCategoryResponse.data.subCategories || []);
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data.");
      }
    };

    fetchData();
  }, [id, token]);

  // Handle subcategory add
  const handleSubCategoryChange = (subCategoryId, subCategoryName) => {
    const exists = contentDetails.subCategory.find(
      (sub) => sub.id === subCategoryId
    );
    if (exists) return;

    setContentDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: [
        ...prevDetails.subCategory,
        { id: subCategoryId, name: subCategoryName },
      ],
    }));
  };

  // Remove subcategory
  const removeSubCategory = (subCategoryId) => {
    setContentDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: prevDetails.subCategory.filter(
        (sub) => sub.id !== subCategoryId
      ),
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !contentDetails.title ||
      !contentDetails.description ||
      !contentDetails.content
    ) {
      setError("Please fill all fields.");
      return;
    }

    setError(null);
    // console.log("user?._id : " + user?.userId);
    const payload = {
      userId: user?.userId,
      id,
      title: contentDetails.title,
      description: contentDetails.description,
      content: contentDetails.content,
      category: contentDetails.category,
      subCategory: contentDetails.subCategory.map((s) => s.id),
    };

    try {
      const response = await editBlogAPI({ payload }, token);
      if (response.data.success) {
        toast.success("Blog updated successfully!");
        navigate("/dashboard/mydashboard");
      } else {
        setError("Failed to update blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("An error occurred while updating the blog.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={contentDetails.title}
          onChange={(e) =>
            setContentDetails({ ...contentDetails, title: e.target.value })
          }
          placeholder="Enter a title..."
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        <textarea
          name="description"
          value={contentDetails.description}
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

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* Show category as plain text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category:
          </label>
          <p className="p-2 border rounded-md bg-gray-50 text-gray-800">
            {contentDetails.categoryName}
          </p>
        </div>

        {/* Subcategory Dropdown */}
        {subCategories.length > 0 && (
          <>
            <select
              onChange={(e) => {
                const selected = subCategories.find(
                  (sub) => sub._id === e.target.value
                );
                if (selected) {
                  handleSubCategoryChange(selected._id, selected.name);
                }
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

            <div className="flex flex-wrap gap-2 mb-4">
              {contentDetails.subCategory.map((data) => (
                <span
                  key={data.id}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full flex items-center gap-2"
                >
                  {data.name}
                  <button
                    onClick={() => removeSubCategory(data.id)}
                    type="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </>
        )}

        {/* Rich Text Editor */}
        <div className="mb-4">
          <JoditEditor
            value={contentDetails.content}
            config={{
              readonly: false,
              uploader: { insertImageAsBase64URI: true },
            }}
            tabIndex={1}
            onBlur={(newContent) =>
              setContentDetails((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
