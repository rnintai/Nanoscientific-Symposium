import React from "react";
import { ProgramTitleContainer } from "components/Programs/ProgramTitle/ProgramTitleStyles";
import { Typography, useTheme } from "@mui/material";

interface ProgramTitleProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  date: string;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  onClick?: () => void;
}

const ProgramTitle = ({ title, date, isAdmin, onClick }: ProgramTitleProps) => {
  const theme = useTheme();
  return (
    <ProgramTitleContainer onClick={onClick} isAdmin={isAdmin as boolean}>
      <Typography
        variant="h3"
        fontWeight={theme.typography.fontWeightBold}
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={theme.typography.fontWeightMedium}>
        {date}
      </Typography>
    </ProgramTitleContainer>
  );
};

export default ProgramTitle;
