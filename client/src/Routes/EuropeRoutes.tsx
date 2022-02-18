import React from "react";
import Landing from "pages/common/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import SetPassword from "pages/europe/SetPassword/SetPassword";

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
    path: "/eu/user/resetpassword",
    element: <SetPassword />,
  },
];
