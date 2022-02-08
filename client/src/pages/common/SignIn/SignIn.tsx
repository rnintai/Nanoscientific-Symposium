import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import { SignInContainer } from "./SignInStyles";

const SignIn = () => {
  const testHandler = async () => {
    axios.post("/api/users/login", {
      email: "ho46825@gmail.com",
      password: "qpwoei10293*",
    });
  };
  return (
    <SignInContainer>
      <Button
        style={{ margin: "10px" }}
        variant="outlined"
        color="primary"
        onClick={testHandler}
      >
        Test
      </Button>
    </SignInContainer>
  );
};

export default SignIn;
