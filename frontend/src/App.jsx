import "./App.css";
import Login from "./user/login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./user/register/Register";
import ForgotPassword from "./user/Forgotpassword/ForgotPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import Layout from "./Layouts/UserLayout";
import Dashbored from "./user/dashbored/dashbored";
import RoleProtectedRoute from "./protection/RoleProtectedRoute";
import MyBrowedBook from "./user/MyBrowedBook/MyBrowedbook";
import History from "./user/history/history";
import BrowseBook from "./user/BrowseBook/BrowseBook";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/user" element={
        <RoleProtectedRoute allowedRoles={["STUDENT"]}>
          <Layout />
        </RoleProtectedRoute>
      }>
        <Route path="dashbored" element={<Dashbored />} />
        <Route path="books" element={<BrowseBook />} />
        <Route path="borrowed" element={<MyBrowedBook />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
