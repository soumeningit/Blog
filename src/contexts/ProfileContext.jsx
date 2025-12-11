import { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

function ProfileContextProvider({ children }) {
  const [profileData, setProfileData] = useState({});
  const [profileResponse, setProfileResponse] = useState({});

  function setProfileFunc(data) {
    setProfileData(data);
  }

  function updateProfileData(data) {
    setProfileData(data);
  }

  return (
    <ProfileContext.Provider
      value={{ profileData, updateProfileData, setProfileFunc }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
export default ProfileContextProvider;
