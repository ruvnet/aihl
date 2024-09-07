import { useMutation } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password, username }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // Create a profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, username }]);
      
      if (profileError) throw profileError;

      return data;
    },
  });
};