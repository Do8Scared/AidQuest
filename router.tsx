import Index from "./pages/Index";
import Login from "./pages/Login";
import Certificate from "./pages/Certificate";
import ModuleSelect from "./pages/ModuleSelect";
import SituationRoom from "./pages/SituationRoom";
import AfterActionReport from "./pages/AfterActionReport";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const routers = [
  {
    path: "/",
    name: "login",
    element: <Login />,
  },
  {
    path: "/home",
    name: "home",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/modules",
    name: "modules",
    element: (
      <ProtectedRoute>
        <ModuleSelect />
      </ProtectedRoute>
    ),
  },
  {
    path: "/situation-room/:moduleId",
    name: "situation-room",
    element: (
      <ProtectedRoute>
        <SituationRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/after-action",
    name: "after-action",
    element: (
      <ProtectedRoute>
        <AfterActionReport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/certificate/:id",
    name: "certificate",
    element: <Certificate />,
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
