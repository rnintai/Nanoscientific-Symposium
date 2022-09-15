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
  id: number;
}

interface QuestionType {
  value: string;
  required: boolean;
}

const InvalidZoomCard = ({ id }: ZoomCardProps) => {
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
  const [isWebinarRegistered, setIsWebinarRegistered] =
    useState<boolean>(false);
  // 유저 별 join link
  const [joinLink, setJoinLink] = useState<string>("");
  const [webJoinLink, setWebJoinLink] = useState<string>("");
  // loading
  const [getQuestionsLoading, setGetQuestionsLoading] =
    useState<boolean>(false);
  const [addRegistrantLoading, setAddRegistrantLoading] =
    useState<boolean>(false);
  const [getRegistrantLinkLoading, setGetRegistrantLinkLoading] =
    useState<boolean>(true);

  // 카드 삭제 handler
  const handleRemove = async () => {
    if (confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/zoom/webinar/${id}?nation=${pathname}`);
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ZoomCardContainer
      className={`invalid-zoom-card${!isEditor ? " hide" : ""}`}
    >
      <Card
        sx={{
          display: "flex",
          minHeight: "220px",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: "0.7",
        }}
        raised
      >
        <CardHeader
          avatar={
            <VideocamIcon
              sx={{
                color: theme.palette.whitescale.alpha50,
              }}
              fontSize="medium"
            />
          }
          title={`Invalid Webinar ID: ${id}`}
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
    </ZoomCardContainer>
  );
};

export default InvalidZoomCard;
