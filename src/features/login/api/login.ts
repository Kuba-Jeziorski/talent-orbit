import { supabase } from "../../../libs/supabase/client";

export type LoginProps = {
  email: string;
  password: string;
};

// Thin wrapper around Supabase sign-in. Throws if credentials fail.
export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
