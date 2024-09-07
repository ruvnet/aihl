import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### transactions

| name        | type                     | format    | required |
|-------------|--------------------------|-----------|----------|
| id          | uuid                     | uuid      | true     |
| user_id     | uuid                     | uuid      | false    |
| amount      | numeric                  | numeric   | false    |
| type        | text                     | string    | false    |
| description | text                     | string    | false    |
| created_at  | timestamp with time zone | timestamp | false    |
*/

export const useTransactions = (userId) => useQuery({
  queryKey: ['transactions', userId],
  queryFn: () => fromSupabase(supabase.from('transactions').select('*').eq('user_id', userId)),
});

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTransaction) => fromSupabase(supabase.from('transactions').insert([newTransaction])),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['transactions', variables.user_id]);
    },
  });
};