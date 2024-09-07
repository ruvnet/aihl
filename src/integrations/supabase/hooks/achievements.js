import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### achievements

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | uuid | uuid   | true     |
| name        | text | string | true     |
| description | text | string | false    |
| icon_url    | text | string | false    |
*/

export const useAchievements = () => useQuery({
  queryKey: ['achievements'],
  queryFn: () => fromSupabase(supabase.from('achievements').select('*')),
});

export const useAchievement = (id) => useQuery({
  queryKey: ['achievement', id],
  queryFn: () => fromSupabase(supabase.from('achievements').select('*').eq('id', id).single()),
});

export const useAddAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAchievement) => fromSupabase(supabase.from('achievements').insert([newAchievement])),
    onSuccess: () => {
      queryClient.invalidateQueries('achievements');
    },
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('achievements').update(updateData).eq('id', id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['achievement', variables.id]);
      queryClient.invalidateQueries('achievements');
    },
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('achievements').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('achievements');
    },
  });
};