import React from "react";
import Landing from "pages/common/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import KoreaAttend from "pages/korea/KoreaAttend/KoreaAttend";
import KoreaLectureHall from "pages/korea/KoreaLectureHall";

export default [
  {
    path: "/kr",
    element: <Landing />,
  },
  {
    path: "/kr/speakers",
    element: <Speakers />,
  },
  {
    path: "/kr/attend",
    element: <KoreaAttend />,
  },
  {
    path: "/kr/programs",
    element: <Programs />,
  },
  {
    path: "/kr/lecture-hall",
    element: (
      <PrivateRoute>
        <KoreaLectureHall />
      </PrivateRoute>
    ),
  },
  {
    path: "/kr/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/kr/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/kr/sponsors",
    element: <Sponsors />,
  },
];
