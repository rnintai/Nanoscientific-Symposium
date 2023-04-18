/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
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
  onCloseCallback?: () => void;
  loading?: boolean;
  transitionDir?: "left" | "right" | "up" | "down";
  hideSaveButton?: boolean;
  submitDisabled?: boolean;
  IsCustomWidth?: boolean;
  deleteHandler?: () => void;
  hideCancel?: boolean;
}

const CommonModal = ({
  children,
  open,
  setOpen,
  title,
  desc,
  submitText = "save",
  onSubmit,
  onCloseCallback,
  loading,
  transitionDir,
  hideSaveButton,
  submitDisabled,
  IsCustomWidth,
  deleteHandler,
  hideCancel,
}: CommonModalProps) => {
  // theme
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
    onCloseCallback();
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
        fullWidth={!IsCustomWidth}
        open={open}
        onClose={handleClose}
        maxWidth="laptop"
        TransitionComponent={transitionDir ? Transition : undefined}
        disableScrollLock
      >
        {deleteHandler && (
          <LoadingButton
            loading={false}
            variant="contained"
            color="error"
            onClick={() => {
              if (confirm("Are you sure?")) {
                deleteHandler();
              }
            }}
            style={{
              position: "absolute",
              right: "22px",
              top: "12px",
            }}
          >
            Delete
          </LoadingButton>
        )}
        <DialogTitle sx={{ backgroundColor: "#21ade5", color: "#fff", mb: 2 }}>
          {title}
        </DialogTitle>
        <DialogContent sx={{ padding: "45px 24px" }}>
          <DialogContentText>{desc}</DialogContentText>
          {children}
          <DialogActions
            sx={{
              position: "absolute",
              pr: 3,
              bottom: 0,
              right: 0,
            }}
          >
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
            {!hideCancel && (
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "rgb(239 250 255)",
                  },
                }}
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonModal;
