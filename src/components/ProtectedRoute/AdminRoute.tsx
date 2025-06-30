import { Navigate } from "react-router";
import { useAuth } from "../../hooks/AuthProvider";
import { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("Admin");

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
