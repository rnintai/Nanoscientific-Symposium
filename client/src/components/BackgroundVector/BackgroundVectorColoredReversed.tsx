import { Box } from "@mui/material";
import React from "react";
import { BackgroundVectorColoredReversedContainer } from "./BackgroundVectorStyles";

interface BackgroundVectorProps {
  children: React.ReactNode;
}

const BackgroundVectorColoredReversed = ({
  children,
}: BackgroundVectorProps) => {
  return (
    <BackgroundVectorColoredReversedContainer>
      {children}
    </BackgroundVectorColoredReversedContainer>
  );
};

export default BackgroundVectorColoredReversed;
