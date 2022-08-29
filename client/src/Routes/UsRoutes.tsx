import React from "react";
import Landing from "pages/common/Landing/Landing";
import PrivateRoute from "components/Route/PrivateRoute";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import LectureHall from "pages/common/LectureHall/LectureHall";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import Registration from "pages/common/Registration/Registration";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import Announcement from "pages/common/Announcement/Announcement";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import PosterHall from "pages/common/PosterHall/PosterHall";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";

const pathname = "americas";
const formNo = "1184";
const abstractFormNo = "1899";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key="americas-landing-section" />,
  },
  {
    path: `/${pathname}/speakers`,
    element: <Speakers />,
  },
  {
    path: `/${pathname}/speakers/:id`,
    element: <SpeakerDetail />,
  },
  {
    path: `/${pathname}/program`,
    element: <Programs />,
  },
  {
    path: `/${pathname}/lecture-hall`,
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/exhibit/parksystems`,
    element: <ExhibitParkSystems />,
  },
  {
    path: `/${pathname}/exhibit/nanoscientific`,
    element: <ExhibitNanoScientific />,
  },
  {
    path: `/${pathname}/registration`,
    element: <Registration formNo={formNo} />,
  },
  {
    path: `/${pathname}/sponsors`,
    element: <Sponsors />,
  },
  {
    path: `/${pathname}/user/reset-password`,
    element: <ResetPassword />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/user/forgot-password`,
    element: <ForgotPassword />,
  },
  {
    path: `/${pathname}/announcement`,
    element: <Announcement />,
  },
  {
    path: `/${pathname}/announcement/:id`,
    element: <AnnouncementDetail />,
  },
  {
    path: `/${pathname}/poster-hall`,
    element: <PosterHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/abstract`,
    element: <AbstractSubmission formNo={abstractFormNo} />,
  },
];
