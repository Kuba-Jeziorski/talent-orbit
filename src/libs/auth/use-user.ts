import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../../constants/constants";
import { getSessionUser } from "./get-session-user";

// Reads ["user"] from cache (AuthListener usually filled it). queryFn is fallback.
export const useUser = () => {
  const { data: user } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getSessionUser,
    staleTime: Infinity,
  });

  return { user, isAuthenticated: !!user };
};
