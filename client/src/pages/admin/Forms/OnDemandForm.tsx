/* eslint-disable no-alert */
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import CommonModal from "components/CommonModal/CommonModal";
import styled from "styled-components";
import {
  Select,
  MenuItem,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  ListSubheader,
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
import NSSButton from "components/Button/NSSButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface OnDemandFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
  selected: Common.onDemandVideoType;
  getList: () => void;
}

// const applicationList = [
//   "Semiconductor",
//   "Metrology",
//   "Electromagnetic",
//   "Nanomechanical",
//   "Electrochemistry",
//   "Photonics",
//   "Lifescience",
//   "Lithography",
// ];

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
  const applicationInput = useRef<any>(null);

  const [applicationList, setApplicationList] = useState([]);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccessAlert, setSubmitSuccessAlert] = useState<boolean>(false);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [openEditApplication, setOpenEditApplication] =
    useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
  const [application, setApplication] = useState<string[]>(
    edit && selected.application ? selected.application : [],
  );
  const [abstractDesc, setAbstractDesc] = useState<string>(
    edit ? selected.abstract_desc : "",
  );

  const [selectedApplication, setSelectedApplication] = useState("");
  const [AddApplication, setAddApplication] = useState("");

  useEffect(() => {
    getApplicationList();
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.post("/api/ondemand", {
        id: edit ? selected.id : undefined,
        title: title.value,
        speaker: speaker.value,
        affiliation: affiliation.value,
        abstractDesc: abstractDesc ? escapeQuotes(abstractDesc) : null,
        region: region.value,
        year: year.value,
        application,
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

  const getApplicationList = async () => {
    try {
      const res = await axios.get("/api/ondemand/application/list");
      setApplicationList(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApplicationList = async () => {
    try {
      alert(`[${selectedApplication}] deleted`);
      await axios.delete("/api/ondemand/application/list", {
        params: { id: selectedIndex },
      });
      getApplicationList();
    } catch (error) {
      console.log(error);
    }
  };

  const CloseAppModal = async () => {
    setOpenEditApplication(false);
  };

  const editApplicationHandler = () => {
    setOpenEditApplication(true);
  };

  const PostApplication = async () => {
    if (
      applicationList.findIndex((el) => el.application === AddApplication) ===
      -1
    ) {
      try {
        alert(`[${AddApplication}] added`);
        await axios.post("/api/ondemand/application/list", {
          application: `"${AddApplication}"`,
        });
        getApplicationList();
        applicationInput.current.value = "";
        setAddApplication("");
      } catch (error) {
        console.log(error);
      }
    } else
      alert(
        `[${AddApplication}] already exists. \nplease enter another application name!`,
      );
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    application: string,
  ) => {
    if (selectedIndex !== id) {
      setSelectedIndex(id);
      setSelectedApplication(application);
    } else {
      setSelectedIndex(-1);
      setSelectedApplication("");
    }
  };

  // const AppCompononetHandler = (isAppEdit: boolean, t: string) => {
  //   if (isAppEdit) {
  //     <TextField
  //       margin="dense"
  //       fullWidth
  //       variant="filled"
  //       required
  //       size="small"
  //       sx={{ width: "48%", marginBottom: "15px" }}
  //       defaultValue={t}
  //     />;

  //   } else {

  //   }

  // };

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
      <Stack direction="row" justifyContent="flex-start">
        <FormControl variant="filled" sx={{ width: "48%" }}>
          <InputLabel>Application</InputLabel>
          <Select
            label="Application"
            placeholder="Please Select"
            multiple
            value={application}
            onChange={(event: SelectChangeEvent<string[]>) => {
              const {
                target: { value },
              } = event;
              setApplication(
                typeof value === "string" ? value.split(",") : value,
              );
            }}
          >
            {applicationList.map((el) => (
              <MenuItem value={el.application}>{el.application}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <NSSButton
          variant="gradient"
          onClick={() => {
            editApplicationHandler();
          }}
          style={{ margin: "auto 0 auto 0" }}
        >
          Edit
        </NSSButton>
      </Stack>

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

      {openEditApplication && (
        <CommonModal
          open={openEditApplication}
          setOpen={setOpenEditApplication}
          title="Edit Application"
          onCloseCallback={CloseAppModal}
          IsCustomWidth
        >
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <TextField
                required
                variant="outlined"
                size="small"
                onChange={(e) => setAddApplication(e.target.value)}
                inputRef={applicationInput}
              />
              <NSSButton
                variant="gradient"
                style={{
                  margin: "5px",
                  opacity: AddApplication ? "1" : "0.5",
                  pointerEvents: AddApplication ? "auto" : "none",
                }}
                onClick={() => {
                  PostApplication();
                }}
              >
                add
              </NSSButton>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: "0 30px 0 30px" }}
            >
              <List
                sx={{
                  width: "100%",
                  overflow: "auto",
                  maxHeight: 400,
                  margin: "10px",
                  border: "1px solid",
                  padding: "0",
                }}
              >
                {applicationList.map((el, idx) => (
                  <ListItem
                    key={el.id}
                    disablePadding
                    sx={{
                      justifyContent: "space-around",
                    }}
                  >
                    <ListItemButton
                      selected={selectedIndex === el.id}
                      onClick={(e) =>
                        handleListItemClick(e, el.id, el.application)
                      }
                    >
                      <ListItemText primary={`${idx + 1}. ${el.application}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <NSSButton
                variant="gradient"
                onClick={deleteApplicationList}
                style={{
                  opacity: selectedIndex !== -1 ? "1" : "0.5",
                  pointerEvents: selectedIndex !== -1 ? "auto" : "none",
                }}
              >
                delete
              </NSSButton>
            </Stack>
          </Stack>
        </CommonModal>
      )}
    </CommonModal>
  );
};

export default OnDemandForm;
