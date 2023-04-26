/* eslint-disable array-callback-return */
import React from "react";
import Landing from "pages/common/Landing/Landing";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import Sponsors from "pages/common/Sponsors";
import Programs from "pages/common/Programs/Programs";
import Speakers from "pages/common/Speakers/Speakers";
import KoreaAttend from "pages/korea/KoreaAttend/KoreaAttend";
import LectureHall from "pages/common/LectureHall/LectureHall";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import SpeakerDetail from "pages/common/SpeakerDetail/SpeakerDetail";
import Announcement from "pages/common/Announcement/Announcement";
import AnnouncementDetail from "pages/common/AnnouncementDetail/AnnouncementDetail";
import PosterHall from "pages/common/PosterHall/PosterHall";
import AbstractSubmission from "pages/common/AbstractSubmission/AbstractSubmission";
import RedirectRoute from "components/RedirectRoute/RedirectRoute";
import RegisterInfo from "pages/korea/RegisterInfo/RegisterInfo";
import KoreaRegistration from "pages/korea/KoreaRegistration/KoreaRegistration";
import Registration from "pages/common/Registration/Registration";
import RegisterInfo2023 from "pages/korea/RegisterInfo/RegisterInfo2023";

const formNo = "1972";
const abstractFormNo = "1897";
const yearList = ["", "2022", "2023"];
const krRoutes = [];

yearList.map((y) => {
  const pathname = `kr${y === "" ? "" : `/${y}`}`;
  krRoutes.push(
    ...[
      {
        path: `/${pathname}`,
        element: <Landing key={`${pathname}-landing-section`} />,
      },
      // {
      //   path: `/${pathname}/lecture-hall`,
      //   element: <LectureHall />,
      //   isPrivate: true,
      // },
      {
        path: `/${pathname}/2022/register-info`,
        element: <RegisterInfo />,
      },
      {
        path: `/${pathname}/register-info`,
        element: <RegisterInfo2023 />,
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
        path: `/${pathname}/sponsors`,
        element: <Sponsors />,
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
        path: `/${pathname}/2022/registration`,
        element: <KoreaRegistration formNo={formNo} />,
      },
      {
        path: `/${pathname}/2023/registration`,
        element: <Registration formNo={formNo} />,
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
      {
        path: `/${pathname}/event-info/venue`,
        element: (
          <RedirectRoute
            path="https://dcckorea.or.kr/page.do?pageId=148&menuNo=58"
            target="_blank"
          />
        ),
      },
      {
        path: `/${pathname}/event-info/accomodation`,
        element: (
          <RedirectRoute
            path="https://dcckorea.or.kr/page.do?pageId=153&menuNo=63"
            target="_blank"
          />
        ),
      },
      {
        path: `/${pathname}/lecture-hall`,
        element: <LectureHall />,
        isPrivate: true,
      },
    ],
  );
});
export default krRoutes;
