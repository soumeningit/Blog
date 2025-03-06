import React from "react";
import HeroSection from "../Components/HeroSection";
import FindByCategory from "../Components/FindByCategory";
import AllPost from "../Components/AllPost";
import { useSelector } from "react-redux";
import SearchSkeltonLoader from "../Components/Common/SearchSkeltonLoader";

function Home() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <SearchSkeltonLoader />
      ) : (
        <div className="flex flex-col h-screen space-y-4 bg-sky-100 dark:bg-slate-800">
          <HeroSection />
          <FindByCategory />
          <AllPost />
        </div>
      )}
    </>
  );
}

export default Home;
