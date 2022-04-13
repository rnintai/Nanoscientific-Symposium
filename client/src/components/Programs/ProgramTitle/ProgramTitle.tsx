import React from "react";
import { ProgramTitleContainer } from "components/Programs/ProgramTitle/ProgramTitleStyles";
import { Typography, useTheme } from "@mui/material";
import { dateToLocaleString } from "utils/Date";
import { headingFontSize, subHeadingFontSize } from "utils/FontSize";

interface ProgramTitleProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  date: string;
  timezone: string;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  onClick?: () => void;
}

const ProgramTitle = ({
  title,
  date,
  isAdmin,
  onClick,
  timezone,
}: ProgramTitleProps) => {
  const theme = useTheme();
  return (
    <ProgramTitleContainer onClick={onClick} isAdmin={isAdmin as boolean}>
      <Typography
        fontSize={headingFontSize}
        fontWeight={theme.typography.fontWeightBold}
      >
        {title}
      </Typography>
      <Typography
        fontSize={subHeadingFontSize}
        color={theme.palette.grey[700]}
        fontWeight={theme.typography.fontWeightMedium}
      >
        {dateToLocaleString(date, timezone, "MMM DD YYYY")}
      </Typography>
    </ProgramTitleContainer>
  );
};

export default ProgramTitle;
