/* eslint-disable react/require-default-props */
import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { mainFontSize } from "utils/FontSize";
import { LandingNationCardContainer } from "./LandingNationCardStyles";

interface LandingNationCardProps {
  name: string;
  date: string;
  path: string;
  img: string;
  disabled?: boolean;
}

const LandingNationCard = ({
  name,
  date,
  path,
  img,
  disabled,
}: LandingNationCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <LandingNationCardContainer
      className="hover-zoom"
      onClick={() => {
        if (!disabled) {
          navigate(path);
        } else {
          alert("Coming Soon!");
        }
      }}
    >
      <Stack className="card-wrap">
        <div
          className="card-image-container"
          style={{
            height: "80px",
          }}
        >
          <div
            className="card-background"
            style={{
              background: `url("${img}")`,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
            }}
          />
          <div className="overlay bluescale z0" />
        </div>
        <Box
          sx={{
            background: theme.palette.primary.gradation,
            color: "#fff",
            mx: "10px",
            mt: 2,
            borderRadius: "15px",
          }}
        >
          <Typography
            variant="body2"
            component="span"
            fontWeight={theme.typography.fontWeightBold}
            sx={{
              fontSize: mainFontSize,
            }}
          >
            {name}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          fontWeight={theme.typography.fontWeightBold}
          sx={{
            backgroundColor: theme.palette.common.white,
            mx: "10px",
            mb: 2,
            borderRadius: "0 0 7px 7px",
            fontSize: mainFontSize,
          }}
        >
          {date}
        </Typography>
      </Stack>
    </LandingNationCardContainer>
  );
};

export default LandingNationCard;
