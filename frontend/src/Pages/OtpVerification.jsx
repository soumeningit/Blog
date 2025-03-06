import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../Service/API/AuthAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();
  const { registerData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showResendBtn, setShowResendBtn] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResendBtn(true);
    }
  }, [countdown]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("OTP: ", otp);
    console.log("Register Data: ", registerData);
    const data = {
      ...registerData,
      otp: otp,
    };
    console.log("Register Data: ", data);
    const toastId = toast.loading("Loading...");
    try {
      const response = await registerUser(data);
      toast.dismiss(toastId);
      if (response.data.success === true) {
        console.log("User registered successfully", response);
        console.log("User registered successfully", JSON.stringify(response));
        toast.success("User registered successfully");
        navigate("/signin");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error in verifying OTP");
      console.log("Error in verifying OTP", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          OTP Verification
        </h2>
        <p className="text-gray-300 text-center mb-4">
          Enter the 4-digit OTP sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-300 font-medium">
            OTP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            maxLength="4"
            required
            className="w-full px-4 py-2 text-center bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none tracking-widest text-xl"
          />
          <div className="flex justify-between items-center">
            {showResendBtn ? (
              <button
                type="button"
                className="text-blue-400 hover:underline text-sm"
                onClick={() => {
                  setCountdown(30);
                  setShowResendBtn(false);
                }}
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-800 text-sm">
                Resend OTP in {countdown}s
              </span>
            )}
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 transition duration-300 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
