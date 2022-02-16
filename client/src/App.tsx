import React, { useState, useEffect } from "react";
import axios from "axios";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import { Routes, Route } from "react-router-dom";
import EventLanding from "pages/common/EventLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Footer from "components/Footer/Footer";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import AsiaLectureHall from "pages/asia/AsiaLectureHall";
import UsSpeakers from "pages/us/UsSpeakers/UsSpeakers";
import UsPrograms from "pages/us/UsPrograms/UsPrograms";
import UsLectureHall from "pages/us/UsLectureHall";
import JapanExhibitParkSystems from "pages/japan/JapanExhibitParkSystems";
import AdminRoute from "components/Route/AdminRoute";
import JapanSpeakers from "pages/japan/JapanSpeakers/JapanSpeakers";
import Programs from "pages/common/Programs/Programs";
import JapanAttend from "pages/japan/JapanAttend/JapanAttend";
import JapanLectureHall from "pages/japan/JapanLectureHall";
import Sponsors from "pages/common/Sponsors";
import Speakers from "pages/common/Speakers/Speakers";
import KoreaAttend from "pages/korea/KoreaAttend/KoreaAttend";
import KoreaLectureHall from "pages/korea/KoreaLectureHall";
import Landing from "pages/common/Landing";
import LatamLectureHall from "pages/latam/LatamLectureHall";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";
import AdminUsers from "pages/admin/AdminUsers/AdminUsers";
import JapanArchive from "pages/japan/JapanArchive/JapanArchive";
import { useAuthState, useAuthDispatch } from "./context/AuthContext";

const App = () => {
  const [checkLoading, setCheckLoading] = useState<boolean>(false);

  const pathname = usePageViews();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  let nation = "";
  if (pathname === "admin") {
    nation = authState.role;
  } else if (pathname === "") {
    nation = "";
  } else {
    nation = pathname;
  }

  useEffect(() => {
    setCheckLoading(true);
    axios
      .post("/api/users/check", {
        accessToken: authState.accessToken,
        nation,
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
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCheckLoading(false);
      });
  }, []);

  return (
    <>
      {pathname !== "" &&
        pathname !== "admin" &&
        window.location.pathname !== "/eu/registration" && (
          <NavBar checkLoading={checkLoading} />
        )}
      <Routes>
        {/* common */}
        <Route path="/" element={<EventLanding />} />
        {/* asia */}
        <Route path="/asia/" element={<Landing />} />
        <Route path="/asia/lecture-hall" element={<AsiaLectureHall />} />
        <Route
          path="/asia/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/asia/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />
        <Route path="/asia/sponsors" element={<Sponsors />} />
        <Route path="/asia/programs" element={<Programs />} />
        <Route path="/asia/speakers" element={<Speakers />} />

        {/* korea */}
        <Route path="/kr/" element={<Landing />} />
        <Route path="/kr/speakers" element={<Speakers />} />
        <Route path="/kr/attend" element={<KoreaAttend />} />
        <Route path="/kr/programs" element={<Programs />} />
        <Route path="/kr/lecture-hall" element={<KoreaLectureHall />} />

        <Route
          path="/kr/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/kr/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />

        <Route path="/kr/sponsors" element={<Sponsors />} />

        {/* latam */}
        <Route path="/latam/" element={<Landing />} />
        <Route path="/latam/lecture-hall" element={<LatamLectureHall />} />
        <Route
          path="/latam/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/latam/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />
        <Route path="/latam/sponsors" element={<Sponsors />} />
        <Route path="/latam/programs" element={<Programs />} />
        <Route path="/latam/speakers" element={<Speakers />} />

        {/* us */}

        <Route path="/us/" element={<Landing />} />
        <Route path="/us/lecture-hall" element={<UsLectureHall />} />

        <Route
          path="/us/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/us/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />

        <Route path="/us/sponsors" element={<Sponsors />} />
        <Route path="/us/speakers" element={<UsSpeakers />} />
        <Route path="/us/programs" element={<UsPrograms />} />
        {/* japan */}

        <Route path="/jp/" element={<Landing />} />
        <Route path="/jp/greeting" element={<JapanGreeting />} />
        <Route path="/jp/programs" element={<Programs />} />
        <Route path="/jp/speakers" element={<JapanSpeakers />} />
        <Route path="/jp/attend" element={<JapanAttend />} />
        <Route path="/jp/lecture-hall" element={<JapanLectureHall />} />
        <Route path="/jp/sponsors" element={<Sponsors />} />
        <Route path="/jp/archive" element={<JapanArchive />} />

        <Route
          path="/jp/exhibit/parksystems"
          element={<JapanExhibitParkSystems />}
        />
        <Route
          path="/jp/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />

        {/* europe */}
        <Route path="/eu/registration" element={<EuropeRegistration />} />

        {/* admin */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/programs"
          element={
            <AdminRoute>
              <AdminPrograms />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/speakers"
          element={
            <AdminRoute>
              <AdminSpeakers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
      </Routes>

      {pathname !== "" && pathname !== "admin" && <Footer />}
    </>
  );
};

export default App;
