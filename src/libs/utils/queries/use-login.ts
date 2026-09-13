import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginApi } from "../db/api-user";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return { login, isPending };
};
