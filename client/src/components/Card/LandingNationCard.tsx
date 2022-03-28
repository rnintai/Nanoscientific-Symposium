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
        <img src={image} alt={`${name}-img`} />
        <Typography
          variant="body2"
          sx={{
            background: theme.palette.primary.gradation,
            color: "#fff",
            mx: "10px",
            mt: 2,
            borderRadius: "10px",
          }}
        >
          NS {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mx: "10px",
            mb: 2,
            borderRadius: "10px 10px 0 0",
          }}
        >
          {date}
        </Typography>
      </Stack>
    </LandingNationCardContainer>
  );
};

export default LandingNationCard;
