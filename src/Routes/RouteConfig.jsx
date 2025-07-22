import React, { lazy } from "react";
const Login = lazy(() => import("../Pages/Login"));
const List = lazy(() => import("../Pages/List"));
const Details = lazy(() => import("../Pages/Details"));
const Crud = lazy(() => import("../Pages/Crud"));
const MainLayout = lazy(() => import("../Layouts/MainLayout"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PostDetails = lazy(() => import("../Pages/PostDetails"));
const NotFound = lazy(() => import("../Pages/NotFound"));

export default [
  {
    path: "/",
    element: <Login />,
    meta: { title: "Login", breadcrumb: "Login", public: true },
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "list",
        element: <List />,
        meta: {
          title: "List",
          breadcrumb: "Dashboard",
          roles: ["admin", "user"],
        },
      },
      {
        path: "post/:id",
        element: <PostDetails />,
        meta: {
          title: "Post Details",
          breadcrumb: "Post Details",
          roles: ["admin", "user"],
        },
      },
      {
        path: "list/details",
        element: <Details />,
        meta: { title: "Details", breadcrumb: "Details", roles: ["admin"] },
      },
      {
        path: "crud",
        element: <Crud />,
        meta: { title: "CRUD", breadcrumb: "CRUD", roles: ["admin", "user"] },
      },
      {
        path: "*",
        element: <NotFound />,
        meta: {
          title: "404",
          roles: ["admin", "user"],
        },
      },
    ],
  },
];
