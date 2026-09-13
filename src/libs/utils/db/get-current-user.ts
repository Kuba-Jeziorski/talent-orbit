import { supabase } from "./supabase";

export const getCurrentUser = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};
