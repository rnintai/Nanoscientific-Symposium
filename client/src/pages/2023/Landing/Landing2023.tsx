/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useRef } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import { globalData, S3_URL } from "utils/GlobalData2023";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router";
import axios from "axios";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import CookieConsent, { Cookies } from "react-cookie-consent";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import BackgroundVectorWhite from "components/BackgroundVector/BackgroundVectorWhite";
import BackgroundVectorColored from "components/BackgroundVector/BackgroundVectorColored";
import BackgroundVectorColoredReversed from "components/BackgroundVector/BackgroundVectorColoredReversed";
// import { LiveChatWidget } from "@livechat/widget-react";
import {
  subHeadingFontSize,
  mainFontSize,
  smallFontSize,
  headingFontSize,
} from "utils/FontSize";
import Link from "components/Link/LinkWithSearch";
import useLoadingStore from "store/LoadingStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { adminRole, editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import LandingSection4Form from "pages/admin/Forms/LandingSection4Form";
import { LoadingButton } from "@mui/lab";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import EditIcon from "@mui/icons-material/Edit";
import SponsorForm from "pages/admin/Forms/SponsorForm";
import useAdminStore from "store/AdminStore";
import Landing6Form from "pages/admin/Forms/Landing6Form";
import { escapeQuotes } from "utils/String";
import { SpeakersContainer } from "pages/common/Speakers/SpeakersStyles";
import { LandingContainer } from "./LandingStyles";

interface LandingSectionProps extends React.ComponentPropsWithRef<"div"> {
  children?: JSX.Element | JSX.Element[] | string | string[];
  maxWidth?: string;
  height?: string;
  fullWidth?: boolean;
  background?: string;
}

const Landing2023 = () => {
  const pathname = usePageViews();
  const theme = useTheme();
  const authState = useAuthState();
  const isEditor = editorRole.includes(authState.role);
  const isAdmin = adminRole.includes(authState.role);

  const landingRefList = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const {
    registration,
    fullDate,
    eventLocation,
    landingSection1Desc,
    landingSection1LogoURL,
    landingSection1BackgroundURL,
  } = globalData.get(pathname) as Common.globalDataType;

  const navigate = useNavigate();

  const [originalLandingList, setOriginalLandingList] = useState<
    Landing.landingType[]
  >([]);
  const [landingList, setLandingList] = useState<Landing.landingType[]>([]);
  // title
  const [landing2Title, setLanding2Title] = useState<string>("");
  const [landing3Title, setLanding3Title] = useState<string>("");
  const [landing4Title, setLanding4Title] = useState<string>("");
  const [landing5Title, setLanding5Title] = useState<string>("");
  const [landing6Title, setLanding6Title] = useState<string>("");
  const [landing7Title, setLanding7Title] = useState<string>("");
  const [landing8Title, setLanding8Title] = useState<string>("");

  // content
  const [landing2Desc, setLanding2Desc] = useState<string>("");
  const [landing2DescCpy, setLanding2DescCpy] = useState<string>("");
  const [landing3Desc, setLanding3Desc] = useState<string>("");
  const [landing3DescCpy, setLanding3DescCpy] = useState<string>("");
  const [landingSection4List, setLandingSection4List] =
    useState<Landing.landing4Type[]>(null);
  const [landing6Desc, setLanding6Desc] = useState<string>("");
  const [landing6DescCpy, setLanding6DescCpy] = useState<string>("");

  // landing4 modal
  const [openSection4Modal, setOpenSection4Modal] = useState<boolean>(false);
  const [editSection4, setEditSection4] = useState<boolean>(false);
  // landing4 state
  const [selectedSection4, setSelectedSection4] =
    useState<Landing.landing4Type>();
  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );
  // landing6
  const [landing6Content, setLanding6Content] =
    useState<Landing.landing6Type>(null);
  const [openLanding6Modal, setOpenLanding6Modal] = useState<boolean>(false);
  // landing7
  // const { isSponsorPreview, setIsSponsorPreview } = useAdminStore();
  const [isSponsorPreview, setIsSponsorPreview] = useState<boolean>(false);
  const [isSponsor2Preview, setIsSponsor2Preview] = useState<boolean>(false);
  const [previewSponsorList, setPreviewSponsorList] = useState<
    Landing.landing7Type[]
  >([]);
  const [landingSection7Sponsors, setLandingSection7Sponsors] = useState<
    Landing.landing7Type[]
  >([]);
  const [selectedSponsor, setSelectedSponsor] =
    useState<Landing.landing7Type>();
  // landing8
  const [previewSponsor2List, setPreviewSponsor2List] = useState<
    Landing.landing7Type[]
  >([]);
  const [landingSection8Sponsors, setLandingSection8Sponsors] = useState<
    Landing.landing7Type[]
  >([]);
  const [selectedSponsor2, setSelectedSponsor2] =
    useState<Landing.landing7Type>();

  const [openSponsorModal, setOpenSponsorModal] = useState<boolean>(false);
  const [editSponsor, setEditSponsor] = useState<boolean>(false);

  const [openSponsorModal2, setOpenSponsorModal2] = useState<boolean>(false);
  const [editSponsor2, setEditSponsor2] = useState<boolean>(false);

  // for text editor
  const [landing2TitleEdit, setLanding2TitleEdit] = useState<boolean>(false);
  const [landing2TitlePreviewContent, setLanding2TitlePreviewContent] =
    useState<string>("");
  const [landing2TitlePreview, setLanding2TitlePreview] =
    useState<boolean>(false);
  const [landing2DescEdit, setLanding2DescEdit] = useState<boolean>(false);
  const [landing2DescPreviewContent, setLanding2DescPreviewContent] =
    useState<string>("");
  const [landing2DescPreview, setLanding2DescPreview] =
    useState<boolean>(false);
  //
  const [landing3TitleEdit, setLanding3TitleEdit] = useState<boolean>(false);
  const [landing3TitlePreviewContent, setLanding3TitlePreviewContent] =
    useState<string>("");
  const [landing3TitlePreview, setLanding3TitlePreview] =
    useState<boolean>(false);
  const [landing3DescEdit, setLanding3DescEdit] = useState<boolean>(false);
  const [landing3DescPreviewContent, setLanding3DescPreviewContent] =
    useState<string>("");
  const [landing3DescPreview, setLanding3DescPreview] =
    useState<boolean>(false);
  //
  const [landing4TitleEdit, setLanding4TitleEdit] = useState<boolean>(false);
  const [landing4TitlePreviewContent, setLanding4TitlePreviewContent] =
    useState<string>("");
  const [landing4TitlePreview, setLanding4TitlePreview] =
    useState<boolean>(false);
  //
  const [landing5TitleEdit, setLanding5TitleEdit] = useState<boolean>(false);
  const [landing5TitlePreviewContent, setLanding5TitlePreviewContent] =
    useState<string>("");
  const [landing5TitlePreview, setLanding5TitlePreview] =
    useState<boolean>(false);
  //
  const [landing6TitleEdit, setLanding6TitleEdit] = useState<boolean>(false);
  const [landing6TitlePreviewContent, setLanding6TitlePreviewContent] =
    useState<string>("");
  const [landing6TitlePreview, setLanding6TitlePreview] =
    useState<boolean>(false);
  const [landing6DescEdit, setLanding6DescEdit] = useState<boolean>(false);
  const [landing6DescPreviewContent, setLanding6DescPreviewContent] =
    useState<string>("");
  const [landing6DescPreview, setLanding6DescPreview] =
    useState<boolean>(false);
  //
  const [landing7TitleEdit, setLanding7TitleEdit] = useState<boolean>(false);
  const [landing7TitlePreviewContent, setLanding7TitlePreviewContent] =
    useState<string>("");
  const [landing7TitlePreview, setLanding7TitlePreview] =
    useState<boolean>(false);

  const [landing8TitleEdit, setLanding8TitleEdit] = useState<boolean>(false);
  const [landing8TitlePreviewContent, setLanding8TitlePreviewContent] =
    useState<string>("");
  const [landing8TitlePreview, setLanding8TitlePreview] =
    useState<boolean>(false);

  // Loading
  const [stickyApplyLoading, setStickyApplyLoading] = useState<boolean>(false);
  const {
    landingListLoading,
    setLandingListLoading,
    landingLoading,
    setLandingLoading,
  } = useLoadingStore();

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const getLandingList = async () => {
    try {
      setLandingListLoading(true);
      const res = await axios.get(
        `/api/page/common/landing?nation=${pathname}`,
      );
      setLandingList(res.data.result);
      setOriginalLandingList(res.data.result);
      setLanding2Title(res.data.result[0].title);
      setLanding3Title(res.data.result[1].title);
      setLanding4Title(res.data.result[2].title);
      setLanding5Title(res.data.result[3].title);
      setLanding6Title(res.data.result[4].title);
      setLanding7Title(res.data.result[5].title);
      setLanding8Title(res.data.result[6].title);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingListLoading(false);
    }
  };

  // landing2 handler
  const getLandingSection2 = async () => {
    try {
      const res = await axios.get(
        `/api/page/common/landing/2?nation=${pathname}`,
      );
      setLanding2Desc(res.data.result[0].description);
      setLanding2DescCpy(res.data.result[0].description);
    } catch (err) {
      console.log(err);
    }
  };
  const applyLanding2Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/2`, {
        nation: pathname,
        title: escapeQuotes(landing2Title),
        description: escapeQuotes(landing2Desc),
      });
      setLanding2Title(landing2Title);
      setLanding2Desc(landing2Desc);
      setLanding2TitleEdit(false);
      setLanding2DescEdit(false);
    }
  };

  // landing3 handler
  const getLandingSection3 = async () => {
    try {
      const res = await axios.get(
        `/api/page/common/landing/3?nation=${pathname}`,
      );
      setLanding3Desc(res.data.result[0].description);
      setLanding3DescCpy(res.data.result[0].description);
    } catch (err) {
      console.log(err);
    }
  };
  const applyLanding3Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/3`, {
        nation: pathname,
        title: escapeQuotes(landing3Title),
        description: escapeQuotes(landing3Desc),
      });
      setLanding3Title(landing3Title);
      setLanding3Desc(landing3Desc);
      setLanding3TitleEdit(false);
      setLanding3DescEdit(false);
    }
  };

  // landing4 handler
  const getLandingSection4 = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(
        `/api/page/common/landing/4?nation=${pathname}`,
      );
      setLandingSection4List(result.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingLoading(false);
    }
  };

  const applyLanding4Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/4`, {
        nation: pathname,
        title: escapeQuotes(landing4Title),
      });
      setLanding4Title(landing4Title);
      setLanding4TitleEdit(false);
    }
  };
  const handleAddSection4 = () => {
    setSelectedSection4(null);
    setEditSection4(false);
    setOpenSection4Modal(true);
  };
  const handleEditSection4 = (section: Landing.landing4Type) => {
    setSelectedSection4(section);
    setEditSection4(true);
    setOpenSection4Modal(true);
  };

  // landing5 handler
  const applyLanding5Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/5`, {
        nation: pathname,
        title: escapeQuotes(landing5Title),
      });
      setLanding5Title(landing5Title);
      setLanding5TitleEdit(false);
    }
  };
  // landing6 title
  const applyLanding6Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/6`, {
        nation: pathname,
        title: escapeQuotes(landing6Title),
      });
      setLanding6Title(landing6Title);
      setLanding6TitleEdit(false);
    }
  };

  // landing6 handler
  const applyLanding6Content = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/6`, {
        nation: pathname,
        title: escapeQuotes(landing6Title),
        description: escapeQuotes(landing6Desc),
      });
      setLanding6Title(landing6Title);
      setLanding6Desc(landing6Desc);
      setLanding6TitleEdit(false);
      setLanding6DescEdit(false);
    }
  };
  const getLandingSection6 = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(
        `/api/page/common/landing/6?nation=${pathname}`,
      );
      setLanding6Content(result.data.result[0]);
      setLanding6Desc(result.data.result[0].description);
      setLanding6DescCpy(result.data.result[0].description);
    } catch (err) {
      console.log(err);
    } finally {
      setLandingLoading(false);
    }
  };

  const getKeynoteList = async () => {
    try {
      const res = await axios.get(
        `/api/page/common/speakers/keynote?nation=${pathname}`,
      );
      setKeynoteSpeakers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // landing 7 handler
  const applyLanding7Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/7`, {
        nation: pathname,
        title: escapeQuotes(landing7Title),
      });
      setLanding7Title(landing7Title);
      setLanding7TitleEdit(false);
    }
  };
  const getLandingSection7 = async () => {
    try {
      const result = await axios.get(
        `/api/page/common/landing/7?nation=${pathname}`,
      );
      setLandingSection7Sponsors(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const addSponsorHandler = () => {
    setSelectedSponsor(null);
    setEditSponsor(false);
    setOpenSponsorModal(true);
  };
  const editSponsorHandler = (sponsor: Landing.landing7Type) => {
    setSelectedSponsor(sponsor);
    setEditSponsor(true);
    setOpenSponsorModal(true);
  };
  const handleReturnSponsor = () => {
    setIsSponsorPreview(false);
    setOpenSponsorModal(true);
  };

  // landing 8 handler
  const applyLanding8Title = async () => {
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/landing/title/8`, {
        nation: pathname,
        title: escapeQuotes(landing8Title),
      });
      setLanding8Title(landing8Title);
      setLanding8TitleEdit(false);
    }
  };
  const getLandingSection8 = async () => {
    try {
      const result = await axios.get(
        `/api/page/common/landing/8?nation=${pathname}`,
      );
      setLandingSection8Sponsors(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const addSponsorHandler2 = () => {
    setSelectedSponsor2(null);
    setEditSponsor2(false);
    setOpenSponsorModal2(true);
  };
  const editSponsorHandler2 = (sponsor: Landing.landing7Type) => {
    setSelectedSponsor2(sponsor);
    setEditSponsor2(true);
    setOpenSponsorModal2(true);
  };
  const handleReturnSponsor2 = () => {
    setIsSponsorPreview(false);
    setOpenSponsorModal2(true);
  };

  // sticky
  const handleStickyMenuSectionClick = (
    ref: React.MutableRefObject<HTMLDivElement>,
  ) => {
    ref.current.parentElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    ref.current.parentElement.classList.add("bg-alpha");
    setTimeout(() => {
      ref.current.parentElement.classList.remove("bg-alpha");
    }, 400);
  };
  const setLandingTitle = (i: number, title: string) => {
    const newLanding = [...landingList];
    newLanding[i] = {
      ...landingList[i],
      title,
    };
    setLandingList(newLanding);
  };
  const handleStickyReset = () => {
    if (confirm("Are you sure to reset?")) {
      setLandingList(originalLandingList);
    }
  };
  const handleStickyApply = async () => {
    if (confirm("Are you sure to apply?")) {
      try {
        setStickyApplyLoading(true);
        await axios.post("/api/page/common/landing", {
          nation: pathname,
          landingSectionList: landingList,
        });
      } catch (err) {
        console.log(err);
      } finally {
        getLandingList();
        setStickyApplyLoading(false);
      }
    }
  };

  useEffect(() => {
    getLandingList();
    getKeynoteList();
    getLandingSection2();
    getLandingSection3();
    getLandingSection4();
    getLandingSection6();
    getLandingSection7();
    if (pathname === "jp" || pathname === "kr") {
      getLandingSection8();
    }
  }, []);

  if (landingListLoading) {
    return <Box className="body-fit" />;
  }
  return (
    <LandingContainer>
      <Box className="body-fit">
        <LandingSection
          fullWidth
          maxWidth="1920px"
          background={landingSection1BackgroundURL}
          className="section1"
        >
          <BackgroundVectorWhite maxWidth="1920px">
            <div
              className="overlay secondary z0"
              style={{ background: "#0000005e" }}
            />
            <Stack
              className="layout"
              direction="column"
              alignItems="center"
              spacing={5}
              sx={{
                padding: { laptop: "135px 50px !important" },
                maxWidth: "1400px !important",
                textAlign: "center",
              }}
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
              <Stack
                sx={{
                  flexDirection: {
                    mobile: "column",
                    laptop: "row",
                  },
                  backgroundColor: theme.palette.common.white,
                  padding: "0 10px",
                }}
                style={{ marginTop: 0 }}
                alignItems="center"
                className="z1"
              >
                {eventLocation !== undefined && (
                  <>
                    <Typography
                      fontSize={headingFontSize}
                      fontWeight={700}
                      color={theme.palette.primary.navy}
                    >
                      {eventLocation}
                    </Typography>
                    <Typography
                      sx={{
                        display: { mobile: "none", laptop: "inline-block" },
                        margin: "0 8px",
                      }}
                      fontWeight={700}
                      fontSize={subHeadingFontSize}
                      color={theme.palette.primary.navy}
                    >
                      |
                    </Typography>
                  </>
                )}
                <Typography
                  fontSize={headingFontSize}
                  fontWeight={700}
                  color={theme.palette.primary.navy}
                >
                  {fullDate}
                </Typography>
              </Stack>
              {registration && (
                <NSSButton
                  className="z1"
                  variant="gradient"
                  style={{ padding: "5px 20px" }}
                  fontSize={mainFontSize}
                  fontWeight={theme.typography.fontWeightBold}
                  letterSpacing="1.2px"
                >
                  <Link
                    style={{ padding: 0, color: "white" }}
                    to={
                      pathname === "kr"
                        ? `/${pathname}/register-info`
                        : `/${pathname}/registration`
                    }
                  >
                    {registration}
                  </Link>
                </NSSButton>
              )}
              {pathname === "jp" && (
                <NSSButton
                  className="z1"
                  variant="gradient"
                  style={{ padding: "5px 20px", marginTop: "10px" }}
                  fontSize={mainFontSize}
                  fontWeight={theme.typography.fontWeightBold}
                  letterSpacing="1.2px"
                >
                  <Link
                    style={{ padding: 0, color: "white" }}
                    to={`/${pathname}/abstract`}
                  >
                    ポスターセッション申込はこちらから
                  </Link>
                </NSSButton>
              )}
              <Typography
                className="z1"
                textAlign="center"
                color={theme.palette.common.white}
                fontWeight={theme.typography.fontWeightMedium}
                fontSize={subHeadingFontSize}
              >
                {landingSection1Desc && (
                  <InnerHTML html={landingSection1Desc} />
                )}
              </Typography>
            </Stack>
          </BackgroundVectorWhite>
        </LandingSection>
      </Box>
      {/* <CookieConsent
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#EDF4FC",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          flex: "none",
          color: theme.palette.common.black,
        }}
        buttonText="ACCEPT"
        buttonClasses="hover-zoom"
        buttonStyle={{
          color: theme.palette.common.white,
          fontWeight: "500",
          background: theme.palette.primary.gradation,
          border: `2px solid ${theme.palette.common.white}`,
          borderRadius: "15px",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
        <a href="/" target="_blank" style={{ padding: 0, width: "20%" }}>
          {seePrivacyPolicyText || ""}
        </a>
      </CookieConsent> */}

      {/* <LiveChatWidget license="13874505" group="0" /> */}
    </LandingContainer>
  );
};

export default Landing2023;
