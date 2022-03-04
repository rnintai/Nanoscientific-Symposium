import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Landing from "pages/common/Landing";
import AsiaLectureHall from "pages/asia/AsiaLectureHall";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";

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
    path: "/asia/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/asia/program",
    element: (
      <AdminRoute key="/asia/program">
        <Programs />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/speakers",
    element: (
      <AdminRoute key="/asia/program">
        <Speakers />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/registration",
    element: <Registration formNo="1165" />,
  },
  {
    path: "/asia/user/reset-password",
    element: (
      <PrivateRoute>
        <ResetPassword />
      </PrivateRoute>
    ),
  },
  {
    path: "/asia/user/forgot-password",
    element: <ForgotPassword />,
  },
];
