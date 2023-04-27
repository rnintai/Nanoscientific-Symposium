import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import CommonModal from "components/CommonModal/CommonModal";
import useCurrentYear from "hooks/useCurrentYear";
import usePageViews from "hooks/usePageViews";
import React, { Dispatch, SetStateAction } from "react";
import { dateToLocaleString } from "utils/Date";

interface WaitListFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  list: User.userType[];
  handleFetch: () => void;
}

const WaitListForm = (props: WaitListFormProps) => {
  const pathname = usePageViews();
  const year = useCurrentYear();
  const role = "subscriber";

  const { open, setOpen, list, handleFetch } = props;

  const handleAcception = async (user: User.userType, bool: boolean) => {
    const param = {
      id: user.id,
      nation: pathname,
      year,
      role,
    };
    if (bool) {
      await axios.post("/api/admin/users/role", param);
    } else {
      await axios.delete("/api/users/unregister", {
        params: { nation: pathname, id: user.id, year },
      });
    }
    handleFetch();
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title="Waitlist"
      onCloseCallback={() => {
        //
      }}
    >
      <Box sx={{ height: "600px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }} width="20%">
                Name
              </TableCell>
              <TableCell sx={{ textAlign: "center" }} width="20%">
                Email
              </TableCell>
              <TableCell sx={{ textAlign: "center" }} width="30%">
                Registered Date (
                {Intl.DateTimeFormat().resolvedOptions().timeZone})
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                Accept / Decline
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((user) => (
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {dateToLocaleString(
                    user.createdAt,
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => {
                      handleAcception(user, true);
                    }}
                  >
                    ✔️
                  </Button>
                  <Button
                    onClick={() => {
                      handleAcception(user, false);
                    }}
                  >
                    ❌
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CommonModal>
  );
};

export default WaitListForm;
