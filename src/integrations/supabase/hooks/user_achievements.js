import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### user_achievements

| name           | type                     | format    | required |
|----------------|--------------------------|-----------|----------|
| user_id        | uuid                     | uuid      | true     |
| achievement_id | uuid                     | uuid      | true     |
| earned_at      | timestamp with time zone | timestamp | false    |

Foreign Key Relationships:
- achievement_id references achievements.id
*/

export const useUserAchievements = (userId) => useQuery({
  queryKey: ['user_achievements', userId],
  queryFn: () => fromSupabase(supabase.from('user_achievements').select('*').eq('user_id', userId)),
});

export const useAddUserAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAchievement) => fromSupabase(supabase.from('user_achievements').insert([newAchievement])),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['user_achievements', variables.user_id]);
    },
  });
};

export const useDeleteUserAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, achievement_id }) => fromSupabase(supabase.from('user_achievements').delete().match({ user_id, achievement_id })),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['user_achievements', variables.user_id]);
    },
  });
};