import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function Setting() {
  return (
    <div className="flex flex-col h-screen">
      <div></div>
      <div className="flex flex-row w-[75%] space-x-4 bg-red-200 rounded-md border-1 border-cyan-400 p-2">
        <div className="text-xl mt-2 h-8 w-8 rounded-full bg-red-300 hover:bg-red-500 transition-all scale-100 hover:text-2xl cursor-pointer flex items-center justify-center">
          <AiTwotoneDelete className="p-1 h-6 w-6" />
        </div>
        <div className="text-base ml-5">
          <p className="w-[75%]">
            Are you sure you want to delete your account? This action is
            irreversible. All the data will be lost. If you have any problem,
            You can{" "}
            <Link to="/contact" className="text-cyan-600 underline">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Setting;
