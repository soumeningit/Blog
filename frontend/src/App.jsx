import { Route, Routes } from "react-router-dom";
import Editor from "./Components/Editor";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import OtpVerification from "./Pages/OtpVerification";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";
import DashboardMain from "./Dashboard/DashboardMain";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Dashboard/Profile";
import Setting from "./Dashboard/Setting";
import ShowBlog from "./Components/ShowBlog";
import EditBlog from "./Components/EditBlog";
import SearchItem from "./Components/SearchItem";
import FileUpload from "./Components/FileUpload";

function App() {
  return (
    <div className="bg-sky-100 dark:bg-slate-800 min-h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<NewPassword />} />
        <Route path="/blog/:id" element={<ShowBlog />} />
        <Route path="/search/:query" element={<SearchItem />} />
        <Route element={<DashboardMain />} path="/dashboard">
          <Route path="/dashboard/mydashboard" element={<Dashboard />} />
          <Route path="/dashboard/myprofile" element={<Profile />} />
          <Route path="/dashboard/setting" element={<Setting />} />
          <Route path="/dashboard/editor" element={<Editor />} />
          <Route path="/dashboard/edit-blog/:id" element={<EditBlog />} />
          <Route path="/dashboard/file-upload/:id" element={<FileUpload />} />
        </Route>
      </Routes>
      {/* <Editor placeholder="Start typing..." /> */}
    </div>
  );
}

export default App;
