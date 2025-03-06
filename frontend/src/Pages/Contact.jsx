import React, { useState } from "react";
import contactus from "../assets/ContactUs.png";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center space-y-8"
      style={{
        backgroundImage: `url(${contactus})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <h1 className="absolute mb-[10rem] top-[12rem] text-5xl md:text-7xl font-bold text-white font-serif tracking-wide">
        Contact Us
      </h1>

      {/* Contact Details */}
      <div className="relative z-10 mt-[24rem] p-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center ">
        {/* Location */}
        <div className="flex flex-col items-center space-y-3 bg-[#898989] bg-opacity-10 p-6 rounded-lg shadow-md">
          <FaLocationDot className="text-5xl text-blue-400" />
          <p className="text-lg text-white font-semibold">Location</p>
          <p className="text-gray-200">123, XYZ Street, ABC City</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center space-y-3 bg-[#898989] bg-opacity-10 px-12 py-10 rounded-lg shadow-md">
          <HiOutlineMail className="text-5xl text-blue-400" />
          <p className="text-lg text-white font-semibold">Email</p>
          <p className="text-gray-200">
            <a href="mailto:info@gmail.com" className="hover:underline">
              info@gmail.com
            </a>
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center space-y-3 bg-[#898989] bg-opacity-10 p-6 rounded-lg shadow-md">
          <FaPhoneAlt className="text-5xl text-blue-400" />
          <p className="text-lg text-white font-semibold">Phone</p>
          <p className="text-gray-200">+91 1234567890</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 bg-[#828282] rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center max-w-[20rem] p-4">
          <p className="text-xl text-white font-serif font-semibold text-center">
            If you have any queries please provide the information. We will get
            back to you as soon as possible.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center min-w-xl ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full p-6 space-y-4 "
          >
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              className="p-2 m-2 w-full rounded-md text-gray-50 outline-none bg-gray-600 bg-opacity-50 border border-gray-100"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={data.email}
              placeholder="Email"
              className="p-2 m-2 w-full rounded-md text-gray-50 outline-none bg-gray-600 bg-opacity-50 border border-gray-100"
              onChange={handleChange}
            />
            <textarea
              name="message"
              value={data.message}
              placeholder="Message"
              className="p-2 m-2 w-full rounded-md text-gray-50 outline-none bg-gray-600 bg-opacity-50 border border-gray-100"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-gray-100 font-bold cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
