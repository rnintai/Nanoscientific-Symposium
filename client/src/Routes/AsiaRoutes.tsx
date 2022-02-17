import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import Landing from "pages/common/Landing";
import AsiaLectureHall from "pages/asia/AsiaLectureHall";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";

export default [
  {
    path: "/asia",
    element: <Landing />,
  },
  {
    path: "/asia/lecture-hall",
    element: (
      <PrivateRoute>
        <AsiaLectureHall />
      </PrivateRoute>
    ),
  },
  {
    path: "/asia/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/asia/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "eu/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/asia/programs",
    element: <Programs />,
  },
  {
    path: "/asia/speakers",
    element: <Speakers />,
  },
];
