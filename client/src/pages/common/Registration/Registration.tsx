import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "components/NavBar/NavBar";
import { LoadingButton } from "@mui/lab";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { RegistrationContainer, MktoFormContainer } from "./RegistrationStyles";

interface RegistrationProps {
  formNo: string;
}

type TFN = 1 | 0 | -1;

const Registration = ({ formNo }: RegistrationProps) => {
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [submitBlock, setSubmitBlock] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<TFN>(-1);
  const navigate = useNavigate();

  const nation = usePageViews();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  // alert
  const [emailNotValidAlert, setEmailNotValidAlert] = useState<boolean>(false);

  // seo
  const { registration } = globalData.get(nation) as Common.globalDataType;
  useSeoTitle(registration as string, nation);

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...authState,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
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

        check1?.classList.add("flex-reverse");
        check2?.classList.add("flex-reverse");
        check2?.parentElement?.childNodes[0].remove();

        document
          .querySelector("#LblEmail")
          ?.parentElement?.appendChild(validationDiv);

        // validation & 중복체크
        document
          .querySelector("input#Email")
          ?.addEventListener("focusout", async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (
              target.value.indexOf("@") === -1 &&
              target.value.indexOf(".") === -1
            ) {
              setEmailValid(0);
            } else {
              try {
                const res = await axios.post("/api/users/checkemail", {
                  email: target.value,
                  nation,
                });
                setEmailValid(!res.data.result ? 1 : 0);
              } catch (err) {
                console.log(err);
              }
            }
          });
      },
    );
  }, []);

  useEffect(() => {
    if (document.querySelector(".validation-msg") !== null) {
      const validationDOM = document.querySelector(
        ".validation-msg",
      ) as HTMLParagraphElement;
      if (emailValid === 1) {
        validationDOM.classList.add("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Valid Email!";
      } else if (emailValid === 0) {
        validationDOM.classList.add("invalid");
        validationDOM.classList.remove("valid");
        validationDOM.innerText = "Invalid or duplicate email.";
      }
    }
  }, [emailValid]);

  const submitHandler = async () => {
    const formData =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()[0].getValues();
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
        state: formData.State,
        nation,
      });

      // marketo submit
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.allForms()[0]
        .submit()
        .onSuccess(() => {
          return false;
        });
      try {
        const res = await axios.post("/api/users/login", {
          nation,
          email: formData.Email,
          password: null,
        });
        if (res.data.success) {
          dispatchLogin(formData.Email, res.data.role, res.data.accessToken);
        }
        navigate(`/${nation}/user/reset-password`);
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
    <>
      {mktoLoading && <Loading />}
      <RegistrationContainer>
        <MktoFormContainer>
          <form id={`mktoForm_${formNo}`} />
          {!mktoLoading && (
            <LoadingButton
              variant="contained"
              className="mktoButton2"
              loading={submitBlock}
              onClick={() => {
                if (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  !window.MktoForms2.allForms()[0]?.validate()
                ) {
                  // 마케토 validator가 알려줌
                } else if (emailValid !== 1) {
                  setEmailNotValidAlert(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  submitHandler();
                }
              }}
            >
              SUBMIT
            </LoadingButton>
          )}
        </MktoFormContainer>
        <TopCenterSnackBar
          value={emailNotValidAlert}
          setValue={setEmailNotValidAlert}
          severity="warning"
          content="Email already exists or not valid."
          variant="filled"
        />
      </RegistrationContainer>
    </>
  );
};

export default Registration;
