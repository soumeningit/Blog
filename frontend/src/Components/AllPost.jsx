// import React, { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import SkeletonLoader from "../Components/Common/SkeletonLoader";
// import { getAllBlogsAPI } from "../Service/API/BlogAPI";

// function AllPost() {
//   const [searchItem, setSearchItem] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [allPosts, setAllPosts] = useState([]);

//   // Simulating loading state (remove this in actual use case)
//   setTimeout(() => setLoading(false), 2000);

//   useEffect(() => {
//     async function getAllPost() {
//       try {
//         const response = await getAllBlogsAPI();
//         console.log("All Posts : ", JSON.stringify(response));
//         if (response.data.success) {
//           setAllPosts(response.data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllPost();
//   }, []);

//   return (
//     <div className="flex flex-col space-y-4 p-4">
//       <div className="flex flex-row justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-50">All Posts</h1>
//         <div className="flex flex-row space-x-2 items-center">
//           <input
//             type="text"
//             name="searchitem"
//             onChange={(e) => setSearchItem(e.target.value)}
//             className="p-2 rounded-md text-gray-50 outline-none bg-gray-800 bg-opacity-50 border border-gray-100"
//             placeholder="Search..."
//           />
//           <button className="px-2 py-1 cursor-pointer bg-gray-800 bg-opacity-50 rounded-md text-gray-50 text-2xl">
//             <CiSearch />
//           </button>
//         </div>
//       </div>

//       {/* Show SkeletonLoader while loading */}
//       {loading ? (
//         <SkeletonLoader />
//       ) : (
//         <p className="text-gray-50">Posts will appear here...</p>
//       )}
//     </div>
//   );
// }

// export default AllPost;

// import React, { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import SkeletonLoader from "../Components/Common/SkeletonLoader";
// import { getAllBlogsAPI } from "../Service/API/BlogAPI";
// import BlogCard from "./BlogCard";

// function AllPost() {
//   const [searchItem, setSearchItem] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [allPosts, setAllPosts] = useState([]);

//   useEffect(() => {
//     async function getAllPost() {
//       try {
//         const response = await getAllBlogsAPI();
//         console.log("All Posts : ", JSON.stringify(response));
//         if (response.data.success) {
//           setAllPosts(response.data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false); // Set loading to false after API call completes
//       }
//     }
//     getAllPost();
//   }, []);

//   console.log("All Posts : ", allPosts);

//   return (
//     <div className="flex flex-col space-y-4 p-4">
//       <div className="flex flex-row justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-50">All Posts</h1>
//         <div className="flex flex-row space-x-2 items-center">
//           <input
//             type="text"
//             name="searchitem"
//             onChange={(e) => setSearchItem(e.target.value)}
//             className="p-2 rounded-md text-gray-50 outline-none bg-gray-800 bg-opacity-50 border border-gray-100"
//             placeholder="Search..."
//           />
//           <button className="px-2 py-1 cursor-pointer bg-gray-800 bg-opacity-50 rounded-md text-gray-50 text-2xl">
//             <CiSearch />
//           </button>
//         </div>
//       </div>

//       {/* Show SkeletonLoader while loading */}
//       {loading ? (
//         <div className="space-y-4">
//           <SkeletonLoader className="h-20 w-full" />
//           <SkeletonLoader className="h-20 w-full" />
//           <SkeletonLoader className="h-20 w-full" />
//         </div>
//       ) : (
//         {allPosts.length > 0 && allPosts.map((post) => (
//           <BlogCard
//             key={post.id}
//             image={post.thumbnail}
//             title={post.title}
//             description={post.description}
//             likes={post.likes.length}
//           />
//         ))}
//       )}
//     </div>
//   );
// }

// export default AllPost;

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
        console.log("All Posts : ", JSON.stringify(response));
        if (response.data.success) {
          setAllPosts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    }
    getAllPost();
  }, []);

  console.log("All Posts : ", allPosts);

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-50">All Posts</h1>
        <div className="flex flex-row space-x-2 items-center">
          <input
            type="text"
            name="searchitem"
            onChange={(e) => setSearchItem(e.target.value)}
            className="p-2 rounded-md text-gray-50 outline-none bg-gray-800 bg-opacity-50 border border-gray-100"
            placeholder="Search..."
          />
          <button className="px-2 py-1 cursor-pointer bg-gray-800 bg-opacity-50 rounded-md text-gray-50 text-2xl">
            <CiSearch />
          </button>
        </div>
      </div>

      {/* Show SkeletonLoader while loading */}
      {loading ? (
        <div className="space-y-4">
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
          <SkeletonLoader className="h-20 w-full" />
        </div>
      ) : allPosts.length > 0 ? (
        allPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.thumbnail}
            title={post.title}
            description={post.description}
            likes={post.likes}
            id={post._id}
          />
        ))
      ) : (
        <p className="text-gray-50">No posts available.</p>
      )}
    </div>
  );
}

export default AllPost;
