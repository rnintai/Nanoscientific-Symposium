import React from "react";
import Landing from "pages/common/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import UsLectureHall from "pages/us/UsLectureHall";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import AdminRoute from "components/Route/AdminRoute";

export default [
  {
    path: "/us",
    element: <Landing />,
  },
  {
    path: "/us/speakers",
    element: (
      <AdminRoute key="/us/speakers">
        <Speakers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/program",
    element: (
      <AdminRoute key="/us/program">
        <Programs />
      </AdminRoute>
    ),
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
