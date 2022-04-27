import { Box } from "@mui/system";
import React from "react";
import { S3_URL } from "utils/GlobalData";
import { SpeakerImageContainer } from "./SpeakerImageStyles";

interface speakerImageProps {
  src: string;
  alt: string;
}

const SpeakerImage = ({ src, alt }: speakerImageProps) => {
  return (
    <SpeakerImageContainer>
      <img className="speaker-image" src={`${S3_URL}/${src}`} alt={alt} />
      <div className="overlay" />
    </SpeakerImageContainer>
  );
};

export default SpeakerImage;
