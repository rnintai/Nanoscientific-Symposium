import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { countries } from "utils/Countries";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();

  useEffect(() => {
    if (!countries.includes(authState.role)) {
      alert("Coming Soon");
    }
  }, []);

  return countries.includes(authState.role) ? (
    <>{children} </>
  ) : (
    <Navigate to={`/${pathname}`} />
  );
};

export default AdminRoute;
