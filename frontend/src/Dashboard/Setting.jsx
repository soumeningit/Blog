import Reacts from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import SocialMediaLinks from "./SocialMediaLinks";

function Setting() {
  return (
    <div className="flex flex-col items-center justify-center py-6 ">
      {/* Address Section */}
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-gray-50 border-b border-gray-700 pb-2">
          Personal Information
        </h2>
        <PersonalInformation />

        <SocialMediaLinks />
      </div>

      {/* Delete Account Section */}
      <div className="w-full max-w-2xl mt-6 p-4 border border-red-400 bg-red-50 rounded-lg flex flex-row items-center space-x-4">
        <div
          onClick={() => console.log("Delete Account")}
          className="h-10 w-10 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer"
        >
          <AiTwotoneDelete className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-700">
            Are you sure you want to delete your account? This action is{" "}
            <span className="text-red-500 font-semibold">irreversible</span>.{" "}
            <Link to="/contact" className="text-cyan-600 underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Setting;
