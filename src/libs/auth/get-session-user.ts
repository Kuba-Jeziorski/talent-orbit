import { supabase } from "../supabase/client";

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