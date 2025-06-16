import React, { useEffect, useState } from "react";
import { TiThSmallOutline } from "react-icons/ti";
import { getAllCategories } from "../Service/API/CategoryAPI";
import { getBlogsByCategoryAPI } from "../Service/API/BlogAPI";
import BlogCard from "./BlogCard";

function FindByCategory() {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category click to fetch blogs
  const findItemByCategory = async (id, name) => {
    setSelectedCategory(name);
    try {
      const response = await getBlogsByCategoryAPI(id);
      if (response.data.success) {
        setBlogs(response.data.data);
        setShowCategories(false);
      }
    } catch (error) {
      console.log("Error in findItemByCategory : ", error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategories();
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error in getCategories : ", error);
      }
    }
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-gray-50">Find By Category</h1>
        <span
          onClick={() => setShowCategories(!showCategories)}
          className="flex flex-row space-x-2 items-center text-gray-200 text-xl font-bold cursor-pointer hover:text-cyan-400 transition-all"
        >
          <p>Categories</p>
          <TiThSmallOutline className="text-2xl" />
        </span>
      </div>

      {/* Category List */}
      {showCategories && (
        <div className="flex flex-wrap gap-3 p-4 bg-gray-800 rounded-md transition-all duration-500 ease-in-out">
          {categories.map((data) => (
            <div
              key={data._id}
              onClick={() => findItemByCategory(data._id, data.name)}
              className="px-4 py-2 bg-gray-700 rounded-full text-gray-50 text-sm cursor-pointer hover:bg-cyan-600 transform hover:scale-105 transition-all"
            >
              {data.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected Category Text */}
      <div className="text-gray-400 text-lg">
        {selectedCategory ? (
          <p>
            Showing results for:{" "}
            <span className="text-gray-100 font-semibold">
              {selectedCategory}
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-sm">
            Select a category to explore blogs
          </p>
        )}
      </div>

      {/* Blog List */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post, id) => (
            <BlogCard
              key={id}
              image={post.thumbnail}
              title={post.title}
              description={post.description}
              likes={post.likes}
              id={post._id}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          {selectedCategory
            ? "No Blogs Found"
            : "Browse by category to find blogs"}
        </p>
      )}
    </div>
  );
}

export default FindByCategory;
