import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookMarkedItemsAPI } from "../Service/API/ProfileAPI";
import BlogCard from "../Components/BlogCard";
import user_avtar from "../assets/user_avtar.png";
import { CiEdit } from "react-icons/ci";
import FileUpload from "../Components/Common/FileUpload";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { SiMaterialdesignicons } from "react-icons/si";

function Profile() {
  const { token, user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState();
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const userId = user.userId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getBookMarkedItemsAPI(token, userId);
        if (response.status === 200) {
          setUserData(response.data.data.user);
          setBookmarkedItems(response.data.data.bookmarks);
        }
      } catch (error) {
        console.log("GET BOOKMARKED ITEMS API ERROR: ", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-6">
      {/* Welcome Text */}
      <h1 className="text-3xl font-bold text-gray-100 mt-4">
        Welcome, {userData?.firstName} 👋
      </h1>

      {/* Profile Card */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-lg mt-4 max-w-lg w-full">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={userData?.additionalDetails?.profilePicture || user_avtar}
              className="rounded-full h-24 w-24 object-cover border-4 border-gray-600 shadow-md transform hover:scale-105 transition-all"
              alt="profile"
              loading="lazy"
            />
            <CiEdit
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="text-gray-300 text-lg absolute top-0 right-0 translate-x-1 -translate-y-2 bg-gray-800 p-1 rounded-full hover:bg-cyan-600 transition-all cursor-pointer"
              title="Edit Profile Picture"
            />
            {showFileUpload && (
              <FileUpload
                showFileUpload={showFileUpload}
                setShowFileUpload={() => setShowFileUpload(!showFileUpload)}
              />
            )}
          </div>

          {/* User Details */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-200">
              {userData?.firstName} {userData?.lastName}
            </h3>
            <p className="text-gray-400">
              {userData?.accountType} | {userData?.email}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Predefined Social Media Links */}
      <h2 className="text-2xl font-bold text-gray-100 mt-8">Connect with me</h2>
      <div className="mt-4 grid grid-cols-3 gap-4 max-w-lg w-full">
        {userData?.additionalDetails?.socialMedia?.facebook && (
          <a
            href={userData.additionalDetails.socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <FaFacebook size={22} />
          </a>
        )}
        {userData?.additionalDetails?.socialMedia?.linkedin && (
          <a
            href={userData.additionalDetails.socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <FaLinkedin size={22} />
          </a>
        )}
        {userData?.additionalDetails?.socialMedia?.instagram && (
          <a
            href={userData.additionalDetails.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <FaInstagram size={22} />
          </a>
        )}
        {userData?.additionalDetails?.socialMedia?.twitter && (
          <a
            href={userData.additionalDetails.socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <FaTwitter size={22} />
          </a>
        )}
        {userData?.additionalDetails?.socialMedia?.github && (
          <a
            href={userData.additionalDetails.socialMedia.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <FaGithub size={22} />
          </a>
        )}
      </div>

      {/* ✅ Dynamic Other Social Links */}
      <h2 className="text-2xl font-bold text-gray-100 mt-8">Other Links</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 max-w-lg w-full">
        {userData?.additionalDetails?.socialMedia?.others?.map((item) => (
          <a
            key={item._id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-800 rounded-md p-3 text-gray-200 hover:text-cyan-400 transition-all"
          >
            <SiMaterialdesignicons size={22} />
            <span>{item.name}</span>
          </a>
        ))}
      </div>

      {/* Bookmarked Items */}
      <h2 className="text-2xl font-bold text-gray-100 mt-8">
        Your Bookmarked Blogs
      </h2>
      {bookmarkedItems.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-w-5xl w-full">
          {bookmarkedItems.map((item) => (
            <BlogCard
              key={item._id}
              image={item.thumbnail}
              title={item.title}
              description={item.description}
              likes={item.likes}
              id={item._id}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-gray-400 mt-4">No Bookmarked Items</h3>
      )}
    </div>
  );
}

export default Profile;
