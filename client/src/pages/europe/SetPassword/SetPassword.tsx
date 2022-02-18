import React from "react";
import Box from "@mui/material/Box";
import PasswordIcon from "@mui/icons-material/Password";
import { TextField, Typography } from "@mui/material";
import { SetPasswordContainer } from "./SetPasswordStyles";

const SetPassword = () => {
  return (
    <SetPasswordContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          width: 450,
          height: 250,
          boxShadow: 3,
          p: "20px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "15px",
          }}
        >
          <PasswordIcon fontSize="large" sx={{ mr: "7px", color: "#8a8a8a" }} />
          <Typography>Set Your Password</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ mb: "15px" }}
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Password Confirmation"
            variant="outlined"
          />
        </Box>
      </Box>
    </SetPasswordContainer>
  );
};

export default SetPassword;
