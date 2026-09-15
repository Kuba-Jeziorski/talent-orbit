import { useUser } from "../libs/auth/use-user";

// TEST
export const HomePage = () => {
  const { user } = useUser();

  return <h1>homepage {user?.email}</h1>;
};
