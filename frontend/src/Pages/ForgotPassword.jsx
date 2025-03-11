import React, { useState } from "react";
import toast from "react-hot-toast";
import { forgotPasswordToken } from "../Service/API/AuthAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("A reset link has been sent to the registered email.");
    const toastId = toast.loading("Loading...");
    try {
      const response = await forgotPasswordToken({ email });
      toast.dismiss(toastId);
      if (response.success === true) {
        toast.success(response.message);
        return;
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Error in sending reset link", error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password?
        </h2>
        <p className="text-gray-300 text-center mb-4">
          Enter your registered email, and we will send you a link to reset your
          password.
        </p>
        {message && (
          <p className="text-green-400 text-center mb-4">{message}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-gray-300 font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white py-2 px-6 rounded-lg font-semibold w-full"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
