import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Landing from "pages/common/Landing";
import Programs from "pages/common/Programs/Programs";
import PrivateRoute from "components/Route/PrivateRoute";
import JapanExhibitParkSystems from "pages/japan/JapanExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import JapanAttend from "pages/japan/JapanAttend/JapanAttend";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import JapanLectureHall from "pages/japan/JapanLectureHall";
import JapanArchive from "pages/japan/JapanArchive/JapanArchive";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import Speakers from "../pages/common/Speakers/Speakers";

export default [
  {
    path: "/jp",
    element: <Landing />,
  },
  {
    path: "/jp/speakers",
    element: (
      <AdminRoute key="/jp/speakers">
        <Speakers />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/attend",
    element: <JapanAttend />,
  },
  {
    path: "/jp/program",
    element: (
      <AdminRoute key="/jp/program">
        <Programs />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/greeting",
    element: <JapanGreeting />,
  },
  {
    path: "/jp/lecture-hall",
    element: (
      <PrivateRoute>
        <JapanLectureHall />
      </PrivateRoute>
    ),
  },
  {
    path: "/jp/exhibit/parksystems",
    element: <JapanExhibitParkSystems />,
  },
  {
    path: "/jp/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/jp/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/jp/archive",
    element: <JapanArchive />,
  },
  {
    path: "/jp/user/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/jp/registration",
    element: <Registration formNo="1223" />,
  },
];
