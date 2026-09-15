import { createBrowserRouter, redirect } from "react-router";
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  USER_QUERY_KEY,
} from "../constants/constants";
import { queryClient } from "./query";
import { HomeRoute, LoginRoute, RootLayout } from "./routes";

// TEST
// Reads the ["user"] cache filled by AuthListener (and by useLogin).
const getCachedUser = () => queryClient.getQueryData(USER_QUERY_KEY);

export const router = createBrowserRouter([
  {
    path: ROUTE_HOME,
    // Runs before this route renders. Empty cache → treat as signed out.
    loader: () => {
      if (!getCachedUser()) {
        throw redirect(ROUTE_LOGIN);
      }

      return null;
    },
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
    ],
  },
  {
    path: ROUTE_LOGIN,
    // Signed-in users should not see the login screen.
    loader: () => {
      if (getCachedUser()) {
        throw redirect(ROUTE_HOME);
      }

      return null;
    },
    Component: LoginRoute,
  },
]);
