import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import useSubPath from "hooks/useSubPath";
import { countries } from "utils/Countries";
import axios from "axios";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const subPath = useSubPath();
  const [isRouteHidden, setIsRouteHidden] = useState<boolean>(true);

  const isAdminRoute = subPath.split("/").indexOf("admin") !== -1;

  useEffect(() => {
    if (!isAdminRoute) {
      axios
        .post("/api/menu/admin", { nation: pathname, path: subPath })
        .then((res) => {
          setIsRouteHidden(res.data.result);
          if (
            (isRouteHidden || isAdminRoute) &&
            !countries.includes(authState.role)
          ) {
            alert("Coming Soon");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (isRouteHidden || isAdminRoute) &&
    countries.includes(authState.role) ? (
    <>{children} </>
  ) : (
    <Navigate to={`/${pathname}`} />
  );
};

export default AdminRoute;
