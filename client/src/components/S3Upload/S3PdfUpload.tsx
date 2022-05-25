import React, { Dispatch, SetStateAction, useState } from "react";
import S3 from "aws-sdk/clients/s3";
import { Button, Fab, Stack, Typography, useTheme } from "@mui/material";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useLocation } from "react-router";
import usePageViews from "hooks/usePageViews";
import { S3_URL } from "utils/GlobalData";
import { Box } from "@mui/system";
import { smallFontSize } from "utils/FontSize";

interface S3PdfUploadProps {
  filePath: string;
  setFilePath: Dispatch<SetStateAction<string>>;
  // edit: boolean;
  // previewURL: string;
  // setPreviewURL: Dispatch<SetStateAction<string>>;
  setUploadLoading: Dispatch<SetStateAction<boolean>>;
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

const S3PdfUpload = ({
  filePath,
  setFilePath,
  setUploadLoading,
}: S3PdfUploadProps) => {
  const [progress, setProgress] = useState<number>(-1);
  const theme = useTheme();

  const [fileName, setFileName] = useState<string>("");

  const pathname = usePageViews();
  const location = useLocation();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (
      !(file.type === "application/msword" || file.type === "application/pdf")
    ) {
      alert(".doc, .pdf allowed only");
      return;
    }
    setProgress(0);
    // setUploadLoading(true);
    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    const sizeLimit = 15 * 1024 * 1024;
    if (file.size > sizeLimit) {
      alert("exceeded file size limit (15MB)");
    } else {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: `upload/${pathname}/${
          location.pathname.split("/").slice(-1)[0]
        }/${`${file.name.split(".")[0]}_${Date.now()}.${
          file.name.split(".")[1]
        }`}`,
      };
      setFileName(file.name);

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt, res) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
          setTimeout(() => {
            setUploadLoading(false);
          }, 3000);
        })
        .send((err, data) => {
          if (err) console.log(err);
          setFilePath(params.Key);
          // setPreviewURL(params.Key);
        });
    }
  };
  return (
    <label htmlFor="contained-button-file">
      <Stack
        sx={{
          flexDirection: {
            mobile: "column",
            tablet: "row",
          },
          margin: "0 0 8px 0",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
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
          {fileName === "" ? (
            <Typography
              fontSize={smallFontSize}
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              color={
                fileName !== ""
                  ? theme.palette.grey[700]
                  : theme.palette.grey.A400
              }
            >
              Click to upload file (.pdf,.doc) (Maximum size: 15MB)
            </Typography>
          ) : (
            <Typography
              component="a"
              target="_blank"
              href={`${S3_URL}/${filePath}`}
              fontSize={smallFontSize}
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "0 !important",
              }}
              color={
                fileName !== ""
                  ? theme.palette.grey[700]
                  : theme.palette.grey.A400
              }
            >
              {fileName}
            </Typography>
          )}
        </Box>
        <input
          style={{ display: "none" }}
          accept="application/pdf, application/msword"
          type="file"
          onChange={handleFileInput}
          id="contained-button-file"
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
  );
};

export default S3PdfUpload;
