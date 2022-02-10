import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Paper } from "@mui/material";
import Loading from "components/Loading/Loading";
import Title from "components/Title/Title";
import { experimentalStyled as styled } from "@mui/material/styles";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";

import useCheckLocal from "hooks/useCheckLocal";
import { JapanSpeakersContainer } from "./JapanSpeakersStyles";

const JapanSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker.japanSpeakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get("/api/page/jp/speakers");
      setSpeakers(speakers.data);
      setLoading(false);
    };
    getSpeakers();
  }, []);
  const isLocal = useCheckLocal();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  }));

  if (loading) {
    return <Loading />;
  }

  return (
    <JapanSpeakersContainer>
      <Title fontSize={50} title="講演者" />
      <div className="button-container">
        <Button
          onClick={() =>
            window.open("https://bit.ly/NSSJ-2021-Abstract", "_blank")
          }
          variant="contained"
          startIcon={<FileDownloadTwoToneIcon />}
        >
          要旨集ダウンロード
        </Button>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 7 }}
          columns={{ xs: 1, sm: 8, md: 16 }}
        >
          {speakers.map((speaker) => (
            <Grid item xs={2} sm={4} md={4} key={speaker.id}>
              <Item>
                <img
                  className="speaker-image"
                  src={
                    isLocal
                      ? `${window.location.protocol}//${window.location.host}/${speaker.image_path}`
                      : `${window.location.protocol}//${window.location.host}:5000/${speaker.image_path}`
                  }
                  alt="speakerImage"
                />
                <h3 className="name">{speaker.name_jp}</h3>
                <h3 className="name">{speaker.name_en}</h3>
                <h5 className="belong">{speaker.belong}</h5>
                <span className="homework">演題：{speaker.homework}</span>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </JapanSpeakersContainer>
  );
};

export default JapanSpeakers;
