import { supabase } from "../supabase/client";

// Reads the local Supabase session. Returns the user object or null.
export const getSessionUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session?.user ?? null;
};
