import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Title from "components/Title/Title";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import { SpeakersContainer } from "./SpeakersStyles";

const Speakers = () => {
  const [speakers, setSpeakers] = useState<Speaker.speakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePageViews();
  useEffect(() => {
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get(`/api/page${pathname}/speakers`);
      console.log(speakers.data);
      setSpeakers(speakers.data);
      setLoading(false);
    };
    getSpeakers();
  }, []);

  console.log(
    window.location.protocol + window.location.host.replace("3000", "5000"),
  );

  const globalData = new Map<string, { title: string }>([
    [
      "/asia",
      {
        title: "Speakers",
      },
    ],
    [
      "/latam",
      {
        title: "Speakers",
      },
    ],
    [
      "/kr",
      {
        title: "초청 연사",
      },
    ],
  ]);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  }));

  const { title } = globalData.get(pathname) as { title: string };

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer>
      <Title fontSize={50} title={title} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 7 }}
          columns={{ xs: 1, sm: 8, md: 16 }}
        >
          {speakers.map((speaker) => (
            <Grid item xs={2} sm={4} md={4} key={speaker.id}>
              <Item>
                {/* 같은 도메인의 백엔드 주소 가져오기 */}
                <img
                  className="speaker-image"
                  src={`${window.location.protocol}//${window.location.host}/${speaker.image_path}`}
                  alt="speakerImage"
                />
                <h3 className="name">{speaker.name}</h3>
                <h5 className="belong">{speaker.belong}</h5>
                {speaker.desc && <h5 className="belong">{speaker.desc}</h5>}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SpeakersContainer>
  );
};

export default Speakers;
