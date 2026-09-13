import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./get-current-user";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 60 * 1000,
  });

  return { user, isLoading, isAuthenticated: !!user };
};
