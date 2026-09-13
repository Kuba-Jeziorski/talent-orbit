import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
