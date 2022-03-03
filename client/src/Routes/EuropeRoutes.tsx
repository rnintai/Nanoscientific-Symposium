import React from "react";
import Landing from "pages/common/Landing";
import EuropeRegistration from "pages/europe/EuropeRegistration/EuropeRegistration";
import SetPassword from "pages/europe/SetPassword/SetPassword";
import ExhibitParkSystems from "pages/common/Exhibit/ExhibitParkSystems";
import ExhibitNanoScientific from "pages/common/Exhibit/ExhibitNanoScientific";

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
];
