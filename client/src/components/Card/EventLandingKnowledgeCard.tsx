import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { EventLandingKnowledgeCardContainer } from "./EventLandingKnowledgeCardStyles";

interface EventLandingKnowledgeCardProps {
  selected: Common.eventLandingSection3Type;
}

const EventLandingKnowledgeCard = ({
  selected,
}: EventLandingKnowledgeCardProps) => {
  const theme = useTheme();
  const { image, title, desc, link } = selected;
  return (
    <EventLandingKnowledgeCardContainer
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Stack alignItems="center" height="100%">
        <Box className="img-container">
          <img src={image} alt={`${title}-icon`} />
          <Box className="overlay z0" />
        </Box>
        <Box className="desc-wrap">
          <Typography
            className="topic"
            fontWeight={theme.typography.fontWeightBold}
          >
            {title}
          </Typography>
          <Typography className="desc">{desc}</Typography>
          <Typography
            className="learn-more"
            fontWeight={theme.typography.fontWeightBold}
          >
            Learn more
          </Typography>
        </Box>
      </Stack>
    </EventLandingKnowledgeCardContainer>
  );
};

export default EventLandingKnowledgeCard;
