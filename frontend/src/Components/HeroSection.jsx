import React from "react";
import img from "../assets/hero-1.jpg";

function HeroSection() {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      // style={{
      //   backgroundImage: `url(${img})`,
      // }}
    >
      <div className="flex flex-col items-center justify-center h-full ">
        <h1 className="text-4xl font-bold text-white">
          Welcome to our website
        </h1>
        <p className="text-lg text-white">We provide the best services</p>
      </div>
    </div>
  );
}

export default HeroSection;
