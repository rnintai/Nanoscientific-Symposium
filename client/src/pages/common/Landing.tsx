import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "utils/GlobalData";
import LandingSection from "components/Section/LandingSection";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router";

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
  } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(home as string, pathname);

  const navigate = useNavigate();

  // const [HTML, loading] = useHTML(`/api/page/common/landing`);
  // if (loading) {
  //   return <Loading />;
  // }
  // return <InnerHTML html={HTML} />;
  return (
    <>
      <LandingSection fullWidth background={landingSection1BackgroundURL}>
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
            <Box
              fontSize={{
                mobile: theme.typography.h5.fontSize,
                tablet: theme.typography.h4.fontSize,
              }}
              fontWeight={500}
              height="20%"
            >
              {landingSection2Title}
            </Box>
            {landingSection2Desc && (
              <Box
                fontSize={{
                  mobile: theme.typography.body2.fontSize,
                  tablet: theme.typography.body1.fontSize,
                }}
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
    </>
  );
};

export default Landing;
