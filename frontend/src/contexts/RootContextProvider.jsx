import { AdminProvider } from "../admin/AdminContext";
import AuthContextProvider from "./AuthContext";
import { DarkModeProvider } from "./DarkModeContext";
import ProfileContextProvider from "./ProfileContext";
import ViewContextProvider from "./ViewContext";

function RootContextProvider({ children }) {
  return (
    <>
      <DarkModeProvider>
        <ViewContextProvider>
          <AuthContextProvider>
            <ProfileContextProvider>
              <AdminProvider>{children}</AdminProvider>
            </ProfileContextProvider>
          </AuthContextProvider>
        </ViewContextProvider>
      </DarkModeProvider>
    </>
  );
}
export default RootContextProvider;
