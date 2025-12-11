import { useState } from "react";
import { AtSign, Copy, Check } from "lucide-react";
import { useToast } from "../../../components/ToastProvider";
import { formateDate } from "../../../utils/DateFormatter";

function GeneralProfile({
  isEditing,
  profileData,
  setProfileData,
  handleEditMap,
}) {
  const [usernameCopied, setUsernameCopied] = useState(false);
  const toast = useToast();
  function handleCopyUsername() {
    navigator.clipboard.writeText(profileData?.profile?.username ?? "");
    setUsernameCopied(true);
    toast.success("Username copied!");
    setTimeout(() => setUsernameCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profileData.name ?? ""}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  name: e.target.value,
                });
                handleEditMap("name", e.target.value);
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                readOnly
                value={profileData?.profile?.username ?? ""}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                {usernameCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy
                    onClick={handleCopyUsername}
                    className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData?.email ?? ""}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  email: e.target.value,
                });
                handleEditMap("email", e.target.value);
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={profileData?.profile?.location ?? ""}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  profile: {
                    ...profileData.profile,
                    location: e.target.value,
                  },
                });
                handleEditMap("location", e.target.value);
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Birthday
            </label>
            <input
              type={isEditing ? "date" : "text"}
              value={
                isEditing
                  ? profileData?.profile?.dateOfBirth ?? ""
                  : profileData?.profile?.dateOfBirth
                  ? formateDate(profileData.profile.dateOfBirth)
                  : ""
              }
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  profile: {
                    ...profileData.profile,
                    dateOfBirth: e.target.value,
                  },
                });
                handleEditMap("dateOfBirth", e.target.value);
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={profileData?.profile?.gender ?? ""}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  profile: {
                    ...profileData.profile,
                    gender: e.target.value,
                  },
                });
                handleEditMap("gender", e.target.value);
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            rows={4}
            value={profileData?.profile?.bio ?? ""}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                profile: {
                  ...profileData.profile,
                  bio: e.target.value,
                },
              });
              handleEditMap("bio", e.target.value);
            }}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralProfile;
