import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FormEvent,
} from "react";
import CommonModal from "components/CommonModal/CommonModal";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import {
  Rating,
  Select,
  MenuItem,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import useSelect from "hooks/useSelect";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { useAuthState } from "context/AuthContext";
import { adminRole, editorOnly } from "utils/Roles";
import useInput from "hooks/useInput";
import S3Upload from "components/S3Upload/S3Upload";
import QuillEditor from "components/QuillEditor/QuillEditor";
import { escapeQuotes } from "utils/String";

interface OnDemandFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
  selected: Common.onDemandVideoType;
  getList: () => void;
}

const OnDemandFormContainer = styled.div`
  li {
    margin: 5px 0;
    list-style: none;
    display: flex;
    align-items: center;

    h3 {
      display: inline;
      margin-bottom: 0px;
    }

    & > span {
      margin-left: 10px;
    }
  }
`;

const OnDemandForm = ({
  open,
  setOpen,
  edit,
  selected,
  getList,
}: OnDemandFormProps) => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const isAdmin = adminRole.includes(authState.role);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccessAlert, setSubmitSuccessAlert] = useState<boolean>(false);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [thumbnail, setThumbnail] = useState<string>(
    edit ? selected.thumbnail : "",
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    edit ? selected.thumbnail : "",
  );

  const title = useInput(edit ? selected.title : "");
  const speaker = useInput(edit ? selected.speaker : "");
  const affiliation = useInput(edit ? selected.affiliation : "");
  const region = useSelect(edit ? selected.region : "");
  const year = useInput(edit ? selected.year : "");
  const language = useInput(edit ? selected.language : "");
  const video = useInput(edit ? selected.video : "");
  const application = useSelect(edit ? selected.application : "");
  const [abstractDesc, setAbstractDesc] = useState<string>(
    edit ? selected.abstract_desc : "",
  );

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.post("/api/ondemand", {
        id: edit ? selected.id : undefined,
        title: title.value,
        speaker: speaker.value,
        affiliation: affiliation.value,
        abstractDesc: escapeQuotes(abstractDesc),
        region: region.value,
        year: year.value,
        application: application.value,
        language: language.value,
        thumbnail,
        video: video.value,
      });
      getList();
      setSubmitSuccessAlert(true);
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete("/api/ondemand", {
        params: { id: selected.id },
      });
      getList();
      setSubmitSuccessAlert(true);
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title="On Demand Video"
      loading={submitLoading || uploadLoading}
      onSubmit={handleSubmit}
      hideSaveButton={!isAdmin}
      deleteHandler={edit && handleDelete}
    >
      <TextField
        margin="dense"
        label="Topic"
        fullWidth
        variant="filled"
        required
        size="small"
        sx={{ marginBottom: "15px" }}
        {...title}
      />
      <Stack direction="row" justifyContent="space-between">
        <TextField
          margin="dense"
          label="Speaker"
          variant="filled"
          required
          size="small"
          sx={{ width: "48%", marginBottom: "15px" }}
          {...speaker}
        />
        <TextField
          margin="dense"
          label="Affiliation"
          variant="filled"
          size="small"
          sx={{ width: "48%", marginBottom: "15px" }}
          {...affiliation}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <TextField
          margin="dense"
          label="Year"
          fullWidth
          variant="filled"
          required
          size="small"
          sx={{ width: "48%", marginBottom: "15px" }}
          {...year}
        />

        <FormControl variant="filled" sx={{ width: "48%" }}>
          <InputLabel>Region</InputLabel>
          <Select label="Region" placeholder="Please Select" {...region}>
            <MenuItem value="China">China</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
            <MenuItem value="Korea">Korea</MenuItem>
            <MenuItem value="SE Asia">SE Asia</MenuItem>
            <MenuItem value="United States">United States</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <TextField
          margin="dense"
          label="Language"
          fullWidth
          variant="filled"
          required
          size="small"
          sx={{ width: "48%", marginBottom: "15px" }}
          {...language}
        />
        <TextField
          margin="dense"
          label="Video"
          fullWidth
          variant="filled"
          required
          size="small"
          sx={{ width: "48%", marginBottom: "15px" }}
          {...video}
        />
      </Stack>
      <FormControl variant="filled" sx={{ width: "48%" }}>
        <InputLabel>Application</InputLabel>
        <Select
          label="Application"
          placeholder="Please Select"
          {...application}
        >
          <MenuItem value="Semiconductor">Semiconductor</MenuItem>
          <MenuItem value="Metrology">Metrology</MenuItem>
          <MenuItem value="Electro magnetic">Electro magnetic</MenuItem>
          <MenuItem value="Nano mechanical">Nano mechanical</MenuItem>
          <MenuItem value="Electrochemistry">Electrochemistry</MenuItem>
          <MenuItem value="Photonics">Photonics</MenuItem>
          <MenuItem value="Life science">Life science</MenuItem>
          <MenuItem value="Lithography">Lithography</MenuItem>
        </Select>
      </FormControl>

      <S3Upload
        setImagePath={setThumbnail}
        edit={edit}
        previewURL={thumbnailPreview}
        setPreviewURL={setThumbnailPreview}
        setUploadLoading={setUploadLoading}
      />
      {/* abstract form */}
      <Typography fontWeight={600}>Abstract description:</Typography>
      <QuillEditor value={abstractDesc} setValue={setAbstractDesc} />
      {/* abstract form end */}
      <TopCenterSnackBar
        value={submitSuccessAlert}
        setValue={setSubmitSuccessAlert}
        variant="filled"
        severity="success"
        content="Successfully Saved."
      />
    </CommonModal>
  );
};

export default OnDemandForm;
