import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavBarContainer } from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";

interface globalDataType {
  logoURL: string;
  speakers?: string;
  programs: string;
  lectureHall: string;
  exhibitHall: string;
  sponsors: string;
  greeting?: string;
  attend?: string;
  symposium?: string;
}

const NavBar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const mobileToggleHandler = () => {
    setIsMobile(!isMobile);
  };

  const pathname = usePageViews();

  const globalData = new Map<string, globalDataType>([
    [
      "/asia",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
        speakers: "sss  sssss sssad",
        programs: "PROGRAMS",
        lectureHall: "LECTURE HALL",
        exhibitHall: "EXHIBIT HALL",
        sponsors: "SPONSORS",
      },
    ],
    [
      "/kr",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/kr/NS_logo.svg",
        symposium: "심포지엄 안내",
        programs: "프로그램",
        lectureHall: "온라인 강연장",
        exhibitHall: "전시부스 ",
        sponsors: "협찬사",
      },
    ],
    [
      "/latam",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/latam/NS_logo.svg",
        speakers: "SPEAKERS",
        programs: "PROGRAMS",
        lectureHall: "LECTURE HALL",
        exhibitHall: "EXHIBIT HALL",
        sponsors: "SPONSORS",
      },
    ],
    [
      "/jp",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/jp/NS_logo.svg",
        speakers: "講演者",
        programs: "プログラム",
        lectureHall: "Web講演会",
        exhibitHall: "展示会",
        sponsors: "スポンサー",
        greeting: "ごあいさつ",
        attend: "参加手順",
      },
    ],
    [
      "/us",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/us/NS_logo.svg",
        speakers: "SPEAKERS",
        programs: "PROGRAMS",
        lectureHall: "LECTURE HALL",
        exhibitHall: "EXHIBIT HALL",
        sponsors: "SPONSORS",
      },
    ],
    [
      "/europe",
      {
        logoURL: "https://d25unujvh7ui3r.cloudfront.net/eu/NS_logo.svg",
        speakers: "SPEAKERS",
        programs: "PROGRAMS",
        lectureHall: "LECTURE HALL",
        exhibitHall: "EXHIBIT HALL",
        sponsors: "SPONSORS",
      },
    ],
  ]);

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
  } = globalData.get(pathname) as globalDataType;
  return (
    <NavBarContainer>
      <nav className={`nav-wrap${isMobile ? " mobile-menu-on" : ""}`}>
        <section className="col-logo">
          <Link to={`${pathname}`} className="logo-link">
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
          <ul className="menu-list">
            {symposium && (
              <li className="menu-item has-submenu">
                <Link to={`${pathname}/`} className="menu-link">
                  {symposium} <i className="fas fa-caret-down" />
                </Link>
                <div className="drop-down-wrap">
                  <ul className="drop-down-list">
                    <li className="drop-down-item">
                      <Link
                        className="submenu-link"
                        to={`${pathname}/speakers`}
                      >
                        초청 연사
                      </Link>
                    </li>
                    <li className="drop-down-item">
                      <Link className="submenu-link" to={`${pathname}/attend`}>
                        행사장 안내
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {greeting && (
              <li className="menu-item">
                <Link className="menu-link" to={`${pathname}/greeting`}>
                  {greeting}
                </Link>
              </li>
            )}
            {speakers && (
              <li className="menu-item">
                <Link className="menu-link" to={`${pathname}/speakers`}>
                  {speakers}
                </Link>
              </li>
            )}
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/programs`}>
                {programs}
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/lecture-hall`}>
                {lectureHall}
              </Link>
            </li>
            {attend && (
              <li className="menu-item">
                <Link className="menu-link" to={`${pathname}/attend`}>
                  {attend}
                </Link>
              </li>
            )}
            <li className="menu-item has-submenu">
              <Link
                to={`${pathname}/exhibit/parksystems`}
                className="menu-link"
              >
                {exhibitHall}
                <i className="fas fa-caret-down" />
              </Link>
              <div className="drop-down-wrap">
                <ul className="drop-down-list">
                  <li className="drop-down-item">
                    <Link
                      className="submenu-link"
                      to={`${pathname}/exhibit/parksystems`}
                    >
                      PARK SYSTEMS
                    </Link>
                  </li>
                  <li className="drop-down-item">
                    <Link
                      className="submenu-link"
                      to={`${pathname}/exhibit/nanoscientific`}
                    >
                      NANOSCIENTIFIC
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/sponsors`}>
                {sponsors}
              </Link>
            </li>
          </ul>
        </section>
        <section className="col-login">
          <ul className="login-list">
            <li className="login-item menu-logged-in">
              <Link className="menu-link" to="/my-account">
                MY PAGE
              </Link>
            </li>
            <li className="login-item menu-logged-in">
              <Link className="menu-link" to="/wp-login.php?action=logout">
                SIGN OUT
              </Link>
            </li>
            <li className="login-item menu-logged-out">
              <Link className="menu-link remember-prev" to="/sign-in">
                SIGN IN
              </Link>
            </li>
            <li className="login-item menu-logged-out">
              <Link
                className="menu-link boxed remember-prev"
                to="/registration"
              >
                REGISTRATION
              </Link>
            </li>
          </ul>
        </section>
      </nav>
    </NavBarContainer>
  );
};

export default NavBar;
