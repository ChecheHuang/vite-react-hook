import Layout from "@/views/layout/Layout";
import Home from "@/views/Home/Home";
import User from "@/views/User/User";
import Login from "@/views/Login/Login";
import NotFound from "@/views/NotFound/NotFound";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import lazyLoad from "./lazyLoad";
import React from "react";
export interface RouterItem {
  path: string;
  label: string;
  hidden?: boolean;
  element?: ReactNode;
  children?: RouterItem[];
}

export const router: RouterItem[] = [
  {
    path: "/",
    label: "首頁",
    element: <Navigate to="/layout" />,
  },
  {
    path: "/login",
    label: "登入頁",
    element: <Login />,
    hidden: true,
  },
  {
    path: "/layout",
    label: "控制台",
    element: <Layout />,
    children: [
      {
        path: "user",
        label: "使用者",
        element: <User />,
        children: [
          {
            path: "user",
            label: "user",
            element: <User />,
          },
        ],
      },
      {
        path: "home",
        label: "home",
        element: lazyLoad(React.lazy(() => import("../views/Home/Home"))),
      },
    ],
  },
  {
    path: "/*",
    label: "404",
    element: <NotFound />,
    hidden: true,
  },
];
export default router;