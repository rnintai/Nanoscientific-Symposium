import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import S3Upload from "components/S3Upload/S3Upload";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import useInput from "hooks/useInput";
import { useAuthState } from "context/AuthContext";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import usePageViews from "hooks/usePageViews";

interface SpeakerFormProps {
  openSpeakerForm: boolean;
  setOpenSpeakerForm: Dispatch<SetStateAction<boolean>>;
  setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  refreshFunction: () => void;
  selectedSpeaker: Speaker.speakerType;
  // eslint-disable-next-line react/require-default-props
  edit?: boolean;
}

const SpeakerForm = ({
  openSpeakerForm,
  setOpenSpeakerForm,
  setSpeakerSuccessAlert,
  refreshFunction,
  selectedSpeaker,
  edit = false,
}: SpeakerFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const name = useInput(edit ? selectedSpeaker.name : "");
  const belong = useInput(edit ? selectedSpeaker.belong : "");
  const [imagePath, setImagePath] = useState<string>(
    edit ? selectedSpeaker.image_path : "",
  );
  const [previewURL, setPreviewURL] = useState<string>("");
  const [status, setStatus] = useState<Common.showStatus>("show");

  const authState = useAuthState();
  const pathname = usePageViews();

  useEffect(() => {
    setPreviewURL(selectedSpeaker?.image_path);
  }, [selectedSpeaker]);

  const speakerSubmitHandler = async () => {
    if (imagePath === "") return;
    setLoading(true);
    let data;

    // 편집 모드일때 즉, 스피커 카드를 클릭한 경우
    if (edit) {
      data = await axios.put("/api/admin/speaker", {
        id: selectedSpeaker.id,
        nation: pathname,
        name: name.value,
        belong: belong.value,
        imagePath,
        status: status === "show" ? 1 : 0,
      });
    } else {
      // 새롭게 생성하는 경우 즉, ADD SPEAKER 를 클릭한경우
      data = await axios.post("/api/admin/speaker", {
        nation: pathname,
        name: name.value,
        belong: belong.value,
        imagePath,
      });
    }

    if (data.data.success) {
      setLoading(false);
      setOpenSpeakerForm(false);
      setSpeakerSuccessAlert(true);
      refreshFunction();
    }
  };

  const statusChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: Common.showStatus,
  ) => {
    setStatus(newStatus);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `/api/admin/speaker/${selectedSpeaker.id}?nation=${pathname}`,
      );

      setSpeakerSuccessAlert(true);
      setOpenSpeakerForm(false);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      refreshFunction();
    }
  };

  return (
    <CommonModal
      open={openSpeakerForm}
      setOpen={setOpenSpeakerForm}
      title={edit ? "Modify Speaker" : "Add Speaker"}
      desc={
        edit
          ? "Please write down the name and affiliation of the speaker you want to change."
          : "Please write down the name and belong of the speaker."
      }
      onSubmit={speakerSubmitHandler}
      loading={loading || uploadLoading}
    >
      <TextField
        margin="dense"
        label="Name"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...name}
      />
      <TextField
        margin="dense"
        label="Belong"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "30px" }}
        {...belong}
      />
      <S3Upload
        setImagePath={setImagePath}
        edit={edit}
        previewURL={previewURL}
        setPreviewURL={setPreviewURL}
        setUploadLoading={setUploadLoading}
      />
      {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
          sx={{ mt: 5 }}
        >
          <ToggleButton value="show">show</ToggleButton>
          <ToggleButton value="hide">hide</ToggleButton>
        </ToggleButtonGroup>
      )}
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
    </CommonModal>
  );
};

export default SpeakerForm;
