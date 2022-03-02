import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import Title from "components/Title/Title";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useCheckLocal from "hooks/useCheckLocal";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "components/NavBar/NavBar";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import { SpeakersContainer } from "./SpeakersStyles";

const Speakers = () => {
  const [speakersState, setSpeakersState] = useState<Speaker.speakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePageViews();
  useEffect(() => {
    const config = {
      params: {
        nation: pathname,
      },
    };
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get(`/api/page/common/speakers`, config);
      setSpeakersState(speakers.data);
      setLoading(false);
    };
    getSpeakers();
  }, []);

  const { speakers } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(speakers as string, pathname);

  const isLocal = useCheckLocal();
  const globalDataTitle = new Map<string, { title: string }>([
    [
      "asia",
      {
        title: "Speakers",
      },
    ],
    [
      "latam",
      {
        title: "Speakers",
      },
    ],
    [
      "kr",
      {
        title: "초청 연사",
      },
    ],
    [
      "jp",
      {
        title: "Speakers",
      },
    ],
  ]);

  const { title } = globalDataTitle.get(pathname) as { title: string };

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer>
      <Title fontSize={30} title={title} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 7 }}
          columns={{ xs: 1, sm: 8, md: 16 }}
        >
          {speakersState.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </Grid>
      </Box>
    </SpeakersContainer>
  );
};

export default Speakers;
