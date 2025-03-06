import React, { useEffect, useState } from "react";
import { modalData } from "../../Utils/Data";
import { useNavigate } from "react-router-dom";
import LogOutModal from "./LogOutModal";

function Modal({ showModal, setModal }) {
  const navigate = useNavigate();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (showModal && event.target.closest(".modal-content") === null) {
  //         setModal(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [showModal]);

  function handleNavigation(url, id) {
    console.log("id", id);
    console.log("url", url);
    if (id === 4) {
      setShowLogOutModal(true);
    } else {
      navigate(url);
      setModal(false);
    }
  }

  return (
    <>
      {showModal && (
        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md w-48 p-2 border border-gray-300 z-50 space-y-2 modal-content">
          {modalData.map((data) => (
            <div
              key={data.id}
              onClick={() => handleNavigation(data.url, data.id)}
              className="flex flex-row items-center gap-2 p-2 text-gray-600 cursor-pointer hover:bg-gray-200"
            >
              <data.icon />
              <span>{data.name}</span>
            </div>
          ))}
        </div>
      )}
      {showLogOutModal && (
        <LogOutModal
          showLogOutModal={showLogOutModal}
          setLogOutModal={setShowLogOutModal}
        />
      )}
    </>
  );
}

export default Modal;
