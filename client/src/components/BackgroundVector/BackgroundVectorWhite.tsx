import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorWhiteContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  children: React.ReactNode;
}

const BackgroundVectorWhite = ({ children }: BackgroundVectorProps) => {
  return (
    <BackgroundVectorWhiteContainer>{children}</BackgroundVectorWhiteContainer>
  );
};

export default BackgroundVectorWhite;
