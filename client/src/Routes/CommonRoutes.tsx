import OnDemand from "pages/common/OnDemand/OnDemand";
import EventLanding from "pages/common/EventLanding/EventLanding";
import React from "react";
import OnDemandVideo from "pages/common/OnDemandVideo/OnDemandVideo";

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
