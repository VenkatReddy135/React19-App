import React from "react";
import { useLocation, Link } from "react-router-dom";
import routeConfig from "../Routes/RouteConfig";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  let current = "";
  const crumbs = parts
    .map((p) => {
      current += `/${p}`;
      const r = routeConfig
        .flatMap((r) => r.children || [r])
        .find((x) => `/${x.path}` === current);
      return r?.meta?.breadcrumb
        ? { label: r.meta.breadcrumb, path: current }
        : null;
    })
    .filter(Boolean);
  return (
    <div style={{ marginBottom: 10 }}>
      {crumbs.map((c, i) => (
        <React.Fragment key={c.path}>
          <Link to={c.path}>{c.label}</Link>
          {i < crumbs.length - 1 && " / "}
        </React.Fragment>
      ))}
    </div>
  );
}
