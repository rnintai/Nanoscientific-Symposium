/* eslint-disable react/require-default-props */
import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { LandingNationCardContainer } from "./LandingNationCardStyles";

interface LandingNationCardProps {
  name: string;
  date: string;
  image: string;
  path: string;
  disabled?: boolean;
}

const LandingNationCard = ({
  name,
  date,
  image,
  path,
  disabled,
}: LandingNationCardProps) => {
  const theme = useTheme();

  return (
    <LandingNationCardContainer
      className={`${disabled ? "disabled" : ""} hover-zoom`}
      onClick={() => {
        if (!disabled) {
          window.open(path, "_blank");
        }
      }}
    >
      <Stack className="card-wrap">
        <Typography
          variant="body2"
          fontWeight={theme.typography.fontWeightBold}
          sx={{
            background: theme.palette.primary.gradation,
            color: "#fff",
            mx: "10px",
            mt: 2,
            borderRadius: "7px",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={theme.typography.fontWeightBold}
          sx={{
            backgroundColor: theme.palette.common.white,
            mx: "10px",
            mb: 2,
            borderRadius: "0 0 7px 7px",
          }}
        >
          {date}
        </Typography>
      </Stack>
    </LandingNationCardContainer>
  );
};

export default LandingNationCard;
