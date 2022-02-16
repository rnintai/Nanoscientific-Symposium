import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authState = useAuthState();

  return authState.role !== "guest" ? <>{children} </> : <Navigate to="/" />;
};

export default PrivateRoute;
