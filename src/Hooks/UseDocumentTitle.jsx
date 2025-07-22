import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routeConfig from "../Routes/RouteConfig";

export default function useDocumentTitle(manualTitle = null) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (manualTitle) document.title = `${manualTitle} | MyApp`;
    else {
      const r = routeConfig
        .flatMap((r) => r.children || [r])
        .find((x) => `/${x.path}` === pathname);
      if (r?.meta?.title) document.title = `${r.meta.title} | MyApp`;
    }
  }, [manualTitle, pathname]);
}
