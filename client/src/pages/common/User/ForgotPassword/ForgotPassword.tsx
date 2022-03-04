import React, { useState, useEffect } from "react";
import Title from "components/Title/Title";
import { TextField, Box, Fade } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import useInput from "hooks/useInput";
import Timer from "components/Timer/Timer";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { ForgotPasswordContainer } from "./ForgotPasswordStyles";

const ForgotPassword = () => {
  // 이메일 확인, 인증번호 발송 관련
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [sendHandlerLoading, setSendHandlerLoading] = useState<boolean>(false);

  // 인증번호 확인 관련
  const [correctCode, setCorrectCode] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  // const [confirmHandlerLoading, setConfirmHandlerLoading] =
  //   useState<boolean>(false);

  // 타이머 관련
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // alert 관련
  const [emailSentAlert, setEmailSentAlert] = useState<boolean>(false);
  const [emailNotExistAlert, setEmailNotExistAlert] = useState<boolean>(false);
  const [timerExpiredAlert, setTimerExpiredAlert] = useState<boolean>(false);
  const [codeCorrectAlert, setCodeCorrectAlert] = useState<boolean>(false);
  const [codeWrongAlert, setCodeWrongAlert] = useState<boolean>(false);

  const email = useInput("");
  const code = useInput("");
  const pathname = usePageViews();

  // 인증 이메일 보내기 버튼 handler
  const sendHandler = async () => {
    setIsExpired(false);
    setSendHandlerLoading(true);
    try {
      const res = await axios.post("/api/mail/vcode/send", {
        email: email.value,
        nation: pathname,
      });
      if (res.data.result) {
        // 인증번호 세팅
        setCorrectCode(res.data.code);
        setShowCodeInput(true);
        setEmailSentAlert(true);
        setIsTimerStarted(true);
      } else {
        // alert: 이메일이 존재하지 않아요
        setEmailNotExistAlert(true);
      }
    } catch (err) {
      alert(err);
    } finally {
      setSendHandlerLoading(false);
    }
  };

  // 인증번호 확인 버튼 handler
  const confirmHandler = () => {
    if (correctCode === code.value) {
      setIsEmailVerified(true);
      setCodeCorrectAlert(true);
      setIsExpired(true);
    } else {
      setIsEmailVerified(false);
      setCodeWrongAlert(true);
    }
  };

  // timer 만료 handler
  const timerExpiredHandler = () => {
    setCorrectCode("");
    setIsTimerStarted(false);
    if (!isEmailVerified) setTimerExpiredAlert(true);
  };

  // effect hook

  // email validation
  useEffect(() => {
    setEmailValidation(
      email.value.indexOf("@") !== -1 &&
        email.value.indexOf("@") < email.value.lastIndexOf("."),
    );
  }, [email.value]);
  // 타이머 만료 시 hook
  useEffect(() => {
    if (isExpired) {
      timerExpiredHandler();
    }
  }, [isExpired]);

  return (
    <ForgotPasswordContainer>
      <Fade in={!isEmailVerified}>
        <Box>
          <Title title="Forgot Your Password?" fontSize={22} />
          <Box className="email-section">
            <TextField
              autoFocus
              id="email"
              label="Email Address"
              variant="filled"
              size="small"
              disabled={isEmailVerified}
              fullWidth
              error={!emailValidation}
              sx={{
                mr: 2,
              }}
              {...email}
            />
            <LoadingButton
              disabled={!emailValidation || isEmailVerified}
              loading={sendHandlerLoading}
              variant="contained"
              color="info"
              onClick={sendHandler}
              size="small"
            >
              Send
            </LoadingButton>
          </Box>
          {showCodeInput && (
            <Box className="code-section">
              <TextField
                id="code"
                label="Verification Code"
                variant="filled"
                size="small"
                disabled={isEmailVerified}
                fullWidth
                sx={{
                  mr: 2,
                }}
                {...code}
              />
              <LoadingButton
                disabled={isExpired || isEmailVerified}
                variant="contained"
                color="info"
                onClick={confirmHandler}
                size="small"
              >
                Confirm
              </LoadingButton>
              {/* 타이머 */}
              {isTimerStarted && (
                <Timer second={180} setIsExpired={setIsExpired} />
              )}
              {/* {!isTimerStarted && <Box sx={{ width: "48px" }} />} */}
            </Box>
          )}
        </Box>
      </Fade>
      <TopCenterSnackBar
        value={emailSentAlert}
        setValue={setEmailSentAlert}
        variant="filled"
        severity="success"
        content="Verification code sent to your email."
      />
      <TopCenterSnackBar
        value={emailNotExistAlert}
        setValue={setEmailNotExistAlert}
        variant="filled"
        severity="warning"
        content="The email does not exist."
      />
      <TopCenterSnackBar
        value={timerExpiredAlert}
        setValue={setTimerExpiredAlert}
        variant="filled"
        severity="warning"
        content="Please resend verification email."
      />
      <TopCenterSnackBar
        value={codeCorrectAlert}
        setValue={setCodeCorrectAlert}
        variant="filled"
        severity="success"
        content="Email verified."
      />
      <TopCenterSnackBar
        value={codeWrongAlert}
        setValue={setCodeWrongAlert}
        variant="filled"
        severity="error"
        content="The code is wrong. Please check again."
      />
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
