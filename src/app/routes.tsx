import { lazy, Suspense, type ComponentType } from "react";
import { Outlet } from "react-router";
import { Spinner } from "../libs/ui/spinner";
import { Layout } from "../libs/layout";

const HomePage = lazy(() =>
  import("../pages/home-page").then((module) => ({
    default: module.HomePage,
  })),
);

const LoginPage = lazy(() =>
  import("../pages/login-page").then((module) => ({
    default: module.LoginPage,
  })),
);

const withSuspense = (Page: ComponentType) => {
  return () => {
    return (
      <Suspense fallback={<Spinner />}>
        <Page />
      </Suspense>
    );
  };
};

export const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const HomeRoute = withSuspense(HomePage);
export const LoginRoute = withSuspense(LoginPage);
