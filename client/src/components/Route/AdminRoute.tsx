import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import { countries } from "utils/Countries";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const authState = useAuthState();

  return countries.includes(authState.role) ? (
    <>{children} </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
