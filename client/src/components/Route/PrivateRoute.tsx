import React, { useState, useEffect } from "react";
import { useNavigate } from "hooks/useNavigateWithSearch";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import NSSButton from "components/Button/NSSButton";
import { Box, Typography } from "@mui/material";
import { nonVisitorRole } from "utils/Roles";
import { globalData } from "utils/GlobalData";
import useCurrentYear from "hooks/useCurrentYear";
import InnerHTML from "dangerously-set-html-content";
import { mainFontSize } from "utils/FontSize";

interface PrivateRouteProps {
  children: React.ReactNode;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  allowVisitor?: boolean;
}

const PrivateRoute = ({
  children,
  setEmailModalOpen,
  allowVisitor = false,
}: PrivateRouteProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const currentYear = useCurrentYear();
  const navigate = useNavigate();

  const { privateRouteMessage } = globalData.get(
    `${pathname}${currentYear}`,
  ) as Common.globalDataType;

  useEffect(() => {
    if (authState.role === "guest") {
      // alert("You have to sign in first.");
      setEmailModalOpen(true);
    }
  }, []);

  if (
    authState.role === "guest" ||
    (authState.role === "visitor" && !allowVisitor)
  ) {
    return (
      // <Navigate to={`/${pathname}`} />
      <Box
        className="body-fit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {privateRouteMessage && !nonVisitorRole.includes(authState.role) && (
          <Typography fontSize={mainFontSize} textAlign="center">
            <InnerHTML html={privateRouteMessage} />
          </Typography>
        )}
        <br />
        <NSSButton
          variant="gradient"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go to a previous page
        </NSSButton>
      </Box>
    );
  }
  return <>{children} </>;
};

export default PrivateRoute;
