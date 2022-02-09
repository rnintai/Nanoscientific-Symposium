import React from "react";
import ExhibitParkSystems from "pages/common/AsiaExhibit/ExhibitParkSystems";
import { Routes, Route } from "react-router-dom";
import Landing from "pages/common/Landing";
import AsiaLanding from "pages/asia/AsiaLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import AsiaPrograms from "pages/asia/AsiaPrograms/AsiaPrograms";
import ExhibitNanoScientific from "pages/common/AsiaExhibit/ExhibitNanoScientific";
import AsiaSponsors from "pages/asia/AsiaSponsors";
import AsiaSpeakers from "pages/asia/AsiaSpeakers/AsiaSpeakers";
import KoreaLanding from "pages/korea/KoreaLanding";
import AsiaLectureHall from "./pages/asia/AsiaLectureHall";
import LatamLanding from "./pages/latam/LatamLanding";
import UsLanding from "./pages/us/UsLanding";
import JapanLanding from "./pages/japan/JapanLanding";
import UsSpeakers from "./pages/us/UsSpeakers/UsSpeakers";
import UsPrograms from "./pages/us/UsPrograms/UsPrograms";
import UsLectureHall from "./pages/us/UsLectureHall";
import UsSponsors from "./pages/us/UsSponsors";

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
        <Route path="/asia/sponsors" element={<AsiaSponsors />} />
        <Route path="/asia/programs" element={<AsiaPrograms />} />
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

        <Route path="/us/sponsors" element={<UsSponsors />} />
        <Route path="/us/speakers" element={<UsSpeakers />} />
        <Route path="/us/programs" element={<UsPrograms />} />
        {/* japan */}
        <Route path="/japan/" element={<JapanLanding />} />
      </Routes>
    </>
  );
};

export default App;
