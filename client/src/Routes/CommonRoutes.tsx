import OnDemand from "pages/common/OnDemand/OnDemand";
import EventLanding from "pages/common/EventLanding/EventLanding";
import React from "react";

export default [
  {
    path: `/`,
    element: <EventLanding />,
  },
  {
    path: `/on-demand`,
    element: <OnDemand />,
    // isPrivate: true,
  },
];
