import React, { useState, useEffect } from "react";
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
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import { useThemeState, useThemeDispatch } from "./context/ThemeContext";
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
  // const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  // const [imagePath, setImagePath] = useState<string>("");
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
      setBannerURL("");
    }
    setBannerLoading(false);
  };

  //
  useEffect(() => {
    //
    axios
      .post("/api/users/check", {
        accessToken: authState.accessToken,
        nation: pathname === "" ? "" : pathname,
      })
      .then((res) => {
        if (res.data.success !== false) {
          const { accessToken, email, role, isPasswordSet } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                email,
                role,
                accessToken,
                isPasswordSet,
                isLoading: false,
              },
            });
          }
          // 비밀번호 미설정 시 reset 시키기
          if (!isPasswordSet) {
            navigate(`/${pathname}/user/reset-password`);
          }
        } else {
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
          pathname !== "" &&
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
          <Route path="/" element={<EventLanding />} />
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
