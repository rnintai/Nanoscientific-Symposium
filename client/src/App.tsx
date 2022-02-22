import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import EventLanding from "pages/common/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import Footer from "components/Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";
import AdminRoutes from "./Routes/AdminRoutes";
import AsiaRoutes from "./Routes/AsiaRoutes";
import KoreaRoutes from "./Routes/KoreaRoutes";
import UsRoutes from "./Routes/UsRoutes";
import EuropeRoutes from "./Routes/EuropeRoutes";
import JapanRoutes from "./Routes/JapanRoutes";
import Loading from "./components/Loading/Loading";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Open Sans", "Noto Sans JP", "sans-serif"].join(","),
    },
  },
});
const jpTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Noto Sans JP", "Open Sans", "sans-serif"].join(","),
    },
  },
});

const App = () => {
  const pathname = usePageViews();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
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
  }, []);
  if (authState.isLoading) return <Loading />;

  return (
    <ThemeProvider theme={pathname === "jp" ? jpTheme : theme}>
      {pathname !== "" &&
        pathname !== "admin" &&
        window.location.pathname !== "/eu/registration" && (
          <NavBar checkLoading={authState.isLoading} />
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
    </ThemeProvider>
  );
};

export default App;
