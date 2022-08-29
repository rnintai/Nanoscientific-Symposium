import React from "react";
import Landing from "pages/common/Landing/Landing";
import Programs from "pages/common/Programs/Programs";
import JapanExhibitParkSystems from "pages/japan/JapanExhibitParkSystems";
import Sponsors from "pages/common/Sponsors";
import JapanAttend from "pages/japan/JapanAttend/JapanAttend";
import JapanGreeting from "pages/japan/JapanGreeting/JapanGreeting";
import JapanArchive from "pages/japan/JapanArchive/JapanArchive";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Registration from "pages/common/Registration/Registration";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import LectureHall from "pages/common/LectureHall/LectureHall";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Speakers from "pages/common/Speakers/Speakers";
import Announcement from "pages/common/Announcement/Announcement";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import PosterHall from "pages/common/PosterHall/PosterHall";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";

const pathname = "jp";
const formNo = "1223";
const abstractFormNo = "1896";

export default [
  {
    path: `/${pathname}`,
    element: <Landing key={`${pathname}-landing-section`} />,
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
    path: `/${pathname}/attend`,
    element: <JapanAttend />,
  },
  {
    path: `/${pathname}/program`,
    element: <Programs />,
  },
  {
    path: `/${pathname}/greeting`,
    element: <JapanGreeting />,
  },
  {
    path: `/${pathname}/lecture-hall`,
    element: <LectureHall />,
    isPrivate: true,
  },
  {
    path: `/${pathname}/exhibit/parksystems`,
    element: <JapanExhibitParkSystems />,
  },
  {
    path: `/${pathname}/sponsors`,
    element: <Sponsors />,
  },
  {
    path: `/${pathname}/archive`,
    element: <JapanArchive />,
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
    path: `/${pathname}/registration`,
    element: <Registration formNo={formNo} />,
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
