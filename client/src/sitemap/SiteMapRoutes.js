import React from "react";
import { Route } from "react-router";

const RouteArr = (pathname) => {
  return [
    {
      path: `${pathname}/`,
    },
    {
      path: `${pathname}/registration`,
    },
    {
      path: `${pathname}/program`,
    },
    {
      path: `${pathname}/speakers`,
    },
    {
      path: `${pathname}/lecture-hall`,
      isPrivate: true,
    },
    {
      path: `${pathname}/exhibit/parksystems`,
    },
    {
      path: `${pathname}/exhibit/nanoscientific`,
    },
    {
      path: `${pathname}/announcement`,
    },
    {
      path: `${pathname}/abstract`,
    },
    {
      path: `${pathname}/poster-hall`,
      isPrivate: true,
    },
  ];
};

const SiteMapRoutes = (
  <Route>
    {RouteArr("americas").map((route) => {
      return <Route key={route.path} path={route.path} />;
    })}
    {RouteArr("eu").map((route) => {
      return <Route key={route.path} path={route.path} />;
    })}
    {RouteArr("asia").map((route) => {
      return <Route key={route.path} path={route.path} />;
    })}
    {RouteArr("kr").map((route) => {
      return <Route key={route.path} path={route.path} />;
    })}
    {RouteArr("jp").map((route) => {
      return <Route key={route.path} path={route.path} />;
    })}
  </Route>
);

export default SiteMapRoutes;
