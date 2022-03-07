import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import EventLanding from "pages/common/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import Footer from "components/Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useSubPath from "hooks/useSubPath";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import AdminRoutes from "./Routes/AdminRoutes";
import AsiaRoutes from "./Routes/AsiaRoutes";
import KoreaRoutes from "./Routes/KoreaRoutes";
import UsRoutes from "./Routes/UsRoutes";
import EuropeRoutes from "./Routes/EuropeRoutes";
import JapanRoutes from "./Routes/JapanRoutes";
import Loading from "./components/Loading/Loading";
import { AppContainer } from "./AppStyles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false; // 900px
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Open Sans", sans-serif`,
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
const jpTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Noto Sans JP", sans-serif`,
    },
  },
  breakpoints: {
    // values: {
    //   mobile: 0,
    //   tablet: 640,
    //   laptop: 1024,
    //   desktop: 1280,
    // },
  },
});

const App = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  // 로그인 모달 state
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [passwordSetModalOpen, setPasswordSetModalOpen] =
    useState<boolean>(false);
  const [passwordInputModalOpen, setPasswordInputModalOpen] =
    useState<boolean>(false);

  // subpath 가져오기
  const subpath = useSubPath();

  //
  useEffect(() => {
    axios
      .post("/api/users/check", {
        accessToken: authState.accessToken,
        nation: pathname === "" ? "" : pathname,
      })
      .then((res) => {
        if (res.data.success !== false) {
          const { accessToken, email, role } = res.data.data;
          if (accessToken !== undefined) {
            authDispatch({
              type: "LOGIN",
              authState: {
                ...authState,
                isLogin: true,
                email,
                role,
                accessToken,
                isLoading: false,
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        authDispatch({ type: "FINISHLOADING", authState: { ...authState } });
      });
  }, [authState.isLoading]);

  if (authState.isLoading) return <Loading />;

  return (
    <ThemeProvider theme={pathname === "jp" ? jpTheme : theme}>
      <AppContainer>
        {pathname !== "" &&
          pathname !== "admin" &&
          pathname !== "jp" &&
          window.location.pathname !== "/eu/registration" && (
            <NavBar
              key={subpath}
              checkLoading={authState.isLoading}
              passwordSetModalOpen={passwordSetModalOpen}
              emailModalOpen={emailModalOpen}
              setEmailModalOpen={setEmailModalOpen}
              setPasswordSetModalOpen={setPasswordSetModalOpen}
              passwordInputModalOpen={passwordInputModalOpen}
              setPasswordInputModalOpen={setPasswordInputModalOpen}
            />
          )}
        {pathname === "jp" && (
          <NavBar
            key={subpath}
            checkLoading={authState.isLoading}
            hideMenu
            emailModalOpen={emailModalOpen}
            setEmailModalOpen={setEmailModalOpen}
            passwordSetModalOpen={passwordSetModalOpen}
            setPasswordSetModalOpen={setPasswordSetModalOpen}
            passwordInputModalOpen={passwordInputModalOpen}
            setPasswordInputModalOpen={setPasswordInputModalOpen}
          />
        )}
        <Routes>
          {/* common */}
          <Route path="/" element={<EventLanding />} />

          {/* asia */}
          {AsiaRoutes.map((asiaRoute) => (
            <Route
              key={asiaRoute.path}
              path={asiaRoute.path}
              element={asiaRoute.element}
            />
          ))}

          {/* korea */}
          {KoreaRoutes.map((koreaRoute) => (
            <Route
              key={koreaRoute.path}
              path={koreaRoute.path}
              element={koreaRoute.element}
            />
          ))}

          {/* us */}
          {UsRoutes.map((usRoute) => (
            <Route
              key={usRoute.path}
              path={usRoute.path}
              element={usRoute.element}
            />
          ))}

          {/* japan */}
          {JapanRoutes.map((japanRoute) => (
            <Route
              key={japanRoute.path}
              path={japanRoute.path}
              element={japanRoute.element}
            />
          ))}

          {/* europe */}
          {EuropeRoutes.map((europeRoute) => (
            <Route
              key={europeRoute.path}
              path={europeRoute.path}
              element={europeRoute.element}
            />
          ))}

          {/* admin */}
          {AdminRoutes.map((adminRoute) => (
            <Route
              key={adminRoute.path}
              path={adminRoute.path}
              element={adminRoute.element}
            />
          ))}
        </Routes>
        {pathname !== "" && pathname !== "admin" && pathname !== "jp" && (
          <Footer />
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
