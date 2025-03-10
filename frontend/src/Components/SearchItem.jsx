import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchSkeltonLoader from "./Common/SearchSkeltonLoader";
import { setLoading, setSearchData } from "../Redux/Slice/searchSlice";
import toast from "react-hot-toast";
import { searchDataAPI } from "../Service/API/SearchAPI";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";

function SearchItem() {
  const { loading, searchData } = useSelector((state) => state.search);
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function submitSearch() {
      dispatch(setLoading(true));
      try {
        const response = await searchDataAPI(query);
        dispatch(setLoading(false));
        if (response.data.success) {
          dispatch(setSearchData(response.data.data));
          toast.success("Item fetched successfully");
        } else {
          toast.error("No Data Found");
        }
      } catch (error) {
        dispatch(setLoading(false));
        toast.error("Internal Server Error");
        console.log("Error : ", error);
      } finally {
        dispatch(setLoading(false));
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
          {searchData.length > 0 ? (
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
