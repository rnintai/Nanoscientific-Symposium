import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavBarContainer } from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { LoadingButton } from "@mui/lab";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { editorRole } from "utils/Roles";
import useSubPath from "hooks/useSubPath";
import { Stack } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import MenuLink from "components/Link/MenuLink";
import { globalData } from "utils/GlobalData";
import EuropeLoginModal from "../Modal/EuropeLoginModal";

interface navProps {
  checkLoading: boolean;
  passwordSetModalOpen: boolean;
  emailModalOpen: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordSetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passwordInputModalOpen: boolean;
  setPasswordInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // eslint-disable-next-line react/require-default-props
  hideMenu?: boolean;
}

const NavBar = ({
  checkLoading,
  hideMenu,
  emailModalOpen,
  setEmailModalOpen,
  passwordSetModalOpen,
  setPasswordSetModalOpen,
  passwordInputModalOpen,
  setPasswordInputModalOpen,
}: navProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const pathname = usePageViews();
  const subpath = useSubPath();
  const navigate = useNavigate();

  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);

  const mobileToggleHandler = () => {
    setIsMobile(!isMobile);
  };

  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const logoutHandler = async (email: string) => {
    setLogoutLoading(true);
    axios
      .post("/api/users/logout", {
        email,
        nation: pathname,
      })
      .then((res) => {
        if (res.data.success === true) {
          authDispatch({ type: "LOGOUT", authState });
          setLogoutSuccess(true);
        } else {
          alert(`Error: ${res.data.message}`);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLogoutLoading(false);
      });
  };

  // active router 감지 effect hook
  // useEffect(() => {
  //   if (document.querySelector(`.menu-link[href="/${pathname + subpath}"]`)) {
  //     document
  //       .querySelector(`.menu-link[href="/${pathname + subpath}"]`)
  //       ?.parentElement?.classList.add("active");
  //   } else {
  //     document
  //       .querySelector(`.submenu-link[href="/${pathname + subpath}"]`)
  //       ?.parentElement?.classList.add("active");
  //     document
  //       .querySelector(`.submenu-link[href="/${pathname + subpath}"]`)
  //       ?.parentElement?.parentElement?.parentElement?.parentElement?.classList.add(
  //         "active",
  //       );
  //   }
  // }, []);

  const { fullLogoURL } = globalData.get("common") as Common.globalDataType;
  const {
    logoURL,
    speakers,
    programs,
    lectureHall,
    exhibitHall,
    sponsors,
    greeting,
    attend,
    symposium,
    registration,
  } = globalData.get(pathname) as Common.globalDataType;

  return (
    <>
      <NavBarContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="nav-wrap"
        >
          <Link
            to={`/${pathname}`}
            className="logo-link"
            style={{ padding: "0px" }}
          >
            <img src={fullLogoURL} alt="logo" />
          </Link>
          {!hideMenu && (
            <>
              <Stack
                direction="row"
                alignSelf="flex-end"
                justifyContent="space-between"
                className="menu-item-wrap"
              >
                {speakers && (
                  <MenuLink to={`/${pathname}/speakers`}>{speakers}</MenuLink>
                )}
                {programs && (
                  <MenuLink to={`/${pathname}/program`}>{programs}</MenuLink>
                )}
                {lectureHall && (
                  <MenuLink to={`/${pathname}/lecture-hall`}>
                    {lectureHall}
                  </MenuLink>
                )}
                {exhibitHall && (
                  <MenuLink to={`/${pathname}/exhibit/parksystems`}>
                    {exhibitHall}
                  </MenuLink>
                )}
                {sponsors && (
                  <MenuLink to={`/${pathname}/sponsors`}>{sponsors}</MenuLink>
                )}
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignSelf="flex-end"
                className="login-wrap"
              >
                {authState.isLogin && !checkLoading && (
                  <>
                    {editorRole.includes(authState.role) && (
                      <NSSButton
                        type="button"
                        variant="primary"
                        style={{ fontWeight: 700 }}
                        onClick={() => {
                          navigate(`${pathname}/admin`);
                        }}
                      >
                        ADMIN
                      </NSSButton>
                    )}
                    <NSSButton
                      type="button"
                      variant="primary"
                      style={{ fontWeight: 700 }}
                      onClick={() => {
                        logoutHandler(authState.email);
                      }}
                    >
                      SIGN OUT
                    </NSSButton>
                  </>
                )}
                {!authState.isLogin && !checkLoading && (
                  <>
                    <EuropeLoginModal
                      setSuccess={setLoginSuccess}
                      setFailed={setLoginFailed}
                      emailModalOpen={emailModalOpen}
                      setEmailModalOpen={setEmailModalOpen}
                      setPasswordSetSuccessAlert={setPasswordSetSuccessAlert}
                      passwordSetModalOpen={passwordSetModalOpen}
                      setPasswordSetModalOpen={setPasswordSetModalOpen}
                      passwordInputModalOpen={passwordInputModalOpen}
                      setPasswordInputModalOpen={setPasswordInputModalOpen}
                    />
                    {registration && (
                      <NSSButton
                        variant="gradient"
                        onClick={() => {
                          navigate(`${pathname}/registration`);
                        }}
                        style={{ alignSelf: "center", fontWeight: 700 }}
                      >
                        {registration}
                      </NSSButton>
                    )}
                  </>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </NavBarContainer>
      <TopCenterSnackBar
        value={loginSuccess}
        setValue={setLoginSuccess}
        variant="filled"
        severity="success"
        content="Successfully signed in."
      />
      <TopCenterSnackBar
        value={loginFailed}
        setValue={setLoginFailed}
        variant="filled"
        severity="error"
        content="User info not matched."
      />
      <TopCenterSnackBar
        value={logoutSuccess}
        setValue={setLogoutSuccess}
        variant="filled"
        severity="info"
        content="Successfully signed out."
      />
      {/* 비밀번호 설정 성공 */}
      <TopCenterSnackBar
        value={passwordSetSuccessAlert}
        setValue={setPasswordSetSuccessAlert}
        variant="filled"
        severity="success"
        content="Password is successfully set."
      />
    </>
  );
};

export default NavBar;
