import * as React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import useInput from "hooks/useInput";
import TextField from "@mui/material/TextField";
import CommonModal from "components/CommonModal/CommonModal";

interface AddSessionFormProps {
  openAddSessionForm: boolean;
  setOpenAddSesisonForm: Dispatch<SetStateAction<boolean>>;
  setAddSessionSuccess: Dispatch<SetStateAction<boolean>>;
}

const AddSessionForm = ({
  openAddSessionForm,
  setOpenAddSesisonForm,
  setAddSessionSuccess,
}: AddSessionFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  const title = useInput("");
  const addSessionSubmitHandler = async () => {
    setLoading(true);
    const { data } = await axios.post("/api/admin/session", {
      country: "asia",
      title: title.value,
      date,
    });
    if (data.success) {
      setLoading(true);
      setAddSessionSuccess(true);
      setOpenAddSesisonForm(false);
    }
  };

  return (
    <CommonModal
      open={openAddSessionForm}
      setOpen={setOpenAddSesisonForm}
      title="Add Session"
      desc="Please write down the session title and choose a date."
      onSubmit={addSessionSubmitHandler}
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
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </CommonModal>
  );
};

export default AddSessionForm;
