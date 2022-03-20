import { Box, Stack, Typography } from "@mui/material";
import LandingNationCard from "components/Card/LandingNationCard";
import LandingSection from "components/Section/LandingSection";
import React from "react";
import { globalData } from "utils/GlobalData";
import { EventLandingContainer } from "./EventLandingStyles";

const EventLanding = () => {
  const {
    eventLandingMainBannerURL,
    logoURL,
    fullLogoURL,
    eventLandingDesc,
    nations,
  } = globalData.get("common") as Common.globalDataType;

  console.log(nations);

  return (
    <EventLandingContainer>
      <LandingSection background={eventLandingMainBannerURL} fullWidth>
        <Box
          sx={{
            position: "relative",
            padding: "50px",
            maxWidth: "800px",
            left: { mobile: 0, laptop: "10%" },
          }}
        >
          <img src={fullLogoURL} alt="logo" style={{ maxWidth: "700px" }} />
        </Box>
      </LandingSection>
      <LandingSection>
        <Stack
          className="layout"
          direction="column"
          alignItems="center"
          style={{ maxWidth: "1200px" }}
        >
          <Stack direction="row" width="600px" flexWrap="wrap">
            {nations &&
              nations.map((nation) => (
                <LandingNationCard
                  name={nation.name}
                  date={nation.date}
                  image={nation.landingImage}
                />
              ))}
          </Stack>
          <img
            src={fullLogoURL}
            alt="logo"
            style={{ maxWidth: "300px", marginTop: "30px" }}
          />
          <Typography variant="body2" textAlign="center" mt={2}>
            {eventLandingDesc}
          </Typography>
        </Stack>
      </LandingSection>
      <LandingSection style={{ backgroundColor: "#F1F2F2" }}>
        asd
      </LandingSection>
    </EventLandingContainer>
  );
};

export default EventLanding;
