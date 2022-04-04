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
      <LandingSection
        className="banner-section"
        background={eventLandingMainBannerURL}
        fullWidth
      />
      <Box className="body-container">
        {teaserVideoEmbed && (
          <LandingSection fullWidth>
            <Stack className="layout" spacing={4} alignItems="center">
              {/* 영상, desc */}
              <Stack
                alignItems={{
                  mobile: "center",
                  laptop: "center",
                }}
                spacing={2}
              >
                <img
                  className="section-logo"
                  src={logoURL}
                  alt="logo"
                  style={{
                    maxWidth: "500px",
                  }}
                />
                {/* <YoutubeEmbed
                  embedId={teaserVideoEmbed}
                  width="400"
                  height="250"
                /> */}
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
              {/* 나라 카드 */}
              <Stack
                direction="row"
                width={{ laptop: "100%" }}
                flexWrap="wrap"
                justifyContent="center"
                sx={{
                  minWidth: "200px",
                }}
              >
                {nations &&
                  nations.map((nation) => {
                    if (nation.name === "NSS China") {
                      return (
                        <LandingNationCard
                          key={nation.name}
                          name={nation.name}
                          date={nation.date}
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
                        path={`/${nation.path}`}
                        disabled
                      />
                    );
                  })}
              </Stack>
              {/* 스폰서 */}
            </Stack>

            {/* 나라 카드 */}
            {/* <Stack
              className="layout"
              direction="column"
              alignItems="center"
              style={{ width: "80%", padding: "0px 50px" }}
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
                        path={`/${nation.path}`}
                        disabled
                      />
                    );
                  })}
              </Stack>
            </Stack> */}
            {/* Sponsor */}
          </LandingSection>
        )}
      </Box>
      <LandingSection fullWidth>
        <Stack
          justifyContent="center"
          sx={{
            flexDirection: {
              laptop: "row",
            },
            alignItems: {
              mobile: "center",
            },
          }}
        >
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
