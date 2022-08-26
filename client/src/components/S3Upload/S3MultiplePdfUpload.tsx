import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import S3 from "aws-sdk/clients/s3";
import { Button, Fab, Stack, Typography, useTheme } from "@mui/material";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useLocation } from "react-router";
import usePageViews from "hooks/usePageViews";
import { S3_URL } from "utils/GlobalData";
import { Box } from "@mui/system";
import { smallFontSize } from "utils/FontSize";
import NSSButton from "components/Button/NSSButton";
import axios from "axios";
import useConfigStore from "store/ConfigStore";

interface S3PdfUploadProps {
  // edit: boolean;
  // previewURL: string;
  // setPreviewURL: Dispatch<SetStateAction<string>>;
  uploadLoading: boolean;
  setUploadLoading: Dispatch<SetStateAction<boolean>>;
  setSubmitSuccess: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  align?: "flex-start" | "center" | "flex-end";
}

interface fileType {
  lastModified: number;
  // lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  blob: string;
  filePath: string;
  fileName: string;
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
}: S3PdfUploadProps) => {
  const [progress, setProgress] = useState<number>(-1);
  const theme = useTheme();

  const configStore = useConfigStore();
  const { configState } = configStore;

  const pathname = usePageViews();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<fileType[]>([]);
  // const [filePath, setFilePath] = useState<string[]>([]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const fileListCpy = JSON.parse(JSON.stringify(fileList));
    const { lastModified, name, webkitRelativePath } = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const filePath = `upload/${pathname}/${
        location.pathname.split("/").slice(-1)[0]
      }/${`${name.split(".")[0]}_${Date.now()}.${name.split(".")[1]}`}`;
      fileListCpy.push({
        lastModified,
        name,
        blob: e.target.result,
        webkitRelativePath,
        filePath,
        fileName: filePath.split("/")[filePath.split("/").length - 1],
      });
      setFileList(fileListCpy);
    };
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
    // const filePathCpy = JSON.parse(JSON.stringify(filePath));
    // filePathCpy.push(file.name);
    // setFilePath(filePathCpy);
    // inputRef.current.value = "";
    // uploadFile(file);
  };

  const handlefileDelete = (targetName: string) => {
    let fileListCpy = JSON.parse(JSON.stringify(fileList));
    console.log(fileListCpy);

    fileListCpy = fileListCpy.filter((f) => f.name !== targetName);

    setFileList(fileListCpy);
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
      console.log("not validated");
    } else {
      fileList.forEach((f) => {
        uploadFile(f);
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
          pdf_file_path: fileList.map((f) => f.filePath).join(","),
        });

        const attachments = fileList.map((f) => {
          return { filename: f.fileName, path: f.filePath };
        });

        // 메일 전송
        const res2 = await axios.post("/api/mail/abstract", {
          email: configState.alert_receive_email,
          attachments,
          nation: pathname,
          formData,
        });

        setSubmitSuccess(true);
      } catch (err) {
        alert(err);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const uploadFile = (file: fileType) => {
    setProgress(0);
    setUploadLoading(true);

    const sizeLimit = 15 * 1024 * 1024;
    if (file.size > sizeLimit) {
      alert("exceeded file size limit (15MB)");
    } else {
      const params = {
        ACL: "public-read",
        Body: file.blob,
        Bucket: S3_BUCKET,
        Key: file.filePath,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt, res) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
          // setTimeout(() => {
          //   setUploadLoading(false);
          // }, 3000);
        })
        .send((err, data) => {
          if (err) console.log(err);

          // const filePathArr = JSON.parse(JSON.stringify(filePath));
          // filePathArr.push(`${newPath}`);
          // setFilePath(filePathArr);
        });
    }
  };

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);
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
                whiteSpace: "nowrap",
              }}
              color={theme.palette.grey.A400}
            >
              Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)
            </Typography>
          </Stack>
          <input
            style={{ display: "none" }}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            type="file"
            onChange={handleFileInput}
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
                ? "Upload File"
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
        disabled={uploadLoading}
        loading={submitLoading}
      >
        Submit
      </NSSButton>
    </>
  );
};

export default S3MultiplePdfUpload;
