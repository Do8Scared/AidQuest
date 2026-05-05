import Index from "./pages/Index";
import ModuleSelect from "./pages/ModuleSelect";
import SituationRoom from "./pages/SituationRoom";
import AfterActionReport from "./pages/AfterActionReport";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "/modules",
    name: "modules",
    element: <ModuleSelect />,
  },
  {
    path: "/situation-room/:moduleId",
    name: "situation-room",
    element: <SituationRoom />,
  },
  {
    path: "/after-action",
    name: "after-action",
    element: <AfterActionReport />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
