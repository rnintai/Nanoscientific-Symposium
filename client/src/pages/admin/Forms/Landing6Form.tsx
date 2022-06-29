/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import { TextField } from "@mui/material";
import useInput from "hooks/useInput";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";

interface Landing6FormProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected?: Landing.landing6Type;
}

const Landing6Form = ({
  open,
  setOpen,
  selected,
  ...rest
}: Landing6FormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();
  const url = useInput(selected.url);
  const buttonText = useInput(selected.button_text);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setUploadLoading(true);
    try {
      await axios.post(`/api/page/common/landing/button/6`, {
        nation: pathname,
        url: url.value,
        buttonText: buttonText.value,
      });
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setUploadLoading(false);
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      submitText="Apply"
      onSubmit={handleSubmit}
      loading={uploadLoading}
      title="Edit a button"
    >
      <TextField
        label="Button text"
        fullWidth
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        {...buttonText}
      />
      <TextField
        label="URL"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...url}
      />
    </CommonModal>
  );
};

export default Landing6Form;
