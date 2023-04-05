import { Box, Stack, Typography } from "@mui/material";
import LandingSection from "components/Section/LandingSection";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { globalData } from "utils/GlobalData";
import InnerHTML from "dangerously-set-html-content";
import LandingNationCard from "components/Card/LandingNationCard";
import EventLandingTopicCard from "components/Card/EventLandingTopicCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import useWindowSize from "hooks/useWindowSize";
import EventLandingKnowledgeCard from "components/Card/EventLandingKnowledgeCard";
import { EventLandingContainer } from "./EventLandingStyles";

const EventLanding = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const {
    eventLandingMainBannerURL,
    eventLandingMainBannerMobileURL,
    logoURL,
    fullLogoURL,
    eventLandingHeading,
    eventLandingDesc,
    eventLandingBodyBackground,
    teaserVideoEmbed,
    teaserVideoURL,
    nations,
    bannerLogoURL,
    sponsor1LogoURL,
    sponsor2LogoURL,
    sponsor3LogoURL,
    eventLandingSection2Heading,
    eventLandingSection2Content,
    eventLandingSection3Heading,
    eventLandingSection3Content,
    eventLandingSponsorSectionHeading,
    eventLandingSponsorSectionContent,
    eventLandingSponsorSectionDesc,
  } = globalData.get("common") as Common.globalDataType;

  return (
    <EventLandingContainer>
      <LandingSection className="top-logo-section">
        <img src={logoURL} alt="logo" />
      </LandingSection>
      <LandingSection
        className="banner-section"
        background={
          isMobile ? eventLandingMainBannerMobileURL : eventLandingMainBannerURL
        }
        fullWidth
      />

      <Box className="body-container">
        {teaserVideoEmbed && (
          <LandingSection fullWidth>
            <Stack className="landing-layout" alignItems="center">
              {/* desc */}
              <Stack
                className="section"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "80px" }}
              >
                <Typography className="title">{eventLandingHeading}</Typography>
                <Typography
                  className="desc"
                  textAlign="left"
                  color="#6A6E83"
                  sx={{
                    fontSize: "15px",
                  }}
                >
                  <InnerHTML html={eventLandingDesc || ""} />
                </Typography>
              </Stack>

              {/* 나라 카드 */}
              <Stack
                direction="row"
                width={{ laptop: "100%" }}
                flexWrap="wrap"
                className="nation-card-wrap"
                justifyContent="space-between"
                sx={{
                  minWidth: "200px",
                }}
              >
                {nations &&
                  nations.map((nation) => {
                    return (
                      <LandingNationCard
                        key={nation.name}
                        img={nation.img}
                        name={nation.name}
                        date={nation.date}
                        path={nation.path}
                        type={nation.type}
                        // disabled -> coming soon
                      />
                    );
                  })}
              </Stack>
            </Stack>
          </LandingSection>
        )}
      </Box>
      <LandingSection className="bg-skyblue">
        <Box className="landing-layout">
          <Box sx={{ mb: "80px;" }}>
            {/* section2 */}
            <Typography className="title">
              {eventLandingSection2Heading}
            </Typography>
            <Swiper
              className="swiper-topic"
              key={isMobile ? "mobile" : "desktop"}
              slidesPerView={isMobile ? 2 : 5}
              autoplay={{ delay: 2500, pauseOnMouseEnter: false }}
              modules={[Autoplay]}
            >
              {eventLandingSection2Content.map((content) => (
                <SwiperSlide>
                  <EventLandingTopicCard selected={content} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Typography className="caution">
              ※ The programs and sessions may vary based on the region
            </Typography>
          </Box>
          <Box>
            {/* section3 */}
            <Typography className="title">
              {eventLandingSection3Heading}
            </Typography>
            <Box className="section-3-wrap">
              {eventLandingSection3Content.map((content) => (
                <EventLandingKnowledgeCard selected={content} />
              ))}
            </Box>
          </Box>
        </Box>
      </LandingSection>

      <Box className="body-container">
        <LandingSection fullWidth>
          <Box className="landing-layout">
            <Typography className="title sponsors-title">
              {eventLandingSponsorSectionHeading}
            </Typography>
            <Typography
              className="desc sponsor-desc"
              textAlign="left"
              color="#6A6E83"
              sx={{
                fontSize: "15px",
              }}
            >
              {eventLandingSponsorSectionDesc}
            </Typography>
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
              {eventLandingSponsorSectionContent.map((sponsor, i) => (
                <a
                  className={`sponsor-logo sponsor-${i + 1}-logo`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src={sponsor.img}
                    alt={`${sponsor.name}-logo`}
                    height={sponsor.height}
                  />
                </a>
              ))}
            </Stack>
          </Box>
        </LandingSection>
      </Box>
    </EventLandingContainer>
  );
};

export default EventLanding;
