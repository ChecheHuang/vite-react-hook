import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import useToast from "@/hooks/useToast";

const AuthRouter: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    token: reduxToken,
    user,
    route,
  } = useAppSelector((state) => state.token);

  useEffect(() => {
    if (route) {
      const routeItem = route[pathname];
      if (
        typeof routeItem !== "undefined" &&
        typeof user?.role !== "undefined"
      ) {
        const isAllow = routeItem.accessRole?.includes(user.role);
        if (!isAllow) {
          showToast("error", "沒有權限訪問");
          navigate(-1); 
        }
      }
    }
  }, [pathname, route, showToast, user, navigate]);

  if (pathname === "/login" && !reduxToken) return children;

  if (!reduxToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthRouter;
