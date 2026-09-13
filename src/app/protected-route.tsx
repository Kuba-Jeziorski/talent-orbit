import { Navigate } from "react-router";
import { useUser } from "../libs/utils/db/use-user";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    <Navigate to="/login" />;
  }

  return <div data-component="protected">{children}</div>;
};
