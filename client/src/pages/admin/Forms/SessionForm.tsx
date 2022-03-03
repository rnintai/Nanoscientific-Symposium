import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  DesktopDatePicker,
  LocalizationProvider,
  LoadingButton,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios, { AxiosResponse } from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "moment-timezone";
import moment from "moment";

import { useAuthState } from "../../../context/AuthContext";

interface SessionFormProps {
  openSessionForm: boolean;
  setOpenSessionForm: Dispatch<SetStateAction<boolean>>;
  setSessionSuccess: Dispatch<SetStateAction<boolean>>;
  selectedSession: Program.sessionType;
  getSessions: () => void;
  edit: boolean;
}

const SessionForm = ({
  openSessionForm,
  setOpenSessionForm,
  setSessionSuccess,
  selectedSession,
  getSessions,
  // 편집모달일때는 edit 이 true 로 넘어온다
  edit = false,
}: SessionFormProps) => {
  const authState = useAuthState();
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");
  const [date, setDate] = useState<Date | null>(
    edit
      ? moment
          .utc(moment(selectedSession.date).format("MM/DD/YYYY"))
          .tz(selectedTimezone as string)
          .toDate()
      : new Date(),
  );
  const title = useInput(edit ? selectedSession.session_title : "");

  const sessionSubmitHandler = async () => {
    setLoading(true);
    let data;

    // 편집 모달이라면 put 호출
    if (edit) {
      data = await axios.put("/api/admin/session", {
        nation: authState.role,
        id: selectedSession.id,
        title: title.value,
        status: status === "show" ? 1 : 0,
        date,
      });
    } else {
      // 추가 모달이라면 post 호출
      data = await axios.post("/api/admin/session", {
        nation: authState.role,
        title: title.value,
        date,
      });
    }
    if (data.data.success) {
      setLoading(true);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
    }
  };
  const dateChangeHandler = (newValue: Date | null) => {
    setDate(newValue);
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
      const data = await axios.delete(
        `/api/admin/session/${selectedSession.id}?nation=${authState.role}`,
      );

      console.log(data.data.success);
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      setSessionSuccess(true);
      setOpenSessionForm(false);
      getSessions();
    }
  };

  return (
    <CommonModal
      open={openSessionForm}
      setOpen={setOpenSessionForm}
      title={edit ? "Modify Session" : "Add Session"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please write down the session title and choose a date."
      }
      onSubmit={sessionSubmitHandler}
      loading={loading}
    >
      <TextField
        autoFocus
        margin="dense"
        label="Session Title"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...title}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Session Date"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={dateChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {/* 편집 모달일때만 show hide 보여주기 */}
      {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
          sx={{ ml: 5 }}
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

export default SessionForm;
