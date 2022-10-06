/* eslint-disable react/require-default-props */
import { Box, Stack, Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dateToLocaleString } from "utils/Date";
import {
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { globalData } from "utils/GlobalData";
import ImageIcon from "@mui/icons-material/Image";
import InnerHTML from "dangerously-set-html-content";
import { AnnouncementCardContainer } from "./AnnouncementCardStyles";

interface announcementCardProps {
  announcement: Announcement.announcementType;
  curPage?: number;
}

const AnnouncementCard = ({ announcement, curPage }: announcementCardProps) => {
  const { id, title, content, hits, created } = announcement;
  const pathname = usePageViews();
  const theme = useTheme();
  const { viewsLabel } = globalData.get(pathname) as Common.globalDataType;
  const searchParams = useSearchParams();

  const thumbnailImg = content.match(/(<img([\w\W]+?)>)/g);
  const thumbnailSrc = thumbnailImg
    ? thumbnailImg[0].match(/(src="([\w\W]+?)")/g)[0].split('"')[1]
    : "";

  useEffect(() => {
    searchParams[0].set("page", String(curPage));
  }, []);

  return (
    <AnnouncementCardContainer>
      <Link
        to={{ pathname: `${id}`, search: `?${searchParams[0].toString()}` }}
        style={{ width: "100%", padding: 0 }}
      >
        <Stack
          className="border-grey card-wrap"
          sx={{
            flexDirection: {
              mobile: "column",
              tablet: "row",
            },
          }}
        >
          {thumbnailImg ? (
            <img src={thumbnailSrc} className="ann-thumb" alt={`${id}-thumb`} />
          ) : (
            <Stack
              className="ann-thumb"
              justifyContent="center"
              alignItems="center"
            >
              <ImageIcon sx={{ color: "#00000020" }} />
            </Stack>
          )}
          <Stack className="desc-section">
            <Typography
              fontSize={xsmallFontSize}
              color={theme.palette.grey[500]}
            >
              {dateToLocaleString(
                created,
                Intl.DateTimeFormat().resolvedOptions().timeZone,
                "MMM DD YYYY",
              )}
            </Typography>
            <Typography fontWeight={600} fontSize={subHeadingFontSize}>
              {title}
            </Typography>
            <Typography
              className="text-clamp"
              component="span"
              fontSize={smallFontSize}
            >
              <InnerHTML
                className="editor-content"
                html={content.replace(/(<img([\w\W]+?)>)/g, "")}
              />
            </Typography>
            <Typography
              fontSize={xsmallFontSize}
              color={theme.palette.grey[500]}
              sx={{ mt: "auto" }}
            >
              {hits} {viewsLabel || "views"}
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </AnnouncementCardContainer>
  );
};

export default AnnouncementCard;
