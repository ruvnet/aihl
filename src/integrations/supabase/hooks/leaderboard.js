import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### leaderboard

| name         | type                     | format    | required |
|--------------|--------------------------|-----------|----------|
| id           | uuid                     | uuid      | true     |
| user_id      | uuid                     | uuid      | false    |
| team_id      | uuid                     | uuid      | false    |
| challenge_id | uuid                     | uuid      | false    |
| score        | numeric                  | numeric   | false    |
| rank         | integer                  | integer   | false    |
| created_at   | timestamp with time zone | timestamp | false    |
| updated_at   | timestamp with time zone | timestamp | false    |

Foreign Key Relationships:
- team_id references teams.id
- challenge_id references challenges.id
*/

export const useLeaderboard = () => useQuery({
  queryKey: ['leaderboard'],
  queryFn: () => fromSupabase(supabase.from('leaderboard').select('*')),
});

export const useAddLeaderboardEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEntry) => fromSupabase(supabase.from('leaderboard').insert([newEntry])),
    onSuccess: () => {
      queryClient.invalidateQueries('leaderboard');
    },
  });
};

export const useUpdateLeaderboardEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('leaderboard').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('leaderboard');
    },
  });
};

export const useDeleteLeaderboardEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('leaderboard').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('leaderboard');
    },
  });
};