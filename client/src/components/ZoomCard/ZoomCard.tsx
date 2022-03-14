import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  useTheme,
  Skeleton,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import * as React from "react";
import { useState, useEffect } from "react";
import { dateToLocaleString } from "utils/Date";
import { ZoomCardContainer } from "./ZoomCardStyles";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
  timezone: string;
}

const ZoomCard = ({ webinar, timezone }: ZoomCardProps) => {
  const theme = useTheme();

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
          title={webinar.topic}
          subheader={dateToLocaleString(webinar.start_time, timezone)}
          titleTypographyProps={{
            color: theme.palette.primary.contrastText,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
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
