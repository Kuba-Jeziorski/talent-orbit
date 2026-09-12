import { useEffect } from "react";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // check if there is a user authenticated
  // if no --> redirect to the /login page
  // if yes --> return <>{children}</>

  const navigate = useNavigate();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return <div data-component="protected">{children}</div>;
};
