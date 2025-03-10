// import React, { useEffect, useState } from "react";
// import { TiThSmallOutline } from "react-icons/ti";
// import { getAllCategories } from "../Service/API/CategoryAPI";
// import { getBlogsByCategoryAPI } from "../Service/API/BlogAPI";
// import BlogCard from "./BlogCard";

// function FindByCategory() {
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Handle category click to fetch blogs
//   const findItemByCategory = async (id, name) => {
//     setSelectedCategory(name); // Set selected category name
//     try {
//       const response = await getBlogsByCategoryAPI(id);
//       if (response.data.success) {
//         setBlogs(response.data.data);
//         setShowCategories(false);
//       }
//     } catch (error) {
//       console.log("Error in findItemByCategory : ", error);
//     }
//   };

//   // Fetch categories on component mount
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await getAllCategories();
//         if (response.data.success) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error in getCategories : ", error);
//       }
//     }
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col space-y-6 p-4">
//       {/* Header Section */}
//       <div className="flex flex-row justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-50">Find By Category</h1>
//         <span
//           onClick={() => setShowCategories(!showCategories)}
//           className="flex flex-row space-x-2 items-center text-gray-200 text-xl font-bold cursor-pointer hover:text-gray-100"
//         >
//           <p>Categories</p>
//           <TiThSmallOutline className="text-2xl" />
//         </span>
//       </div>

//       {/* Category List */}
//       {showCategories && (
//         <div className="flex flex-wrap gap-3 transition-all duration-300 ease-in-out">
//           {categories.map((data) => (
//             <div
//               key={data._id}
//               onClick={() => findItemByCategory(data._id, data.name)}
//               className="px-4 py-2 bg-gray-800 bg-opacity-20 rounded-full text-gray-50 text-sm cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all"
//             >
//               {data.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected Category Text */}
//       <div className="text-gray-400 text-lg">
//         {selectedCategory ? (
//           <p>
//             Showing results for:{" "}
//             <span className="text-gray-100 font-semibold">
//               {selectedCategory}
//             </span>
//           </p>
//         ) : (
//           <p className="text-gray-400 text-sm">Category not selected</p>
//         )}
//       </div>

//       {/* Blog List */}
//       {blogs.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {blogs.map((post, id) => (
//             <BlogCard
//               key={id}
//               image={post.thumbnail}
//               title={post.title}
//               description={post.description}
//               likes={post.likes}
//               id={post._id}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-400">
//           {selectedCategory ? "No Blogs Found" : "Category not selected"}
//         </p>
//       )}
//     </div>
//   );
// }

// export default FindByCategory;
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

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { TiThSmallOutline } from "react-icons/ti";
// import { getAllCategories } from "../Service/API/CategoryAPI";
// import { getBlogsByCategoryAPI } from "../Service/API/BlogAPI";
// import BlogCard from "./BlogCard";

// function FindByCategory() {
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();

//   // Handle category click to fetch blogs
//   const findItemByCategory = async (id, name) => {
//     setSelectedCategory(name);
//     setPage(1);
//     setHasMore(true);
//     setBlogs([]);
//     fetchBlogs(id, 1);
//   };

//   // Fetch blogs
//   const fetchBlogs = async (id, page) => {
//     setLoading(true);
//     try {
//       const response = await getBlogsByCategoryAPI(id, page);
//       if (response.data.success) {
//         if (response.data.data.length > 0) {
//           setBlogs((prevBlogs) => [...prevBlogs, ...response.data.data]);
//         } else {
//           setHasMore(false);
//         }
//       }
//     } catch (error) {
//       console.log("Error in fetchBlogs : ", error);
//     }
//     setLoading(false);
//   };

//   // Infinite Scroll
//   const lastBlogElementRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   // Fetch new blogs on page change
//   useEffect(() => {
//     if (selectedCategory) {
//       fetchBlogs(categories.find((c) => c.name === selectedCategory)._id, page);
//     }
//   }, [page]);

//   // Fetch categories on component mount
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await getAllCategories();
//         if (response.data.success) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error in getCategories : ", error);
//       }
//     }
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col space-y-6 p-6 bg-gray-900 rounded-lg shadow-lg">
//       {/* Header Section */}
//       <div className="flex flex-row justify-between items-center border-b border-gray-700 pb-4">
//         <h1 className="text-3xl font-bold text-gray-50">Find By Category</h1>
//         <span
//           onClick={() => setShowCategories(!showCategories)}
//           className="flex flex-row space-x-2 items-center text-gray-200 text-xl font-bold cursor-pointer hover:text-cyan-400 transition-all"
//         >
//           <p>Categories</p>
//           <TiThSmallOutline className="text-2xl" />
//         </span>
//       </div>

//       {/* Category List */}
//       {showCategories && (
//         <div className="flex flex-wrap gap-3 p-4 bg-gray-800 rounded-md transition-all duration-500 ease-in-out">
//           {categories.map((data) => (
//             <div
//               key={data._id}
//               onClick={() => findItemByCategory(data._id, data.name)}
//               className="px-4 py-2 bg-gray-700 rounded-full text-gray-50 text-sm cursor-pointer hover:bg-cyan-600 transform hover:scale-105 transition-all"
//             >
//               {data.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected Category Text */}
//       <div className="text-gray-400 text-lg">
//         {selectedCategory ? (
//           <p>
//             Showing results for:{" "}
//             <span className="text-gray-100 font-semibold">
//               {selectedCategory}
//             </span>
//           </p>
//         ) : (
//           <p className="text-gray-400 text-sm">
//             Select a category to explore blogs
//           </p>
//         )}
//       </div>

//       {/* Blog List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((post, id) => {
//           if (blogs.length === id + 1) {
//             return (
//               <div ref={lastBlogElementRef} key={id}>
//                 <BlogCard
//                   image={post.thumbnail}
//                   title={post.title}
//                   description={post.description}
//                   likes={post.likes}
//                   id={post._id}
//                 />
//               </div>
//             );
//           } else {
//             return (
//               <BlogCard
//                 key={id}
//                 image={post.thumbnail}
//                 title={post.title}
//                 description={post.description}
//                 likes={post.likes}
//                 id={post._id}
//               />
//             );
//           }
//         })}
//       </div>

//       {loading && (
//         <p className="text-center text-gray-400 text-lg">Loading...</p>
//       )}
//     </div>
//   );
// }

// export default FindByCategory;

// import React, { useEffect, useState, useRef } from "react";
// import { TiThSmallOutline } from "react-icons/ti";
// import { getAllCategories } from "../Service/API/CategoryAPI";
// import { getBlogsByCategoryAPI } from "../Service/API/BlogAPI";
// import BlogCard from "./BlogCard";

// function FindByCategory() {
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();

//   // Handle category click to fetch blogs
//   const findItemByCategory = async (id, name) => {
//     setSelectedCategory(name);
//     setBlogs([]);
//     setPage(1);
//     setHasMore(true);
//     loadBlogs(id, 1);
//   };

//   // Function to load blogs by category with pagination
//   const loadBlogs = async (id, pageNum) => {
//     try {
//       const response = await getBlogsByCategoryAPI(id, pageNum);
//       if (response.data.success) {
//         setBlogs((prev) => [...prev, ...response.data.data]);
//         if (response.data.data.length === 0) {
//           setHasMore(false);
//         }
//       }
//     } catch (error) {
//       console.log("Error in loadBlogs : ", error);
//     }
//   };

//   // Infinite Scroll Observer
//   const lastBlogRef = (node) => {
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage((prev) => prev + 1);
//       }
//     });
//     if (node) observer.current.observe(node);
//   };

//   // Load more blogs when page changes
//   useEffect(() => {
//     if (selectedCategory) {
//       loadBlogs(categories.find((c) => c.name === selectedCategory)._id, page);
//     }
//   }, [page]);

//   // Fetch categories on component mount
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await getAllCategories();
//         if (response.data.success) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error in getCategories : ", error);
//       }
//     }
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col space-y-6 p-6 bg-gray-900 rounded-lg shadow-lg">
//       {/* Header Section */}
//       <div className="flex flex-row justify-between items-center border-b border-gray-700 pb-4">
//         <h1 className="text-3xl font-bold text-gray-50">Find By Category</h1>
//         <span
//           onClick={() => setShowCategories(!showCategories)}
//           className="flex flex-row space-x-2 items-center text-gray-200 text-xl font-bold cursor-pointer hover:text-cyan-400 transition-all"
//         >
//           <p>Categories</p>
//           <TiThSmallOutline className="text-2xl" />
//         </span>
//       </div>

//       {/* Category List */}
//       {showCategories && (
//         <div className="flex flex-wrap gap-3 p-4 bg-gray-800 rounded-md transition-all duration-500 ease-in-out">
//           {categories.map((data) => (
//             <div
//               key={data._id}
//               onClick={() => findItemByCategory(data._id, data.name)}
//               className="px-4 py-2 bg-gray-700 rounded-full text-gray-50 text-sm cursor-pointer hover:bg-cyan-600 transform hover:scale-105 transition-all"
//             >
//               {data.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected Category Text */}
//       <div className="text-gray-400 text-lg">
//         {selectedCategory ? (
//           <p>
//             Showing results for:{" "}
//             <span className="text-gray-100 font-semibold">
//               {selectedCategory}
//             </span>
//           </p>
//         ) : (
//           <p className="text-gray-400 text-sm">
//             Select a category to explore blogs
//           </p>
//         )}
//       </div>

//       {/* Blog List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((post, index) => (
//           <BlogCard
//             key={post._id}
//             image={post.thumbnail}
//             title={post.title}
//             description={post.description}
//             likes={post.likes}
//             id={post._id}
//             ref={index === blogs.length - 1 ? lastBlogRef : null}
//           />
//         ))}
//       </div>

//       {/* Load More Button */}
//       {!hasMore && (
//         <div className="text-center my-6">
//           <button
//             className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-all"
//             onClick={() => setShowCategories(true)}
//           >
//             Browse More Categories
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FindByCategory;

// import React, { useEffect, useState, useRef } from "react";
// import { TiThSmallOutline } from "react-icons/ti";
// import { getAllCategories } from "../Service/API/CategoryAPI";
// import { getBlogsByCategoryAPI } from "../Service/API/BlogAPI";
// import BlogCard from "./BlogCard";

// function FindByCategory() {
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [displayedBlogs, setDisplayedBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();
//   const blogsPerLoad = 3;

//   // Handle category click to fetch blogs
//   const findItemByCategory = async (id, name) => {
//     setSelectedCategory(name);
//     setBlogs([]);
//     setDisplayedBlogs([]);
//     setHasMore(true);
//     loadBlogs(id);
//   };

//   // Function to load all blogs by category
//   const loadBlogs = async (id) => {
//     try {
//       const response = await getBlogsByCategoryAPI(id);
//       if (response.data.success) {
//         setBlogs(response.data.data);
//         setDisplayedBlogs(response.data.data.slice(0, blogsPerLoad));
//       }
//     } catch (error) {
//       console.log("Error in loadBlogs : ", error);
//     }
//   };

//   // Infinite Scroll Observer
//   const lastBlogRef = (node) => {
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasMore) {
//         loadMoreBlogs();
//       }
//     });
//     if (node) observer.current.observe(node);
//   };

//   // Load More Blogs Function
//   const loadMoreBlogs = () => {
//     const currentLength = displayedBlogs.length;
//     const nextBlogs = blogs.slice(currentLength, currentLength + blogsPerLoad);
//     setDisplayedBlogs((prev) => [...prev, ...nextBlogs]);

//     if (currentLength + blogsPerLoad >= blogs.length) {
//       setHasMore(false);
//     }
//   };

//   // Fetch categories on component mount
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await getAllCategories();
//         if (response.data.success) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.log("Error in getCategories : ", error);
//       }
//     }
//     if (categories.length === 0) {
//       fetchCategories();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col space-y-6 p-6 bg-gray-900 rounded-lg shadow-lg">
//       {/* Header Section */}
//       <div className="flex flex-row justify-between items-center border-b border-gray-700 pb-4">
//         <h1 className="text-3xl font-bold text-gray-50">Find By Category</h1>
//         <span
//           onClick={() => setShowCategories(!showCategories)}
//           className="flex flex-row space-x-2 items-center text-gray-200 text-xl font-bold cursor-pointer hover:text-cyan-400 transition-all"
//         >
//           <p>Categories</p>
//           <TiThSmallOutline className="text-2xl" />
//         </span>
//       </div>

//       {/* Category List */}
//       {showCategories && (
//         <div className="flex flex-wrap gap-3 p-4 bg-gray-800 rounded-md transition-all duration-500 ease-in-out">
//           {categories.map((data) => (
//             <div
//               key={data._id}
//               onClick={() => findItemByCategory(data._id, data.name)}
//               className="px-4 py-2 bg-gray-700 rounded-full text-gray-50 text-sm cursor-pointer hover:bg-cyan-600 transform hover:scale-105 transition-all"
//             >
//               {data.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected Category Text */}
//       <div className="text-gray-400 text-lg">
//         {selectedCategory ? (
//           <p>
//             Showing results for:{" "}
//             <span className="text-gray-100 font-semibold">
//               {selectedCategory}
//             </span>
//           </p>
//         ) : (
//           <p className="text-gray-400 text-sm">
//             Select a category to explore blogs
//           </p>
//         )}
//       </div>

//       {/* Blog List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {displayedBlogs.map((post, index) => (
//           <BlogCard
//             key={post._id}
//             image={post.thumbnail}
//             title={post.title}
//             description={post.description}
//             likes={post.likes}
//             id={post._id}
//             ref={index === displayedBlogs.length - 1 ? lastBlogRef : null}
//           />
//         ))}
//       </div>

//       {/* Load More Button */}
//       {!hasMore && displayedBlogs.length < blogs.length && (
//         <div className="text-center my-6">
//           <button
//             className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-all"
//             onClick={loadMoreBlogs}
//           >
//             Load More Blogs
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FindByCategory;
