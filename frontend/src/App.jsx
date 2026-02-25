import "./App.css";
import Login from "./user/login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./user/register/Register";
import ForgotPassword from "./user/Forgotpassword/ForgotPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import Layout from "./Layouts/UserLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/user" element={<Layout />}>
        <Route path="dashbored" element={<h1>User Dashboard </h1>} />
        <Route path="list" element={<h1>Browse Books</h1>} />
        <Route path="borrowed" element={<h1>My Borrowed Books</h1>} />
        <Route path="history" element={<h1>History</h1>} />
        <Route path="profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
