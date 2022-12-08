import React from "react";
import Landing from "pages/common/Landing/Landing";
import LectureHall from "pages/common/LectureHall/LectureHall";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Announcement from "pages/common/Announcement/Announcement";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import PosterHall from "pages/common/PosterHall/PosterHall";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";
import AsiaLocation from "pages/asia/AsiaLocation/AsiaLocation";

const pathname = "asia";
const formNo = "1247";
const abstractFormNo = "1898";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key={`${pathname}-landing-section`} />,
  },
  // {
  //   path: `/${pathname}/registration`,
  //   element: <Registration formNo={formNo} />,
  // },
  {
    path: `/${pathname}/program`,
    element: <Programs />,
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
    path: `/${pathname}/abstract`,
    element: <AbstractSubmission formNo={abstractFormNo} />,
  },
  {
    path: `/${pathname}/poster-hall`,
    element: <PosterHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/location`,
    element: <AsiaLocation />,
  },
];
