import React, { useState, useEffect } from "react";
import axios from "axios";
import { VideoContainer } from "components/VideoContainer/VideoContainer";
import { Button, Stack } from "@mui/material";
import ZoomCard from "components/ZoomCard/ZoomCard";

const UsLectureHall = () => {
  const [webinarList, setWebinarList] = useState<Webinar.webinarType[]>([]);
  const getWebinars = async () => {
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
      });
  };

  useEffect(() => {
    getWebinars();
  }, []);

  return (
    <VideoContainer>
      <video
        src="https://d25unujvh7ui3r.cloudfront.net/lecture_hall.mp4"
        muted
        autoPlay
        loop
        playsInline
      />
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          py: "100px",
          mx: "auto",
          width: "100%",
        }}
        direction="row"
        justifyContent="center"
      >
        {webinarList.map((webinar) => (
          <ZoomCard webinar={webinar} />
        ))}
      </Stack>
      {/* <Button
        sx={{ position: "absolute", left: "50px", top: "500px" }}
        variant="contained"
        color="primary"
      >
        Test
      </Button> */}
    </VideoContainer>
  );
};

export default UsLectureHall;
