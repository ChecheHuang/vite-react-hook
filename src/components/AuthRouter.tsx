import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { router_item, AntdRouterItem } from "@/router";
import { useAppSelector } from "@/store/hook";
import { getCookies } from "@/utils/cookies";
const AuthRouter: React.FC<{ children: JSX.Element }> = ({ children }) => {
 const {token:reduxToken} = useAppSelector((state) => state.token);
  const { pathname } = useLocation();
  if (pathname === "/login" && !reduxToken) return children;
  // console.log("isAllow", isAllow);
  
  if (!reduxToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRouter;

// function flattenAntdRouterItems(items: AntdRouterItem[]): {
//   [key: string]: boolean;
// } {
//   let flatItems: { [key: string]: boolean } = {};
//   items.forEach(({ key, meta, children }) => {
//     flatItems[key] = Boolean(meta?.allow);
//     if (children) {
//       const childrenFlatItems = flattenAntdRouterItems(
//         children as AntdRouterItem[]
//       );
//       flatItems = { ...flatItems, ...childrenFlatItems };
//     }
//   });
//   return flatItems;
// }
