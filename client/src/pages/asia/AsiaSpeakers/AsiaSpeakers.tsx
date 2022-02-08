import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Title from "components/Title/Title";
import { AsiaSpeakersContainer } from "./AsiaSpeakersStyles";
import Loading from "../../../components/Loading/Loading";

const AsiaSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker.speakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get("/api/page/asia/speakers");
      setSpeakers(speakers.data);
      setLoading(false);
    };
    getSpeakers();
  }, []);
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
    <AsiaSpeakersContainer>
      <Title fontSize={50} title="Speakers" />
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
                  src={`http://localhost:5000/${speaker.image_path}`}
                  alt="speakerImage"
                />
                <h3 className="name">{speaker.name}</h3>
                <h5 className="belong">{speaker.belong}</h5>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AsiaSpeakersContainer>
  );
};

export default AsiaSpeakers;
