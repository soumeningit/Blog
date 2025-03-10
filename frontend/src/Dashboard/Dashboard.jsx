import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBlogByUserIdAPI } from "../Service/API/BlogAPI";
import BlogCard from "../Components/BlogCard";

function Dashboard() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  // console.log("User : ", user);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await getBlogByUserIdAPI(user.userId, token);
        console.log("All Posts : ", JSON.stringify(response));
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBlogs();
  }, []);

  // console.log("Blogs : ", blogs);

  return (
    <div className="flex flex-col items-center p-4 h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4 text-gray-200">Your Blog</h1>

      <div className="w-full max-w-4xl grid grid-cols-3 gap-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              image={blog?.thumbnail}
              title={blog.title}
              description={blog.description}
              likes={blog.likes}
              id={blog._id}
              showEdit={true}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No Blog Found</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-700">Want to write a blog?</p>
        <button
          onClick={() => navigate("/dashboard/editor")}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Write Blog
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
