import React, { useState, useEffect } from "react";
import axios from "axios";
import { VideoContainer } from "components/VideoContainer/VideoContainer";
import { Box, Button, IconButton, Skeleton, Stack } from "@mui/material";
import ZoomCard from "components/ZoomCard/ZoomCard";
import { StyledTimezoneSelect } from "components/Programs/ProgramsListContainer";
import usePageViews from "hooks/usePageViews";
import { calculateDurationToDate } from "utils/Date";
import { globalData } from "utils/GlobalData";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import ComingSoon from "components/ComingSoon/ComingSoon";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import { useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useMenuStore from "store/MenuStore";
import WebinarForm from "pages/admin/Forms/WebinarForm";
import InvalidZoomCard from "components/ZoomCard/InvalidZoomCard";

const LectureHall = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const { currentMenu } = useMenuStore();
  const navigate = useNavigate();

  const isEditor = editorRole.includes(authState.role);

  // 국가에 해당하는 모든 webinars
  const [webinarList, setWebinarList] = useState<Webinar.webinarType[]>([]);
  // 국가에 해당하는 live중인 webinars
  const [liveWebinarList, setLiveWebinarList] = useState<Webinar.webinarType[]>(
    [],
  );
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // alert
  const [addRegistrantSuccess, setAddRegistrantSuccess] =
    useState<boolean>(false);
  const [addRegistrantFailed, setAddRegistrantFailed] =
    useState<boolean>(false);
  // webinar form
  const [openWebinarForm, setOpenWebinarForm] = useState<boolean>(false);
  // getWebinar 로딩
  const [getWebinarLoading, setGetWebinarLoading] = useState<boolean>(false);

  const getWebinars = async () => {
    setGetWebinarLoading(true);
    axios
      .get(`/api/zoom/webinar/list?nation=${pathname}`)
      .then((res) => {
        setWebinarList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetWebinarLoading(false);
      });
  };

  const handleAddWebinar = () => {
    setOpenWebinarForm(true);
  };

  useEffect(() => {
    getWebinars();
  }, []);

  return (
    <VideoContainer className="body-fit">
      {/* {getWebinarLoading && <Loading />} */}
      <Stack
        direction="column"
        sx={{
          py: "100px",
          mx: "auto",
          maxWidth: "1080px",
          zIndex: 1,
        }}
      >
        <StyledTimezoneSelect
          value={selectedTimezone}
          onChange={(e) => {
            setSelectedTimezone(e.value);
          }}
        />
        <Stack
          sx={{
            zIndex: 1,
            mt: 2,
            ml: {
              // mobile: "auto",
              // tablet: 8,
            },
            mr: {
              // mobile: "auto",
              tablet: 0,
            },
            flexDirection: {
              mobile: "column",
              tablet: "row",
            },
            alignItems: "center",
            maxHeight: "650px",
            overflowY: "auto",
            overflowX: "hidden",
            // width: {
            //   mobile: "330px",
            //   tablet: "auto",
            // },
            flexWrap: {
              mobile: "nowrap",
              tablet: "wrap",
            },
            justifyContent: { mobile: "flex-start", tablet: "center" },
            position: "relative",
          }}
        >
          {/* skeleton */}
          {getWebinarLoading && (
            <>
              <Stack
                sx={{ width: "300px", height: "220px", mr: 3 }}
                direction="column"
                justifyContent="space-between"
              >
                <Stack
                  sx={{ height: "90px", p: 2 }}
                  direction="column"
                  justifyContent="center"
                >
                  <Skeleton width="60%" />
                  <Skeleton />
                </Stack>
                <Skeleton variant="rectangular" height={130} />
              </Stack>
              <Stack
                sx={{ width: "300px", height: "220px", mr: 3 }}
                direction="column"
                justifyContent="space-between"
              >
                <Stack
                  sx={{ height: "90px", p: 2 }}
                  direction="column"
                  justifyContent="center"
                >
                  <Skeleton width="60%" />
                  <Skeleton />
                </Stack>
                <Skeleton variant="rectangular" height={130} />
              </Stack>
              <Stack
                sx={{ width: "300px", height: "220px" }}
                direction="column"
                justifyContent="space-between"
              >
                <Stack
                  sx={{ height: "90px", p: 2 }}
                  direction="column"
                  justifyContent="center"
                >
                  <Skeleton width="60%" />
                  <Skeleton />
                </Stack>
                <Skeleton variant="rectangular" height={130} />
              </Stack>
            </>
          )}
          {!getWebinarLoading &&
            ((currentMenu &&
              currentMenu.is_published === 0 &&
              !editorRole.includes(authState.role)) ||
              webinarList.length === 0) && <ComingSoon />}
          {!getWebinarLoading &&
            ((currentMenu && currentMenu.is_published === 1) ||
              editorRole.includes(authState.role)) &&
            webinarList.map((webinar) =>
              !webinar.connected ? (
                <InvalidZoomCard id={webinar.id} />
              ) : (
                <ZoomCard
                  key={webinar.id}
                  webinar={webinar}
                  timezone={selectedTimezone}
                  isOnAir={
                    liveWebinarList.filter(
                      (liveWebinar) => webinar.id === liveWebinar.id,
                    ).length !== 0
                  }
                  setSuccessAlert={setAddRegistrantSuccess}
                  setFailedAlert={setAddRegistrantFailed}
                  // setCurrentZoomSignature={setCurrentZoomSignature}
                  // setCurrentZoomWebinar={setCurrentZoomWebinar}
                />
              ),
            )}
          {!getWebinarLoading && isEditor && (
            <Stack
              sx={{ width: "300px" }}
              direction="row"
              justifyContent="center"
            >
              <IconButton onClick={handleAddWebinar}>
                <AddCircleOutlineIcon color="primary" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
      <WebinarForm open={openWebinarForm} setOpen={setOpenWebinarForm} />
      <TopCenterSnackBar
        value={addRegistrantSuccess}
        setValue={setAddRegistrantSuccess}
        variant="filled"
        severity="success"
        content={`You've been successfully registered.`}
      />
      <TopCenterSnackBar
        value={addRegistrantFailed}
        setValue={setAddRegistrantFailed}
        variant="filled"
        severity="error"
        content="Registration Failed. Please check your input."
      />
    </VideoContainer>
  );
};

export default LectureHall;
