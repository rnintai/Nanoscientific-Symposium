import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface RedirectRouteProps {
  path: string;
  // eslint-disable-next-line react/require-default-props
  target?: string;
}

const RedirectRoute = (props: RedirectRouteProps) => {
  const [counter, setCounter] = useState<number>(0);

  const navigate = useNavigate();
  const { path, target = "_self" } = props;

  useEffect(() => {
    setCounter(counter + 1);
    if (counter < 1) {
      window.open(path, target, "noopener, noreferrer");
      navigate(-1);
    }
  }, []);

  return <Box className="layout body-fit" />;
};

export default RedirectRoute;
