import { Box, Stack, TextField, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import AdminLayout from "components/AdminLayout/AdminLayout";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import useInput from "hooks/useInput";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import useConfigStore from "store/ConfigStore";

const AdminConfig = () => {
  const pathname = usePageViews();

  const { configState } = useConfigStore();
  const alertEmail = useInput("");

  const [applyLoading, setApplyLoading] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [newConfig, setNewConfig] = useState<Common.configType>(configState);

  const handleApply = async () => {
    try {
      setApplyLoading(true);
      await axios.post("/api/configuration", {
        nation: pathname,
        config: { ...newConfig, alert_receive_email: alertEmail.value },
      });
      setSuccessAlert(true);
    } catch (err) {
      console.log(err);
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    alertEmail.setValue(configState?.alert_receive_email);
  }, [configState]);

  return (
    <AdminLayout
      title="Configuration"
      applyHandler={handleApply}
      applyLoading={applyLoading}
    >
      <Box>
        <Stack flexDirection="row" alignItems="center" width="50%">
          <Tooltip title="Sending Alert Email to those e-mail address. If you want to receive mail using multiple addresses, please use comma to separate them.">
            <Typography component="h1" mr={2} whiteSpace="nowrap">
              Send Alert mail to:
            </Typography>
          </Tooltip>
          <TextField
            size="small"
            margin="none"
            fullWidth
            multiline
            rows={2}
            {...alertEmail}
          />
        </Stack>
      </Box>
      <TopCenterSnackBar
        value={successAlert}
        setValue={setSuccessAlert}
        severity="success"
        content="Success"
        variant="filled"
      />
    </AdminLayout>
  );
};

export default AdminConfig;
