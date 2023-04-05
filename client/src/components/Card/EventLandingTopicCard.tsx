import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { EventLandingTopicCardContainer } from "./EventLandingTopicCardStyles";

interface EventLandingTopicCardProps {
  selected: Common.eventLandingSection2Type;
}

const EventLandingTopicCard = ({ selected }: EventLandingTopicCardProps) => {
  const theme = useTheme();
  const { icon, title, desc } = selected;
  return (
    <EventLandingTopicCardContainer>
      <Stack alignItems="center">
        <img src={icon} alt={`${title}-icon`} />
        <Typography
          className="topic"
          fontWeight={theme.typography.fontWeightBold}
        >
          {title}
        </Typography>
        <Typography className="desc">{desc}</Typography>
      </Stack>
    </EventLandingTopicCardContainer>
  );
};

export default EventLandingTopicCard;
