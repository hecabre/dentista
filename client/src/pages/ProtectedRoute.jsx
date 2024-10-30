import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) return <Spinner />;
  if (!loading && !isAuthenticated) return <Navigate to={"/"} replace />;

  if (role !== requiredRole) return <Navigate to={"/"} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
