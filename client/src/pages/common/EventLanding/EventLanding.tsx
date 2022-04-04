import { Box, Stack, Typography, useTheme } from "@mui/material";
import LandingNationCard from "components/Card/LandingNationCard";
import LandingSection from "components/Section/LandingSection";
import React from "react";
import { Link } from "react-router-dom";
import { globalData } from "utils/GlobalData";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import { mainFontSize } from "utils/FontSize";
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
    bannerLogoURL,
    sponsor1LogoURL,
    sponsor2LogoURL,
  } = globalData.get("common") as Common.globalDataType;

  const theme = useTheme();
  return (
    <EventLandingContainer>
      <LandingSection background={eventLandingMainBannerURL} fullWidth>
        <Stack className="layout" alignItems="center">
          <img src={bannerLogoURL} className="banner-logo" alt="logo" />
        </Stack>
      </LandingSection>
      <Box className="body-container">
        {/* 영상, desc */}
        {teaserVideoEmbed && (
          <LandingSection fullWidth>
            <Stack
              className="layout"
              direction={{ mobile: "column", laptop: "row" }}
              style={{
                // padding: "70px 50px 30px 50px"
                padding: "20px 50px 30px 50px",
              }}
            >
              {/* <YoutubeEmbed embedId={teaserVideoEmbed} width="400" height="250" /> */}
              <Stack
                sx={{
                  margin: { laptop: "30px 0 30px 40px", mobile: "30px 0" },
                }}
                alignItems={{
                  mobile: "center",
                  // laptop: "flex-start"
                  laptop: "center",
                }}
              >
                <img
                  className="section-logo"
                  src={logoURL}
                  alt="logo"
                  style={{
                    // maxWidth: "300px",
                    maxWidth: "500px",
                  }}
                />
                <Typography
                  textAlign="left"
                  mt={1}
                  color={theme.palette.grey[600]}
                  sx={{
                    fontSize: mainFontSize,
                  }}
                >
                  {eventLandingDesc}
                </Typography>
              </Stack>
            </Stack>
          </LandingSection>
        )}

        {/* 나라 카드 */}
        <LandingSection fullWidth>
          <Stack
            className="layout"
            direction="column"
            alignItems="center"
            style={{ padding: "0px 50px 50px 50px" }}
          >
            <Stack
              direction="row"
              width={{ mobile: "300px", laptop: "100%" }}
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
                      disabled
                    />
                  );
                })}
            </Stack>
          </Stack>
        </LandingSection>
      </Box>
      {/* Sponsor */}
      <LandingSection style={{ backgroundColor: "#EDF4FC" }} fullWidth>
        <Stack direction="row" justifyContent="center">
          <a
            href="https://nanoscientific.org"
            target="_blank"
            rel="noreferrer"
            // className="hover-zoom"
          >
            <img src={sponsor1LogoURL} alt="park logo" height="70" />
          </a>
          <a
            href="https://parksystems.com"
            target="_blank"
            rel="noreferrer"
            // className="hover-zoom"
          >
            <img src={sponsor2LogoURL} alt="park logo" height="70" />
          </a>
        </Stack>
      </LandingSection>
    </EventLandingContainer>
  );
};

export default EventLanding;
