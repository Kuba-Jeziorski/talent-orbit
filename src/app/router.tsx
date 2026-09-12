import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { HomeRoute, LoginRoute, RootLayout } from "./routes";
import { ROUTE_LOGIN } from "../constants/constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: ROUTE_LOGIN,
        Component: LoginRoute,
      },
    ],
  },
]);
