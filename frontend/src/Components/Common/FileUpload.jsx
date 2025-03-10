import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateImageAPI } from "../../Service/API/ProfileAPI";
import toast from "react-hot-toast";

function FileUploadModal({ showFileUpload, setShowFileUpload }) {
  const { token, user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle File Upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Handle File Drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle File Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
  };

  // Handle Submit Function
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    const toastId = toast.loading("Loading ....");
    try {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("file", file);
      console.log("formdata " + formData);
      const response = await updateImageAPI(formData, token);
      console.log("response in file upload " + JSON.stringify(response));

      if (response.data.success) {
        toast.success("File Uploaded Successfully!");
        toast.dismiss(toastId);
        setShowFileUpload(false);
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      {showFileUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[500px] shadow-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-100">
                Upload Your File
              </h2>
              <button
                onClick={() => setShowFileUpload(false)}
                className="text-red-500 hover:text-red-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Upload Box */}
            <div
              className="flex items-center justify-center w-full h-44 border-2 border-dashed border-gray-500 rounded-lg bg-gray-700 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              {file ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    className="w-10 h-10 mx-auto text-gray-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm">
                    Drag & Drop File or{" "}
                    <span className="text-cyan-400 font-semibold">
                      Click to Upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, SVG (MAX. 5MB)
                  </p>
                </div>
              )}
              {/* Hidden Input */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowFileUpload(false)}
                className="bg-gray-600 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-all cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FileUploadModal;
