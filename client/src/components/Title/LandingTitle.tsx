/* eslint-disable react/require-default-props */
import React from "react";
import { useTheme, Box } from "@mui/material";

interface LandingTitleProps {
  title: string;
  textAlign?: "center" | "left" | "right";
}

const LandingTitle = ({ title, textAlign = "left" }: LandingTitleProps) => {
  const theme = useTheme();
  return (
    <Box
      fontSize={{
        mobile: theme.typography.h5.fontSize,
        tablet: theme.typography.h4.fontSize,
      }}
      fontWeight={theme.typography.fontWeightMedium}
      sx={{ textAlign, mb: 3 }}
    >
      {title}
    </Box>
  );
};

export default LandingTitle;
