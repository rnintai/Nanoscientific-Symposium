import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  useTheme,
  Icon,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PodcastsIcon from "@mui/icons-material/Podcasts";

import { dateToLocaleString, calculateDurationToString } from "utils/Date";
import { ZoomCardContainer } from "./ZoomCardStyles";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
  timezone: string;
  isOnAir: boolean;
}

const ZoomCard = ({ webinar, timezone, isOnAir }: ZoomCardProps) => {
  const theme = useTheme();

  // 국가 구분 태그를 떼어내는 메서드
  const removeTagFromTopic = (topic: string) => {
    return topic.split("]")[1];
  };

  return (
    <ZoomCardContainer>
      <Card
        // variant="outlined"
        sx={{
          display: "flex",
          minHeight: "220px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        raised
      >
        <CardHeader
          avatar={
            <PodcastsIcon
              sx={{
                color: isOnAir
                  ? theme.palette.primary.dark
                  : theme.palette.whitescale.alpha50,
              }}
              fontSize="medium"
            />
          }
          title={removeTagFromTopic(webinar.topic)}
          subheader={`${dateToLocaleString(
            webinar.start_time,
            timezone,
          )} - ${calculateDurationToString(
            webinar.start_time,
            webinar.duration,
            timezone,
          )}`}
          titleTypographyProps={{
            color: theme.palette.primary.contrastText,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontSize: theme.typography.h6.fontSize,
          }}
          subheaderTypographyProps={{
            color: theme.palette.primary.contrastTextAlpha,
          }}
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: "100%",
          }}
        />
        {/* <span>link: {webinar.join_url}</span> */}
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent> */}
        <CardActions sx={{ flexDirection: "row-reverse" }} disableSpacing>
          <IconButton
            onClick={() => {
              window.open(webinar.join_url, "_blank");
            }}
            aria-label="add to favorites"
          >
            <MeetingRoomIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ZoomCardContainer>
  );
};

export default ZoomCard;
