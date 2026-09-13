import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { Spinner } from "../libs/ui/spinner";
import { AuthListener } from "./auth-listener";
import { queryClient } from "./query";
import { router } from "./router";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthListener>
    </QueryClientProvider>
  );
}