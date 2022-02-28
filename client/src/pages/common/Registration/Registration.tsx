import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import { LoadingButton } from "@mui/lab";
import { RegistrationContainer } from "./RegistrationStyles";

interface RegistrationProps {
  formNo: string;
}

const Registration = ({ formNo }: RegistrationProps) => {
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [submitBlock, setSubmitBlock] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailValidationMsg, setEmailValidationMsg] = useState<string>("");
  const navigate = useNavigate();
  const nation = usePageViews();

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
        form.getFormElem()[0][14].remove();
        setMktoLoading(false);

        // validation & 중복체크
        document
          .querySelector("input#Email")
          ?.addEventListener("focusout", async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (
              target.value.indexOf("@") === -1 &&
              target.value.indexOf(".") === -1
            ) {
              setEmailValid(false);
              setEmailValidationMsg("");
            } else {
              try {
                const res = await axios.post("/api/users/checkemail", {
                  email: target.value,
                  nation,
                });
                setEmailValid(!res.data.result);
                setEmailValidationMsg(
                  res.data.result ? "Duplicated email." : "Valid Email !",
                );
              } catch (err) {
                console.log(err);
              }
            }
          });
      },
    );
  }, []);

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
        email: formData.Email,
        title: formData.Title,
        university: formData.Company,
        institute: formData.Department,
        street: formData.City,
        zipCode: formData.PostalCode,
        city: formData.State,
        researchField: formData.psResearchTopic,
        afmTool: formData.psExistingAFMBrand,
        lastName: formData.LastName,
        firstName: formData.FirstName,
        psOptIn: formData.psOptIn === "yes" ? 1 : 0,
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
        await axios.post("/api/users/login", {
          nation,
          email: formData.Email,
          password: null,
        });

        navigate("/user/reset-password");
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
        <Box
          className={
            emailValid ? "validation-msg valid" : "validation-msg invalid"
          }
        >
          &nbsp;{emailValidationMsg}
        </Box>
        <form id={`mktoForm_${formNo}`} />
        {!mktoLoading && (
          <LoadingButton
            variant="contained"
            className="mktoButton2"
            loading={submitBlock}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if (window.MktoForms2.allForms()[0]?.validate() && emailValid) {
                submitHandler();
              } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // window.MktoForms2.allForms()[0].getFormElem()[0][0].scrollIntoView({
                //   behavior: "smooth",
                // });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            SUBMIT
          </LoadingButton>
        )}
      </RegistrationContainer>
    </>
  );
};

export default Registration;
