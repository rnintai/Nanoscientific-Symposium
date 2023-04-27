import { Box, Stack, Typography } from "@mui/material";
import LandingSection from "components/Section/LandingSection";
import useNSSType from "hooks/useNSSType";
import React from "react";
import { globalData } from "utils/GlobalData";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import {
  headingFontSize,
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "hooks/useNavigateWithSearch";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import { RegistrationContainer } from "../Registration/RegistrationStyles";

const RegistrationComplete = () => {
  const nssType = useNSSType();
  const navigate = useNavigate();
  const pathname = usePageViews();
  const year = useCurrentYear();
  const {
    registrationStep1Label,
    registrationStep2Label,
    registrationStep3Label,
    logoURL,
  } = globalData.get(nssType) as Common.globalDataType;
  return (
    <RegistrationContainer>
      <LandingSection className="banner" maxWidth="1920px" fullWidth>
        <Stack justifyContent="center" alignItems="center" height="100%">
          <img className="banner-img" src={logoURL} alt="NSS Logo" />
        </Stack>
      </LandingSection>
      <LandingSection className="layout">
        <Stack
          className="step-container"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <LooksOneIcon className="step-icon active" />
            <Typography
              className="step-caption active"
              fontSize={smallFontSize}
              sx={{ position: "absolute" }}
            >
              {registrationStep1Label || "Your Information"}
            </Typography>
          </div>
          <div className="icon-divider active" />
          <div>
            <LooksTwoIcon className="step-icon active" />
            <Typography
              className="step-caption caption2 active"
              fontSize={smallFontSize}
              sx={{ position: "absolute" }}
            >
              {registrationStep2Label || "Setting a password"}
            </Typography>
          </div>
          <div className="icon-divider active" />
          <div>
            <Looks3Icon className="step-icon active" />
            <Typography
              className="step-caption active"
              fontSize={smallFontSize}
              sx={{ position: "absolute" }}
            >
              {registrationStep3Label || "Complete"}
            </Typography>
          </div>
        </Stack>
        <Stack textAlign="center" justifyContent="center" alignItems="center">
          <Typography fontSize={subHeadingFontSize} fontWeight={600}>
            등록 신청이 완료되었습니다.
          </Typography>
          <Typography fontSize={mainFontSize}>
            NANOscientific Sympoisum Korea는 한국표면분석학회 주최,
            NANOscientific 주관으로 개최합니다. <br /> 등록비 결제는 주최사인{" "}
            <a
              href="https://surfaceanalysis.kr/bbs/content.php?co_id=sign_info&cat=5&sub=0"
              target="_blank"
              rel="noopener noreferrer"
              className="link-default"
            >
              한국표면분석학회 홈페이지
            </a>
            에서 진행됩니다.
          </Typography>
          <br />
          <NSSButton
            variant="gradient"
            onClick={() => {
              navigate(`/${pathname}/${year}/register-info`);
            }}
          >
            등록 안내 바로가기
          </NSSButton>
        </Stack>
      </LandingSection>
    </RegistrationContainer>
  );
};

export default RegistrationComplete;
