import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();

  return authState.role !== "guest" ? (
    <>{children} </>
  ) : (
    <Navigate to={`/${pathname}`} />
  );
};

export default PrivateRoute;
