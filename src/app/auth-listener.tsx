import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { USER_QUERY_KEY } from "../constants/constants";
import { supabase } from "../libs/supabase/client";
import { Spinner } from "../libs/ui/spinner";

type Props = {
  children: ReactNode;
};

export const AuthListener = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(USER_QUERY_KEY, session?.user ?? null);
      setReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  if (!ready) {
    return <Spinner />;
  }

  return children;
};
