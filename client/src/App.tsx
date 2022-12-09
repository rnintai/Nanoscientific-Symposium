import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import EventLanding from "pages/common/EventLanding/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import Footer from "components/Footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import useSubPath from "hooks/useSubPath";
import { theme, jpTheme } from "theme/themes";
import PrivateRoute from "components/Route/PrivateRoute";
import LoginModal from "components/Modal/LoginModal";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import NotFound from "pages/common/NotFound/NotFound";
import useMenuStore from "store/MenuStore";
import useSeoTitle from "hooks/useSeoTitle";
import useConfigStore from "store/ConfigStore";
import LandingSection from "components/Section/LandingSection";
import { S3_URL } from "utils/GlobalData";
import useLoadingStore from "store/LoadingStore";
import useWindowSize from "hooks/useWindowSize";
import setMetaTag from "utils/MetaTag/SetMetaTag";
import CommonRoutes from "Routes/CommonRoutes";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import { useThemeState, useThemeDispatch } from "./context/ThemeContext";
import { useUnreadListDispatch } from "./context/UnreadAnnouncementList";
import { useAlarmDispatch } from "./context/NavBarMarkContext";
import AdminRoutes from "./Routes/AdminRoutes";
import AsiaRoutes from "./Routes/AsiaRoutes";
import KoreaRoutes from "./Routes/KoreaRoutes";
import UsRoutes from "./Routes/UsRoutes";
import EuropeRoutes from "./Routes/EuropeRoutes";
import JapanRoutes from "./Routes/JapanRoutes";
import Loading from "./components/Loading/Loading";
import { AppContainer } from "./AppStyles";
import "./css/font.css";

interface routeType {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
}

declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}

const gaID = "G-BS77NX7Z9T";

const App = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const themeState = useThemeState();
  const navigate = useNavigate();
  // 로그인 관련
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [passwordSetSuccessAlert, setPasswordSetSuccessAlert] =
    useState<boolean>(false);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const themeObj = theme(themeState.darkMode);
  const jpThemeObj = jpTheme(themeState.darkMode);
  const themeDispatch = useThemeDispatch();
  const alarmDispatch = useAlarmDispatch();
  const unreadAnnouncementListDispatch = useUnreadListDispatch();
  const { bannerLoading, setBannerLoading, landingListLoading } =
    useLoadingStore();
  // mode
  useEffect(() => {
    themeDispatch({ type: "LIGHTMODE" });
  }, []);

  // 로그인 모달 state
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [passwordSetModalOpen, setPasswordSetModalOpen] =
    useState<boolean>(false);
  const [passwordInputModalOpen, setPasswordInputModalOpen] =
    useState<boolean>(false);

  // subpath 가져오기
  const subpath = useSubPath();

  // banner
  const [bannerURL, setBannerURL] = useState<string>("");
  const calcAnnouncementCached = () => {
    axios
      .get(`/api/announcement/readlist?nation=${pathname}&id=${authState.id}`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.result) {
            // 모두 읽었을 때,(유저가 announcement를 읽었을 경우)
            alarmDispatch({ type: "OFF" });
            axios
              .post("/api/users/updateAnnouncementCache", {
                email: authState.email,
                nation: pathname,
                flag: "cached",
              })
              .then((res) => {
                if (res.data.success === true) {
                  console.log(res.data.msg);
                } else {
                  console.log(res.data.msg);
                }
              });
          } else if (!res.data.result) {
            console.log(res.data.result, res.data.unread);
            // 모두 읽지 않음
            alarmDispatch({ type: "ON" });
          }
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBanner = async () => {
    setBannerLoading(true);
    const banner = await axios.get(
      `/api/page/common/banner?nation=${pathname}&path=${encodeURIComponent(
        window.location.pathname
          .replace(`/${pathname}`, "")
          .replace(/\/+(\d)+/g, ""),
      )}`,
    );
    if (banner.data.success) {
      setBannerURL(banner.data.result);
    } else {
      console.log("poster-hall의 banner path를 DB에 추가해주세요~"); // 원래 poster-hall의 banner path는 따로 정해져있지 않다.
      setBannerURL("");
    }

    setBannerLoading(false);
  };

  useEffect(() => {
    axios
      .post("/api/users/check", {
        accessToken: authState.accessToken,
        nation: pathname === "" ? "" : pathname,
      })
      .then((res) => {
        /** 로그인 시, 페이지 이동 및 새로고침 할 때마다 검사 */
        if (res.data.success !== false) {
          const {
            accessToken,
            id,
            email,
            role,
            isPasswordSet,
            isNewAnnouncement,
            isAnnouncementCached,
          } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                id,
                email,
                role,
                accessToken,
                isPasswordSet,
                isLoading: false,
                isNewAnnouncement,
                isAnnouncementCached,
              },
            });
            console.log(
              "sNewAnnouncement",
              isNewAnnouncement,
              "isAnnouncementCached",
              isAnnouncementCached,
              "in App.tsx",
            );
            if (isAnnouncementCached) {
              alarmDispatch({ type: "OFF" });
            } else if (pathname !== "common") {
              calcAnnouncementCached();
            }
            if (isNewAnnouncement) {
              alarmDispatch({ type: "ON" });
            }
          }
          // 비밀번호 미설정 시 reset 시키기
          if (!isPasswordSet) {
            navigate(`/${pathname}/user/reset-password`);
          }
        } else {
          if (pathname !== "" && pathname !== "home") {
            console.log("LOGOUT");
            setLocalStorage();
          }
          authDispatch({
            type: "LOGOUT",
            authState: {
              ...authState,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        authDispatch({ type: "FINISHLOADING", authState: { ...authState } });
        // authState를 바로 사용할 수 없음 따라서, then내부에서 로그인할 때, 검사
      });

    //
  }, [authState.isLoading, pathname, subpath]);
  useEffect(() => {
    setDocumentTitle(useSeoTitle(pathname));

    // 스크롤 to top
    window.scrollTo(0, 0);
  }, [pathname, subpath, window.location.search]);

  // 로그아웃

  const routeLoopHelper = (route: routeType, isPrivate?: boolean) => {
    let resultElement = route.element;
    if (route.isPrivate || isPrivate) {
      resultElement = (
        <PrivateRoute setEmailModalOpen={setEmailModalOpen}>
          {route.element}
        </PrivateRoute>
      );
    }
    return <Route key={route.path} path={route.path} element={resultElement} />;
  };
  // menu state
  const [menuStateLoading, setMenuStateLoading] = useState<boolean>(true);
  // const [menuList, setMenuList] = useState<Common.menuType[]>(null);
  const menuStore = useMenuStore();
  const { menuList, currentMenu, setMenuList, setCurrentMenuState } = menuStore;
  const [documentTitle, setDocumentTitle] = useState<string>();

  // config state
  const configStore = useConfigStore();
  const { setConfigState } = configStore;

  const getConfig = async () => {
    const res = await axios.get(`/api/configuration?nation=${pathname}`);
    setConfigState(res.data.result);
  };

  const setLocalStorage = useCallback(async () => {
    console.log("setlocalstorage in App");
    const savedData = localStorage.getItem(`readAnnouncementList_${pathname}`);
    if (!savedData) {
      const readAnnouncementObj = {
        country: pathname,
        announcementList: [],
        announcementLength: 0,
        isAnnouncementCached: 0,
        isThereNewAnnouncement: 1,
      };

      localStorage.setItem(
        `readAnnouncementList_${pathname}`,
        JSON.stringify(readAnnouncementObj),
      );

      // 먼저 해당 지역에 해당하는 공지사항이 있는지 확인
      axios
        .get(`/api/announcement/originlist?nation=${pathname}`)
        .then((res) => {
          if (res.data.success) {
            if (typeof res.data.result === "number") {
              alarmDispatch({ type: "ON" }); // 있으면 알람표시
            } else {
              alarmDispatch({ type: "OFF" });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const parsedData = JSON.parse(savedData);
      if (
        // cache되어 있다면 불필요한 계산 x
        !parsedData.isAnnouncementCached
      ) {
        if (parsedData.isThereNewAnnouncement) {
          try {
            const response = await axios.get(
              `/api/announcement/originlist?nation=${pathname}`,
            );
            if (response.data.success) {
              parsedData.announcementLength = response.data.result;
            }
          } catch (err) {
            console.log("Error >>", err);
          } finally {
            parsedData.isThereNewAnnouncement = 0;
          }
        }
        if (
          parsedData.announcementList.length < parsedData.announcementLength
        ) {
          alarmDispatch({ type: "ON" });
        } else {
          alarmDispatch({ type: "OFF" });
        }
      }
      localStorage.setItem(
        `readAnnouncementList_${pathname}`,
        JSON.stringify(parsedData),
      );
    }
  }, [pathname, alarmDispatch]);

  useEffect(() => {
    if (pathname !== "" && pathname !== "home") {
      setMenuStateLoading(true);
      axios
        .get(`/api/menu/list?nation=${pathname}`)
        .then((res) => {
          setMenuList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setMenuStateLoading(false);
        });

      getConfig();
    }
  }, [pathname]);

  useEffect(() => {
    setCurrentMenuState(window.location.pathname);
    // ga
    const { title } = window.document;
    const { href } = window.location;
    const path = window.location.pathname;
    window.gtag("config", gaID, {
      page_title: title,
      page_location: href,
      page_path: path,
    });
  }, [menuList, window.location.href]);

  // doc title 변경
  useEffect(() => {
    // seo title
    document.title = currentMenu
      ? `${currentMenu.name.toUpperCase()} | ${documentTitle}`
      : documentTitle;
  }, [currentMenu, documentTitle]);

  // meta tag
  useEffect(() => {
    const { metaDescription, metaKeywords } = setMetaTag(pathname, subpath);
    const setMetaAttribute = (name: string, value: string) => {
      document
        .querySelector(`meta[name='${name}']`)
        .setAttribute("content", value);
    };
    setMetaAttribute("description", metaDescription);
    setMetaAttribute("keywords", metaKeywords);
  }, [window.location.href]);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      getBanner();
    } else {
      setBannerURL("");
    }
  }, [bannerURL, window.location.href]);

  useEffect(() => {
    if (pathname !== "common" && loginSuccess && authState.isLogin) {
      // 캐쉬가 되어있든 안되어있든 로그인하자마자 데이터 획득
      // useeffect memory error x
      if (window.location.pathname.includes("announcement")) {
        axios
          .get(
            `/api/announcement/readlist?nation=${pathname}&id=${authState.id}`,
          )
          .then((res) => {
            if (res.data.success) {
              unreadAnnouncementListDispatch({
                type: "INSERT_ANNOUNCEMENT",
                arr: res.data.unread,
              });
            } else {
              console.log(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      calcAnnouncementCached();
    }
  }, [loginSuccess]);

  if (authState.isLoading || bannerLoading)
    return (
      <ThemeProvider theme={themeObj}>
        <Loading />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={pathname === "jp" ? jpThemeObj : themeObj}>
      <AppContainer>
        {pathname !== "home" &&
          // pathname !== "" &&
          subpath.indexOf("admin") === -1 && (
            <NavBar
              checkLoading={authState.isLoading}
              setEmailModalOpen={setEmailModalOpen}
              setLogoutSuccess={setLogoutSuccess}
              setLogoutLoading={setLogoutLoading}
              menuStateLoading={menuStateLoading}
            />
          )}
        {!bannerLoading && bannerURL && (
          <LandingSection
            className="banner"
            background={`${S3_URL}/${bannerURL}`}
            maxWidth="1920px"
            fullWidth
          />
        )}
        <Routes>
          {/* common */}
          {/* <Route path="/" element={<EventLanding />} />
          <Route path="/on-demand" element={<EventLanding />} /> */}
          {CommonRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* asia */}
          {AsiaRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* korea */}
          {KoreaRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* us */}
          {UsRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* japan */}
          {JapanRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* europe */}
          {EuropeRoutes.map((route) => {
            return routeLoopHelper(route);
          })}
          {/* admin */}
          {AdminRoutes.map((route) => {
            return routeLoopHelper(route, true);
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {pathname !== "home" &&
          window.location.pathname.indexOf("admin") === -1 && <Footer />}

        {pathname !== "" && (
          <LoginModal
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
        )}

        {/* alert */}
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

        <TopCenterSnackBar
          value={passwordSetSuccessAlert}
          setValue={setPasswordSetSuccessAlert}
          variant="filled"
          severity="success"
          content="Password is successfully set."
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
