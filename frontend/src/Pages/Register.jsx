import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRegisterData } from "../Redux/Slice/authSlice";
import toast from "react-hot-toast";
import { sendOTP } from "../Service/API/AuthAPI";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: "user",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    const toastId = toast.loading("Sending OTP...");
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.dismiss(toastId);
        toast.error("Passwords do not match");
        return;
      }
      const response = await sendOTP(formData);
      // console.log("OTP sent successfully", response);
      // console.log("Response in register page : ", JSON.stringify(response));
      toast.dismiss(toastId);
      if (response.data.success === true) {
        dispatch(setRegisterData(formData));
        navigate("/otp-verification");
        toast.success("OTP sent successfully");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error in registering user");
      console.log("Error in registering user", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full max-w-6xl bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center p-10 space-y-6 text-center">
          <h1 className="text-4xl font-bold">Welcome to My Blog!</h1>
          <p className="text-gray-300">
            We're thrilled to have you here. Join our community and be the first
            to know about exciting new posts, discussions, and updates.
          </p>
          <div className="text-left w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-200">
              Why Create an Account?
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
              <li>
                Comment on posts, share your thoughts, and discuss with fellow
                readers.
              </li>
              <li>Bookmark your favorite posts and access them anytime.</li>
              <li>
                Get personalized content recommendations based on your
                interests.
              </li>
              <li>
                Join a growing community of readers and writers who share your
                passions.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section (Registration Form) */}
        <div className="flex flex-col items-center justify-center p-10 bg-gray-700">
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-gray-300 font-medium">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                >
                  <option value="user">User</option>
                  <option value="author">Author</option>
                  <option value="employee">Employee</option>
                </select>
                <div className="text-gray-300 text-sm mt-1">
                  Choose the account type you want to create.
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-gray-300 font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 transition duration-300 text-white py-2 rounded-lg font-semibold mt-4"
              >
                Register
              </button>
              <div>
                <p className="text-gray-300 text-sm mt-2">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-400 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
