import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import useToast from "@/hooks/useToast";

const AuthRouter: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    token: reduxToken,
    user,
    route,
  } = useAppSelector((state) => state.token);

  useEffect(() => {
    if (pathname === "/login" && reduxToken) {
      return navigate("/layout/user");
    }
    if (!reduxToken) {
      return navigate("/login");
    }

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
    setIsLoading(false);
  }, [pathname, route, showToast, user, navigate, reduxToken]);

  return <>{isLoading ? <div>Loading</div> : children}</>;
};

export default AuthRouter;
