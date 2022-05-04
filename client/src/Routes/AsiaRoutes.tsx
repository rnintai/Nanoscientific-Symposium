import React from "react";
import Landing from "pages/common/Landing/Landing";
import AsiaLectureHall from "pages/asia/AsiaLectureHall";
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
    element: <Landing key="asia-landing-section" />,
  },
  {
    path: "/asia/lecture-hall",
    element: <AsiaLectureHall />,
    isPrivate: true,
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
    element: <Programs />,
  },
  {
    path: "/asia/speakers",
    element: <Speakers />,
  },
  {
    path: "/asia/registration",
    element: <Registration formNo="1247" />,
  },
  {
    path: "/asia/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: "/asia/user/forgot-password",
    element: <ForgotPassword />,
  },
];
