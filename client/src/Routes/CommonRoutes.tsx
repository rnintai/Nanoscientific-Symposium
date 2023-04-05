import OnDemand from "pages/common/OnDemand/OnDemand";
import React from "react";
import OnDemandVideo from "pages/common/OnDemandVideo/OnDemandVideo";
import EventLanding from "pages/common/EventLanding/EventLanding";

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
  {
    path: `/on-demand/:id`,
    element: <OnDemandVideo />,
  },
];
