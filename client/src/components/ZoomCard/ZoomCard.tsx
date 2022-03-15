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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";

// utils
import { dateToLocaleString, calculateDurationToString } from "utils/Date";

import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import { snakeToPrettyString } from "utils/String";
import { ZoomCardContainer } from "./ZoomCardStyles";
import { useAuthState } from "../../context/AuthContext";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
  timezone: string;
  isOnAir: boolean;
}

interface QuestionType {
  field_name: string;
  required: boolean;
}

const ZoomCard = ({ webinar, timezone, isOnAir }: ZoomCardProps) => {
  const authState = useAuthState();
  const theme = useTheme();

  // input
  const email1 = useInput(authState.email);
  const email2 = useInput("");
  const firstName = useInput("");

  // modal state
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  // questions state
  const [questions, setQuestions] = useState<any>();

  // loading
  const [getQuestionsLoading, setGetQuestionsLoading] =
    useState<boolean>(false);

  // 국가 구분 태그를 떼어내는 메서드
  const removeTagFromTopic = (topic: string) => {
    return topic.split("]")[1];
  };

  // 질문 받아오기 handler
  const getQuestionsHandler = () => {
    setGetQuestionsLoading(true);
    axios
      .get(`/api/zoom/webinar/registrant/questions/${webinar.id}`)
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
    console.log("asd");
  };

  return (
    <ZoomCardContainer>
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
          avatar={
            <PodcastsIcon
              sx={{
                color: isOnAir
                  ? theme.palette.primary.light
                  : theme.palette.whitescale.alpha50,
              }}
              fontSize="medium"
            />
          }
          title={removeTagFromTopic(webinar.topic)}
          subheader={`${dateToLocaleString(
            webinar.start_time,
            timezone,
          )} - ${calculateDurationToString(
            webinar.start_time,
            webinar.duration,
            timezone,
          )}`}
          titleTypographyProps={{
            color: theme.palette.primary.contrastText,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontSize: theme.typography.h6.fontSize,
          }}
          subheaderTypographyProps={{
            color: theme.palette.primary.contrastTextAlpha,
          }}
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: "100%",
          }}
        />
        {/* <span>link: {webinar.join_url}</span> */}
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent> */}
        <CardActions
          sx={{ display: "flex", justifyContent: "space-between" }}
          disableSpacing
        >
          <LoadingButton
            onClick={() => {
              getQuestionsHandler();
            }}
            variant="outlined"
            startIcon={<ContactPageRoundedIcon />}
            loading={getQuestionsLoading}
          >
            Register
          </LoadingButton>
          <Button
            onClick={() => {
              window.open(webinar.join_url, "_blank");
            }}
            variant="outlined"
            endIcon={<MeetingRoomIcon />}
          >
            JOIN
          </Button>
        </CardActions>
      </Card>
      <CommonModal
        open={openRegisterModal}
        setOpen={setOpenRegisterModal}
        title="Webinar Registration"
        submitText="Register"
        onSubmit={webinarRegisterHandler}
      >
        <TextField
          label="Email"
          required
          variant="filled"
          size="small"
          {...email1}
        />
        <TextField
          label="Email Confirmation"
          required
          variant="filled"
          size="small"
          {...email2}
        />
        <TextField
          label="First Name"
          required
          variant="filled"
          size="small"
          {...firstName}
        />
        {openRegisterModal &&
          Object.entries(questions).map((question: [string, any]) => {
            const questionTitle = question[0];
            const questionValue = question[1];
            return (
              <TextField
                key={questionTitle}
                label={snakeToPrettyString(questionTitle)}
                required={questionValue.required}
                variant="filled"
                size="small"
                value={questions[questionTitle].value}
                sx={{ width: "50%" }}
                onChange={(
                  event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      </CommonModal>
    </ZoomCardContainer>
  );
};

export default ZoomCard;
