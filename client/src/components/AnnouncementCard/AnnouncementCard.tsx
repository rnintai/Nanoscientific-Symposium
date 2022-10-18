/* eslint-disable react/require-default-props */
import { Box, Stack, Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dateToLocaleString } from "utils/Date";
import {
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { useAuthState } from "context/AuthContext";
import { useAlarmDispatch } from "context/navBarMarkContext";
import { globalData } from "utils/GlobalData";
import ImageIcon from "@mui/icons-material/Image";
import InnerHTML from "dangerously-set-html-content";
import { StyledEngineProvider } from "@mui/material/styles";
import axios from "axios";
import {
  RowContainer,
  ReadContainer,
  AnnouncementCardContainer,
} from "./AnnouncementCardStyles";

interface announcementCardProps {
  announcement: Announcement.announcementType;
  unreadAnnouncementList: number[];
  setUnreadAnnouncementList: Dispatch<SetStateAction<number[]>>;
  curPage?: number;
}

const AnnouncementCard = ({
  announcement,
  unreadAnnouncementList,
  setUnreadAnnouncementList,
  curPage,
}: announcementCardProps) => {
  const { id, title, content, hits, created } = announcement;
  const pathname = usePageViews();
  const theme = useTheme();
  const { viewsLabel } = globalData.get(pathname) as Common.globalDataType;
  const searchParams = useSearchParams();
  const authState = useAuthState();
  const alarmDispatch = useAlarmDispatch();
  const thumbnailImg = content.match(/(<img([\w\W]+?)>)/g);
  const thumbnailSrc = thumbnailImg
    ? thumbnailImg[0].match(/(src="([\w\W]+?)")/g)[0].split('"')[1]
    : "";

  const isRead = (): boolean => {
    if (!authState.id) {
      return false;
    }
    return unreadAnnouncementList.includes(id);
  };

  const insertReadInfo = async () => {
    try {
      // axios로 데이터 집어넣기..
      await axios.post(`/api/announcement/readlist`, {
        nation: pathname,
        userId: authState.id,
        announcementId: id,
      });

      setUnreadAnnouncementList(
        unreadAnnouncementList.filter((el) => el !== id),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchParams[0].set("page", String(curPage));
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <AnnouncementCardContainer>
        <Link
          to={{ pathname: `${id}`, search: `?${searchParams[0].toString()}` }}
          style={{ width: "100%", padding: 0 }}
          onClick={() => {
            if (authState.id) {
              insertReadInfo();
              if (!unreadAnnouncementList.length) {
                alarmDispatch({ type: "OFF" });
              }
            }
          }}
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
              <img
                src={thumbnailSrc}
                className="ann-thumb"
                alt={`${id}-thumb`}
              />
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
              <RowContainer sx={{ mt: "auto" }}>
                <Typography
                  fontSize={xsmallFontSize}
                  color={theme.palette.grey[500]}
                >
                  {hits} {viewsLabel || "views"}
                </Typography>
                {isRead() ? (
                  <ReadContainer fontSize={xsmallFontSize}>
                    unread
                  </ReadContainer>
                ) : null}
              </RowContainer>
            </Stack>
          </Stack>
        </Link>
      </AnnouncementCardContainer>
    </StyledEngineProvider>
  );
};

export default AnnouncementCard;
