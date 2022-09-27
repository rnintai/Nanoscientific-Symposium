/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
// mui
import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
  Icon,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import LanguageIcon from "@mui/icons-material/Language";
import VideocamIcon from "@mui/icons-material/Videocam";

// utils
import { dateToLocaleString, calculateDurationToString } from "utils/Date";
import { subHeadingFontSize, smallFontSize } from "utils/FontSize";

import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import { snakeToPrettyString } from "utils/String";
import CountrySelect from "components/Input/CountrySelect";
import { useNavigate } from "react-router";
import usePageViews from "hooks/usePageViews";
import CloseIcon from "@mui/icons-material/Close";
import { editorRole } from "utils/Roles";
import { Box } from "@mui/system";
import { useAuthState } from "../../context/AuthContext";
import { ZoomCardContainer } from "./ZoomCardStyles";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
  timezone: string;
  isMeeting: boolean;
  setSuccessAlert: React.Dispatch<boolean>;
  setFailedAlert: React.Dispatch<boolean>;
}

interface QuestionType {
  value: string;
  required: boolean;
}

const ZoomCard = ({
  webinar,
  timezone,
  isMeeting,
  setSuccessAlert,
  setFailedAlert,
}: ZoomCardProps) => {
  const authState = useAuthState();
  const theme = useTheme();
  const pathname = usePageViews();
  const navigate = useNavigate();
  const isEditor = editorRole.includes(authState.role);

  // input
  const email1 = useInput(authState.email);
  const email2 = useInput("");
  const firstName = useInput("");

  // modal state
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  // questions state
  const [questions, setQuestions] = useState<any>();
  // register 여부
  // const [isWebinarRegistered, setIsWebinarRegistered] = useState<-1 | 0 | 1>(
  //   -1,
  // );
  // 유저 별 join link
  const [appJoinLink, setAppJoinLink] = useState<string>("");
  const [webJoinLink, setWebJoinLink] = useState<string>("");

  const [currentLive, setCurrentLive] = useState<number>(webinar.is_live);
  const [liveToggleLoading, setLiveToggleLoading] = useState<boolean>(false);

  const [isAppRegistering, setIsAppRegistering] = useState<boolean>(false);

  // loading
  const [getQuestionsLoading, setGetQuestionsLoading] =
    useState<boolean>(false);
  const [addRegistrantLoading, setAddRegistrantLoading] =
    useState<boolean>(false);
  const [getRegistrantLinkLoading, setGetRegistrantLinkLoading] =
    useState<boolean>(false);
  const [openWebLinkLoading, setOpenWebLinkLoading] = useState<boolean>(false);
  const [openAppLinkLoading, setOpenAppLinkLoading] = useState<boolean>(false);

  // form validation
  const isEmail1Empty = email1.value === "";
  const isEmail2Empty = email2.value === "";
  const isFirstNameEmpty = firstName.value === "";
  const isEmailConfirmed = email1.value === email2.value;

  // 국가 구분 태그를 떼어내는 메서드
  const removeTagFromTopic = (topic: string) => {
    return topic.split("]")[1];
  };

  // 질문 받아오기 handler
  const getQuestionsHandler = () => {
    setGetQuestionsLoading(true);
    axios
      .get(`/api/zoom/webinar/registrant/questions/${webinar.id}`, {
        params: {
          nation: pathname,
        },
      })
      .then((res) => {
        const resultArray = [...res.data.result.questions];
        const toBeUpdated = {} as any;
        resultArray.forEach((e) => {
          toBeUpdated[e.field_name] = {
            value: "",
            required: e.required,
          };
        });
        setQuestions(toBeUpdated);
        setOpenRegisterModal(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetQuestionsLoading(false);
      });
  };

  // 웨비나 등록 handler
  const webinarRegisterHandler = () => {
    const questionsCpy = { ...questions };
    questionsCpy.email = { value: email1.value, required: true };
    questionsCpy.first_name = { value: firstName.value, required: true };
    setAddRegistrantLoading(true);
    axios
      .post(`/api/zoom/webinar/registrants/${webinar.id}`, {
        questions: questionsCpy,
        nation: pathname,
      })
      .then(() => {
        setSuccessAlert(true);
        setOpenRegisterModal(false);
        // navigate(0);
        if (isAppRegistering) {
          handleOpenAppLink();
        } else {
          handleOpenWebLink();
        }
      })
      .catch(() => {
        setFailedAlert(true);
      })
      .finally(() => {
        setAddRegistrantLoading(false);
      });
  };

  // 카드 삭제 handler
  const handleRemove = async () => {
    if (confirm("Are you sure?")) {
      try {
        await axios.delete(
          `/api/zoom/webinar/${webinar.id}?nation=${pathname}`,
        );
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 제출 가능 여부 check
  const checkSubmittable = () => {
    let result =
      !isEmail1Empty && !isEmail2Empty && isEmailConfirmed && !isFirstNameEmpty;

    const requiredArray = [] as QuestionType[];
    if (questions) {
      const questionKeys = Object.keys(questions);
      questionKeys.forEach((key) => {
        if (questions[key].required) {
          requiredArray.push(questions[key]);
        }
      });
    }

    requiredArray.forEach((q) => {
      result = result && q.value !== "";
    });

    return result;
  };

  // web link open handler
  const handleOpenWebLink = async () => {
    if (webJoinLink === "") {
      try {
        setOpenWebLinkLoading(true);
        const res = await axios.get(
          `/api/zoom/webinar/registrants/${webinar.id}`,
          {
            params: { email: authState.email, nation: pathname },
          },
        );
        if (res.data.result) {
          setWebJoinLink(res.data.result.replace("/w/", "/wc/join/"));
          setAppJoinLink(res.data.result);
          window.open(res.data.result.replace("/w/", "/wc/join/"), "_blank");
        } else {
          setIsAppRegistering(false);
          getQuestionsHandler();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setOpenWebLinkLoading(false);
      }
    } else {
      window.open(webJoinLink, "_blank");
    }
    // register 예외
  };
  // app link open handler
  const handleOpenAppLink = async () => {
    if (appJoinLink === "") {
      try {
        setOpenAppLinkLoading(true);
        const res = await axios.get(
          `/api/zoom/webinar/registrants/${webinar.id}`,
          {
            params: { email: authState.email, nation: pathname },
          },
        );
        if (res.data.result) {
          setWebJoinLink(res.data.result.replace("/w/", "/wc/join/"));
          setAppJoinLink(res.data.result);
          window.open(res.data.result, "_blank");
        } else {
          setIsAppRegistering(true);
          getQuestionsHandler();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setOpenAppLinkLoading(false);
      }
    } else {
      window.open(appJoinLink, "_blank");
    }
    // register 예외
  };

  const handleLiveClick = async () => {
    try {
      setLiveToggleLoading(true);
      await axios.post("/api/zoom/webinar/live", {
        nation: pathname,
        id: webinar.id,
        isLive: currentLive === 1 ? 0 : 1,
      });
      setCurrentLive(currentLive === 1 ? 0 : 1);
      // navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLiveToggleLoading(false);
    }
  };

  useEffect(() => {
    if (isMeeting) {
      setWebJoinLink(webinar.join_url.replace("/j/", "/wc/join/"));
      setAppJoinLink(webinar.join_url);
    }
  }, []);

  return (
    <ZoomCardContainer>
      {!getRegistrantLinkLoading && (
        <>
          <Card
            sx={{
              display: "flex",
              minHeight: "220px",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            raised
          >
            <CardHeader
              // avatar={
              //   <VideocamIcon
              //     sx={{
              //       color: webinar.is_live
              //         ? "#e60000"
              //         : // : theme.palette.whitescale.alpha50,
              //           "#ffffffbf",
              //     }}
              //     fontSize="medium"
              //   />
              // }
              title={
                <Stack alignItems="flex-start">
                  {isEditor ? (
                    <button
                      type="button"
                      className={`live-icon${currentLive ? "" : " off"}`}
                      style={{
                        pointerEvents: liveToggleLoading ? "none" : "initial",
                      }}
                      onClick={handleLiveClick}
                    >
                      LIVE
                    </button>
                  ) : (
                    <span className={`live-icon${currentLive ? "" : " off"}`}>
                      LIVE
                    </span>
                  )}
                  <Typography fontSize={subHeadingFontSize}>
                    {webinar.topic}
                  </Typography>
                </Stack>
              }
              subheader={
                <Typography
                  fontSize={smallFontSize}
                  color="rgba(255, 255, 255, 0.68)"
                >
                  {`${dateToLocaleString(webinar.start_time, timezone)} - 
                  ${calculateDurationToString(
                    webinar.start_time,
                    webinar.duration,
                    timezone,
                  )}`}
                </Typography>
              }
              titleTypographyProps={{
                color: theme.palette.primary.contrastText,
                textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: theme.typography.h6.fontSize,
              }}
              subheaderTypographyProps={{
                color: theme.palette.primary.contrastTextAlpha,
              }}
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: "100%",
                height: "100%",
              }}
            />
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "52.5px",
              }}
              disableSpacing
            >
              <LoadingButton
                onClick={handleOpenWebLink}
                variant="outlined"
                sx={{ marginBottom: { mobile: "5px", desktop: "0" } }}
                startIcon={<LanguageIcon />}
                loading={openWebLinkLoading}
              >
                Join via Browser
              </LoadingButton>
              <LoadingButton
                onClick={handleOpenAppLink}
                variant="outlined"
                endIcon={<MeetingRoomIcon />}
                loading={openAppLinkLoading}
              >
                JOIN via Zoom App
              </LoadingButton>

              {isEditor && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "100%",
                    transform: "translateX(-100%)",
                  }}
                  onClick={handleRemove}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </CardActions>
          </Card>
          <CommonModal
            open={openRegisterModal}
            setOpen={setOpenRegisterModal}
            title="Webinar Registration"
            submitText="Register"
            onSubmit={webinarRegisterHandler}
            submitDisabled={!checkSubmittable()}
            loading={addRegistrantLoading}
          >
            <Stack
              flexWrap="wrap"
              sx={{
                flexDirection: {
                  mobile: "column",
                  laptop: "row",
                },
                ".field-wrap": {
                  width: {
                    mobile: "100%",
                    laptop: "48%",
                  },
                  mr: {
                    mobile: 0,
                    laptop: 2,
                  },
                  mb: 1,
                },
              }}
            >
              <TextField
                className="field-wrap"
                label="Email"
                required
                variant="filled"
                error={isEmail1Empty}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                {...email1}
              />
              <TextField
                className="field-wrap"
                label="Email Confirmation"
                required
                error={isEmail2Empty || !isEmailConfirmed}
                variant="filled"
                size="small"
                {...email2}
              />
              <TextField
                className="field-wrap"
                label="First Name"
                required
                error={isFirstNameEmpty}
                variant="filled"
                size="small"
                {...firstName}
              />
              {openRegisterModal &&
                Object.entries(questions).map((question: [string, any]) => {
                  const questionTitle = question[0];
                  const questionValue = question[1];
                  if (questionTitle === "country") {
                    return (
                      <div className="field-wrap">
                        <CountrySelect
                          required={questionValue.required}
                          question={question}
                          questions={questions}
                          setQuestions={setQuestions}
                        />
                      </div>
                    );
                  }
                  return (
                    <TextField
                      className="field-wrap"
                      key={questionTitle}
                      label={snakeToPrettyString(questionTitle)}
                      required={questionValue.required}
                      error={
                        questionValue.required &&
                        questions[questionTitle].value === ""
                      }
                      variant="filled"
                      size="small"
                      value={questions[questionTitle].value}
                      sx={{ width: "50%" }}
                      onChange={(
                        event: FormEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) => {
                        const {
                          currentTarget: { value },
                        } = event;
                        const questionsInputCpy = { ...questions };
                        questionsInputCpy[questionTitle].value = value;
                        setQuestions(questionsInputCpy);
                      }}
                    />
                  );
                })}
            </Stack>
          </CommonModal>
        </>
      )}
      {getRegistrantLinkLoading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={15} />
        </Box>
      )}
    </ZoomCardContainer>
  );
};

export default ZoomCard;
