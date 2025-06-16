import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { componentData } from "../Utils/Data";
import { useDispatch, useSelector } from "react-redux";
import user from "../assets/user_avtar.png";
import Modal from "./Common/Modal";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const handleNavigation = (url, id) => {
    setActiveLink(id);
    navigate(url);
  };

  const { token } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  function submitSearch() {
    navigate(`/search/${query}`);
  }

  return (
    <div className="container flex flex-row justify-evenly rounded-md bg-sky-950 shadow-lg shadow-secondary ring-1 ring-slate-500/10 dark:bg-slate-900 dark:ring-slate-500/20 h-[10vh] shadow-cyan-200">
      <div>
        <img src="https://" alt="logo" />
      </div>

      <div className="flex flex-row items-center justify-evenly cursor-pointer space-x-4 text-gray-100 dark:text-gray-100">
        {componentData.map((data) => (
          <ul
            key={data.id}
            onClick={() => handleNavigation(data.url, data.id)}
            className={`relative pb-1 hover:text-amber-200 ${
              activeLink === data.id
                ? "after:content-[''] after:block after:w-full after:h-1 after:bg-amber-200 after:absolute after:left-0 after:bottom-[-4px] after:rounded-t-md after:transition-all after:duration-200 after:ease-in-out"
                : ""
            }`}
          >
            {data.title}
          </ul>
        ))}
      </div>

      <div className="flex flex-row items-center justify-evenly text-gray-100 dark:text-gray-100">
        <input
          type="text"
          placeholder="Search Here...."
          onChange={handleSearch}
          className="w-72 px-2 py-1 rounded-l-md border-2 border-transparent text-gray-100 dark:text-gray-100 bg-sky-950 dark:bg-slate-700 focus:outline-none focus:border-gray-200 dark:focus:border-gray-200 transition-all duration-200 ease-in-out"
        />
        <button
          onClick={submitSearch}
          disabled={query.length === 0 ? true : false}
          className="px-2 py-1 cursor-pointer rounded-r-md border-2 border-transparent text-gray-100 dark:text-gray-100 bg-sky-950 hover:bg-sky-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Search
        </button>
      </div>

      <div className="flex flex-row items-center justify-evenly space-x-4 text-gray-100 dark:text-gray-100">
        {!token && (
          <button
            onClick={() => navigate("/registration")}
            className="px-2 py-1 cursor-pointer rounded-md border-2 border-transparent text-gray-100 dark:text-gray-100 bg-sky-950 hover:bg-sky-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Register
          </button>
        )}
        {!token && (
          <button
            onClick={() => navigate("/signin")}
            className="px-2 py-1 cursor-pointer rounded-md border-2 border-transparent text-gray-100 dark:text-gray-100 bg-sky-950 hover:bg-sky-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Login
          </button>
        )}
        {/* <button className="px-2 py-1 cursor-pointer rounded-md border-2 border-transparent text-gray-100 dark:text-gray-100 bg-sky-950 hover:bg-sky-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none">
          Logout
        </button> */}
        {token && (
          <div className="relative cursor-pointer h-10 w-10 flex flex-row items-center justify-center rounded-full p-1 border-1 border-gray-200 shadow-lg hover:shadow-xl">
            <img
              src={user}
              alt="avatar"
              className="rounded-full object-cover h-8 w-8 shadow-lg"
              loading="lazy"
              onClick={() => setShowModal((prev) => !prev)}
            />
            {showModal && (
              <Modal
                showModal={showModal}
                setModal={() => setShowModal(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
