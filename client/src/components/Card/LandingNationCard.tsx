/* eslint-disable react/require-default-props */
import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router";
import { useNavigate } from "hooks/useNavigateWithSearch";
import { mainFontSize, subHeadingFontSize } from "utils/FontSize";
import { LandingNationCardContainer } from "./LandingNationCardStyles";

interface LandingNationCardProps {
  name: string;
  date: string;
  path: string;
  img: string;
  type: string;
  disabled?: boolean;
}

const LandingNationCard = ({
  name,
  date,
  path,
  img,
  type,
  disabled,
}: LandingNationCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <LandingNationCardContainer
      onClick={() => {
        if (!disabled) {
          if (path.indexOf("cn") === -1) {
            // navigate(path);
            window.open(path, "_blank");
          } else {
            window.open(path + search, "_blank");
          }
        } else {
          alert("Coming Soon!");
        }
      }}
    >
      <Box className="card-wrap">
        <div className="card-image-container">
          <div
            className="card-background"
            style={{
              backgroundImage: `url("${img}")`,
            }}
          />
          <div className="overlay z0" />
          <Box className="region-txt">{type}</Box>
          <Box className="date-name-bg">{/*  */}</Box>
          <Box className="date-name-txt">
            <Typography
              variant="body2"
              component="span"
              fontWeight={600}
              color="white"
              className="name-txt"
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={theme.typography.fontWeightLight}
              color="white"
              className="date-txt"
            >
              {date}
            </Typography>
          </Box>
        </div>
      </Box>
    </LandingNationCardContainer>
  );
};

export default LandingNationCard;
