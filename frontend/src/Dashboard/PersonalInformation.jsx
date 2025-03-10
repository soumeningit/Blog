import React, { useState } from "react";
import { countryAndDialCode } from "../Utils/SettingData";
import toast from "react-hot-toast";
import { updateProfileAPI } from "../Service/API/ProfileAPI";
import { useSelector } from "react-redux";

function PersonalInformation() {
  const { token, user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    userId: "",
    address: "",
    dialCode: "",
    mobileNumber: "",
    contact: "",
    city: "",
    state: "",
    country: "",
    dob: "",
    gender: "",
    pincode: "",
    bio: "",
  });

  const handleUserDataChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submitUserData = async () => {
    const data = {};
    data.userId = user.userId;
    data.address = userData.address;
    data.dialCode = userData.dialCode;
    data.mobileNumber = userData.mobileNumber;
    data.contact = userData.dialCode + userData.mobileNumber;
    data.city = userData.city;
    data.state = userData.state;
    data.country = userData.country;
    data.dob = userData.dob;
    data.gender = userData.gender;
    data.pincode = userData.pincode;
    data.bio = userData.bio;

    const toastId = toast.loading("Updating Profile...");
    try {
      const response = await updateProfileAPI(data, token);
      console.log("UPDATE PROFILE RESPONSE: ", response);
      toast.dismiss(toastId);
      if (response.data.success) {
        toast.success(response.data.message);
        setUserData({
          userId: "",
          address: "",
          dialCode: "",
          mobileNumber: "",
          contact: "",
          city: "",
          state: "",
          country: "",
          dob: "",
          gender: "",
          pincode: "",
          bio: "",
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error Updating Profile");
      console.log("UPDATE PROFILE API ERROR: ", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Address */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-gray-400 text-sm">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleUserDataChange}
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="contact" className="text-gray-400 text-sm">
            Contact
          </label>
          <div className="flex flex-row items-center space-x-2">
            <select
              name="dialCode"
              id="dialCode"
              value={userData.dialCode}
              onChange={handleUserDataChange}
              className="w-[5rem] bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all flex flex-row"
            >
              {countryAndDialCode.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleUserDataChange}
              placeholder="Contact"
              className="bg-gray-700 border w-full border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* City */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="city" className="text-gray-400 text-sm">
            City
          </label>
          <input
            type="text"
            id="city"
            value={userData.city}
            onChange={handleUserDataChange}
            placeholder="City"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* State */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="state" className="text-gray-400 text-sm">
            State
          </label>
          <input
            type="text"
            id="state"
            value={userData.state}
            onChange={handleUserDataChange}
            placeholder="State"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="country" className="text-gray-400 text-sm">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={userData.country}
            onChange={handleUserDataChange}
            placeholder="Country"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>

        {/* Date-of-birth */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="dob" className="text-gray-400 text-sm">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={userData.dob}
            onChange={handleUserDataChange}
            placeholder="Date of Birth"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>
        {/* Gender */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="dob" className="text-gray-400 text-sm">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={userData.gender}
            onChange={handleUserDataChange}
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Femaale</option>
            <option value="others">Others</option>
          </select>
        </div>
        {/* Pin Code */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="pincode" className="text-gray-400 text-sm">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            value={userData.pincode}
            onChange={handleUserDataChange}
            placeholder="Pincode"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>
        <div className="flex flex-col space-y-2 col-span-2">
          <label htmlFor="bio" className="text-gray-400 text-sm">
            Bio
          </label>
          <textarea
            id="bio"
            value={userData.bio}
            onChange={handleUserDataChange}
            placeholder="Bio"
            className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>
        <button
          onClick={submitUserData}
          className="cursor-pointer w-fit bg-cyan-500 text-gray-50 px-4 py-2 rounded-md hover:bg-cyan-600 transition-all col-span-2"
        >
          Save Personal Information
        </button>
      </div>
    </>
  );
}

export default PersonalInformation;
