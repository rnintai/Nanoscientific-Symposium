/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import S3 from "aws-sdk/clients/s3";
import { Button, Fab, TextField } from "@mui/material";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useLocation } from "react-router";
import usePageViews from "hooks/usePageViews";
import { S3_URL } from "utils/GlobalData";

interface S3UploadProps {
  setImagePath: Dispatch<SetStateAction<string>>;
  edit?: boolean;
  previewURL: string;
  setPreviewURL: Dispatch<SetStateAction<string>>;
  setUploadLoading: Dispatch<SetStateAction<boolean>>;
  uploadPath?: string;
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

const S3Upload = ({
  setImagePath,
  edit = false,
  previewURL = "",
  setPreviewURL,
  setUploadLoading,
  uploadPath,
}: S3UploadProps) => {
  const [progress, setProgress] = useState<number>(0);

  const pathname = usePageViews();
  const location = useLocation();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/webp"
      )
    ) {
      alert("only jpg allowed");
      return;
    }
    setProgress(0);
    setUploadLoading(true);
    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    const pathKey = uploadPath
      ? `upload/${pathname}/${uploadPath}/${`${
          file.name.split(".")[0]
        }_${Date.now()}.${file.name.split(".")[1]}`}`
      : `upload/${pathname}/${location.pathname.split("/").slice(-1)[0]}/${`${
          file.name.split(".")[0]
        }_${Date.now()}.${file.name.split(".")[1]}`}`;

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: pathKey,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt, res) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setTimeout(() => {
          console.log("완료");
          setUploadLoading(false);
        }, 3000);
      })
      .send((err, data) => {
        if (err) console.log(err);
        setImagePath(params.Key);
        setPreviewURL(params.Key);
      });
  };
  return (
    <div>
      <h2>Choose Image</h2>
      <label htmlFor="contained-button-file">
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          onChange={handleFileInput}
          id="contained-button-file"
        />
        <Fab component="span">
          <AddPhotoAlternateTwoToneIcon />
        </Fab>
        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {progress}%
        </span>
        {previewURL && (
          <img
            style={{ marginLeft: "10px", width: "100px", height: "100px" }}
            src={
              previewURL.indexOf("https://") !== -1
                ? previewURL
                : `${S3_URL}/${previewURL}`
            }
            alt="preview"
          />
        )}
      </label>
      <TextField
        margin="dense"
        label="Image URL"
        variant="filled"
        required
        fullWidth
        size="small"
        error={previewURL === ""}
        sx={{ marginBottom: "15px" }}
        value={previewURL}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          const { currentTarget } = event;
          setPreviewURL(currentTarget.value);
          setImagePath(currentTarget.value);
        }}
      />
    </div>
  );
};

export default S3Upload;
