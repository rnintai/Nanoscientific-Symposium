import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Link from "components/Link/LinkWithSearch";
import { useNavigate } from "react-router";
import {
  NavBarContainer,
  AnnouncementMenuItemContainer,
  AnnouncementAlarm,
} from "components/NavBar/NavBarStyles";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import { useAlarmState, useAlarmDispatch } from "context/NavBarMarkContext";
import { LoadingButton } from "@mui/lab";
import { editorRole } from "utils/Roles";
import useSubPath from "hooks/useSubPath";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import useNSSType from "hooks/useNSSType";
import {
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Stack,
  Box,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import MenuLink from "components/Link/MenuLink";
import { globalData } from "utils/GlobalData";
import { useYearList } from "utils/useYear";
import PersonIcon from "@mui/icons-material/Person";

import { mainFontSize, smallFontSize } from "utils/FontSize";
import PublicIcon from "@mui/icons-material/Public";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMenuStore from "store/MenuStore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useCurrentYear from "hooks/useCurrentYear";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageSwitcher from "components/LanguageSwitcher/LanguageSwitcher";
import useCurrentURL from "hooks/useCurrentURL";
import useAdminStore from "store/AdminStore";
import MobileNavBar from "./MobileNavBar";

interface navProps {
  checkLoading: boolean;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  menuStateLoading: boolean;
  // eslint-disable-next-line react/require-default-props
  hideMenu?: boolean;
  // markAnnouncementAlarm: boolean;
}

const NavBar = ({
  checkLoading,
  hideMenu,
  setEmailModalOpen,
  setLogoutSuccess,
  setLogoutLoading,
  menuStateLoading,
}: // markAnnouncementAlarm,
navProps) => {
  // menu list
  const menuStore = useMenuStore();
  const { menuList } = menuStore;
  const [userMenuanchorEl, setUserMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [moreMenuanchorEl, setMoreMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(userMenuanchorEl);
  const openMoreMenu = Boolean(moreMenuanchorEl);
  const [langMenuAnchorEl, setLangMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!authState.isLogin && !checkLoading) {
      setEmailModalOpen(true);
    } else {
      setUserMenuAnchorEl(event.currentTarget);
    }
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };
  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };
  const { search } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  const pathname = usePageViews();
  const nssType = useNSSType();
  const subpath = useSubPath();
  const navigate = useNavigate();
  const theme = useTheme();

  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const alarmState = useAlarmState();
  const alarmDispatch = useAlarmDispatch();
  const currentYear = useCurrentYear();

  // submenu refs
  const submenuRefs = useRef({});

  const { currentLanguage, setCurrentLanguage, currentNation } =
    useAdminStore();

  const isEnglish = currentLanguage === "english";
  const isChinese = currentLanguage === "china";

  //
  const nationAndYear =
    pathname !== "common" ? `${pathname}/${currentYear}` : "";

  const logoutHandler = async (email: string) => {
    setLogoutLoading(true);
    axios
      .post("/api/users/logout", {
        email,
        nation: currentNation,
        year: currentYear || "2022",
      })
      .then((res) => {
        if (res.data.success === true) {
          alarmDispatch({ type: "OFF" });
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
        navigate(0);
      });
  };

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const {
    logoURL,
    registration,
    signInText,
    adminBtnText,
    signOutBtnText,
    changePasswordBtnText,
  } = globalData.get(nssType) as Common.globalDataType;

  return (
    <NavBarContainer className={`${openMobileNav ? "mobile" : ""}`}>
      <NSSButton
        variant="icon"
        className="return-main-btn"
        style={{ position: "absolute", padding: "8px 8px 8px 0" }}
        onClick={() => {
          window.location.href = `https://event.nanoscientific.org`;
        }}
      >
        <ChevronLeftIcon />
        <PublicIcon sx={{ marginLeft: "-4px" }} />
      </NSSButton>
      {!menuStateLoading && (
        <Stack
          direction="row"
          alignItems="center"
          className="nav-wrap"
          justifyContent="center"
        >
          <IconButton className="mobile-menu-btn" onClick={toggleMobileNav}>
            <MenuIcon />
          </IconButton>
          <Link
            to={pathname === "common" ? "/" : nationAndYear}
            className={`${hideMenu ? "logo-link disabled" : "logo-link"}`}
            style={{ padding: "0px" }}
          >
            <img src={logoURL} alt="logo" />
          </Link>
          <div className="menu-container">
            <Stack
              direction="row"
              alignSelf="flex-end"
              className="menu-item-wrap"
            >
              {!menuStateLoading &&
                menuList &&
                menuList.map((menu) => {
                  if (
                    (menu.show || editorRole.includes(authState.role)) &&
                    menu.is_main &&
                    !menu.parent &&
                    !menu.has_child
                  ) {
                    return (
                      <MenuLink
                        key={menu.name}
                        to={`${nationAndYear}${menu.path}`}
                        className={menu.show === 0 && "op5"}
                      >
                        {menu.name.toUpperCase()}
                      </MenuLink>
                    );
                  }
                  if (
                    menu.has_child &&
                    (menu.show || editorRole.includes(authState.role))
                  ) {
                    return (
                      <Box
                        key={menu.name}
                        className={`parent${menu.show === 0 ? " op5" : ""}`}
                        ref={(element) => {
                          submenuRefs.current[menu.id] = element;
                        }}
                        onMouseOver={() => {
                          if (!openMobileNav) {
                            submenuRefs.current[menu.id].classList.add(
                              "active",
                            );
                          }
                        }}
                        onMouseOut={() => {
                          if (!openMobileNav) {
                            submenuRefs.current[menu.id].classList.remove(
                              "active",
                            );
                          }
                        }}
                        onClick={() => {
                          if (openMobileNav) {
                            if (
                              submenuRefs.current[menu.id].classList.contains(
                                "active",
                              )
                            ) {
                              submenuRefs.current[menu.id].classList.remove(
                                "active",
                              );
                            } else {
                              submenuRefs.current[menu.id].classList.add(
                                "active",
                              );
                            }
                          }
                        }}
                      >
                        <Box>
                          <Box
                            className={`parent-label${
                              `${pathname + subpath}`.indexOf(
                                `${nationAndYear + menu.path}`,
                              ) !== -1
                                ? " hover"
                                : ""
                            }`}
                          >
                            <Typography
                              component="span"
                              sx={{
                                padding: "10px",
                              }}
                              fontWeight={theme.typography.fontWeightBold}
                              fontSize={mainFontSize}
                            >
                              {menu.name.toUpperCase()}
                            </Typography>
                            <KeyboardArrowDownIcon />
                          </Box>
                          <Box component="ul" className="child-container">
                            {menuList
                              .filter((m) => m.parent === menu.id)
                              .map((m) => {
                                if (
                                  m.show ||
                                  editorRole.includes(authState.role)
                                ) {
                                  return (
                                    <Box
                                      key={m.id}
                                      component="li"
                                      className={`child-item${
                                        `${nationAndYear}${m.path}` ===
                                        `${pathname + subpath}`
                                          ? " active"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        key={m.name}
                                        to={`${nationAndYear}${m.path}`}
                                      >
                                        <Typography
                                          fontSize={smallFontSize}
                                          fontWeight={600}
                                        >
                                          {m.name}
                                        </Typography>
                                      </Link>
                                    </Box>
                                  );
                                }
                                return null;
                              })}
                          </Box>
                        </Box>
                      </Box>
                    );
                  }
                  return null;
                })}
              <div className="user-menu-wrap">
                {(menuList.filter((m) => !m.is_main && m.show).length !== 0 ||
                  (editorRole.includes(authState.role) &&
                    menuList.filter((m) => !m.is_main).length !== 0)) && (
                  <>
                    {pathname === "china" ? <LanguageSwitcher /> : undefined}
                    <NSSButton
                      id="basic-button"
                      className="user-menu"
                      type="button"
                      variant="icon"
                      onClick={handleMoreMenuClick}
                      aria-controls={openUserMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openUserMenu ? "true" : undefined}
                      isMoreverIcon
                      // markAnnouncementAlarm={markAnnouncementAlarm}
                    >
                      <MoreVertIcon />
                    </NSSButton>
                    <Menu
                      id="basic-menu"
                      open={openMoreMenu}
                      onClose={handleMoreMenuClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      anchorEl={moreMenuanchorEl}
                      disableScrollLock
                    >
                      <MenuList dense>
                        {menuList
                          .filter((m) => !m.is_main)
                          .map((m) => {
                            if (m.show || editorRole.includes(authState.role)) {
                              return (
                                <Link
                                  to={`${nationAndYear}${m.path}`}
                                  onClick={handleMoreMenuClose}
                                >
                                  <AnnouncementMenuItemContainer
                                    key={`menu-${m.id}`}
                                    className={m.name}
                                  >
                                    {m.name.toLowerCase() === "announcement" &&
                                    alarmState.alarm ? (
                                      <AnnouncementAlarm />
                                    ) : null}
                                    {m.name}
                                  </AnnouncementMenuItemContainer>
                                </Link>
                              );
                            }
                            return null;
                          })}
                      </MenuList>
                    </Menu>
                  </>
                )}
                <NSSButton
                  id="basic-button"
                  className="user-menu"
                  type="button"
                  variant="icon"
                  onClick={handleUserMenuClick}
                  aria-controls={openUserMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserMenu ? "true" : undefined}
                >
                  <PersonIcon />
                </NSSButton>
                <Menu
                  id="basic-menu"
                  open={openUserMenu}
                  onClose={handleUserMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorEl={userMenuanchorEl}
                  disableScrollLock
                >
                  {authState.isLogin && !checkLoading && (
                    <MenuList dense>
                      {pathname !== "common" &&
                        editorRole.includes(authState.role) && (
                          <MenuItem>
                            <Link
                              to={`${nationAndYear}/admin`}
                              target="_blank"
                              style={{
                                padding: 0,
                                color: "rgba(0,0,0,0.87)",
                              }}
                            >
                              {adminBtnText || "Admin Page"}
                            </Link>
                          </MenuItem>
                        )}
                      <MenuItem
                        onClick={() => {
                          handleUserMenuClose();
                          navigate(`${pathname}/user/reset-password`);
                        }}
                      >
                        {changePasswordBtnText || "Change Password"}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          logoutHandler(authState.email);
                        }}
                      >
                        {signOutBtnText || "Sign out"}
                      </MenuItem>
                    </MenuList>
                  )}
                </Menu>
              </div>
            </Stack>
          </div>
        </Stack>
      )}
      <Box
        className="overlay"
        sx={{
          backgroundColor: "#000",
          position: "absolute",
        }}
        onClick={() => {
          setOpenMobileNav(false);
        }}
      />
    </NavBarContainer>
  );
};

export default NavBar;
