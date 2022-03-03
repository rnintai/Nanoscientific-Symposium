import React from "react";
import AdminRoute from "components/Route/AdminRoute";
import Admin from "pages/admin/Admin";
import AdminPrograms from "pages/admin/AdminPrograms/AdminPrograms";
import AdminSpeakers from "pages/admin/AdminSpeakers/AdminSpeakers";
import AdminUsers from "../pages/admin/AdminUsers/AdminUsers";

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
    path: "/asia/admin/program",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/program",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/program",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/program",
    element: (
      <AdminRoute>
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/program",
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
  {
    path: "/asia/admin/users",
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/users",
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/users",
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/users",
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/users",
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
];
