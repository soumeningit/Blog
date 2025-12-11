import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Bell,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getUserProfileDetailsAPI,
  updateProfilePicAPI,
  updateUserProfileAPI,
} from "../../service/operations/ProfileOpern";
import { useToast } from "../../components/ToastProvider";
import { useProfile } from "../../contexts/ProfileContext";
import GeneralProfile from "./Profile/GeneralProfile";
import Notification from "./Profile/Notification";
import SocialLinks from "./Profile/SocialLinks";
import { formateDate } from "../../utils/DateFormatter";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [usernameCopied, setUsernameCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editMap, setEditMap] = useState({});

  const authData = useAuth().getValue();
  const token = authData?.token;
  const toast = useToast();
  const profile = useProfile();
  const updateProfile = profile.setProfileFunc;

  const handleEditMap = (fieldName, value) => {
    setEditMap((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Form states
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
    birthday: "",
    bio: "",
    avatar: "",
    profile: { profilePic: "" },
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    newComments: true,
    newFollowers: true,
    weeklyDigest: false,
    productUpdates: true,
    securityAlerts: true,
  });

  const [socialLinks, setSocialLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "social", label: "Social Links", icon: Globe },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await getUserProfileDetailsAPI(token);
        if (response.status === 200) {
          setProfileData((prev) => ({
            ...prev,
            ...(response?.data?.data || {}),
          }));
          setSocialLinks(response?.data?.data?.profile?.socialLinks || {});
          setEditMap({});
          profile.setProfileFunc(response?.data?.data);
        }
      } catch (error) {
        setProfileData({});
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch user profile details"
        );
        console.error("Failed to fetch user profile details:", error);
      }
    }
    fetchUserProfile();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await updateProfilePicAPI(token, formData);

      if (response.status === 200) {
        toast.success("Profile picture updated successfully");

        // Update profile context with new avatar URL
        if (response?.data?.data?.avatar) {
          const updatedProfile = {
            ...profileData,
            avatar: response.data.data.avatar,
          };
          setProfileData(updatedProfile);
          updateProfile(updatedProfile);
        }
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile picture"
      );
      // Revert preview on error
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
      // Clear the input so the same file can be selected again
      e.target.value = "";
    }
  };

  const handleProfileSave = async () => {
    console.log("Edited fields from editMap:", JSON.stringify(editMap));
    console.log("Saving to userId:", authData.user.id);

    setIsSaving(true);
    setIsEditing(false);
    try {
      const response = await updateUserProfileAPI(token, {
        ...editMap,
        id: authData.user.id,
      });
      setIsSaving(false);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        // Update original data with new values
        setEditMap({});
        updateProfile(profileData);
        setIsEditing(false);
      }
    } catch (error) {
      setIsSaving(false);
      setIsEditing(false);
      console.error("Error saving profile:", error);
      toast.error(
        error?.response?.data?.message || "Failed to save profile changes"
      );
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const copyUsername = () => {
    const username =
      profileData?.profile?.username ||
      authData.user.name.toLowerCase().replace(/\s+/g, "");
    navigator.clipboard.writeText(username);
    setUsernameCopied(true);
    toast.success("Username copied!");
    setTimeout(() => setUsernameCopied(false), 2000);
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
        {isEditing && (
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProfileSave}
              disabled={isSaving}
              className={`btn-primary flex items-center gap-2 ${
                isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <img
                src={
                  profileData?.profile?.profilePic ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    authData.user.name || "User"
                  )}&background=random&size=128`
                }
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {isEditing && (
              <label
                className={`absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full ${
                  isUploadingAvatar
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-primary-700"
                } transition-colors`}
              >
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleAvatarChange}
                  disabled={isUploadingAvatar}
                />
              </label>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {authData.user.name}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <p className="text-gray-500 dark:text-gray-400">
                @
                {profileData?.profile?.username ||
                  authData.user.name.toLowerCase().replace(/\s+/g, "")}
              </p>
              <button
                onClick={copyUsername}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy username"
              >
                {usernameCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {profileData?.profile?.bio || ""}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profileData.email || ""}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profileData?.profile?.location || ""}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formateDate(profileData?.createdAt) || ""}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Edit3 className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={itemVariants}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <GeneralProfile
              isEditing={isEditing}
              profileData={profileData}
              setProfileData={setProfileData}
              handleEditMap={handleEditMap}
            />
          )}
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Notification
              notifications={notifications}
              setNotifications={setNotifications}
              handleEditMap={handleEditMap}
            />
          )}

          {/* Social Links Tab */}
          {activeTab === "social" && (
            <SocialLinks
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              isEditing={isEditing}
              copyToClipboard={copyToClipboard}
              getSocialIcon={getSocialIcon}
              handleEditMap={handleEditMap}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default Profile;
