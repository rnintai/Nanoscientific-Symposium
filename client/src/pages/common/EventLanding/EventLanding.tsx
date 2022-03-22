import { Box, Stack, Typography } from "@mui/material";
import LandingNationCard from "components/Card/LandingNationCard";
import LandingSection from "components/Section/LandingSection";
import React from "react";
import { Link } from "react-router-dom";
import { globalData } from "utils/GlobalData";
import { EventLandingContainer } from "./EventLandingStyles";

const EventLanding = () => {
  const {
    eventLandingMainBannerURL,
    logoURL,
    fullLogoURL,
    eventLandingDesc,
    eventLandingBodyBackground,
    nations,
  } = globalData.get("common") as Common.globalDataType;

  return (
    <EventLandingContainer>
      <LandingSection background={eventLandingMainBannerURL} fullWidth>
        <Box
          sx={{
            position: "relative",
            padding: { mobile: "30px", laptop: "50px" },
            margin: { mobile: "20px", laptop: "150px 0" },
            maxWidth: "800px",
            left: { mobile: 0, laptop: "10%" },
            boxSizing: "border-box",
            height: "100%",
            backgroundColor: "#ffffff30",
          }}
        >
          <img src={fullLogoURL} alt="logo" style={{ maxWidth: "700px" }} />
        </Box>
      </LandingSection>
      <LandingSection fullWidth background={eventLandingBodyBackground}>
        <Stack
          className="layout"
          direction="column"
          alignItems="center"
          style={{ maxWidth: "1200px" }}
        >
          <Stack
            direction="row"
            width={{ mobile: "300px", laptop: "600px" }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {nations &&
              nations.map((nation) => {
                if (nation.name === "China") {
                  return (
                    <LandingNationCard
                      key={nation.name}
                      name={nation.name}
                      date={nation.date}
                      image={nation.landingImage}
                      path={nation.path}
                      disabled
                    />
                  );
                }
                return (
                  <LandingNationCard
                    key={nation.name}
                    name={nation.name}
                    date={nation.date}
                    image={nation.landingImage}
                    path={`/${nation.path}`}
                  />
                );
              })}
          </Stack>
          <img
            src={logoURL}
            alt="logo"
            style={{ maxWidth: "300px", marginTop: "30px" }}
          />
          <Typography variant="body2" textAlign="center" mt={2}>
            {eventLandingDesc}
          </Typography>
        </Stack>
      </LandingSection>
      <LandingSection style={{ backgroundColor: "#F1F2F2" }} fullWidth>
        <Stack
          className="layout"
          direction="column"
          justifyContent="center"
          style={{ maxWidth: "350px ", padding: "50px" }}
        >
          <Typography variant="body1" fontWeight={500}>
            Sponsored by
          </Typography>
          <Stack direction="row" justifyContent="center">
            <a
              href="https://nanoscientific.org"
              target="_blank"
              rel="noreferrer"
              className="hover-zoom"
            >
              <img
                src="https://d25unujvh7ui3r.cloudfront.net/event/nano_logo.png"
                alt="park logo"
                height="70"
              />
            </a>
            <a
              href="https://parksystems.com"
              target="_blank"
              rel="noreferrer"
              className="hover-zoom"
            >
              <img
                src="https://d25unujvh7ui3r.cloudfront.net/event/park_logo.png"
                alt="park logo"
                height="70"
              />
            </a>
          </Stack>
        </Stack>
      </LandingSection>
    </EventLandingContainer>
  );
};

export default EventLanding;
