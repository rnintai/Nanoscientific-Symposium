import React, { Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent } from "@mui/material";

interface CommonModalProps {
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title: string;
  // eslint-disable-next-line react/require-default-props
  desc?: string;
  // eslint-disable-next-line react/require-default-props
  onSubmit?: () => void;
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
}

const CommonModal = ({
  children,
  open,
  setOpen,
  title,
  desc,
  onSubmit,
  loading,
}: CommonModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          {children}
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {onSubmit && (
              <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={onSubmit}
              >
                Save
              </LoadingButton>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonModal;
