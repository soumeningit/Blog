// import React from "react";
// import img from "../assets/hero-1.jpg";

// function HeroSection() {
//   return (
//     <div
//       className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
//       // style={{
//       //   backgroundImage: `url(${img})`,
//       // }}
//     >
//       <div className="flex flex-col items-center justify-center h-full ">
//         <h1 className="text-4xl font-bold text-white">
//           Welcome to our website
//         </h1>
//         <p className="text-lg text-white">We provide the best services</p>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;

import React from "react";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-cyan-900 to-gray-900 text-white min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in">
          Discover Inspiring Blogs & Creative Content
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 animate-fade-in delay-200">
          Stay informed and inspired with our handpicked selection of blogs,
          articles, and stories from talented authors around the world.
        </p>
        <div className="flex space-x-4 justify-center">
          <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-600 transition-all">
            Explore Blogs
          </button>
          <button className="border border-cyan-500 text-cyan-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all">
            Write a Blog
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <svg
          className="w-full h-32 text-gray-900"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L60,138.7C120,149,240,171,360,160C480,149,600,107,720,101.3C840,96,960,128,1080,149.3C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
