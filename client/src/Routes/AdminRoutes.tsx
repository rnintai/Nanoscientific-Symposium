import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";
import AdminMenus from "pages/admin/AdminMenus/AdminMenus";
import AdminPosters from "pages/admin/AdminPosters/AdminPosters";
import AdminConfig from "pages/admin/AdminConfig/AdminConfig";
import AdminUsers from "../pages/admin/AdminUsers/AdminUsers";

// 어드민이어야 접근가능한 element 들을 모아둔 라우츠 입니다.
// App.tsx 에서 이것을 호출합니다
// components 폴더에 있는 AdminRoute 와 PrivateRoute 와는 다른것입니다.
const nationList = ["asia", "eu", "jp", "kr", "americas"];
const yearList = ["", "2022", "2023"];
const routes = [];

nationList.forEach((n) =>
  yearList.forEach((y) => {
    const nationYearString = `/${n}${y === "" ? "" : `/${y}`}`;
    routes.push(
      ...[
        {
          path: `${nationYearString}/admin`,
          element: (
            <AdminRoute key={`${nationYearString}/admin`}>
              <Admin />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/program`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/program`}>
              <AdminPrograms />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/speakers`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/speakers`}>
              <AdminSpeakers />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/users`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/users`}>
              <AdminUsers />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/menus`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/menus`}>
              <AdminMenus />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/poster`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/poster`}>
              <AdminPosters />
            </AdminRoute>
          ),
        },
        {
          path: `${nationYearString}/admin/config`,
          element: (
            <AdminRoute key={`${nationYearString}/admin/config`}>
              <AdminConfig />
            </AdminRoute>
          ),
        },
      ],
    );
  }),
);

export default routes;
