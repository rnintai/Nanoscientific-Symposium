import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";

// 어드민이어야 접근가능한 element 들을 모아둔 라우츠 입니다.
// App.tsx 에서 이것을 호출합니다
// components 폴더에 있는 AdminRoute 와 PrivateRoute 와는 다른것입니다.

export default [
  {
    path: "/asia/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/admin/programs",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/programs",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/programs",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/programs",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/programs",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/admin/speakers",
    element: (
      <AdminRoute>
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/speakers",
    element: (
      <AdminRoute>
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/speakers",
    element: (
      <AdminRoute>
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/speakers",
    element: (
      <AdminRoute>
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/speakers",
    element: (
      <AdminRoute>
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
];
