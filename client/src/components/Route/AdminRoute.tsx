import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import useSubPath from "hooks/useSubPath";
import { editorRole } from "utils/Roles";
import axios from "axios";
import Loading from "components/Loading/Loading";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const subPath = useSubPath();
  const navigate = useNavigate();
  const [isPublishedRoute, setIsPublishedRoute] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const isAdminRoute = subPath.split("/").indexOf("admin") !== -1;
  const isUserAdmin = editorRole.includes(authState.role);

  useEffect(() => {
    setLoading(true);
    if (!isAdminRoute) {
      axios
        .post("/api/menu/admin", { nation: pathname, path: subPath })
        .then((res) => {
          setIsPublishedRoute(res.data.result ? 1 : 0);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsPublishedRoute(1);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && isPublishedRoute !== -1) {
      if (isPublishedRoute === 0 || isAdminRoute) {
        if (isUserAdmin) {
          // case 1: unpublished 페이지나 어드민 페이지는 어드민만 허용.
        } else {
          // case 2: unpublished 페이지나 어드민 페이지는 방문자에게 비허용.
          alert("Coming Soon");
          navigate(`/${pathname}`);
        }
      } else {
        // case 3: publish된 페이지 or admin이 아닌 페이지 -> 공개
      }
    }

    // loading
    // resultJSX = <Loading />;
  }, [isPublishedRoute, loading]);

  // return resultJSX;
  return (
    <>
      {(loading || isPublishedRoute === -1) && <Loading />}
      {(!loading && (isPublishedRoute === 1 || isAdminRoute)) ||
      editorRole.includes(authState.role) ? (
        <>{children} </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdminRoute;
