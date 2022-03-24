import React, { useState, useEffect } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "utils/GlobalData";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router";
import axios from "axios";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { SpeakersContainer } from "../Speakers/SpeakersStyles";

const Landing = () => {
  const pathname = usePageViews();
  const theme = useTheme();

  const {
    home,
    landingSection1Desc,
    landingSection1LogoURL,
    registration,
    landingSection1BackgroundURL,
    landingSection2Title,
    landingSection2Desc,
    landingSection2ImgURL,
    landingSection3Title,
    landingSection3List1Title,
    landingSection3List1,
    landingSection3List2Title,
    landingSection3List2,
    landingSection3List3Title,
    landingSection3List3,
    landingSection4Title,
    landingSection5Title,
    landingSection5Videos,
    cookieConsentText,
  } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(home as string, pathname);

  const navigate = useNavigate();

  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );

  useEffect(() => {
    axios
      .get(`/api/page/common/speakers/keynote?nation=${pathname}`)
      .then((res) => {
        setKeynoteSpeakers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <LandingSection
        fullWidth
        background={landingSection1BackgroundURL}
        className="section1"
      >
        <Stack
          className="layout"
          direction="column"
          alignItems="center"
          spacing={5}
        >
          <img
            src={landingSection1LogoURL}
            alt="logo"
            style={{
              maxWidth: "600px",
              height: "300px",
              width: "100%",
              minWidth: "200px",
            }}
          />
          <NSSButton
            variant="gradient"
            style={{ padding: "5px 20px" }}
            onClick={() => {
              navigate(`/${pathname}/registration`);
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  mobile: theme.typography.body1.fontSize,
                  tablet: theme.typography.h6.fontSize,
                },
              }}
            >
              {registration}
            </Typography>
          </NSSButton>
          <Typography
            textAlign="center"
            sx={{
              fontSize: {
                mobile: theme.typography.h6.fontSize,
                tablet: theme.typography.h5.fontSize,
              },
            }}
          >
            {landingSection1Desc}
          </Typography>
        </Stack>
        <div className="overlay secondary" />
      </LandingSection>
      <LandingSection fullWidth>
        <Stack
          className="layout"
          flexDirection={{
            mobile: "column",
            tablet: "row-reverse",
          }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ mobile: 5, tablet: 0 }}
        >
          <Stack
            sx={{
              display: "flex",
              width: {
                tablet: "40%",
                mobile: "100%",
              },
              height: {
                tablet: "100%",
                mobile: "40%",
              },
              position: "relative",
            }}
          >
            <img
              src={landingSection2ImgURL}
              alt="logo"
              style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div className="overlay secondary" />
          </Stack>
          <Stack
            flexDirection="column"
            width={{
              tablet: "55%",
              mobile: "100%",
            }}
            height={{
              tablet: "100%",
              mobile: "55%",
            }}
          >
            {landingSection2Title && (
              <LandingTitle title={landingSection2Title} />
            )}
            {landingSection2Desc && (
              <Box
                fontSize={
                  theme.typography.body2.fontSize
                  //   {
                  //   mobile: theme.typography.body2.fontSize,
                  //   tablet: theme.typography.body1.fontSize,
                  // }
                }
                height="80%"
                maxHeight="180px"
                pr={2}
                sx={{
                  overflowY: "scroll",
                }}
              >
                <InnerHTML html={landingSection2Desc} />
              </Box>
            )}
          </Stack>
        </Stack>
      </LandingSection>
      <LandingSection fullWidth>
        <Stack className="layout" direction="column">
          {landingSection3Title && (
            <LandingTitle title={landingSection3Title} textAlign="right" />
          )}
          <Stack
            direction={{ mobile: "column", laptop: "row" }}
            justifyContent="space-between"
          >
            <Box
              className="gradient-box"
              sx={{
                width: { laptop: "25%" },
                p: 3,
                mb: { mobile: 5, laptop: 0 },
              }}
            >
              <Typography
                fontSize={{
                  mobile: theme.typography.body1.fontSize,
                  laptop: theme.typography.h6.fontSize,
                }}
                fontWeight={theme.typography.fontWeightBold}
              >
                {landingSection3List1Title}
              </Typography>
              <ul style={{ marginInlineStart: "35px" }}>
                {landingSection3List1?.map((item) => (
                  <li style={{ marginBottom: "15px" }}>
                    <Typography
                      variant="body2"
                      fontWeight={theme.typography.fontWeightMedium}
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Box
              className="gradient-box"
              sx={{
                width: { laptop: "25%" },
                p: 3,
                mb: { mobile: 5, laptop: 0 },
              }}
            >
              <Typography
                fontSize={{
                  mobile: theme.typography.body1.fontSize,
                  laptop: theme.typography.h6.fontSize,
                }}
                fontWeight={theme.typography.fontWeightBold}
              >
                {landingSection3List2Title}
              </Typography>
              <ul style={{ marginInlineStart: "35px" }}>
                {landingSection3List2?.map((item) => (
                  <li style={{ marginBottom: "15px" }}>
                    <Typography
                      variant="body2"
                      fontWeight={theme.typography.fontWeightMedium}
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Box
              className="gradient-box"
              sx={{
                width: { laptop: "25%" },
                p: 3,
              }}
            >
              <Typography
                fontSize={{
                  mobile: theme.typography.body1.fontSize,
                  laptop: theme.typography.h6.fontSize,
                }}
                fontWeight={theme.typography.fontWeightBold}
              >
                {landingSection3List3Title}
              </Typography>
              <ul style={{ marginInlineStart: "35px" }}>
                {landingSection3List3?.map((item) => (
                  <li style={{ marginBottom: "15px" }}>
                    <Typography
                      variant="body2"
                      fontWeight={theme.typography.fontWeightMedium}
                    >
                      <InnerHTML html={item} />
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Stack>
        </Stack>
      </LandingSection>
      <LandingSection fullWidth>
        <SpeakersContainer className="layout">
          <Stack direction="column">
            {landingSection4Title && (
              <LandingTitle title={landingSection4Title} />
            )}
            <Stack direction="row">
              {keynoteSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </Stack>
          </Stack>
        </SpeakersContainer>
      </LandingSection>
      <LandingSection fullWidth>
        <Stack className="layout">
          {landingSection5Title && (
            <LandingTitle title={landingSection5Title} textAlign="right" />
          )}
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
            {landingSection5Videos?.map((video) => (
              <Box
                key={video}
                sx={{
                  backgroundColor: "#fff",
                  width: "46%",
                  height: "250px",
                  position: "relative",
                }}
              >
                <video src={video} controls width="100%">
                  <track kind="captions" />
                </video>
              </Box>
            ))}
          </Stack>
        </Stack>
      </LandingSection>
      <CookieConsent
        style={{ flexDirection: "column", alignItems: "center" }}
        contentStyle={{ flex: "none", maxWidth: "800px" }}
        buttonText="ACCEPT"
        buttonStyle={{
          color: "#5200ff",
          fontWeight: "500",
          backgroundColor: "white",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
      </CookieConsent>
    </>
  );
};

export default Landing;
