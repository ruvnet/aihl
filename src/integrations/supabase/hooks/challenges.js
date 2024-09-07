import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### challenges

| name                 | type                     | format    | required |
|----------------------|--------------------------|-----------|----------|
| id                   | uuid                     | uuid      | true     |
| title                | text                     | string    | true     |
| description          | text                     | string    | false    |
| difficulty           | text                     | string    | false    |
| start_time           | timestamp with time zone | timestamp | false    |
| end_time             | timestamp with time zone | timestamp | false    |
| max_participants     | integer                  | integer   | false    |
| current_participants | integer                  | integer   | false    |
| buy_in               | numeric                  | numeric   | false    |
| prize_pool           | numeric                  | numeric   | false    |
| github_repo_url      | text                     | string    | false    |
| created_at           | timestamp with time zone | timestamp | false    |
| updated_at           | timestamp with time zone | timestamp | false    |
*/

export const useChallenges = () => useQuery({
  queryKey: ['challenges'],
  queryFn: () => fromSupabase(supabase.from('challenges').select('*')),
});

export const useChallenge = (id) => useQuery({
  queryKey: ['challenge', id],
  queryFn: () => fromSupabase(supabase.from('challenges').select('*').eq('id', id).single()),
});

export const useAddChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newChallenge) => fromSupabase(supabase.from('challenges').insert([newChallenge])),
    onSuccess: () => {
      queryClient.invalidateQueries('challenges');
    },
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('challenges').update(updateData).eq('id', id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['challenge', variables.id]);
      queryClient.invalidateQueries('challenges');
    },
  });
};

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('challenges').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('challenges');
    },
  });
};