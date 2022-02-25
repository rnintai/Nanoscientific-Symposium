import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavBarContainer } from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { LoadingButton } from "@mui/lab";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { countries } from "utils/Countries";
import LoginModal from "../Modal/LoginModal";
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
      greeting: "ごあいさつ",
      attend: "参加手順",
      // speakers: "",
      // programs: "",
      // lectureHall: "",
      // sponsors: "",
      // greeting: "",
      // attend: "",
      archive: "アーカイブ",
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

  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);

  const mobileToggleHandler = () => {
    setIsMobile(!isMobile);
  };

  const pathname = usePageViews();
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
      <nav className={`nav-wrap${isMobile ? " mobile-menu-on" : ""}`}>
        <section className="col-logo">
          <Link to={`/${pathname}`} className="logo-link">
            <img src={logoURL} alt="logo" />
          </Link>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={mobileToggleHandler}
          >
            <i className="fas fa-bars" />
          </button>
        </section>
        <section className="col-menu">
          <ul className={hideMenu ? "menu-list hide" : "menu-list"}>
            {symposium && (
              <li className="menu-item has-submenu">
                <Link to={`/${pathname}/`} className="menu-link">
                  {symposium} <i className="fas fa-caret-down" />
                </Link>
                <div className="drop-down-wrap">
                  <ul className="drop-down-list">
                    <li className="drop-down-item">
                      <Link
                        className="submenu-link"
                        to={`/${pathname}/speakers`}
                      >
                        초청 연사
                      </Link>
                    </li>
                    <li className="drop-down-item">
                      <Link className="submenu-link" to={`/${pathname}/attend`}>
                        행사장 안내
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {greeting && (
              <li className="menu-item">
                <Link className="menu-link" to={`/${pathname}/greeting`}>
                  {greeting}
                </Link>
              </li>
            )}
            {speakers && !symposium && (
              <li className="menu-item">
                <Link className="menu-link" to={`/${pathname}/speakers`}>
                  {speakers}
                </Link>
              </li>
            )}
            <li className="menu-item">
              <Link className="menu-link" to={`/${pathname}/programs`}>
                {programs}
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`/${pathname}/lecture-hall`}>
                {lectureHall}
              </Link>
            </li>
            {attend && (
              <li className="menu-item">
                <Link className="menu-link" to={`/${pathname}/attend`}>
                  {attend}
                </Link>
              </li>
            )}
            <li className="menu-item has-submenu">
              <Link
                to={`/${pathname}/exhibit/parksystems`}
                className="menu-link"
              >
                {exhibitHall}
                {pathname !== "jp" && <i className="fas fa-caret-down" />}
              </Link>
              <div className="drop-down-wrap">
                <ul className="drop-down-list">
                  <li className="drop-down-item">
                    <Link
                      className="submenu-link"
                      to={`/${pathname}/exhibit/parksystems`}
                    >
                      PARK SYSTEMS
                    </Link>
                  </li>
                  <li className="drop-down-item">
                    <Link
                      className="submenu-link"
                      to={`/${pathname}/exhibit/nanoscientific`}
                    >
                      NANOSCIENTIFIC
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`/${pathname}/sponsors`}>
                {sponsors}
              </Link>
            </li>
          </ul>
        </section>
        {pathname !== "jp" && (
          <section className="col-login">
            <ul className="login-list">
              {authState.isLogin && !checkLoading && (
                <>
                  {countries.includes(authState.role) && (
                    <li className="login-item">
                      <Link className="menu-link" to={`${pathname}/admin`}>
                        ADMIN
                      </Link>
                    </li>
                  )}
                  <li className="login-item">
                    <LoadingButton
                      className="menu-link"
                      style={{ fontFamily: "inherit" }}
                      onClick={() => {
                        logoutHandler(authState.email);
                      }}
                    >
                      SIGN OUT
                    </LoadingButton>
                  </li>
                </>
              )}
              {!authState.isLogin && !checkLoading && (
                <>
                  <li className="login-item">
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
                    )
                  </li>
                  <li className="login-item">
                    <Link
                      className="menu-link boxed remember-prev"
                      to={`${pathname}/registration`}
                    >
                      REGISTRATION
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </section>
        )}
      </nav>
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
