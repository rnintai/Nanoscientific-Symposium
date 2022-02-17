import React, { Dispatch, SetStateAction, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import CommonModal from "components/CommonModal/CommonModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import moment from "moment";
import useInput from "hooks/useInput";
import { useAuthState } from "../../../context/AuthContext";

interface ProgramFormProps {
  openProgramForm: boolean;
  setOpenProgramForm: Dispatch<SetStateAction<boolean>>;
  setProgramSuccess: Dispatch<SetStateAction<boolean>>;
  seletedProgram: Program.programType;
  sessions: Program.sessionType[];
  getPrograms: () => void;
  edit: boolean;
}
const ProgramForm = ({
  openProgramForm,
  setOpenProgramForm,
  seletedProgram,
  setProgramSuccess,
  sessions,
  getPrograms,
  edit = false,
}: ProgramFormProps) => {
  const [startTime, setStartTime] = useState<Date | null>(
    edit ? new Date(`2022-02-14 ${seletedProgram.start_time}`) : new Date(),
  );
  const [endTime, setEndTime] = useState<Date | null>(
    edit ? new Date(`2022-02-14 ${seletedProgram.end_time}`) : new Date(),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");

  const programSubmitHandler = async () => {
    setLoading(true);
    let data;
    const authState = useAuthState();

    if (edit) {
      data = await axios.put("/api/admin/program", {
        country: authState.role,
        id: seletedProgram.id,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: moment(startTime).format("hh:mm:ss"),
        endTime: moment(endTime).format("hh:mm:ss"),
        session: selectedSession,
        status: status === "show" ? 1 : 0,
      });
    } else {
      data = await axios.post("/api/admin/program", {
        country: authState.role,
        session: selectedSession,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        startTime: moment(startTime).format("hh:mm:ss"),
        endTime: moment(endTime).format("hh:mm:ss"),
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
    edit ? (seletedProgram.session as unknown as string) : "",
  );

  const title = useInput(edit ? seletedProgram.title : "");
  const speakers = useInput(edit ? seletedProgram.speakers : "");
  const description = useInput(edit ? seletedProgram.description : "");

  const changeSessionHandler = (event: SelectChangeEvent) => {
    setSelectedSession(event.target.value as string);
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
          onChange={changeSessionHandler}
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
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          renderInput={(params) => <TextField {...params} />}
        />{" "}
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={setEndTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

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
    </CommonModal>
  );
};

export default ProgramForm;
