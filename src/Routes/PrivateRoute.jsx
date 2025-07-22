import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import routeConfig from "./RouteConfig";
import { useAuth } from "../Context/AuthContext";

const findRoute = (path) =>
  routeConfig
    .flatMap((r) => r.children || [r])
    .find((r) => `/${r.path}` === path);

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const { pathname } = useLocation();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  const route = findRoute(pathname);
  if (route?.meta?.roles && !route.meta.roles.includes(role))
    return <div>Access Denied</div>;
  return children || <Outlet />;
};

export default PrivateRoute;
