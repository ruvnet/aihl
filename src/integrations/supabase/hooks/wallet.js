import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### wallet

| name       | type                     | format    | required |
|------------|--------------------------|-----------|----------|
| user_id    | uuid                     | uuid      | true     |
| balance    | numeric                  | numeric   | false    |
| updated_at | timestamp with time zone | timestamp | false    |
*/

export const useWallet = (userId) => useQuery({
  queryKey: ['wallet', userId],
  queryFn: () => fromSupabase(supabase.from('wallet').select('*').eq('user_id', userId).single()),
});

export const useUpdateWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, ...updateData }) => fromSupabase(supabase.from('wallet').update(updateData).eq('user_id', user_id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['wallet', variables.user_id]);
    },
  });
};