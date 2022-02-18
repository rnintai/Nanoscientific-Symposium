import React from "react";
import Landing from "pages/common/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";

export default [
  {
    path: "/eu",
    element: <Landing />,
  },
  {
    path: "/eu/registration",
    element: <EuropeRegistration />,
  },
];
