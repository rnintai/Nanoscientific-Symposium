import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavBarContainer } from "components/NavBarNew/NavBarStyles";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { LoadingButton } from "@mui/lab";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { editorRole } from "utils/Roles";
import useSubPath from "hooks/useSubPath";
import { Stack } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import MenuLink from "components/Link/MenuLink";
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

export const globalData = new Map<string, Common.globalDataType>([
  [
    "asia",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
    },
  ],
  [
    "kr",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/kr/NS_logo.svg",
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      sponsors: "협찬사",
      home: "홈",
      registration: "등록",
    },
  ],
  [
    "latam",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/latam/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
    },
  ],
  [
    "jp",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/jp/NS_logo.svg",
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",
      registration: "登録",
    },
  ],
  [
    "us",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/us/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
    },
  ],
  [
    "eu",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/eu/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
    },
  ],
]);

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
  useEffect(() => {
    if (document.querySelector(`.menu-link[href="/${pathname + subpath}"]`)) {
      document
        .querySelector(`.menu-link[href="/${pathname + subpath}"]`)
        ?.parentElement?.classList.add("active");
    } else {
      document
        .querySelector(`.submenu-link[href="/${pathname + subpath}"]`)
        ?.parentElement?.classList.add("active");
      document
        .querySelector(`.submenu-link[href="/${pathname + subpath}"]`)
        ?.parentElement?.parentElement?.parentElement?.parentElement?.classList.add(
          "active",
        );
    }
  }, []);

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
  } = globalData.get(pathname) as Common.globalDataType;

  return (
    <NavBarContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="nav-wrap"
      >
        <Link to={`/${pathname}`} className="logo-link">
          <img src={logoURL} alt="logo" />
        </Link>
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
            <MenuLink className="menu-link" to={`/${pathname}/program`}>
              {programs}
            </MenuLink>
          )}
          {lectureHall && (
            <MenuLink className="menu-link" to={`/${pathname}/lecture-hall`}>
              {lectureHall}
            </MenuLink>
          )}
          {exhibitHall && (
            <MenuLink
              className="menu-link"
              to={`/${pathname}/exhibit/parksystems`}
            >
              {exhibitHall}
            </MenuLink>
          )}
          {sponsors && (
            <MenuLink className="menu-link" to={`/${pathname}/sponsors`}>
              {sponsors}
            </MenuLink>
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
                <Link className="menu-link" to={`${pathname}/admin`}>
                  ADMIN
                </Link>
              )}
              <LoadingButton
                className="menu-link"
                style={{ fontFamily: "inherit", fontWeight: "500" }}
                onClick={() => {
                  logoutHandler(authState.email);
                }}
              >
                SIGN OUT
              </LoadingButton>
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
              {/* <LoginModal
                        setSuccess={setLoginSuccess}
                        setFailed={setLoginFailed}
                       /> */}
              <NSSButton
                variant="gradient"
                onClick={() => {
                  navigate(`${pathname}/registration`);
                }}
                style={{ alignSelf: "center" }}
              >
                REGISTRATION
              </NSSButton>
            </>
          )}
        </Stack>
      </Stack>
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
    </NavBarContainer>
  );
};

export default NavBar;
