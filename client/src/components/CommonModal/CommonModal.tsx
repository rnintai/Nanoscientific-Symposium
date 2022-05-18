/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, Box, DialogContent, useTheme } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface CommonModalProps {
  children?: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title: string;
  desc?: string;
  submitText?: string;
  onSubmit?: () => void;
  loading?: boolean;
  transitionDir?: "left" | "right" | "up" | "down";
  hideSaveButton?: boolean;
  submitDisabled?: boolean;
}

const CommonModal = ({
  children,
  open,
  setOpen,
  title,
  desc,
  submitText = "save",
  onSubmit,
  loading,
  transitionDir,
  hideSaveButton,
  submitDisabled,
}: CommonModalProps) => {
  // theme
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction={transitionDir} ref={ref} {...props} />;
  });
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        maxWidth="laptop"
        TransitionComponent={transitionDir ? Transition : undefined}
        disableScrollLock
      >
        <DialogTitle sx={{ backgroundColor: "#21ade5", color: "#fff", mb: 2 }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          {children}
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {onSubmit && !hideSaveButton && (
              <LoadingButton
                style={{ marginLeft: "10px" }}
                loading={loading}
                variant="contained"
                onClick={onSubmit}
                disabled={submitDisabled}
              >
                {submitText}
              </LoadingButton>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonModal;
