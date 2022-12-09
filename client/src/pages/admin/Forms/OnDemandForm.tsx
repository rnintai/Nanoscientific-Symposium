import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { Rating, Select, MenuItem, Typography, TextField } from "@mui/material";
import useSelect from "hooks/useSelect";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { useAuthState } from "context/AuthContext";
import { adminRole, editorOnly } from "utils/Roles";
import useInput from "hooks/useInput";

interface OnDemandFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected: Common.onDemandVideoType;
  getList: () => void;
}

const OnDemandFormContainer = styled.div`
  li {
    margin: 5px 0;
    list-style: none;
    display: flex;
    align-items: center;

    h3 {
      display: inline;
      margin-bottom: 0px;
    }

    & > span {
      margin-left: 10px;
    }
  }
`;

const OnDemandForm = ({
  open,
  setOpen,
  selected,
  getList,
}: OnDemandFormProps) => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const isAdmin = adminRole.includes(authState.role);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccessAlert, setSubmitSuccessAlert] = useState<boolean>(false);

  const title = useInput("");

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.post("/api/admin/users/role", {
        nation: pathname,
      });
      // getUsers();
      setSubmitSuccessAlert(true);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    //
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title="On Demand Video"
      loading={submitLoading}
      onSubmit={handleSubmit}
      hideSaveButton={!isAdmin}
      deleteHandler={handleDelete}
    >
      <TextField
        margin="dense"
        label="Topic"
        fullWidth
        variant="filled"
        required
        error={selected.title === ""}
        sx={{ marginBottom: "15px" }}
        {...title}
      />
      <TopCenterSnackBar
        value={submitSuccessAlert}
        setValue={setSubmitSuccessAlert}
        variant="filled"
        severity="success"
        content="User's role changed"
      />
    </CommonModal>
  );
};

export default OnDemandForm;
