import React, { useState } from "react";
import signinimage from "../assets/signin.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../Service/API/AuthAPI";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const toastId = toast.loading("Logging in...");
    try {
      const response = await loginUser(formData, dispatch);
      toast.dismiss(toastId);
      console.log("Login Response: ", response);
      console.log("Response in login page : ", JSON.stringify(response));
      if (response.data.success === true) {
        toast.success("User logged in successfully");
        navigate("/dashboard/mydashboard");
      }
    } catch (e) {
      toast.dismiss(toastId);
      toast.error("Error in logging in user");
      console.log("Error in logging in user", e);
    } finally {
      toast.dismiss(toastId);
    }
  }

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <section className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Left Section - Image */}
        <div className="hidden md:flex items-center justify-center bg-gray-200 p-4">
          <img
            src={signinimage}
            alt="Sign in"
            loading="lazy"
            className="w-80 h-auto"
          />
        </div>

        {/* Right Section - Form */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            We're glad to see you again. Please log in to continue reading and
            writing posts.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/registration" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
