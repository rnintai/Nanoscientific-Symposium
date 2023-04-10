/* eslint-disable no-restricted-globals */
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
import cloneDeep from "lodash/cloneDeep";

interface OnDemandFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
  selected: Common.onDemandVideoType;
  getList: () => void;
}

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
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);

  const addApplication = useInput("");
  // const [addApplication, setaddApplication] = useState("");

  useEffect(() => {
    getApplicationList();
    initList(); // selectedIndex, selectedApplication 에 이미 seleted된 value넣어주기
  }, []);

  const initList = async () => {
    setSelectedApplication(application);
    try {
      if (application.length > 0) {
        const res = await axios.get("/api/ondemand/application/list/id", {
          params: { application: application.map((m) => `"${m}"`).join(",") },
        });
        setSelectedIndex(res.data.result.map((m) => m.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    if (confirm("Are you sure?")) {
      try {
        console.log(selectedIndex);
        alert(`[${selectedApplication}] deleted`);
        await axios.delete("/api/ondemand/application/list", {
          params: { id: selectedIndex },
        });
        getApplicationList();
      } catch (error) {
        console.log(error);
      }
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
      applicationList.findIndex(
        (el) => el.application === addApplication.value,
      ) === -1
    ) {
      if (confirm("Are you sure?")) {
        try {
          alert(`[${addApplication.value}] added`);
          await axios.post("/api/ondemand/application/list", {
            application: `"${addApplication.value}"`,
          });
          getApplicationList();
          applicationInput.current.value = "";
          addApplication.setValue("");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert(
        `[${addApplication.value}] already exists. \nplease enter another application name!`,
      );
    }
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    application: string,
  ) => {
    let newIndexArray;
    let newApplicationArray;
    if (selectedIndex.indexOf(id) === -1) {
      newIndexArray = cloneDeep(selectedIndex); // deep copy 사용
      newIndexArray.push(id);
      setSelectedIndex(newIndexArray);
      newApplicationArray = selectedApplication;
      newApplicationArray.push(application);
      setSelectedApplication(newApplicationArray);
    } else {
      newIndexArray = cloneDeep(selectedIndex);
      newIndexArray.splice(selectedIndex.indexOf(id), 1);
      setSelectedIndex(newIndexArray);
      newApplicationArray = selectedApplication;
      newApplicationArray.splice(selectedApplication.indexOf(application), 1);
      setSelectedApplication(newApplicationArray);
    }
    // console.log(selectedIndex);
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

        <FormControl required variant="filled" sx={{ width: "48%" }}>
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
                inputRef={applicationInput}
                {...addApplication}
              />
              <NSSButton
                variant="gradient"
                style={{
                  margin: "5px",
                  opacity: addApplication.value ? "1" : "0.5",
                  pointerEvents: addApplication.value ? "auto" : "none",
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
                      onClick={(e) =>
                        handleListItemClick(e, el.id, el.application)
                      }
                      selected={selectedIndex.indexOf(el.id) !== -1}
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
                  opacity: selectedIndex.length > 0 ? "1" : "0.5",
                  pointerEvents: selectedIndex.length > 0 ? "auto" : "none",
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
