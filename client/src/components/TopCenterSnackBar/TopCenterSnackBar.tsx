import React, { Dispatch, SetStateAction } from "react";
import { AlertColor, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

interface TopCenterSnackBarTypes {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  severity: AlertColor;
  content: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
}

const TopCenterSnackBar = ({
  value,
  setValue,
  severity,
  content,
  variant,
}: TopCenterSnackBarTypes) => {
  return (
    <Snackbar
      open={value}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setValue(false);
      }}
      sx={{ top: "30px", height: "0px" }}
    >
      <Alert
        variant={variant}
        severity={severity}
        // sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

TopCenterSnackBar.defaultProps = {
  variant: undefined,
};

export default TopCenterSnackBar;
