import { LoadingButton } from "@mui/lab";
import { Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import S3PdfUpload from "components/S3Upload/S3PdfUpload";
import S3Upload from "components/S3Upload/S3Upload";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { headingFontSize } from "utils/FontSize";
import { S3_URL } from "utils/GlobalData";

interface PosterFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Poster.posterType;
  edit: boolean;
  setApplyFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFailed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PosterForm = (posterformProps: PosterFormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();
  const { open, setOpen, selected, edit, setApplyFailed, setDeleteFailed } =
    posterformProps;

  const title = useInput(edit ? selected.title : "");
  const author = useInput(edit ? selected.author : "");
  const affiliation = useInput(edit ? selected.sub_title : "");

  // PDF
  const [filePath, setFilePath] = useState<string>(
    edit ? selected.attachment : "",
  );
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [imagePath, setImagePath] = useState<string>(
    edit ? selected.image : "",
  );
  const [previewURL, setPreviewURL] = useState<string>(
    edit ? selected.image : "",
  );
  const [uploadImageLoading, setUploadImageLoading] = useState<boolean>(false);
  const [uploadPdfLoading, setUploadPdfLoading] = useState<boolean>(false);

  const submitHandler = async () => {
    const payload = edit
      ? {
          nation: pathname,
          id: selected.id,
          title: title.value,
          affiliation: affiliation.value,
          author: author.value,
          previewURL,
          filePath,
        }
      : {
          nation: pathname,
          title: title.value,
          affiliation: affiliation.value,
          author: author.value,
          previewURL,
          filePath,
        };
    try {
      setUploadLoading(true);
      const res = await axios.post(`/api/page/common/poster`, payload);
      setOpen(false);
      navigate(0);
    } catch (err) {
      console.log(err);
      setApplyFailed(true);
    } finally {
      setUploadLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/page/common/poster`, {
        params: {
          nation: pathname,
          id: selected.id,
        },
      });
      setOpen(false);
      navigate(0);
    } catch (error) {
      console.log(error);
      setDeleteFailed(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title={edit ? "Edit a Poster" : "Add a Poster"}
      onSubmit={submitHandler}
      submitDisabled={
        title.value === "" ||
        affiliation.value === "" ||
        author.value === "" ||
        previewURL === "" ||
        filePath === ""
      }
    >
      <TextField
        margin="dense"
        label="Title"
        fullWidth
        variant="filled"
        required
        size="small"
        error={title.value === ""}
        sx={{ marginBottom: "15px" }}
        {...title}
      />
      <Box>
        <TextField
          margin="dense"
          label="Affiliation"
          variant="filled"
          required
          size="small"
          error={affiliation.value === ""}
          sx={{ mr: 3, marginBottom: "15px" }}
          {...affiliation}
        />
        <TextField
          margin="dense"
          label="Author"
          variant="filled"
          required
          size="small"
          error={author.value === ""}
          sx={{ marginBottom: "15px" }}
          {...author}
        />
        <Divider />
        <S3Upload
          setImagePath={setImagePath}
          previewURL={previewURL}
          setPreviewURL={setPreviewURL}
          setUploadLoading={setUploadImageLoading}
        />
        <Box sx={{ mt: 3 }}>
          <Typography fontSize="24px" fontWeight={700} sx={{ mb: 2 }}>
            Upload a file*
          </Typography>
          <S3PdfUpload
            align="flex-start"
            filePath={filePath}
            setFilePath={setFilePath}
            setUploadLoading={setUploadLoading}
          />
          <TextField
            margin="dense"
            label="Image URL"
            variant="filled"
            required
            fullWidth
            size="small"
            error={filePath === ""}
            sx={{ marginBottom: "15px" }}
            value={filePath}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              const { currentTarget } = event;
              setFilePath(currentTarget.value);
            }}
          />
          {/* <Typography component="a" href={filePath}>
            {filePath}
          </Typography> */}
          {edit && (
            <LoadingButton
              loading={deleteLoading}
              variant="contained"
              color="error"
              onClick={deleteHandler}
              style={{
                position: "absolute",
                right: "22px",
                top: "12px",
              }}
            >
              Delete
            </LoadingButton>
          )}
        </Box>
      </Box>
    </CommonModal>
  );
};

export default PosterForm;
