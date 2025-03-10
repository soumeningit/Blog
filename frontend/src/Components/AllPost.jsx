import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SkeletonLoader from "../Components/Common/SkeletonLoader";
import { getAllBlogsAPI } from "../Service/API/BlogAPI";
import BlogCard from "./BlogCard";

function AllPost() {
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function getAllPost() {
      try {
        const response = await getAllBlogsAPI();
        if (response.data.success) {
          setAllPosts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllPost();
  }, []);

  // Filter the posts based on the search input
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-50">All Posts</h1>
        <div className="flex flex-row space-x-2 items-center">
          <input
            type="text"
            name="searchitem"
            onChange={(e) => setSearchItem(e.target.value)}
            className="p-2 rounded-md text-gray-50 outline-none bg-gray-800 bg-opacity-50 border border-gray-600"
            placeholder="Search..."
          />
          <button className="px-3 py-2 bg-gray-800 bg-opacity-50 rounded-md text-gray-50 text-xl flex items-center justify-center">
            <CiSearch />
          </button>
        </div>
      </div>

      {/* Show SkeletonLoader while loading */}
      {loading ? (
        <div className="space-y-4">
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post, id) => (
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
        <p className="text-gray-50 text-center">No posts available.</p>
      )}
    </div>
  );
}

export default AllPost;
