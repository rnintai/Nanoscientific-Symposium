/* eslint-disable array-callback-return */
import React from "react";
import Landing from "pages/common/Landing/Landing";

import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import AdminRoute from "components/Route/AdminRoute";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import LectureHall from "pages/common/LectureHall/LectureHall";
import Registration from "pages/common/Registration/Registration";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Announcement from "pages/common/Announcement/Announcement";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";
import PosterHall from "pages/common/PosterHall/PosterHall";

const formNo = "1231";
const abstractFormNo = "1674";

const yearList = ["", "2022", "2023"];
const chinaRoutes = [];

yearList.map((y) => {
  const pathname = `china${y === "" ? "" : `/${y}`}`;

  chinaRoutes.push(
    ...[
      {
        path: `/${pathname}`,
        element: <Landing key={`${pathname}-landing-section`} />,
      },
      {
        path: `/${pathname}/registration`,
        element: <Registration formNo={formNo} />,
      },
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
    ],
  );
});

export default chinaRoutes;
