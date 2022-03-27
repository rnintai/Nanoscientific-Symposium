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
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorWhite from "components/BackgroundVector/BackgroundVectorWhite";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import BackgroundVectorColoredReversed from "components/BackgroundVector/BackgroundVectorColoredReversed";
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
    landingSection2_5Title,
    landingSection2_5Desc,
    landingSection3Title,
    landingSection3List1Title,
    landingSection3List1,
    landingSection3List2Title,
    landingSection3List2,
    landingSection3List3Title,
    landingSection3List3,
    landingSection4Title,
    landingSection5Title,
    landingSection5Desc,
    landingSection5ButtonText,
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
        <BackgroundVectorWhite>
          <div className="overlay secondary z0" />
          <Stack
            className="layout"
            direction="column"
            alignItems="center"
            spacing={5}
          >
            <img
              className="z1"
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
              className="z1"
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
              className="z1"
              textAlign="center"
              color={theme.palette.common.white}
              fontWeight={theme.typography.fontWeightMedium}
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
        </BackgroundVectorWhite>
      </LandingSection>
      <BackgroundVectorColored>
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
              <Box className="z1" sx={{ width: "100%", height: "100%" }}>
                <YoutubeEmbed embedId="5aqzJQgN9X0" />
              </Box>
              {/* <div className="overlay secondary z0" /> */}
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
          <Box className="layout">
            {landingSection2_5Title && (
              <LandingTitle title={landingSection2_5Title} />
            )}
            {landingSection2_5Desc && (
              <Typography>{landingSection2_5Desc}</Typography>
            )}
          </Box>
        </LandingSection>
        <LandingSection fullWidth>
          <Stack className="layout" direction="column">
            {landingSection3Title && (
              <LandingTitle title={landingSection3Title} textAlign="left" />
            )}
            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              justifyContent="space-between"
              sx={{
                color: theme.palette.common.white,
              }}
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
      </BackgroundVectorColored>

      <BackgroundVectorColoredReversed>
        <LandingSection fullWidth>
          <SpeakersContainer className="layout">
            <Stack direction="column">
              {landingSection4Title && (
                <LandingTitle title={landingSection4Title} textAlign="right" />
              )}
              <Stack direction="row">
                {keynoteSpeakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </Stack>
            </Stack>
          </SpeakersContainer>
        </LandingSection>

        {/* section5 */}
        <LandingSection fullWidth>
          <Stack className="layout">
            {landingSection5Title && (
              <LandingTitle title={landingSection5Title} />
            )}

            {landingSection5ButtonText && landingSection5Desc && (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ margin: "-27px 0 20px 0" }}
              >
                <Box sx={{ width: "50%" }}>
                  <Typography
                    variant="h6"
                    fontWeight={theme.typography.fontWeightMedium}
                  >
                    {landingSection5Desc}
                  </Typography>
                </Box>
                <Box sx={{ m: "15px", width: "30%" }}>
                  <NSSButton variant="gradient">
                    {landingSection5ButtonText}
                  </NSSButton>
                </Box>
              </Stack>
            )}
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
            >
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
      </BackgroundVectorColoredReversed>
      {/* <CookieConsent
        style={{ flexDirection: "column", alignItems: "center" }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          flex: "none",
        }}
        buttonText="ACCEPT"
        buttonStyle={{
          color: "#5200ff",
          fontWeight: "500",
          backgroundColor: "white",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
        <a href="/" target="_blank" style={{ textAlign: "right", padding: 0 }}>
          See privacy policy
        </a>
      </CookieConsent> */}
    </>
  );
};

export default Landing;
