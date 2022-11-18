import { LoadingButton } from "@mui/lab";
import { Divider, Stack, TextField, Typography, useTheme } from "@mui/material";
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

type PosterStageType = 0 | 1 | 2;

interface PosterFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Poster.posterType;
  edit: boolean;
  stage: PosterStageType;
  setStage: React.Dispatch<React.SetStateAction<PosterStageType>>;
  setApplyFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFailed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AbstractSubmissionType {
  abstract_title: string;
  afm_model: string;
  application: string;
  country: string;
  created_at: string;
  department: string;
  email: string;
  first_name: string;
  institution: string;
  pdf_file_path: string;
  last_name: string;
  phone: string;
  presentation_form: string;
  salutation: string;
  state: string;
}

const PosterForm = (posterformProps: PosterFormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    open,
    setOpen,
    selected,
    edit,
    stage,
    setStage,
    setApplyFailed,
    setDeleteFailed,
  } = posterformProps;

  const title = useInput(edit ? selected.title : "");
  const author = useInput(edit ? selected.author : "");
  const affiliation = useInput(edit ? selected.sub_title : "");

  // submission list
  const [submissionList, setSubmissionList] = useState<
    AbstractSubmissionType[]
  >([]);

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

  const nextHandler = async (currentSubmission?: AbstractSubmissionType) => {
    if (currentSubmission) {
      const {
        abstract_title,
        salutation,
        first_name,
        last_name,
        pdf_file_path,
        institution,
      } = currentSubmission;
      title.setValue(abstract_title);
      author.setValue(
        `${
          salutation !== "undefined" ? salutation : ""
        }${first_name} ${last_name}`,
      );
      affiliation.setValue(institution);
      if (pdf_file_path.indexOf(",upload") !== -1) {
        setFilePath(pdf_file_path.split(",upload")[0]);
      } else if (pdf_file_path === "undefined") {
        setFilePath("");
      } else {
        setFilePath(pdf_file_path);
      }
    }
    setStage(2);
  };
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

  const onCloseModal = () => {
    setStage(0);
  };

  const getAbstractSubmissions = async () => {
    const res = await axios("/api/abstract", { params: { nation: pathname } });
    setSubmissionList(res.data.result);
    if (res.data.result.length === 0 || edit) {
      setStage(2);
    } else {
      setStage(1);
    }
  };

  useEffect(() => {
    getAbstractSubmissions();
  }, []);

  const buttonStyle = {
    color: theme.palette.grey[600],
    padding: "5px 20px",
    transition: "color 0.2s ease-in-out",
    ":hover": {
      color: theme.palette.grey[800],
    },
    textAlign: "left",
  };

  return (
    <>
      {stage === 1 && (
        <CommonModal
          open={open}
          setOpen={setOpen}
          title="Add a Poster"
          onCloseCallback={onCloseModal}
        >
          <Stack alignItems="flex-start">
            {submissionList.map((s) => (
              <Box
                component="button"
                sx={buttonStyle}
                onClick={() => {
                  nextHandler(s);
                }}
              >
                {s.abstract_title} (
                {s.salutation !== "undefined" ? `${s.salutation} ` : ""}
                {s.first_name} {s.last_name})
              </Box>
            ))}
            <Box
              component="button"
              sx={buttonStyle}
              onClick={() => {
                nextHandler();
              }}
            >
              Add Poster from scratch..
            </Box>
          </Stack>
        </CommonModal>
      )}
      {stage === 2 && (
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
          onCloseCallback={onCloseModal}
          deleteHandler={edit && deleteHandler}
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
                label="Attachment URL"
                variant="filled"
                required
                fullWidth
                size="small"
                error={filePath === ""}
                sx={{ marginBottom: "15px" }}
                value={filePath}
                onChange={(
                  event: React.FormEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  const { currentTarget } = event;
                  setFilePath(currentTarget.value);
                }}
              />
              {/* <Typography component="a" href={filePath}>
                {filePath}
              </Typography> */}
            </Box>
          </Box>
        </CommonModal>
      )}
    </>
  );
};

export default PosterForm;
