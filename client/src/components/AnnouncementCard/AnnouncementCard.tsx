/* eslint-disable react/require-default-props */
import { Box, Stack, Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, Dispatch, SetStateAction, forwardRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dateToLocaleString } from "utils/Date";
import {
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { useAlarmDispatch } from "context/NavBarMarkContext";
import {
  useUnreadListState,
  useUnreadListDispatch,
} from "context/UnreadAnnouncementList";
import { globalData } from "utils/GlobalData";
import ImageIcon from "@mui/icons-material/Image";
import InnerHTML from "dangerously-set-html-content";
import { StyledEngineProvider } from "@mui/material/styles";
import axios from "axios";
import useNSSType from "hooks/useNSSType";
import {
  RowContainer,
  AnnouncementCardContainer,
} from "./AnnouncementCardStyles";

interface AnnouncementCardProps {
  announcement: Announcement.announcementType;
  curPage?: number;
}

const AnnouncementCard = forwardRef(
  (
    { announcement, curPage }: AnnouncementCardProps,
    ref: React.MutableRefObject<boolean>,
  ) => {
    const { id, title, content, hits, created } = announcement;
    const pathname = usePageViews();
    const nssType = useNSSType();
    const theme = useTheme();
    const { viewsLabel } = globalData.get(nssType) as Common.globalDataType;
    const searchParams = useSearchParams();
    const authState = useAuthState();
    const authDispatch = useAuthDispatch();
    const alarmDispatch = useAlarmDispatch();
    const unreadAnnouncementList = useUnreadListState();
    const unreadAnnouncementListDispatch = useUnreadListDispatch();

    const thumbnailImg = content.match(/(<img([\w\W]+?)>)/g);
    const thumbnailSrc = thumbnailImg
      ? thumbnailImg[0].match(/(src="([\w\W]+?)")/g)[0].split('"')[1]
      : "";

    const isUnread = (): boolean => {
      // console.log(authState.isLogin, authState.id);
      if (!authState.id) {
        // 비회원
        const savedData = localStorage.getItem(
          `readAnnouncementList_${pathname}`,
        );
        if (savedData !== null) {
          const parsedData = JSON.parse(savedData);
          return !parsedData.announcementList.includes(id);
        }
      } else {
        return unreadAnnouncementList.includes(id);
      }

      return true; // error 제거용
    };

    const insertReadInfo = async () => {
      try {
        await axios.post(`/api/announcement/readlist`, {
          nation: pathname,
          userId: authState.id,
          announcementId: id,
        });
        unreadAnnouncementListDispatch({ type: "DELETE_ANNOUNCEMENT", id }); // 안읽은 announcementlist에서 읽은 것은 제거
      } catch (err) {
        console.log(err);
      }
    };

    const handleBeforeRenderDetails = async () => {
      if (authState.id) {
        insertReadInfo();
        if (!unreadAnnouncementList.length) {
          authDispatch({
            type: "CACHEANNOUNCEMENT",
            authState: { ...authState },
          });
          alarmDispatch({ type: "OFF" });
        }
      } else {
        console.log("handleBeforeRenderDetails");
        const savedData = localStorage.getItem(
          `readAnnouncementList_${pathname}`,
        );
        if (savedData !== null) {
          const parsedData = JSON.parse(savedData);
          if (!parsedData.announcementList.includes(id)) {
            parsedData.announcementList.push(id);
          }
          if (parsedData.isThereNewAnnouncement) {
            try {
              const res = await axios.get(
                `/api/announcement/originlist?nation=${pathname}`,
              );
              if (res.data.success) {
                parsedData.announcementLength = res.data.result;
              }
            } catch (err) {
              console.log("Error >>", err);
            } finally {
              parsedData.isThereNewAnnouncement = 0;
            }
          }
          if (
            parsedData.announcementList.length === parsedData.announcementLength
          ) {
            alarmDispatch({ type: "OFF" });
            parsedData.isAnnouncementCached = 1;
          }
          localStorage.setItem(
            `readAnnouncementList_${pathname}`,
            JSON.stringify(parsedData),
          );
        }
      }
    };

    useEffect(() => {
      searchParams[0].set("page", String(curPage));
    }, []);

    return (
      <StyledEngineProvider injectFirst>
        <AnnouncementCardContainer unread={isUnread()}>
          <Link
            to={{ pathname: `${id}`, search: `?${searchParams[0].toString()}` }}
            style={{ width: "100%", padding: 0 }}
            onClick={handleBeforeRenderDetails}
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
                <Typography
                  fontWeight={600}
                  fontSize={subHeadingFontSize}
                  className="title-text"
                >
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
                </RowContainer>
              </Stack>
            </Stack>
          </Link>
        </AnnouncementCardContainer>
      </StyledEngineProvider>
    );
  },
);

export default AnnouncementCard;
