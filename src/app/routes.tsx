import { lazy } from "react";
import { Outlet } from "react-router";
import { Layout } from "../libs/ui/layout";
import { LoginPage } from "../pages/login-page";

const HomePage = lazy(() =>
  import("../pages/home-page").then((module) => ({
    default: module.HomePage,
  })),
);

export const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const HomeRoute = HomePage;
export const LoginRoute = LoginPage;