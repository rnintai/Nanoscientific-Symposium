import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import CommonModal from "components/CommonModal/CommonModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import { getUserTimezoneDate, dateToLocaleString } from "utils/Date";

interface AgendaFormProps {
  openAgendaForm: boolean;
  setOpenAgendaForm: Dispatch<SetStateAction<boolean>>;
  setAgendaSuccess: Dispatch<SetStateAction<boolean>>;
  selectedAgenda: Program.programAgendaType;
  programs: Program.programType[];
  getProgramAgenda: () => void;
  edit: boolean;
}
const AgendaForm = ({
  openAgendaForm,
  setOpenAgendaForm,
  setAgendaSuccess,
  selectedAgenda,
  getProgramAgenda,
  programs,
  edit = false,
}: AgendaFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const pathname = usePageViews();

  const submitHandler = async () => {
    setLoading(true);
    let data;

    if (edit) {
      data = await axios.put("/api/admin/program/agenda", {
        nation: pathname,
        id: selectedAgenda.id,
        program_id: selectedProgram,
        title: title.value,
        speakers: speakers.value,
      });
    } else {
      data = await axios.post("/api/admin/program/agenda", {
        nation: pathname,
        program_id: selectedProgram,
        title: title.value,
        speakers: speakers.value,
      });
    }

    if (data.data.success) {
      setLoading(false);
      setAgendaSuccess(true);
      setOpenAgendaForm(false);
      getProgramAgenda();
    }
  };

  const [selectedProgram, setSelectedProgram] = useState<number>(
    edit ? selectedAgenda.program_id : programs[0].id,
  );

  const title = useInput(edit ? selectedAgenda.title : "");
  const speakers = useInput(edit ? selectedAgenda.speakers : "");

  const changeProgramHandler = (event: SelectChangeEvent<number>) => {
    setSelectedProgram(event.target.value as number);
    // programs.filter((program) => {
    //   return program.id === event.target.value;
    // });
  };

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const result = await axios.delete(
        `/api/admin/program/agenda/${selectedAgenda.id}?nation=${pathname}`,
      );
      if (result.data.success) {
        setAgendaSuccess(true);
        setOpenAgendaForm(false);
      }
    } catch (err) {
      alert(err);
    } finally {
      setDeleteLoading(false);
      getProgramAgenda();
    }
  };

  return (
    <CommonModal
      open={openAgendaForm}
      setOpen={setOpenAgendaForm}
      title={edit ? "Modify Agenda" : "Add Agenda"}
      desc={
        edit
          ? "Please enter the content that you want to change."
          : "Please choose the proper program to add the agenda."
      }
      onSubmit={submitHandler}
      loading={loading}
    >
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Program</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProgram}
          label="Program"
          onChange={(event: SelectChangeEvent<number>) => {
            changeProgramHandler(event);
          }}
        >
          {programs.map((program) => (
            <MenuItem key={program.id} value={program.id}>
              {program.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        label="Agenda Title"
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
// const AgendaForm = () => {
//   return <>a</>;
// };
export default AgendaForm;
