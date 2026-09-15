import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { USER_QUERY_KEY } from "../constants/constants";
import { supabase } from "../libs/supabase/client";
import { Spinner } from "../libs/ui/spinner";

type Props = {
  children: ReactNode;
};

// TEST
// Mounts with the app (first visit and refresh). Keeps ["user"] in sync
// for the whole session; does not decide login vs home.
export const AuthListener = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Same callback, many events. First is INITIAL_SESSION
      // Later: SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT, …
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
