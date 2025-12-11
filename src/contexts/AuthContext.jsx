import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  function safeParse(item) {
    try {
      const value = localStorage.getItem(item);
      if (!value || value === "undefined" || value === "null") return null;
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function getData() {
    const token = safeParse("token");
    const user = safeParse("user");
    return { token, user };
  }

  const [otpData, setOtpData] = useState({});
  const [data, setData] = useState(getData());

  function updateOTPData(payload) {
    setOtpData(payload);
  }

  function setValue(token, user) {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setData({ token, user });
  }

  function getValue() {
    const token = safeParse("token");
    const user = safeParse("user");
    return { token, user };
  }

  function LogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setData(null);
    window.location.href = "/auth/login";
  }

  useEffect(() => {
    if (!data?.token) return;

    let decoded;
    try {
      decoded = jwtDecode(data.token);
    } catch {
      LogOut();
      return;
    }

    const expiryTime = decoded.exp * 1000;
    const now = Date.now();

    if (expiryTime <= now) {
      LogOut();
      return;
    }

    const timeout = expiryTime - now;

    const timer = setTimeout(() => {
      LogOut();
    }, timeout);

    return () => clearTimeout(timer);
  }, [data?.token]);

  return (
    <AuthContext.Provider
      value={{ otpData, updateOTPData, setValue, getValue, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
