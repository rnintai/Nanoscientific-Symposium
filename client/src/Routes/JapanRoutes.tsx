import React from "react";
import Landing from "pages/common/Landing/Landing";
import Programs from "pages/common/Programs/Programs";
import JapanExhibitParkSystems from "pages/japan/JapanExhibitParkSystems";
import Sponsors from "pages/common/Sponsors";
import JapanAttend from "pages/japan/JapanAttend/JapanAttend";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import JapanLectureHall from "pages/japan/JapanLectureHall";
import JapanArchive from "pages/japan/JapanArchive/JapanArchive";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import Speakers from "../pages/common/Speakers/Speakers";

export default [
  {
    path: "/jp",
    element: <Landing key="jp-landing-section" />,
  },
  {
    path: "/jp/speakers",
    element: <Speakers />,
  },
  {
    path: "/jp/attend",
    element: <JapanAttend />,
  },
  {
    path: "/jp/program",
    element: <Programs />,
  },
  {
    path: "/jp/greeting",
    element: <JapanGreeting />,
  },
  {
    path: "/jp/lecture-hall",
    element: <JapanLectureHall />,
    isPrivate: true,
  },
  {
    path: "/jp/exhibit/parksystems",
    element: <JapanExhibitParkSystems />,
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
    path: "/jp/user/reset-password",
    element: <ResetPassword />,
    isPrivate: true,
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
