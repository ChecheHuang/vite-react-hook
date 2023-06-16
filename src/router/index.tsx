import lazyLoad from "./lazyLoad";

import Layout from "@/views/layout/Layout";
import User from "@/views/User/User";
import NotFound from "@/views/NotFound/NotFound";
import { ReactNode } from "react";
import Home from "../views/Home/Home";
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
    element: <Home />,
    hidden: true,
  },
  {
    path: "/login",
    label: "登入頁",
    element: lazyLoad(import("@/views/Login/Login")),
    hidden: true,
  },
  {
    path: "/layout",
    label: "控制台",
    element: lazyLoad(import("@/views/layout/Layout")),
    children: [
      {
        path: "user",
        label: "使用者",
        element: lazyLoad(import("@/views/User/User")),

        children: [
          {
            path: "user",
            label: "使用者Menu",
            element: lazyLoad(import("@/views/User/User")),
          },
        ],
      },
      {
        path: "home",
        label: "控制台Menu",
        element: lazyLoad(import("../views/Home/Home")),
      },
    ],
  },
  {
    path: "/control",
    label: "權限控制",
    element: lazyLoad(import("@/views/layout/Layout")),
    children: [
      {
        path: "handle",
        label: "管理權限",
        element: lazyLoad(import('@/views/Control/Control')),
      },
      {
        path: "show",
        label: "顯示權限",
        element: <div>顯示權限</div>,
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


interface AccessRoles {
  accessRole: string[];
}

function processNodes(
  result: Record<string, AccessRoles>,
  obj: RouterItem,
  path = ""
): void {
  if (!obj || typeof obj !== "object") {
    return;
  }

  if (obj.children && Array.isArray(obj.children)) {
    obj.children.forEach((child) => {
      const childPath = obj.path ? `${path}/${obj.path}` : path;
      processNodes(result, child, childPath);
    });
  } 
   let fullPath = obj.path ? `${path}/${obj.path}` : path;
   fullPath = fullPath.replace(/\/+/g, "/");
   if (!fullPath.includes("*")) {
     result[fullPath] = { accessRole: ["USER", "ADMIN"] };
   }
}

function createRoute(data: RouterItem[]): Record<string, AccessRoles> {
  const result: Record<string, AccessRoles> = {};
  for (const item of data) {
    processNodes(result, item);
  }
  return result;
}

const flatRouter = createRoute(router);
// console.log(flatRouter);
