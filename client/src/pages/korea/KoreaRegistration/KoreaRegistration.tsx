import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import { globalData } from "utils/GlobalData";
import { LoadingButton } from "@mui/lab";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import NSSButton from "components/Button/NSSButton";
import LandingSection from "components/Section/LandingSection";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { subHeadingFontSize, mainFontSize } from "utils/FontSize";
import MarketoForm from "components/MarketoForm/MarketoForm";
import useNSSType from "hooks/useNSSType";
import {
  RegistrationContainer,
  MktoFormContainer,
} from "../../common/Registration/RegistrationStyles";
import RegisterInfo from "../RegisterInfo/RegisterInfo";

interface RegistrationProps {
  formNo: string;
}

type TFN = 1 | 0 | -1;
type Stage = 1 | 2;

const KoreaRegistration = ({ formNo }: RegistrationProps) => {
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [submitBlock, setSubmitBlock] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<TFN>(-1);
  const [emailValidLoading, setEmailValidLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>(1);

  const nation = usePageViews();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  // alert
  const [emailNotValidAlert, setEmailNotValidAlert] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);

  useEffect(() => {
    // validation & 중복체크
    const handleChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (
        target.value.indexOf("@") === -1 ||
        target.value.lastIndexOf(".") <= target.value.indexOf("@")
      ) {
        setEmailValid(0);
      } else {
        try {
          setEmailValidLoading(true);
          const res = await axios.post("/api/users/checkemail", {
            email: target.value,
            nation,
          });
          setEmailValid(!res.data.result ? 1 : 0);
        } catch (err) {
          console.log(err);
        } finally {
          setEmailValidLoading(false);
        }
      }
    };

    // const script = document.createElement("script");
    // document.body.appendChild(script);
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      formNo,
      (form: any) => {
        document.querySelector(".mktoButton[type='submit']")?.remove();

        setMktoLoading(false);

        // validation 끼워넣기
        const validationDiv = document.createElement("div");
        validationDiv.className = "validation-msg";

        // 체크박스 layout 변경
        const check1 = document.querySelector("#LblpsmktOptin")?.parentElement;
        const check2 = document.querySelector("#LblpsOptin")?.parentElement;

        // check1?.classList.add("flex-reverse");
        // check2?.classList.add("flex-reverse");

        document
          .querySelector("#LblEmail")
          ?.parentElement?.appendChild(validationDiv);
        document
          .querySelector("input#Email")
          ?.removeEventListener("change", handleChange);
        document
          .querySelector("input#Email")
          ?.addEventListener("change", handleChange);
      },
    );
    return () => {
      document
        .querySelector("input#Email")
        ?.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (document.querySelector(".validation-msg") !== null) {
      const validationDOM = document.querySelector(
        ".validation-msg",
      ) as HTMLParagraphElement;
      if (emailValidLoading) {
        validationDOM.classList.remove("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Checking an email address...";
      } else if (emailValid === 1) {
        validationDOM.classList.add("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Valid Email!";
      } else if (emailValid === 0) {
        validationDOM.classList.add("invalid");
        validationDOM.classList.remove("valid");
        validationDOM.innerText = "Invalid or duplicate email.";
      }
    }
  }, [emailValid, emailValidLoading]);

  const pathname = usePageViews();
  const nssType = useNSSType();
  const { registration, logoURL } = globalData.get(
    nssType,
  ) as Common.globalDataType;
  const theme = useTheme();

  const submitHandler = async () => {
    const formData =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()[
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms().length - 1
      ].getValues();
    // setPasswordSetModalOpen(true);
    setSubmitBlock(true);
    try {
      // user db submit
      const regResponse = await axios.post("/api/users/register", {
        title: formData.Salutation,
        firstName: formData.FirstName,
        lastName: formData.LastName,
        email: formData.Email,
        phone: formData.Phone,
        institute: formData.Company,
        department: formData.Department,
        country: formData.Country,
        participationType: formData.psFamtParticipationType,
        issueBill: formData.psNSSKIssueBill,
        nation,
      });

      // marketo submit
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()
        [
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms().length - 1
        ].submit()
        .onSuccess(() => {
          return false;
        });
      await axios.post(`/api/zoom/webinar/registrant/fetch`, {
        email: formData.Email,
        nation: pathname,
      });
      try {
        setStage(2);
      } catch (err) {
        console.log(err);
        alert("login failed");
      }
    } catch (err) {
      console.log(err);
      alert("error: saving user data. Please try again.");
    } finally {
      setSubmitBlock(false);
    }
  };

  return (
    <RegistrationContainer>
      <LandingSection className="banner" maxWidth="1920px" fullWidth>
        <Stack justifyContent="center" alignItems="center" height="100%">
          <img className="banner-img" src={logoURL} alt="NSS Logo" />
        </Stack>
      </LandingSection>
      {stage === 1 && (
        <>
          {mktoLoading && <Loading />}
          <LandingSection className="layout">
            <MktoFormContainer>
              <MarketoForm formId={formNo} />
              {!mktoLoading && (
                <NSSButton
                  variant="gradient"
                  disabled={emailValid !== 1 || emailValidLoading}
                  className="mktoButton2"
                  loading={submitBlock}
                  fontWeight={theme.typography.fontWeightBold}
                  letterSpacing="1.2px"
                  onClick={() => {
                    if (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      !window.MktoForms2.allForms()[
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        window.MktoForms2.allForms().length - 1
                      ]?.validate()
                    ) {
                      // 마케토 validator가 알려줌
                      // console.log("not validated");
                    } else if (emailValid !== 1) {
                      setEmailNotValidAlert(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      submitHandler();
                    }
                  }}
                >
                  {registration || "Register"}
                </NSSButton>
              )}
            </MktoFormContainer>
          </LandingSection>

          <TopCenterSnackBar
            value={emailNotValidAlert}
            setValue={setEmailNotValidAlert}
            severity="warning"
            content="Email already exists or not valid."
            variant="filled"
          />
        </>
      )}
      {stage === 2 && (
        <Box className="layout body-fit" sx={{ textAlign: "center" }}>
          <Typography fontWeight={600} fontSize={subHeadingFontSize}>
            NanoScientific Symposium Korea에 등록해주셔서 감사합니다.
          </Typography>
          <br />
          <Typography>
            등록해주신 이메일로 심포지엄 등록 확인 메일이 발송됩니다. <br />
            추가 문의 사항이 있으시면 아래 메일 주소로 보내주시기 바랍니다.{" "}
          </Typography>
          <br />
          <Typography fontSize={mainFontSize}>
            이연수 과장:{" "}
            <a href="mailto:raina@parksystems.com" className="link-default">
              raina@parksystems.com
            </a>
          </Typography>
        </Box>
      )}
    </RegistrationContainer>
  );
};

export default KoreaRegistration;
