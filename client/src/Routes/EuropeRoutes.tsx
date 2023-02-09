/* eslint-disable array-callback-return */
import React from "react";
import Landing from "pages/common/Landing/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import LectureHall from "pages/common/LectureHall/LectureHall";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Announcement from "pages/common/Announcement/Announcement";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";
import PosterHall from "pages/common/PosterHall/PosterHall";
import EuropeRegistration2023 from "pages/europe/EuropeRegistration/EuropeRegistration2023";
// import Landing2023 from "pages/2023/Landing/Landing2023";

const formNo = "1149";
const abstractFormNo = "1666";
const yearList = ["", "2022", "2023"];
const euRoutes = [];

yearList.map((y) => {
  const pathname = `eu${y === "" ? "" : `/${y}`}`;

  euRoutes.push(
    ...[
      {
        path: `/${pathname}`,
        element: <Landing key={`${pathname}-landing-section`} />,
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
      // {
      //   path: `/${pathname}/2023`,
      //   element: <Landing key={`${pathname}-landing-2023`} />,
      // },
    ],
  );
});

euRoutes.push(
  ...[
    {
      path: `/eu/2022/registration`,
      element: <EuropeRegistration init isStudent={false} />,
    },
    {
      path: `/eu/2022/registration/student`,
      element: <EuropeRegistration isStudent />,
    },
    {
      path: `/eu/2022/registration/postdoc`,
      element: <EuropeRegistration isStudent={false} />,
    },
    {
      path: `/eu/2023/registration`,
      element: <EuropeRegistration2023 init isStudent={false} />,
    },
    {
      path: `/eu/2023/registration/student`,
      element: <EuropeRegistration2023 isStudent />,
    },
    {
      path: `/eu/2023/registration/postdoc`,
      element: <EuropeRegistration2023 isStudent={false} />,
    },
    {
      path: `/eu/2023/registration/student/early`,
      element: <EuropeRegistration2023 isStudent />,
    },
    {
      path: `/eu/2023/registration/postdoc/early`,
      element: <EuropeRegistration2023 isStudent={false} />,
    },
  ],
);

export default euRoutes;
