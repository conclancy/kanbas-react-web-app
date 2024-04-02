import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../../Users/Profile";
import Signin from "../../Users/Signin";
import UserTable from "../../Users/Table";
import Signup from "../../Users/Signup";


export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
