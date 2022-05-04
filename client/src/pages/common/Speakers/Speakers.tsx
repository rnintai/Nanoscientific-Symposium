import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Stack } from "@mui/material";
import Title from "components/Title/Title";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData, S3_URL } from "utils/GlobalData";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import LandingSection from "components/Section/LandingSection";
import ComingSoon from "components/ComingSoon/ComingSoon";
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
  const { speakerBannerURL } = globalData.get(
    "common",
  ) as Common.globalDataType;
  useSeoTitle(speakers as string);

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer>
      <LandingSection
        className="banner"
        maxWidth="1920px"
        background={speakerBannerURL}
        fullWidth
      />
      <Box sx={{ flexGrow: 1 }} className="layout body-fit">
        {speakersState.length === 0 && <ComingSoon />}
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
