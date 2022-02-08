import React from "react";
import styled from "styled-components";

const AsiaLectureHallContainer = styled.div`
  height: 100vh;
  video {
    max-width: 100%;
    width: 100%;
    margin: 0;
    line-height: 1;
    border: none;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: inline-block;
    vertical-align: baseline;
  }
`;

const AsiaLectureHall = () => {
  return (
    <AsiaLectureHallContainer>
      <video
        src="https://d25unujvh7ui3r.cloudfront.net/lecture_hall.mp4"
        muted
        autoPlay
        loop
        playsInline
      />
    </AsiaLectureHallContainer>
  );
};

export default AsiaLectureHall;
