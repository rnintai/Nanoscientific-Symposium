import React from "react";
import ExhibitParkSystems from "pages/common/AsiaExhibit/ExhibitParkSystems";
import { Routes, Route } from "react-router-dom";
import Landing from "pages/common/Landing";
import AsiaLanding from "pages/asia/AsiaLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import ExhibitNanoScientific from "pages/common/AsiaExhibit/ExhibitNanoScientific";
import AsiaSpeakers from "pages/asia/AsiaSpeakers/AsiaSpeakers";
import KoreaLanding from "pages/korea/KoreaLanding";
import Footer from "components/Footer/Footer";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import AsiaLectureHall from "pages/asia/AsiaLectureHall";
import LatamLanding from "pages/latam/LatamLanding";
import UsLanding from "pages/us/UsLanding";
import JapanLanding from "pages/japan/JapanLanding";
import UsSpeakers from "pages/us/UsSpeakers/UsSpeakers";
import UsPrograms from "pages/us/UsPrograms/UsPrograms";
import UsLectureHall from "pages/us/UsLectureHall";
import JapanSpeakers from "./pages/japan/JapanSpeakers/JapanSpeakers";
import Programs from "./pages/common/Programs/Programs";
import JapanAttend from "./pages/japan/JapanAttend/JapanAttend";
import JapanLectureHall from "./pages/japan/JapanLectureHall";
import Sponsors from "./pages/common/Sponsors";

const App = () => {
  const pathname = usePageViews();

  return (
    <>
      {pathname !== "/" && <NavBar />}
      <Routes>
        {/* common */}
        <Route path="/" element={<Landing />} />
        {/* asia */}
        <Route path="/asia/" element={<AsiaLanding />} />
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
        <Route path="/asia/speakers" element={<AsiaSpeakers />} />

        {/* korea */}
        <Route path="/kr/" element={<KoreaLanding />} />

        {/* latam */}
        <Route path="/latam/" element={<LatamLanding />} />

        {/* us */}

        <Route path="/us/lecture-hall" element={<UsLectureHall />} />

        <Route
          path="/us/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/us/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />

        <Route path="/us/" element={<UsLanding />} />

        <Route path="/us/sponsors" element={<Sponsors />} />
        <Route path="/us/speakers" element={<UsSpeakers />} />
        <Route path="/us/programs" element={<UsPrograms />} />
        {/* japan */}

        <Route path="/jp/" element={<JapanLanding />} />
        <Route path="/jp/greeting" element={<JapanGreeting />} />
        <Route path="/jp/programs" element={<Programs />} />
        <Route path="/jp/speakers" element={<JapanSpeakers />} />
        <Route path="/jp/attend" element={<JapanAttend />} />
        <Route path="/jp/lecture-hall" element={<JapanLectureHall />} />
        <Route path="/jp/sponsors" element={<Sponsors />} />

        <Route
          path="/jp/exhibit/parksystems"
          element={<ExhibitParkSystems />}
        />
        <Route
          path="/jp/exhibit/nanoscientific"
          element={<ExhibitNanoScientific />}
        />
      </Routes>
      {pathname !== "/" && <Footer />}
    </>
  );
};

export default App;
