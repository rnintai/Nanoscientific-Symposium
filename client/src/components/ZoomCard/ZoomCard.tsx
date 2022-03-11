import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import * as React from "react";
import { useState, useEffect } from "react";
import { ZoomCardContainer } from "./ZoomCardStyles";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
}

const ZoomCard = ({ webinar }: ZoomCardProps) => {
  return (
    <ZoomCardContainer>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          minHeight: "220px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader title={webinar.topic} subheader={webinar.start_time} />
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
