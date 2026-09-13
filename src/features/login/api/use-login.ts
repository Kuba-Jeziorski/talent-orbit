import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTE_HOME, USER_QUERY_KEY } from "../../../constants/constants";
import { login as loginApi } from "./login";

// Mutation: calls login(), then updates cache and navigates. Does not read session.
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEY, data.user);
      navigate(ROUTE_HOME, { replace: true });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return { login, isPending };
};
