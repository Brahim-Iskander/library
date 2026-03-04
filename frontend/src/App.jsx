import "./App.css";
import Login from "./user/login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./user/register/Register";
import ForgotPassword from "./user/Forgotpassword/ForgotPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import Layout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";
import Dashbored from "./user/dashbored/dashbored";
import RoleProtectedRoute from "./protection/RoleProtectedRoute";
import MyBrowedBook from "./user/MyBrowedBook/MyBrowedbook";
import History from "./user/history/history";
import BrowseBook from "./user/BrowseBook/BrowseBook";
import Profile from "./user/profile/Profile";
import ManageLibrarian from "./admin/mangerlibrarian/mange";
import AdminDashbored from "./admin/Dashbored/dash";
import Unauthorized from "./components/Unautorized";
import Librariandash from "./librarian/dashbored/dash";
import ManageBooks from "./librarian/managebooks/manage";
import LibrarianLayout from "./Layouts/LibrarianLayout";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/user"
        element={
          <RoleProtectedRoute allowedRoles={["STUDENT"]}>
            <Layout />
          </RoleProtectedRoute>
        }
      >
        <Route path="dashbored" element={<Dashbored />} />
        <Route path="books" element={<BrowseBook />} />
        <Route path="borrowed" element={<MyBrowedBook />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="/librarian"
        element={
          <RoleProtectedRoute allowedRoles={["LIBRARIAN"]}>
            <LibrarianLayout />
          </RoleProtectedRoute>
        }
      >
        <Route path="dashbored" element={<Librariandash />} />
        <Route path="manage-books" element={<ManageBooks />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </RoleProtectedRoute>
        }
      >
        <Route path="dashbored" element={<AdminDashbored />} />
        <Route path="manage-librarian" element={<ManageLibrarian />} />
        <Route path="manage-books" element={<ManageBooks />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
