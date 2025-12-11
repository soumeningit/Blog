import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Calendar,
  User,
  FileText,
  Shield,
  Edit2,
  Save,
  XCircle,
} from "lucide-react";
import { formateDate } from "../../../utils/DateFormatter";

function ShowUserDetails({ isOpen, loadingDetails, userDetails, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedAuthorized, setEditedAuthorized] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setEditedRole(userDetails.role || "user");
      setEditedStatus(userDetails.status || "active");
      setEditedAuthorized(userDetails.is_authorised || false);
    }
  }, [userDetails]);

  const handleSave = () => {
    // TODO: Implement API call to update user details
    console.log("Saving changes:", {
      userId: userDetails._id,
      role: editedRole,
      status: editedStatus,
      is_authorised: editedAuthorized,
    });
    setIsEditing(false);
    // You can add API call here to update the user
  };

  const handleCancel = () => {
    setEditedRole(userDetails.role || "user");
    setEditedStatus(userDetails.status || "active");
    setEditedAuthorized(userDetails.is_authorised || false);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">User Details</h2>
            <div className="flex items-center gap-2">
              {!loadingDetails &&
                userDetails &&
                Object.keys(userDetails).length > 0 && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    title={isEditing ? "Cancel Edit" : "Edit User"}
                  >
                    {isEditing ? <XCircle size={24} /> : <Edit2 size={24} />}
                  </button>
                )}
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {loadingDetails ? (
              // Loading Skeleton
              <div className="space-y-6 animate-pulse">
                {/* Avatar Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Info Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>

                {/* Bio Skeleton */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ) : !userDetails || Object.keys(userDetails).length === 0 ? (
              // No Data State
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No user data available
                </p>
              </div>
            ) : (
              // Actual Content
              <div className="space-y-6">
                {/* User Avatar & Basic Info */}
                <div className="flex items-center gap-4">
                  {userDetails.userProfile?.profilePic ? (
                    <img
                      src={userDetails.userProfile.profilePic}
                      alt={userDetails.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 dark:border-purple-800"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {userDetails.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {userDetails.name || "Unknown User"}
                    </h3>
                    {userDetails.userProfile?.username && (
                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        @{userDetails.userProfile.username}
                      </p>
                    )}
                    <p className="text-gray-500 dark:text-gray-400">
                      {userDetails.email || "No email"}
                    </p>
                  </div>
                </div>

                {/* User Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Role */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Shield size={16} />
                      <span>Role</span>
                      {isEditing && (
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          (Editable)
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <select
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="user">User</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
                        {userDetails.role || "N/A"}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <User size={16} />
                      <span>Status</span>
                      {isEditing && (
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          (Editable)
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full capitalize ${
                          userDetails.status === "active"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : userDetails.status === "inactive"
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
                            : userDetails.status === "suspended"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {userDetails.status || "N/A"}
                      </span>
                    )}
                  </div>

                  {/* Authorization Status */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Shield size={16} />
                      <span>Authorized</span>
                      {isEditing && (
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          (Editable)
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editedAuthorized}
                          onChange={(e) =>
                            setEditedAuthorized(e.target.checked)
                          }
                          className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {editedAuthorized ? "Authorized" : "Not Authorized"}
                        </span>
                      </label>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full ${
                          userDetails.is_authorised
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {userDetails.is_authorised ? "Yes" : "Pending"}
                      </span>
                    )}
                  </div>

                  {/* OAuth User */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <User size={16} />
                      <span>OAuth User</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.isOAuthUser ? "Yes" : "No"}
                    </p>
                  </div>

                  {/* Saved Posts */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <FileText size={16} />
                      <span>Saved Posts</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.savedPosts?.length || 0}
                    </p>
                  </div>

                  {/* Followers */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <User size={16} />
                      <span>Followers</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.follower?.length || 0}
                    </p>
                  </div>

                  {/* Following */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <User size={16} />
                      <span>Following</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.following?.length || 0}
                    </p>
                  </div>

                  {/* Contact Number */}
                  {userDetails.userProfile?.contactNumber && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                        <Mail size={16} />
                        <span>Contact</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {userDetails.userProfile.contactNumber}
                      </p>
                    </div>
                  )}

                  {/* Gender */}
                  {userDetails.userProfile?.gender && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                        <User size={16} />
                        <span>Gender</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
                        {userDetails.userProfile.gender}
                      </p>
                    </div>
                  )}

                  {/* Date of Birth */}
                  {userDetails.userProfile?.dateOfBirth && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                        <Calendar size={16} />
                        <span>Date of Birth</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {formateDate(userDetails.userProfile.dateOfBirth)}
                      </p>
                    </div>
                  )}

                  {/* Join Date */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Calendar size={16} />
                      <span>Joined</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.createdAt
                        ? formateDate(userDetails.createdAt)
                        : "N/A"}
                    </p>
                  </div>

                  {/* Last Updated */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Calendar size={16} />
                      <span>Last Updated</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {userDetails.updatedAt
                        ? formateDate(userDetails.updatedAt)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Bio Section */}
                {userDetails.userProfile?.bio && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Bio
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {userDetails.userProfile.bio}
                    </p>
                  </div>
                )}

                {/* About Section */}
                {userDetails.userProfile?.about && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      About
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {userDetails.userProfile.about}
                    </p>
                  </div>
                )}

                {/* Location & Country */}
                {(userDetails.userProfile?.location ||
                  userDetails.userProfile?.country) && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Location Details
                    </h4>
                    <div className="space-y-2">
                      {userDetails.userProfile.location && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Location:
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {userDetails.userProfile.location}
                          </span>
                        </div>
                      )}
                      {userDetails.userProfile.country && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Country:
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {userDetails.userProfile.country}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {userDetails.userProfile?.socialLinks &&
                  Object.values(userDetails.userProfile.socialLinks).some(
                    (link) => link
                  ) && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Social Links
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {userDetails.userProfile.socialLinks.github && (
                          <a
                            href={userDetails.userProfile.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                              GitHub:
                            </span>
                            <span className="truncate">
                              {userDetails.userProfile.socialLinks.github}
                            </span>
                          </a>
                        )}
                        {userDetails.userProfile.socialLinks.linkedin && (
                          <a
                            href={userDetails.userProfile.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                              LinkedIn:
                            </span>
                            <span className="truncate">
                              {userDetails.userProfile.socialLinks.linkedin}
                            </span>
                          </a>
                        )}
                        {userDetails.userProfile.socialLinks.twitter && (
                          <a
                            href={userDetails.userProfile.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                              Twitter:
                            </span>
                            <span className="truncate">
                              {userDetails.userProfile.socialLinks.twitter}
                            </span>
                          </a>
                        )}
                        {userDetails.userProfile.socialLinks.facebook && (
                          <a
                            href={userDetails.userProfile.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                              Facebook:
                            </span>
                            <span className="truncate">
                              {userDetails.userProfile.socialLinks.facebook}
                            </span>
                          </a>
                        )}
                        {userDetails.userProfile.socialLinks.instagram && (
                          <a
                            href={userDetails.userProfile.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                              Instagram:
                            </span>
                            <span className="truncate">
                              {userDetails.userProfile.socialLinks.instagram}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <XCircle size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ShowUserDetails;
