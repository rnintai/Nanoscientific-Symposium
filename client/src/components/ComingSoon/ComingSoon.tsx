import { Typography, useTheme } from "@mui/material";
import React from "react";
import { headingFontSize } from "utils/FontSize";
import { ComingSoonContainer } from "./ComingSoonStyles";

const ComingSoon = () => {
  const theme = useTheme();
  return (
    <ComingSoonContainer>
      <Typography
        fontSize={headingFontSize}
        fontWeight={600}
        letterSpacing={1.5}
      >
        We&apos;re Coming Soon!
      </Typography>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
