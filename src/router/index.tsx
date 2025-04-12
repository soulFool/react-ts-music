import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("@/App")),
    children: [
      {
        index: true,
        element: <Navigate to="/recommend" replace />,
      },
      {
        path: "/recommend",
        Component: lazy(() => import("@/pages/recommend")),
      },
      {
        path: "/singer",
        Component: lazy(() => import("@/pages/singer")),
        children: [
          {
            path: ":id",
            Component: lazy(() => import("@/pages/singer-detail")),
          },
        ],
      },
      {
        path: "/top-list",
        Component: lazy(() => import("@/pages/top-list")),
      },
      {
        path: "/search",
        Component: lazy(() => import("@/pages/search")),
      },
    ],
  },
];

export const router = createHashRouter(routes);
