import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogByIdAPI } from "../Service/API/BlogAPI";

function EditBlog() {
  const { id } = useParams();
  if (!id) return <h1>Blog not found</h1>;

  const [error, setError] = useState(null);
  const [contentDetails, setContentDetails] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    subCategory: [],
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await getBlogByIdAPI(id);
        console.log("Response:", JSON.stringify(response));

        if (response.data.success) {
          const blogData = response.data.data;
          setContentDetails({
            title: blogData.title,
            description: blogData.description,
            content: blogData.content,
            category: blogData.category.name,
            subCategory: blogData.subCategory,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getBlog();
  }, [id]);

  const handleSubCategoryChange = (subCategoryId, subCategoryName) => {
    setContentDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: [
        ...prevDetails.subCategory,
        { id: subCategoryId, name: subCategoryName },
      ],
    }));
  };

  const removeSubCategory = (subCategoryId) => {
    setContentDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: prevDetails.subCategory.filter(
        (sub) => sub.id !== subCategoryId
      ),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Blog</h1>

      {/* Title Input */}
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

      {/* Description Input */}
      <textarea
        name="description"
        value={contentDetails.description}
        onChange={(e) =>
          setContentDetails({ ...contentDetails, description: e.target.value })
        }
        placeholder="Write a brief description (max 50 words)..."
        required
        className="w-full p-2 border rounded-md mb-4"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Category Selection */}
      <select
        name="category"
        value={contentDetails.category}
        onChange={(e) => {
          setContentDetails({
            ...contentDetails,
            category: e.target.value,
            subCategory: [],
          });
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

      {/* SubCategory Selection */}
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

          {/* Display Selected Subcategories */}
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

      {/* Rich Text Editor */}
      <JoditEditor
        value={contentDetails.content}
        config={{
          readonly: false,
          uploader: { insertImageAsBase64URI: true },
        }}
        tabIndex={1}
        onBlur={(newContent) =>
          setContentDetails({ ...contentDetails, content: newContent })
        }
        onChange={(newContent) =>
          setContentDetails({ ...contentDetails, content: newContent })
        }
      />
    </div>
  );
}

export default EditBlog;
