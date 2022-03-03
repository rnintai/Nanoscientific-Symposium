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
      <AdminRoute key="/asia/admin">
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin",
    element: (
      <AdminRoute key="/kr/admin">
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin",
    element: (
      <AdminRoute key="/us/admin">
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin",
    element: (
      <AdminRoute key="/jp/admin">
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin",
    element: (
      <AdminRoute key="/eu/admin">
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/admin/program",
    element: (
      <AdminRoute key="/asia/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/program",
    element: (
      <AdminRoute key="/kr/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/program",
    element: (
      <AdminRoute key="/us/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/program",
    element: (
      <AdminRoute key="/jp/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/program",
    element: (
      <AdminRoute key="/eu/admin/program">
        <AdminPrograms />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/admin/speakers",
    element: (
      <AdminRoute key="/asia/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/speakers",
    element: (
      <AdminRoute key="/kr/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/speakers",
    element: (
      <AdminRoute key="/us/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/speakers",
    element: (
      <AdminRoute key="/jp/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/speakers",
    element: (
      <AdminRoute key="/eu/admin/speakers">
        <AdminSpeakers />
      </AdminRoute>
    ),
  },
  {
    path: "/asia/admin/users",
    element: (
      <AdminRoute key="/asia/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/kr/admin/users",
    element: (
      <AdminRoute key="/kr/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/jp/admin/users",
    element: (
      <AdminRoute key="/jp/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/us/admin/users",
    element: (
      <AdminRoute key="/us/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: "/eu/admin/users",
    element: (
      <AdminRoute key="/eu/admin/users">
        <AdminUsers />
      </AdminRoute>
    ),
  },
];
