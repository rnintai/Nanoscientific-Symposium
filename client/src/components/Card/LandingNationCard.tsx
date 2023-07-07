/* eslint-disable react/require-default-props */
import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router";
import { mainFontSize, subHeadingFontSize } from "utils/FontSize";
import { LandingNationCardContainer } from "./LandingNationCardStyles";

interface LandingNationCardProps {
  nation: Common.nationType;
  disabled?: boolean;
}

const LandingNationCard = ({ nation }: LandingNationCardProps) => {
  const theme = useTheme();
  const { search } = useLocation();
  const { name, date, img, type, disabled, path } = nation;
  return (
    <LandingNationCardContainer
      onClick={() => {
        if (!disabled) {
          window.open(path + search, "_blank");
        } else {
          alert("Coming Soon!");
        }
      }}
    >
      <Box className={`card-wrap ${nation.type.split(" ")[1].toLowerCase()}`}>
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
