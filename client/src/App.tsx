import React from "react";
import AsiaExhibitParkSystems from "pages/asia/AsiaExhibit/AsiaExhibitParkSystems";
import { Routes, Route } from "react-router-dom";
import Landing from "pages/common/Landing";
import AsiaLanding from "pages/asia/AsiaLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import AsiaPrograms from "pages/asia/AsiaPrograms/AsiaPrograms";
import AsiaExhibitNanoScientific from "pages/asia/AsiaExhibit/AsiaExhibitNanoScientific";
import AsiaSponsors from "pages/asia/AsiaSponsors";
import AsiaLectureHall from "./pages/asia/AsiaLectureHall";
import AsiaSpeakers from "./pages/asia/AsiaSpeakers/AsiaSpeakers";

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
          element={<AsiaExhibitParkSystems />}
        />
        <Route
          path="/asia/exhibit/nanoscientific"
          element={<AsiaExhibitNanoScientific />}
        />
        <Route path="/asia/sponsors" element={<AsiaSponsors />} />
        <Route path="/asia/programs" element={<AsiaPrograms />} />
        <Route path="/asia/speakers" element={<AsiaSpeakers />} />
      </Routes>
    </>
  );
};

export default App;
