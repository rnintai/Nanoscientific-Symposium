import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

import { SignInContainer } from "./SignInStyles";
import { useAuthState, useAuthDispatch } from "../../../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  const loginHandler = async (email: string, password: string) => {
    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        dispatchLogin(email, res.data.role, res.data.accessToken);
      });
  };
  const checkHandler = async () => {
    axios.post("/api/users/check", {
      accessToken: state.accessToken,
    });
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };
  return (
    <SignInContainer>
      <form style={{ margin: "10px" }} autoComplete="off">
        <TextField
          id="standard-basic"
          label="Email"
          required
          onChange={handleEmailChange}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          required
          onChange={handlePasswordChange}
        />
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            loginHandler(email, password);
          }}
        >
          Login
        </Button>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          color="primary"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            checkHandler();
          }}
        >
          Check
        </Button>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
