import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {NavBarContainer} from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";


const NavBar = () => {


  const [isMobile,setIsMobile] = useState<boolean>(false)

  const mobileToggleHandler = () => {
    setIsMobile(!isMobile)
  }

  const pathname = usePageViews()

  return (
    <NavBarContainer>
      <nav className={'nav-wrap' + (isMobile ? ' mobile-menu-on' : '')}>
        <section className="col-logo">
          <Link to={`${pathname}`} className="logo-link">
            <img src="https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg" alt=""/>
          </Link>
          <div className='mobile-menu-btn' onClick={mobileToggleHandler}>
            <i className="fas fa-bars"></i>
          </div>
        </section>
        <section className="col-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/speakers`}>SPEAKERS</Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/programs`}>PROGRAMS</Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/lecture-hall`}>LECTURE HALL</Link>
            </li>
            <li className="menu-item has-submenu">
              <Link to={`${pathname}/exhibit/parksystems`} className="menu-link">EXHIBIT HALL
                <i className="fas fa-caret-down"></i>
              </Link>
              <div className="drop-down-wrap">
                <ul className="drop-down-list">
                  <li className="drop-down-item">
                    <Link className="submenu-link" to={`${pathname}/exhibit/parksystems`}>PARK SYSTEMS</Link>
                  </li>
                  <li className="drop-down-item">
                    <Link className="submenu-link" to={`${pathname}/exhibit/nanoscientific`}>NANOSCIENTIFIC</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to={`${pathname}/sponsors`}>SPONSORS</Link>
            </li>
          </ul>
        </section>
        <section className="col-login">
          <ul className="login-list">
            <li className="login-item menu-logged-in">
              <Link className="menu-link" to="/my-account">MY PAGE</Link>
            </li>
            <li className="login-item menu-logged-in">
              <Link className="menu-link" to="/wp-login.php?action=logout">SIGN OUT</Link>
            </li>
            <li className="login-item menu-logged-out">
              <Link className="menu-link remember-prev" to="/sign-in">SIGN IN</Link>
            </li>
            <li className="login-item menu-logged-out">
              <Link className="menu-link boxed remember-prev" to="/registration">REGISTRATION</Link>
            </li>
          </ul>
        </section>
      </nav>

    </NavBarContainer>
  );
}

export default NavBar;