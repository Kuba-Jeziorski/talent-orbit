import { createBrowserRouter, redirect } from "react-router";
import { ROUTE_HOME, ROUTE_LOGIN, USER_QUERY_KEY } from "../constants/constants";
import { queryClient } from "./query";
import { HomeRoute, LoginRoute, RootLayout } from "./routes";

const getCachedUser = () => queryClient.getQueryData(USER_QUERY_KEY);

export const router = createBrowserRouter([
  {
    path: ROUTE_HOME,
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
    loader: () => {
      if (getCachedUser()) {
        throw redirect(ROUTE_HOME);
      }

      return null;
    },
    Component: LoginRoute,
  },
]);