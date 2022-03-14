import React, { useState, useEffect } from "react";
import axios from "axios";
import { VideoContainer } from "components/VideoContainer/VideoContainer";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import ZoomCard from "components/ZoomCard/ZoomCard";
import { StyledTimezoneSelect } from "components/Programs/ProgramsListContainer";
import Loading from "components/Loading/Loading";

const UsLectureHall = () => {
  const [webinarList, setWebinarList] = useState<Webinar.webinarType[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // getWebinar 로딩
  const [getWebinarLoading, setGetWebinarLoading] = useState<boolean>(false);

  const getWebinars = async () => {
    setGetWebinarLoading(true);
    axios
      .get("/api/zoom/webinars")
      .then((res) => {
        const filtered = res.data.result.webinars.filter(
          (webinar: Webinar.webinarType) =>
            new Date(webinar.start_time) > new Date(),
        );
        // setWebinarList(filtered);
        setWebinarList(res.data.result.webinars);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetWebinarLoading(false);
      });
  };

  useEffect(() => {
    getWebinars();
  }, []);

  return (
    <VideoContainer>
      {/* {getWebinarLoading && <Loading />} */}
      <video
        src="https://d25unujvh7ui3r.cloudfront.net/lecture_hall.mp4"
        muted
        autoPlay
        loop
        playsInline
        style={{ position: "absolute" }}
      />
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
          direction="row"
          // justifyContent="center"
          flexWrap="wrap"
          sx={{
            zIndex: 1,
            mt: 2,
            ml: 8,
            maxHeight: "650px",
            overflowY: "auto",
          }}
          spacing={getWebinarLoading ? 3 : 0}
        >
          {getWebinarLoading && (
            <>
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
          {webinarList.map((webinar) => (
            <ZoomCard
              key={webinar.id}
              webinar={webinar}
              timezone={selectedTimezone}
            />
          ))}
        </Stack>
      </Stack>
    </VideoContainer>
  );
};

export default UsLectureHall;
