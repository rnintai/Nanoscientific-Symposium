import React from "react";
import Landing from "pages/common/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import UsLectureHall from "pages/us/UsLectureHall";
import UsSpeakers from "pages/us/UsSpeakers/UsSpeakers";
import UsPrograms from "pages/us/UsPrograms/UsPrograms";

export default [
  {
    path: "/us",
    element: <Landing />,
  },
  {
    path: "/us/speakers",
    element: <UsSpeakers />,
  },
  {
    path: "/us/programs",
    element: <UsPrograms />,
  },
  {
    path: "/us/lecture-hall",
    element: (
      <PrivateRoute>
        <UsLectureHall />
      </PrivateRoute>
    ),
  },
  {
    path: "/us/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/us/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/us/sponsors",
    element: <Sponsors />,
  },
];
