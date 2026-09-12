import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { HomeRoute, RootLayout } from "./routes";

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
    ],
  },
]);
