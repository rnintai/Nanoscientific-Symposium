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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import CloseButton from "components/CloseButton/CloseButton";
import axios from "axios";
import usePageViews from "../../hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
import useInput from "../../hooks/useInput";

interface ModalProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordSetSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
  emailModalOpen: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordSetModalOpen: boolean;
  setPasswordSetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordInputModalOpen: boolean;
  setPasswordInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

const EuropeLoginModal = ({
  setSuccess,
  setFailed,
  setPasswordSetSuccessAlert,
  emailModalOpen,
  setEmailModalOpen,
  passwordSetModalOpen,
  setPasswordSetModalOpen,
  passwordInputModalOpen,
  setPasswordInputModalOpen,
}: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  // const [passwordSetModalOpen, setPasswordSetModalOpen] =
  //   useState<boolean>(false);
  // const [passwordInputModalOpen, setPasswordInputModalOpen] =
  //   useState<boolean>(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

  // snackbar alert
  const [passwordNotMatchAlert, setPasswordNotMatchAlert] =
    useState<boolean>(false);
  const [emptyAlert, setEmptyAlert] = useState<boolean>(false);
  const [nameNotMatchAlert, setNameNotMatchAlert] = useState<boolean>(false);

  //
  const pathname = usePageViews();
  const email = useInput("");
  const password = useInput("");
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
        if (res.data.success) {
          if (res.data.result) {
            // password 입력 모달
            setPasswordInputModalOpen(true);
            setEmailModalOpen(false);
          } else {
            // password 설정 모달
            setPasswordSetModalOpen(true);
            setEmailModalOpen(false);
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
          setPasswordSetSuccessAlert(true);
          setPasswordSetModalOpen(false);
        } else {
          setNameNotMatchAlert(true);
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
          handleOpen(setEmailModalOpen);
        }}
      >
        SIGN IN
      </Button>
      {/* email modal */}
      <Dialog
        fullWidth
        open={emailModalOpen}
        onClose={() => {
          handleClose(setEmailModalOpen);
        }}
        TransitionComponent={TransitionRight}
        disableScrollLock
      >
        <CloseButton setOpen={setEmailModalOpen} />
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
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
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

      {/* 비밀번호 입력 모달 */}

      <Dialog
        fullWidth
        open={passwordInputModalOpen}
        onClose={() => {
          handleClose(setPasswordInputModalOpen);
        }}
        TransitionComponent={TransitionLeft}
        disableScrollLock
      >
        <CloseButton setOpen={setPasswordInputModalOpen} />
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                loginHandler(email.value, password.value);
              }
            }}
            {...password}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordInputModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            Prev
          </Button>
          {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
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
              onClick={() => {
                loginHandler(email.value, password.value);
              }}
            >
              SIGN IN
            </Button>
          )}
        </DialogActions>

        {/* 비밀번호 확인 alert */}
        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
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
        <CloseButton setOpen={setPasswordSetModalOpen} />
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
        <DialogActions>
          <Button
            style={{ margin: "10px", borderRadius: "30px", width: "20%" }}
            variant="outlined"
            color="primary"
            tabIndex={-1}
            onClick={() => {
              handleClose(setPasswordSetModalOpen);
              handleOpen(setEmailModalOpen);
            }}
          >
            Prev
          </Button>
          {loading && (
            <LoadingButton
              loading
              style={{ margin: "10px", borderRadius: "30px", width: "100%" }}
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

        {/* 비밀번호 확인 alert */}
        <TopCenterSnackBar
          value={passwordNotMatchAlert}
          setValue={setPasswordNotMatchAlert}
          variant="filled"
          severity="error"
          content="Password not match."
        />
        {/* 빈 field alert */}
        <TopCenterSnackBar
          value={emptyAlert}
          setValue={setEmptyAlert}
          variant="filled"
          severity="error"
          content="Please fill all fields."
        />
        {/* 입력한 이름 정보 매칭 실패 */}
        <TopCenterSnackBar
          value={nameNotMatchAlert}
          setValue={setNameNotMatchAlert}
          variant="filled"
          severity="warning"
          content="Name is not matched to your account's data."
        />
      </Dialog>
    </div>
  );
};

export default EuropeLoginModal;
