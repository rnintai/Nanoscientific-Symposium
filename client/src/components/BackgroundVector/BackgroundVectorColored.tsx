import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorColoredContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  children: React.ReactNode;
}

const BackgroundVectorWhite = ({ children }: BackgroundVectorProps) => {
  return (
    <BackgroundVectorColoredContainer>
      {children}
    </BackgroundVectorColoredContainer>
  );
};

export default BackgroundVectorWhite;
