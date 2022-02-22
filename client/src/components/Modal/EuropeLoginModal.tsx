import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";

import axios from "axios";
import usePageViews from "../../hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
import useInput from "../../hooks/useInput";

interface ModalProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionRight = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const EuropeLoginModal = ({ setSuccess, setFailed }: ModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordSetModalOpen, setPasswordSetModalOpen] =
    useState<boolean>(false);
  const [passwordInputModalOpen, setPasswordInputModalOpen] =
    useState<boolean>(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

  // snackbar alert
  const [passwordNotMatchAlert, setPasswordNotMatchAlert] =
    useState<boolean>(false);
  const [emptyAlert, setEmptyAlert] = useState<boolean>(false);

  const pathname = usePageViews();
  const email = useInput("");
  // const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const password1 = useInput("");
  const password2 = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const handleOpen = (setOpen: (val: boolean) => void) => {
    setOpen(true);
  };
  const handleClose = (setOpen: (val: boolean) => void) => {
    setOpen(false);
  };

  const handlePasswordConfirm = () => {
    if (password1.value !== password2.value) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  };

  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...state,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  const loginHandler = async (email: string, password: string) => {
    setLoading(true);
    axios
      .post("/api/users/login", {
        email,
        password,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success === true) {
          dispatchLogin(email, res.data.role, res.data.accessToken);
          setSuccess(true);
        } else {
          setFailed(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const nextHandler = () => {
    setLoading(true);
    axios
      .post("/api/users/passwordset/check", {
        email: email.value,
        nation: pathname,
      })
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          if (res.data.result) {
            // password 입력 모달
            setPasswordInputModalOpen(true);
            setOpen(false);
          } else {
            // password 설정 모달
            setPasswordSetModalOpen(true);
            setOpen(false);
          }
        } else {
          // 유저 없다.
          setFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const passwordSetHandler = () => {
    if (passwordNotMatch) {
      setPasswordNotMatchAlert(true);
      return;
    }
    if (
      firstName.value === "" ||
      lastName.value === "" ||
      password1.value === "" ||
      password2.value === ""
    ) {
      setEmptyAlert(true);
      return;
    }

    setLoading(true);
    axios
      .post("/api/users/passwordset", {
        email: email.value,
        password: password1.value,
        firstName: firstName.value,
        lastName: lastName.value,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("success");
        } else {
          console.log("name not matched");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePasswordConfirm();
  }, [password1, password2]);

  return (
    <div>
      <Button
        type="button"
        className="menu-link remember-prev"
        onClick={() => {
          handleOpen(setOpen);
        }}
      >
        SIGN IN
      </Button>
      {/* email modal */}
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          handleClose(setOpen);
        }}
        TransitionComponent={TransitionRight}
        disableScrollLock
      >
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                nextHandler();
              }
            }}
            {...email}
          />
        </DialogContent>
        <DialogActions style={{ flexDirection: "column" }}>
          {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px" }}
              color="primary"
            >
              Loading
            </LoadingButton>
          )}
          {!loading && (
            <Button
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              variant="contained"
              color="primary"
              onClick={nextHandler}
            >
              Next
            </Button>
          )}
          <Link to={`${pathname}/registration`}> Create an Account</Link>
          {/* <Link to="/#"> Forgot Your Password?</Link> */}
        </DialogActions>
      </Dialog>

      {/* 패스워드 설정 모달 */}
      <Dialog
        fullWidth
        open={passwordSetModalOpen}
        onClose={() => {
          handleClose(setPasswordSetModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
      >
        <DialogTitle>Set Your Password</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <TextField
            autoFocus
            margin="dense"
            id="password1"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password1}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password2"
            label="Password Confirmation"
            type="password"
            fullWidth
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                passwordSetHandler();
              }
            }}
            {...password2}
          />
          <span style={{ color: passwordNotMatch ? "red" : "green" }}>
            {passwordNotMatch ? "Password is not matched." : <div>&nbsp;</div>}
          </span>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              style={{ width: "49%" }}
              autoFocus
              margin="dense"
              id="first-name"
              label="First Name"
              type="text"
              variant="standard"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  passwordSetHandler();
                }
              }}
              {...firstName}
            />
            <TextField
              style={{ width: "49%" }}
              autoFocus
              margin="dense"
              id="last-name"
              label="Last Name"
              type="text"
              variant="standard"
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  passwordSetHandler();
                }
              }}
              {...lastName}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ flexDirection: "column" }}>
          {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px" }}
              color="primary"
            >
              Loading
            </LoadingButton>
          )}
          {!loading && (
            <Button
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
              variant="contained"
              color="primary"
              onClick={passwordSetHandler}
            >
              SUBMIT
            </Button>
          )}
        </DialogActions>

        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
        <TopCenterSnackBar
          value={emptyAlert}
          setValue={setEmptyAlert}
          variant="filled"
          severity="error"
          content="Please fill all fields."
        />
      </Dialog>
    </div>
  );
};

export default EuropeLoginModal;
