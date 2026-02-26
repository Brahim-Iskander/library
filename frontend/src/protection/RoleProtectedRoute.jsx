import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // wait for localStorage restoration
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleProtectedRoute;