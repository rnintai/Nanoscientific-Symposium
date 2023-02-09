import { Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React from "react";
import { subHeadingFontSize } from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import FeedbackIcon from "@mui/icons-material/Feedback";
import useNSSType from "hooks/useNSSType";
import { ComingSoonContainer } from "./ComingSoonStyles";

const ComingSoon = () => {
  const theme = useTheme();
  const nssType = useNSSType();
  const pathname = usePageViews();
  const { comingSoonText } = globalData.get(nssType) as Common.globalDataType;
  return (
    <ComingSoonContainer>
      <FeedbackIcon sx={{ color: theme.palette.grey.A400 }} />
      <Typography
        fontSize={subHeadingFontSize}
        letterSpacing={1.5}
        color={theme.palette.grey.A400}
      >
        {comingSoonText || "There's no content to display."}
      </Typography>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
