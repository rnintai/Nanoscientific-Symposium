import React, { Dispatch, SetStateAction, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import CommonModal from "components/CommonModal/CommonModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import useInput from "hooks/useInput";
import { useAuthState } from "context/AuthContext";
import "moment-timezone";
import moment from "moment";

interface ProgramFormProps {
  openProgramForm: boolean;
  setOpenProgramForm: Dispatch<SetStateAction<boolean>>;
  setProgramSuccess: Dispatch<SetStateAction<boolean>>;
  selectedProgram: Program.programType;
  sessions: Program.sessionType[];
  getPrograms: () => void;
  edit: boolean;
}
const ProgramForm = ({
  openProgramForm,
  setOpenProgramForm,
  selectedProgram,
  setProgramSuccess,
  sessions,
  getPrograms,
  edit = false,
}: ProgramFormProps) => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [startTime, setStartTime] = useState<Date | null>(
    edit
      ? moment
          .utc(moment(selectedProgram.start_time).format("YYYY-MM-DD HH:mm:ss"))
          .tz(selectedTimezone as string)
          .toDate()
      : new Date(),
  );
  const [endTime, setEndTime] = useState<Date | null>(
    edit
      ? moment
          .utc(moment(selectedProgram.end_time).format("YYYY-MM-DD HH:mm:ss"))
          .tz(selectedTimezone as string)
          .toDate()
      : new Date(),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Common.showStatus>("show");
  const authState = useAuthState();

  const programSubmitHandler = async () => {
    setLoading(true);
    let data;

    if (edit) {
      data = await axios.put("/api/admin/program", {
        nation: authState.role,
        id: selectedProgram.id,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        // startTime: moment(startTime).utc().format("YYYY-MM-DD hh:mm:ss"),
        // endTime: moment(endTime).utc().format("YYYY-MM-DD hh:mm:ss"),
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        session: selectedSession,
        status: status === "show" ? 1 : 0,
      });
    } else {
      data = await axios.post("/api/admin/program", {
        nation: authState.role,
        session: selectedSession,
        title: title.value,
        speakers: speakers.value,
        description: description.value,
        // startTime: moment(startTime).utc().format("YYYY-MM-DD hh:mm:ss"),
        // endTime: moment(endTime).utc().format("YYYY-MM-DD hh:mm:ss"),
        startTime: startTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
        endTime: endTime?.toLocaleString("sv-SE", {
          timeZone: "utc",
        }),
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
    </CommonModal>
  );
};

export default ProgramForm;
