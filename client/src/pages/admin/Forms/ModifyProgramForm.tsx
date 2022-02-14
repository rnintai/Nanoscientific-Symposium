import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import useInput from "../../../hooks/useInput";

interface ModifyProgramFormProps {
  openModifyProgramForm: boolean;
  setOpenModifyProgramForm: Dispatch<SetStateAction<boolean>>;
  setModifyProgramSuccess: Dispatch<SetStateAction<boolean>>;
  seletedProgram: Program.programType;
  sessions: Program.sessionType[];
}
const ModifyProgramForm = ({
  openModifyProgramForm,
  setOpenModifyProgramForm,
  seletedProgram,
  setModifyProgramSuccess,
  sessions,
}: ModifyProgramFormProps) => {
  const [startTime, setStartTime] = useState<Date | null>(
    new Date(`2022-02-14 ${seletedProgram.start_time}`),
  );
  const [endTime, setEndTime] = useState<Date | null>(
    new Date(`2022-02-14 ${seletedProgram.end_time}`),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");

  const modifyProgramSubmitHandler = async () => {
    setLoading(true);
    const { data } = await axios.put("/api/admin/program", {
      country: "asia",
      id: seletedProgram.id,
      title: title.value,
      speakers: speakers.value,
      description: description.value,
      startTime: moment(startTime).format("hh:mm:ss"),
      endTime: moment(endTime).format("hh:mm:ss"),
      session: selectedSession,
      status: status === "show" ? 1 : 0,
    });
    if (data.success) {
      setLoading(true);
      setModifyProgramSuccess(true);
      setOpenModifyProgramForm(false);
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
    seletedProgram.session as unknown as string,
  );

  const title = useInput(seletedProgram.title);
  const speakers = useInput(seletedProgram.speakers);
  const description = useInput(seletedProgram.description);

  const changeSessionHandler = (event: SelectChangeEvent) => {
    setSelectedSession(event.target.value as string);
  };

  return (
    <CommonModal
      open={openModifyProgramForm}
      setOpen={setOpenModifyProgramForm}
      title="Modify Program"
      desc="Please choose the title and date that you want to change."
      onSubmit={modifyProgramSubmitHandler}
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
    </CommonModal>
  );
};

export default ModifyProgramForm;
