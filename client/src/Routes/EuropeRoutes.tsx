import React from "react";
import Landing from "pages/common/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import PrivateRoute from "components/Route/PrivateRoute";
import SetPassword from "pages/europe/SetPassword/SetPassword";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";
import ResetPassword from "pages/common/User/ResetPassword/ResetPassword";
import ForgotPassword from "pages/common/User/ForgotPassword/ForgotPassword";

export default [
  {
    path: "/eu",
    element: <Landing />,
  },
  {
    path: "/eu/registration",
    element: <EuropeRegistration />,
  },
  {
    path: "/eu/exhibit/parksystems",
    element: <ExhibitParkSystems />,
  },
  {
    path: "/eu/exhibit/nanoscientific",
    element: <ExhibitNanoScientific />,
  },
  {
    path: "/eu/user/setpassword",
    element: <SetPassword />,
  },
  {
    path: "/eu/user/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/eu/user/reset-password",
    element: (
      <PrivateRoute key="/asia/user/reset-password">
        <ResetPassword />
      </PrivateRoute>
    ),
  },
];
