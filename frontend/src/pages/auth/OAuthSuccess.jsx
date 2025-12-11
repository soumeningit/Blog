import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/hooks/useToast";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const token = queryParams.get("token");
  const userId = queryParams.get("userId");
  const name = queryParams.get("userName");
  const role = queryParams.get("role");

  const authData = useAuth();
  const setValue = authData?.setValue;
  const toast = useToast();

  const user = { userId, name, firstName: name, role };

  useEffect(() => {
    if (token) {
      if (setValue) {
        setValue(token, user);
      }

      setTimeout(() => {
        toast.success("Login successful!");
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard/my-profile");
        }
      }, 1500); // short delay for smoother UX
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default OAuthSuccess;
