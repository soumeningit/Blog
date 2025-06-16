import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchSkeltonLoader from "./Common/SearchSkeltonLoader";
import toast from "react-hot-toast";
import { searchDataAPI } from "../Service/API/SearchAPI";
import BlogCard from "./BlogCard";

function SearchItem() {
  const { query } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function submitSearch() {
      setLoading(true);
      try {
        const response = await searchDataAPI(query);
        // console.log("Search Response:", response);
        if (response.data.success) {
          setSearchData(response.data.data);
          toast.success("Item fetched successfully");
        } else {
          setSearchData([]);
          toast.error("No Data Found");
        }
      } catch (error) {
        toast.error("Internal Server Error");
        console.log("Error:", error);
        setSearchData([]);
      } finally {
        setLoading(false);
      }
    }

    submitSearch();
  }, [query]);

  return (
    <>
      {loading ? (
        <SearchSkeltonLoader />
      ) : (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4 bg-slate-800 p-4">
          {Array.isArray(searchData) && searchData.length > 0 ? (
            searchData.map((item) => (
              <BlogCard
                key={item._id}
                image={item.thumbnail}
                title={item.title}
                description={item.description}
                likes={item.likes}
                id={item._id}
              />
            ))
          ) : (
            <h1 className="text-gray-400">No data found</h1>
          )}
        </div>
      )}
    </>
  );
}

export default SearchItem;
