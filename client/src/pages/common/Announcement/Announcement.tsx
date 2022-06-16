import axios from "axios";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
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
import { useAuthState } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { AnnouncementContainer } from "./AnnouncementStyles";

const Announcement = () => {
  const pathname = usePageViews();
  const { currentMenu } = useMenuStore();
  const theme = useTheme();
  const [announcementList, setAnnouncementList] =
    useState<Announcement.announcementType[]>(null);
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const authState = useAuthState();
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

  // 총 페이지
  const getPageQuery = () => {
    return Number(searchParams[0].get("page"));
  };
  const setPageQuery = (curPage: number) => {
    searchParams[0].set("page", String(curPage));
    navigate({
      pathname: "",
      search: `?page=${curPage}`,
    });
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
        `/api/announcement/list?nation=${pathname}&page=${curPage}`,
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

  const submitHandler = async () => {
    try {
      setSubmitLoading(true);
      const result = await axios.post(`/api/announcement/post`, {
        nation: pathname,
        title: title.value,
        content,
      });
      if (result.data.success) {
        setOpenWriteModal(false);
        setOpenSuccessAlert(true);
        getAnnouncements(curPage);
      }
    } catch (err) {
      alert(err);
    } finally {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    setPageQuery(curPage);
    getAnnouncements(curPage);
  }, []);

  useEffect(() => {
    setPageQuery(curPage);
    getAnnouncements(curPage);
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
