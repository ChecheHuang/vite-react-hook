import Layout from "@/views/layout/Layout";
import Home from "@/views/Home/Home";
import User from "@/views/User/User";
import Login from "@/views/Login/Login";
import NotFound from "@/views/NotFound/NotFound";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import lazyLoad from "./lazyLoad";
import React from 'react'
interface RouterItem {
  path: string;
  label: string;
  hidden?: boolean;
  element?: ReactNode;
  children?: RouterItem[];
  meta?: { allow: boolean };
}
export interface AntdRouterItem extends RouterItem {
  key: string;
  type: string;
  children?: AntdRouterItem[];
}

export const router: RouterItem[] = [
  {
    path: "/",
    label: "首頁",
    element: <Navigate to="/layout/user/user" />,
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
export const router_item = convertRouter(router);
function convertRouter(
  config: RouterItem[],
  parentKey = "",
  parentMeta = { allow: true }
): AntdRouterItem[] {
  return config.reduce((result: AntdRouterItem[], item: RouterItem) => {
    if (!item.hidden) {
      const key = parentKey ? `${parentKey}/${item.path}` : item.path;
      const newItem: AntdRouterItem = {
        ...item,
        key,
        type: "",
        hidden: false,
        meta: item.meta ? item.meta : parentMeta,
      } as AntdRouterItem;
      if (newItem.children) {
        newItem.children = convertRouter(
          newItem.children,
          key,
          newItem.meta
        );
      }
      result.push(newItem);
    }
    return result;
  }, []);
}
