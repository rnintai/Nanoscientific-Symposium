import axios from "axios";
import NSSButton from "components/Button/NSSButton";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OnDemandVideoContainer } from "./OnDemandVideoStyles";

const OnDemandVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] =
    useState<Common.onDemandVideoType>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOnDemandVideo = async () => {
    try {
      const res = await axios.get(`/api/ondemand/${id}`);
      setCurrentVideo(res.data.result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOnDemandVideo();
  }, []);
  return (
    <OnDemandVideoContainer className="layout body-fit">
      <ArrowBackIcon
        className="btn-alpha"
        onClick={() => {
          navigate(-1);
        }}
      />
      {/* </Link> */}
      {currentVideo && (
        <YoutubeEmbed url={currentVideo.video} width="960px" height="540px" />
      )}
    </OnDemandVideoContainer>
  );
};

export default OnDemandVideo;
