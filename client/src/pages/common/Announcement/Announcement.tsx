import axios from "axios";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AnnouncementCard from "components/AnnouncementCard/AnnouncementCard";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  headingFontSize,
  xsmallFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import { useSearchParams, useNavigate } from "react-router-dom";
import CommonModal from "components/CommonModal/CommonModal";
import QuillEditor from "components/QuillEditor/QuillEditor";
import useInput from "hooks/useInput";
import { editorRole } from "utils/Roles";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { useAlarmDispatch } from "context/NavBarMarkContext";
import { useUnreadListDispatch } from "context/UnreadAnnouncementList";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import useCurrentYear from "hooks/useCurrentYear";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { escapeQuotes } from "utils/String";
import { AnnouncementContainer } from "./AnnouncementStyles";

const Announcement = () => {
  const pathname = usePageViews();
  const { currentMenu } = useMenuStore();
  const theme = useTheme();
  const [announcementList, setAnnouncementList] =
    useState<Announcement.announcementType[]>(null);
  const unreadAnnouncementListDispatch = useUnreadListDispatch();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const currentYear = useCurrentYear();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const alarmDispatch = useAlarmDispatch();
  const isEditor = editorRole.includes(authState.role);

  // modal
  const [openWriteModal, setOpenWriteModal] = useState<boolean>(false);
  const title = useInput("");
  const [content, setContent] = useState<string>("");

  // alert
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

  // loading
  const [getAnnouncementsLoading, setGetAnnouncementsLoading] =
    useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const checkFlag = useRef(false);
  const markUnreadAnnouncement = () => {
    axios
      .get(
        `/api/announcement/readlist?nation=${pathname}&id=${authState.id}&year=${currentYear}`,
      )
      .then((res) => {
        if (res.data.success) {
          if (res.data.unread.length) {
            alarmDispatch({ type: "ON" });
          } else {
            alarmDispatch({ type: "OFF" });
          }
          unreadAnnouncementListDispatch({
            type: "INSERT_ANNOUNCEMENT",
            arr: res.data.unread,
          });
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  /**  다른 탭에서 열 경우 알람 표시 제거 */
  const checkAndRemoveAlarm = async () => {
    const savedData = localStorage.getItem(
      `readAnnouncementList_${pathname}${currentYear}`,
    );
    if (!savedData) {
      return;
    }
    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.isThereNewAnnouncement) {
        try {
          const res = await axios.get(
            `/api/announcement/originlist?nation=${pathname}&year=${currentYear}`,
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
        console.log(`in annoucnment`);
      }

      localStorage.setItem(
        `readAnnouncementList_${pathname}${currentYear}`,
        JSON.stringify(parsedData),
      );
    }
  };

  // 총 페이지
  const getPageQuery = () => {
    return Number(searchParams[0].get("page"));
  };
  const setPageQuery = (curPage: number) => {
    searchParams[0].set("page", String(curPage));
    navigate(
      {
        pathname: "",
        search: `?${searchParams[0].toString()}`,
      },
      { replace: true },
    );
  };
  const [curPage, setCurPage] = useState<number>(
    getPageQuery() ? getPageQuery() : 1,
  );
  const itemsPerPage = 5;
  const [totalPage, setTotalPage] = useState<number>(0);

  const getAnnouncements = async (curPage: number) => {
    try {
      setGetAnnouncementsLoading(true);
      const result = await axios.get(
        `/api/announcement/list?nation=${pathname}&page=${curPage}&year=${currentYear}`,
      );
      setAnnouncementList(result.data.result);
      setTotalPage(
        result.data.totalCount % itemsPerPage === 0
          ? Math.floor(result.data.totalCount / itemsPerPage)
          : Math.floor(result.data.totalCount / itemsPerPage) + 1,
      );
    } catch (err) {
      alert(err);
    } finally {
      setGetAnnouncementsLoading(false);
    }
  };

  const initAnnouncementCache = () => {
    authDispatch({ type: "NOTCACHEANNOUNCEMENT", authState: { ...authState } });
    try {
      axios
        .post("/api/users/updateAnnouncementCache", {
          email: authState.email,
          nation: pathname,
          flag: "add",
          year: currentYear,
        })
        .then((res) => {
          if (res.data.success === true) {
            console.log(res.data.msg);
          } else {
            console.log(res.data.msg);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateLocalStorage = () => {
    const savedData = localStorage.getItem(
      `readAnnouncementList_${pathname}${currentYear}`,
    );
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.isThereNewAnnouncement = 1;
      parsedData.isAnnouncementCached = 0;
      parsedData.announcementLength += 1;
      alarmDispatch({ type: "ON" });
      localStorage.setItem(
        `readAnnouncementList_${pathname}${currentYear}`,
        JSON.stringify(parsedData),
      );
    }
  };

  const submitHandler = async () => {
    try {
      setSubmitLoading(true);
      const result = await axios.post(`/api/announcement/post`, {
        nation: pathname,
        title: title.value,
        content: escapeQuotes(content),
        year: currentYear,
      });
      if (result.data.success) {
        setOpenWriteModal(false);
        setOpenSuccessAlert(true);
        getAnnouncements(curPage);
        markUnreadAnnouncement();
        initAnnouncementCache();
        updateLocalStorage();
      }
    } catch (err) {
      alert(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  // 두번 렌더링 됨...이유를 찾아보기
  useEffect(() => {
    setPageQuery(curPage);
    getAnnouncements(curPage);
    if (authState.id) {
      markUnreadAnnouncement();
    } else {
      checkAndRemoveAlarm();
    }
  }, [curPage]);

  return (
    <AnnouncementContainer className="layout">
      {isEditor && (
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <Typography
            component="span"
            fontSize={smallFontSize}
            className="btn-alpha"
            sx={{ mb: 1, textAlign: "right" }}
            onClick={() => {
              setOpenWriteModal(true);
            }}
          >
            New
          </Typography>
        </Box>
      )}
      {(!getAnnouncementsLoading &&
        currentMenu &&
        currentMenu.is_published === 0 &&
        !editorRole.includes(authState.role)) ||
        (announcementList === undefined && <ComingSoon />)}
      {((currentMenu && currentMenu.is_published === 1) ||
        editorRole.includes(authState.role)) && (
        <Box className="body-fit">
          {announcementList &&
            announcementList.map((a) => (
              <AnnouncementCard
                announcement={a}
                curPage={curPage}
                key={`announcement-${a.id}`}
                ref={checkFlag}
              />
            ))}
        </Box>
      )}
      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        alignItems="center"
      >
        <ChevronLeftIcon
          className={curPage > 1 ? "btn-alpha" : "btn-disabled"}
          onClick={() => {
            if (curPage > 1) setCurPage(curPage - 1);
          }}
        />
        <Typography fontSize={xsmallFontSize}>{curPage}</Typography>
        <ChevronRightIcon
          className={curPage < totalPage ? "btn-alpha" : "btn-disabled"}
          onClick={() => {
            if (curPage < totalPage) setCurPage(curPage + 1);
          }}
        />
      </Stack>
      {/* modal */}
      <CommonModal
        open={openWriteModal}
        setOpen={setOpenWriteModal}
        title="Write an announcement"
        submitText="Add"
        onSubmit={submitHandler}
        loading={submitLoading}
        submitDisabled={title.value === "" || content === ""}
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            {...title}
          />
          <Typography fontSize={subHeadingFontSize} fontWeight={500}>
            Content
          </Typography>
          <QuillEditor value={content} setValue={setContent} />
        </Stack>
      </CommonModal>
      <TopCenterSnackBar
        value={openSuccessAlert}
        setValue={setOpenSuccessAlert}
        severity="success"
        variant="filled"
        content="Successfully added."
      />
    </AnnouncementContainer>
  );
};

export default Announcement;
