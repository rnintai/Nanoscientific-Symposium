import React, { Dispatch, SetStateAction, useState } from "react";
import { Select, SelectChangeEvent, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CommonModal from "components/CommonModal/CommonModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";
import useInput from "hooks/useInput";

interface AddProgramFormProps {
  openAddProgramForm: boolean;
  setOpenAddProgramForm: Dispatch<SetStateAction<boolean>>;
  setAddProgramSuccess: Dispatch<SetStateAction<boolean>>;
  sessions: Program.sessionType[];
}

const AddProgramForm = ({
  openAddProgramForm,
  setAddProgramSuccess,
  setOpenAddProgramForm,
  sessions,
}: AddProgramFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const addProgramSubmitHandler = async () => {
    setLoading(true);

    const { data } = await axios.post("/api/admin/program", {
      country: "asia",
      session: selectedSession,
      title: title.value,
      speakers: speakers.value,
      description: description.value,
      startTime: moment(startTime).format("hh:mm:ss"),
      endTime: moment(endTime).format("hh:mm:ss"),
    });

    if (data.success) {
      setLoading(true);
      setAddProgramSuccess(true);
      setOpenAddProgramForm(false);
    }
  };

  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [selectedSession, setSelectedSession] = useState<string>("");
  const title = useInput("");
  const speakers = useInput("");
  const description = useInput("");

  const changeSessionHandler = (event: SelectChangeEvent) => {
    setSelectedSession(event.target.value as string);
  };
  return (
    <CommonModal
      open={openAddProgramForm}
      setOpen={setOpenAddProgramForm}
      title="Add Program"
      desc="Please choose the proper item to add the program."
      onSubmit={addProgramSubmitHandler}
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
    </CommonModal>
  );
};

export default AddProgramForm;
