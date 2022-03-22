import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Checkbox,
  Select,
  SelectChangeEvent,
  TextField,
  FormControlLabel,
} from "@mui/material";
import CommonModal from "components/CommonModal/CommonModal";

import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import { getUserTimezoneDate, dateToLocaleString } from "utils/Date";

interface ProgramFormProps {
  openProgramForm: boolean;
  setOpenProgramForm: Dispatch<SetStateAction<boolean>>;
  setProgramSuccess: Dispatch<SetStateAction<boolean>>;
  selectedProgram: Program.programType;
  sessions: Program.sessionType[];
  getPrograms: () => void;
  selectedTimezone: string;
  edit: boolean;
}
const ProgramForm = ({
  openProgramForm,
  setOpenProgramForm,
  selectedProgram,
  setProgramSuccess,
  sessions,
  getPrograms,
  selectedTimezone,
  edit = false,
}: ProgramFormProps) => {
  const [startTime, setStartTime] = useState<Date | null>(
    edit
      ? getUserTimezoneDate(selectedProgram.start_time, selectedTimezone)
      : new Date(),
  );
  const [endTime, setEndTime] = useState<Date | null>(
    edit
      ? getUserTimezoneDate(selectedProgram.end_time, selectedTimezone)
      : new Date(),
  );
  const [emphasizeCheck, setEmphasizeCheck] = useState<boolean>(
    selectedProgram.emphasize === 1,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");

  const pathname = usePageViews();

  const programSubmitHandler = async () => {
    setLoading(true);
    let data;

    if (edit) {
      data = await axios.put("/api/admin/program", {
        nation: pathname,
        id: selectedProgram.id,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        session: selectedSession,
        status: status === "show" ? 1 : 0,
        emphasize: emphasizeCheck,
      });
    } else {
      data = await axios.post("/api/admin/program", {
        nation: pathname,
        session: selectedSession,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        emphasize: emphasizeCheck ? 1 : 0,
      });
    }

    if (data.data.success) {
      setLoading(false);
      setProgramSuccess(true);
      setOpenProgramForm(false);
      getPrograms();
    }
  };

  const statusChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: Common.showStatus,
  ) => {
    setStatus(newStatus);
  };

  // selectedProgram.session 은 id 이고 selectedSession 은 string 이 들어가야한다
  const [selectedSession, setSelectedSession] = useState<string>(
    edit ? (selectedProgram.session as unknown as string) : "",
  );

  const title = useInput(edit ? selectedProgram.title : "");
  const speakers = useInput(edit ? selectedProgram.speakers : "");
  const description = useInput(edit ? selectedProgram.description : "");

  const changeSessionHandler = (event: SelectChangeEvent) => {
    setSelectedSession(event.target.value as string);
    const selectedSessionArr = sessions.filter((session) => {
      return session.id === +event.target.value;
    });
    const selectedDate = new Date(selectedSessionArr[0].date);
    const newYear = selectedDate.getFullYear();
    const newMonth = selectedDate.getMonth();
    const newDate = selectedDate.getDate();

    // 선택한 세션에 맞게 시간 변경.
    const newStart = startTime;
    newStart?.setFullYear(newYear);
    newStart?.setMonth(newMonth);
    newStart?.setDate(newDate);
    const newEnd = endTime;
    newEnd?.setFullYear(newYear);
    newEnd?.setMonth(newMonth);
    newEnd?.setDate(newDate);

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const result = await axios.delete(
        `/api/admin/program/${selectedProgram.id}?nation=${pathname}`,
      );
      if (result.data.success) {
        setProgramSuccess(true);
        setOpenProgramForm(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      getPrograms();
    }
  };

  return (
    <CommonModal
      open={openProgramForm}
      setOpen={setOpenProgramForm}
      title={edit ? "Modify Program" : "Add Program"}
      desc={
        edit
          ? "Please choose the title and date that you want to change."
          : "Please choose the proper item to add the program."
      }
      onSubmit={programSubmitHandler}
      loading={loading}
    >
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSession}
          label="Session"
          onChange={(event: SelectChangeEvent) => {
            // setLoading(true);
            // setTimeout(() => {
            changeSessionHandler(event);
            // setLoading(false);
            // }, 2000);
          }}
        >
          {sessions.map((session) => (
            <MenuItem key={session.id} value={session.id}>
              {session.session_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        label="Program Title"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...title}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={emphasizeCheck}
            onClick={() => setEmphasizeCheck(!emphasizeCheck)}
          />
        }
        label="Emphasize?"
      />
      <TextField
        margin="dense"
        label="Speakers"
        fullWidth
        variant="filled"
        sx={{ marginBottom: "30px" }}
        {...speakers}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        variant="filled"
        multiline
        sx={{ marginBottom: "30px" }}
        {...description}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Start Time"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
        />{" "}
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="End Time"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
        />
      </LocalizationProvider>
      <h3 style={{ marginTop: "5px" }}>
        {" "}
        Please enter the above time based on your location. ✔ {selectedTimezone}
      </h3>
      {edit && (
        <ToggleButtonGroup
          size="large"
          color="primary"
          value={status}
          exclusive
          onChange={statusChangeHandler}
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

export default ProgramForm;
