/* eslint-disable react/require-default-props */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import useNSSType from "hooks/useNSSType";
import S3 from "aws-sdk/clients/s3";
import { Button, Fab, Stack, Typography, useTheme } from "@mui/material";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useLocation } from "react-router";
import usePageViews from "hooks/usePageViews";
import { globalData, S3_URL } from "utils/GlobalData";
import { Box } from "@mui/system";
import { smallFontSize } from "utils/FontSize";
import useCurrentYear from "hooks/useCurrentYear";
import NSSButton from "components/Button/NSSButton";
import axios from "axios";
import useConfigStore from "store/ConfigStore";
import { cloneDeep } from "lodash";

interface S3PdfUploadProps {
  uploadLoading: boolean;
  setUploadLoading: Dispatch<SetStateAction<boolean>>;
  setSubmitSuccess: Dispatch<SetStateAction<boolean>>;
  align?: "flex-start" | "center" | "flex-end";
  required?: boolean;
}

interface FilePathType {
  name: string;
  path: string;
}

const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
const REGION = "us-west-1";
const S3_BUCKET = "nss-integration";

export const myBucket = new S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const S3MultiplePdfUpload = ({
  uploadLoading,
  setUploadLoading,
  setSubmitSuccess,
  align = "center",
  required = false,
}: S3PdfUploadProps) => {
  const [progress, setProgress] = useState<number>(-1);
  const theme = useTheme();
  const nssType = useNSSType();
  const currentYear = useCurrentYear();

  const configStore = useConfigStore();
  const { configState } = configStore;

  const pathname = usePageViews();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<File[]>([]);
  const [filePathList, setFilePathList] = useState<FilePathType[]>([]);

  const { submitBtnText, pdfUploadDescription, uploadBtnText } =
    globalData.get(nssType);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const fileListCpy = cloneDeep(fileList);
    const filePathListCpy = cloneDeep(filePathList);
    for (let i = 0; i < event.target.files.length; i += 1) {
      const file = event.target.files[i];
      fileListCpy.push(file);
      filePathListCpy.push({
        name: file.name,
        path: `upload/${pathname}/${
          location.pathname.split("/").slice(-1)[0]
        }/${`${file.name.split(".")[0]}_${Date.now()}.${
          file.name.split(".")[1]
        }`}`,
      });
      if (
        !(
          file.type === "application/msword" ||
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/vnd.ms-powerpoint" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
      ) {
        alert(".docx, .pdf, .pptx allowed only");
      }
    }
    setFileList(fileListCpy);
    setFilePathList(filePathListCpy);
  };

  const handlefileDelete = (targetName: string) => {
    let fileListCpy = fileList;
    fileListCpy = fileListCpy.filter((f) => f.name !== targetName);
    let filePathListCpy = JSON.parse(JSON.stringify(filePathList));
    filePathListCpy = filePathListCpy.filter((f) => f.name !== targetName);
    setFileList(fileListCpy);
    setFilePathList(filePathListCpy);
  };

  const submitHandler = async () => {
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
    } else {
      fileList.forEach(async (f, i) => {
        await uploadFile(f, filePathList[i].path);
      });

      setSubmitLoading(true);
      const mktoForm =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MktoForms2.allForms()[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.MktoForms2.allForms().length - 1
        ];
      const formData = mktoForm.getValues();
      const {
        psAbstractTitle,
        Salutation,
        FirstName,
        LastName,
        Company,
        Department,
        Email,
        Phone,
        Country,
        State,
        psApplications,
        psExistingAFMBrand,
        psPresentationForm,
      } = formData;
      // 제출
      mktoForm.submit().onSuccess(() => {
        return false;
      });
      try {
        // DB에 저장
        const res = await axios.post("/api/abstract", {
          nation: pathname,
          abstract_title: psAbstractTitle,
          salutation: Salutation,
          first_name: FirstName,
          last_name: LastName,
          institution: Company,
          department: Department,
          email: Email,
          phone: Phone,
          country: Country,
          state: State,
          application: psApplications,
          afm_model: psExistingAFMBrand,
          presentation_form: psPresentationForm,
          pdf_file_path: filePathList.map((f) => f.path).join(","),
          year: currentYear,
        });

        // 메일 전송
        const payload = {
          email: configState.alert_receive_email,
          attachments: filePathList,
          nation: pathname,
          formData,
          year: currentYear,
          isFailed: false,
        };
        const res2 = await axios.post("/api/mail/abstract", payload);
        if (!res2.data.success) {
          payload.isFailed = true;
          await axios.post("/api/mail/abstract", payload);
        }
        setSubmitSuccess(true);
      } catch (err) {
        alert(err);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const uploadFile = async (file: File, filePath: string) => {
    setProgress(0);
    setUploadLoading(true);

    const sizeLimit = 15 * 1024 * 1024;
    if (file.size > sizeLimit) {
      alert("exceeded file size limit (15MB)");
    } else {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: filePath,
      };

      const putObjectWrapper = (params) => {
        return new Promise((resolve, reject) => {
          myBucket
            .putObject(params)
            .on("httpUploadProgress", (evt, res) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send((err, data) => {
              if (err) reject(err);
              if (data) resolve(data);
            });
        });
      };

      try {
        await putObjectWrapper(params);
      } catch (error) {
        alert("upload file error");
      }
    }
  };

  return (
    <>
      <label htmlFor="contained-button-file">
        <Stack
          sx={{
            flexDirection: {
              mobile: "column",
              tablet: "row",
            },
            margin: "0 0 8px 0",
          }}
          justifyContent={align}
          alignItems="center"
        >
          {required && (
            <Typography color="red" mr={1}>
              *
            </Typography>
          )}

          <Stack
            flexDirection="row"
            sx={{
              border: `1px solid ${theme.palette.grey.A200}`,
              padding: "5px 15px",
              borderRadius: "4px",
              width: {
                mobile: "100%",
                tablet: "400px",
              },
              margin: {
                mobile: "0 0 8px 0",
                tablet: "0 8px 0 0",
              },
            }}
          >
            <Typography
              fontSize={smallFontSize}
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
              }}
              color={theme.palette.grey.A400}
            >
              {pdfUploadDescription}
            </Typography>
          </Stack>
          <input
            style={{ display: "none" }}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            type="file"
            onChange={handleFileInput}
            multiple
            id="contained-button-file"
            ref={inputRef}
          />
          <Box
            className="upload-btn"
            sx={{
              cursor: "pointer",
              border: `1px solid #21ade57a`,
              color: "#21ade5",
              borderRadius: "4px",
              padding: "5px 10px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: "#21ade5",
                backgroundColor: "rgba(33, 173, 229, 0.04)",
              },
            }}
          >
            <Typography fontSize={smallFontSize}>
              {progress === -1 || progress === 100
                ? uploadBtnText
                : `${progress}%`}
            </Typography>
          </Box>
        </Stack>
      </label>
      <Stack sx={{ textAlign: "center" }} mb={3}>
        {fileList.map((p) => (
          <Stack flexDirection="row" key={p.name}>
            <Typography
              fontSize={smallFontSize}
              color={theme.palette.grey.A700}
              mr={2}
            >
              {p.name}
            </Typography>
            <button
              type="button"
              onClick={() => {
                handlefileDelete(p.name);
              }}
            >
              &times;
            </button>
          </Stack>
        ))}
      </Stack>
      <NSSButton
        variant="gradient"
        className="registration-btn"
        onClick={submitHandler}
        disabled={uploadLoading || (required && fileList.length === 0)}
        loading={submitLoading}
      >
        {submitBtnText}
      </NSSButton>
    </>
  );
};

export default S3MultiplePdfUpload;
