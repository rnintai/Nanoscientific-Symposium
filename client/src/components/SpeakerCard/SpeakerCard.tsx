import React from "react";
import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
}));

interface SpeakerCardProps {
  isLocal: boolean;
  speaker: Speaker.speakerType;
}

const SpeakerCard = ({ isLocal, speaker }: SpeakerCardProps) => {
  return (
    <Grid item xs={2} sm={4} md={4} key={speaker.id}>
      <Item>
        {/* 같은 도메인의 백엔드 주소 가져오기 */}
        {speaker.image_path.includes("http") ? (
          <img
            className="speaker-image"
            src={speaker.image_path}
            alt="speakerImage"
          />
        ) : (
          <img
            className="speaker-image"
            src={
              isLocal
                ? `${window.location.protocol}//${window.location.host}/${speaker.image_path}`
                : `${window.location.protocol}//${window.location.host}:5000/${speaker.image_path}`
            }
            alt="speakerImage"
          />
        )}
        <h3 style={{ fontSize: "1.5rem", marginTop: "5px" }} className="name">
          {speaker.name}
        </h3>
        <h5 className="belong">{speaker.belong}</h5>
        {speaker.description && (
          <h5 className="belong">{speaker.description}</h5>
        )}
      </Item>
    </Grid>
  );
};

export default SpeakerCard;
