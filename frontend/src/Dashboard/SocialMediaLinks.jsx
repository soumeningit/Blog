import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateSocialLinksAPI } from "../Service/API/ProfileAPI";
import { useSelector } from "react-redux";

function SocialMediaLinks() {
  const { token, user } = useSelector((state) => state.auth);
  const [socialLinks, setSocialLinks] = useState({
    Facebook: "",
    Twitter: "",
    Instagram: "",
    LinkedIn: "",
    GitHub: "",
    Others: [
      {
        name: "",
        link: "",
      },
    ],
  });

  const handleChange = (e, platform) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: e.target.value,
    }));
  };

  const submitSocialLinks = async () => {
    const data = {};
    data.userId = user.userId;
    data.socialLinks = socialLinks;
    console.log("Social Links Data", data);
    const toastId = toast.loading("Updating Social Links...");
    try {
      const response = await updateSocialLinksAPI(data, token);
      console.log("UPDATE SOCIAL LINKS RESPONSE: ", JSON.stringify(response));
      toast.dismiss(toastId);
      if (response.data.success) {
        toast.success("Social Links Updated Successfully");
        setSocialLinks({
          Facebook: "",
          Twitter: "",
          Instagram: "",
          LinkedIn: "",
          GitHub: "",
          Others: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Social Links");
    }
  };

  const addOtherLink = () => {
    setSocialLinks((prev) => {
      return {
        ...prev,
        Others: [...prev.Others, { name: "", link: "" }],
      };
    });
  };

  const removeOtherLink = (index) => {
    setSocialLinks((prev) => {
      const newOthers = prev.Others.filter((_, i) => i !== index);
      return {
        ...prev,
        Others: newOthers,
      };
    });
  };

  const handleOtherLinkChange = (index, e) => {
    const { id, value } = e.target;
    setSocialLinks((prev) => {
      const updatedOthers = [...prev.Others];
      updatedOthers[index][id] = value;
      return {
        ...prev,
        Others: updatedOthers,
      };
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-50 border-b border-gray-700 pb-2 mt-4">
        Social Media Links
      </h2>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {["Facebook", "Twitter", "Instagram", "LinkedIn", "GitHub"].map(
            (platform) => (
              <div key={platform} className="flex flex-col space-y-2">
                <label
                  htmlFor={platform.toLowerCase()}
                  className="text-gray-400 text-sm"
                >
                  {platform}
                </label>
                <input
                  type="text"
                  id={platform.toLowerCase()}
                  placeholder={`https://${platform.toLowerCase()}.com`}
                  value={socialLinks[platform]}
                  onChange={(e) => handleChange(e, platform)}
                  className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>
            )
          )}
          <div className="flex flex-col space-y-2 col-span-2">
            <label htmlFor="others" className="text-gray-400 text-sm">
              Others
            </label>
            <button
              onClick={addOtherLink}
              className="w-fit cursor-pointer bg-cyan-500 text-gray-50 p-2 rounded-md hover:bg-cyan-600 transition-all"
            >
              Add Link
            </button>
          </div>
          <div className="flex flex-col space-y-2 col-span-2">
            {socialLinks.Others.map((link, index) => (
              <div key={index} className="flex flex-row space-x-4 w-full">
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="others" className="text-gray-400 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={link.name}
                    placeholder="Name"
                    onChange={(e) => handleOtherLinkChange(index, e)}
                    className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="others" className="text-gray-400 text-sm">
                    Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={link.link}
                    placeholder="Link"
                    onChange={(e) => handleOtherLinkChange(index, e)}
                    className="bg-gray-700 border border-gray-600 rounded-md text-gray-50 p-2 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                <div className="flex flex-col space-y-2 items-center justify-center translate-y-4">
                  <button
                    onClick={() => removeOtherLink(index)}
                    className="w-fit cursor-pointer bg-red-500 text-gray-50 p-2 rounded-md hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={submitSocialLinks}
          className="cursor-pointer bg-cyan-500 text-gray-50 p-2 rounded-md hover:bg-cyan-600 transition-all"
        >
          Save Social Links
        </button>
      </div>
    </>
  );
}

export default SocialMediaLinks;
