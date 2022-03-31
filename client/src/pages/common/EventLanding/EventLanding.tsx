import { Box, Stack, Typography, useTheme } from "@mui/material";
import LandingNationCard from "components/Card/LandingNationCard";
import LandingSection from "components/Section/LandingSection";
import React from "react";
import { Link } from "react-router-dom";
import { globalData } from "utils/GlobalData";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import { EventLandingContainer } from "./EventLandingStyles";

const EventLanding = () => {
  const {
    eventLandingMainBannerURL,
    logoURL,
    fullLogoURL,
    eventLandingDesc,
    eventLandingBodyBackground,
    teaserVideoEmbed,
    nations,
  } = globalData.get("common") as Common.globalDataType;

  const theme = useTheme();
  return (
    <EventLandingContainer>
      <LandingSection
        background={eventLandingMainBannerURL}
        height="500px"
        fullWidth
      />
      <BackgroundVectorColored>
        {/* 영상, desc */}
        {teaserVideoEmbed && (
          <LandingSection fullWidth>
            <Stack
              className="layout"
              direction={{ mobile: "column", laptop: "row" }}
            >
              <YoutubeEmbed
                embedId={teaserVideoEmbed}
                width="400"
                height="250"
              />
              <Stack sx={{ margin: "30px 0 30px 40px" }}>
                <img src={logoURL} alt="logo" style={{ maxWidth: "300px" }} />
                <Typography
                  variant="body2"
                  textAlign="left"
                  mt={2}
                  color={theme.palette.grey[600]}
                >
                  {eventLandingDesc}
                </Typography>
              </Stack>
            </Stack>
          </LandingSection>
        )}

        {/* 큰 로고 */}
        <LandingSection fullWidth>
          <Stack
            style={{ padding: "0 50px" }}
            className="layout"
            alignItems="center"
          >
            <Box sx={{ height: { mobile: "220px", laptop: "500px" } }}>
              <img src={fullLogoURL} alt="logo" style={{ height: "100%" }} />
            </Box>
          </Stack>
        </LandingSection>
        {/* 나라 카드 */}
        <LandingSection fullWidth>
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
                  if (nation.name === "NSS China") {
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
          </Stack>
        </LandingSection>
      </BackgroundVectorColored>
      {/* Sponsor */}
      <LandingSection style={{ backgroundColor: "#EDF4FC" }} fullWidth>
        <Stack
          className="layout"
          direction="column"
          justifyContent="center"
          style={{ maxWidth: "350px ", padding: "20px 50px" }}
        >
          <Typography
            variant="body1"
            fontWeight={theme.typography.fontWeightBold}
          >
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
