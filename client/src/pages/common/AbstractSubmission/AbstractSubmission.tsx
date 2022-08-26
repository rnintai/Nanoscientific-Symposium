/* eslint-disable no-restricted-globals */
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import NSSButton from "components/Button/NSSButton";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import Loading from "components/Loading/Loading";
import S3MultiplePdfUpload from "components/S3Upload/S3MultiplePdfUpload";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useConfigStore from "store/ConfigStore";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import { escapeQuotes } from "utils/String";
import { AbstractSubmissionContainer } from "./AbstractSubmissionStyles";

interface abstractProps {
  formNo: string;
}

const AbstractSubmission = ({ formNo }: abstractProps) => {
  const theme = useTheme();
  const pathname = usePageViews();
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);

  // s3
  // const [filePath, setFilePath] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  // const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [mktoLoaded, setMktoLoaded] = useState<boolean>(false);

  //
  const [description, setDescription] = useState<string>("");
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [descriptionEdit, setDescriptionEdit] = useState<boolean>(false);
  const [descriptionPreview, setDescriptionPreview] = useState<boolean>(false);
  const [descriptionPreviewContent, setDescriptionPreviewContent] =
    useState<string>("");
  //

  const configStore = useConfigStore();
  const { configState } = configStore;

  const navigate = useNavigate();

  // const submitHandler = async () => {
  //   setSubmitLoading(true);
  //   const mktoForm =
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     window.MktoForms2.allForms()[
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       window.MktoForms2.allForms().length - 1
  //     ];
  //   const formData = mktoForm.getValues();
  //   const {
  //     psAbstractTitle,
  //     Salutation,
  //     FirstName,
  //     LastName,
  //     Company,
  //     Department,
  //     Email,
  //     Phone,
  //     Country,
  //     State,
  //     psApplications,
  //     psExistingAFMBrand,
  //     psPresentationForm,
  //   } = formData;
  //   // 제출
  //   mktoForm.submit().onSuccess(() => {
  //     return false;
  //   });
  //   try {
  //     // DB에 저장
  //     const res = await axios.post("/api/abstract", {
  //       nation: pathname,
  //       abstract_title: psAbstractTitle,
  //       salutation: Salutation,
  //       first_name: FirstName,
  //       last_name: LastName,
  //       institution: Company,
  //       department: Department,
  //       email: Email,
  //       phone: Phone,
  //       country: Country,
  //       state: State,
  //       application: psApplications,
  //       afm_model: psExistingAFMBrand,
  //       presentation_form: psPresentationForm,
  //       pdf_file_path: filePath.join(","),
  //     });

  //     // 메일 전송
  //     const res2 = await axios.post("/api/mail/abstract", {
  //       email: configState.alert_receive_email,
  //       attachments: filePath,
  //       nation: pathname,
  //       formData,
  //     });

  //     setSubmitSuccess(true);
  //   } catch (err) {
  //     alert(err);
  //   } finally {
  //     setSubmitLoading(false);
  //   }
  // };

  // description 가져오기
  const getDescription = async () => {
    const res = await axios.get("/api/page/common/abstract", {
      params: {
        nation: pathname,
      },
    });
    const { desc } = res.data.result[0];
    setDescription(desc);
    setInitialDescription(desc);
  };

  const applyDescription = async () => {
    // eslint-disable-next-line no-alert
    if (confirm("Are you sure?")) {
      const result = await axios.post(`/api/page/common/abstract`, {
        nation: pathname,
        desc: escapeQuotes(description),
      });
      setInitialDescription(description);
      setDescriptionEdit(false);
    }
  };
  useEffect(() => {
    getDescription();
  }, []);

  // 마케토폼 2개 렌더링 될 시 refresh
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelectorAll("#LblpsOptin").length > 2) {
        navigate(0);
      }
    }, 1000);
  }, [mktoLoading]);

  useEffect(() => {
    if (
      document.querySelector(".mktoForm").childElementCount === 0 &&
      !mktoLoaded
    ) {
      setMktoLoading(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MktoForms2.loadForm(
        "//pages.parksystems.com",
        "988-FTP-549",
        formNo,
        (form: any) => {
          setMktoLoading(false);
          // 체크박스 layout 변경
          const check1 =
            document.querySelector("#LblpsmktOptin")?.parentElement;
          const check2 = document.querySelector("#LblpsOptin")?.parentElement;
          check1?.classList.add("flex-reverse");
          check2?.classList.add("flex-reverse");

          // Register button 제거
          const registerBtn = document.querySelector(".mktoButtonRow");
          registerBtn.remove();
        },
      );
    }
  }, [mktoLoaded]);

  return (
    <AbstractSubmissionContainer className="body-fit">
      <Box className="layout">
        <Box sx={{ textAlign: "center" }}>
          <LandingTextEditor
            initialValue={initialDescription}
            value={description}
            setValue={setDescription}
            edit={descriptionEdit}
            setEdit={setDescriptionEdit}
            preview={descriptionPreview}
            setPreview={setDescriptionPreview}
            previewContent={descriptionPreviewContent}
            setPreviewContent={setDescriptionPreviewContent}
            applyHandler={applyDescription}
          >
            {initialDescription || ""}
          </LandingTextEditor>
        </Box>
        {mktoLoading && (
          <Box
            sx={{
              width: "100%",
              margin: "25% 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!submitSuccess && (
          <form id={`mktoForm_${formNo}`} className="mktoForm" />
        )}
        {!mktoLoading && !submitSuccess && (
          <Stack justifyContent="center" alignItems="center">
            <S3MultiplePdfUpload
              uploadLoading={uploadLoading}
              setUploadLoading={setUploadLoading}
              setSubmitSuccess={setSubmitSuccess}
            />
            {/* <NSSButton
              variant="gradient"
              className="registration-btn"
              onClick={submitHandler}
              disabled={uploadLoading}
              loading={submitLoading}
            >
              Submit
            </NSSButton> */}
          </Stack>
        )}
        {submitSuccess && (
          <Typography
            textAlign="center"
            sx={{ margin: "100px 0" }}
            fontWeight={600}
          >
            Thanks for your submission.
          </Typography>
        )}
      </Box>
    </AbstractSubmissionContainer>
  );
};

export default AbstractSubmission;
