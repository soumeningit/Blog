import React, { useRef } from "react";
import HeroSection from "../Components/HeroSection";
import FindByCategory from "../Components/FindByCategory";
import AllPost from "../Components/AllPost";
import { useSelector } from "react-redux";
import SearchSkeltonLoader from "../Components/Common/SearchSkeltonLoader";
import Footer from "../Components/Footer";

function Home() {
  const { loading } = useSelector((state) => state.auth);
  // Create a reference for the AllPost component
  const allPostRef = useRef(null);

  // Function to scroll to AllPost
  const scrollToAllPost = () => {
    allPostRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <SearchSkeltonLoader />
      ) : (
        <div className="flex flex-col min-h-screen space-y-4 bg-sky-100 dark:bg-slate-800 overflow-x-hidden">
          <HeroSection scrollToAllPost={scrollToAllPost} />
          <FindByCategory />
          <div ref={allPostRef}>
            <AllPost />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
