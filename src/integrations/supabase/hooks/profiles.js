import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### profiles

| name            | type                     | format    | required |
|-----------------|--------------------------|-----------|----------|
| id              | uuid                     | uuid      | true     |
| username        | text                     | string    | false    |
| full_name       | text                     | string    | false    |
| avatar_url      | text                     | string    | false    |
| website         | text                     | string    | false    |
| github_username | text                     | string    | false    |
| created_at      | timestamp with time zone | timestamp | false    |
| updated_at      | timestamp with time zone | timestamp | false    |
*/

export const useProfile = (userId) => useQuery({
  queryKey: ['profile', userId],
  queryFn: () => fromSupabase(supabase.from('profiles').select('*').eq('id', userId).single()),
});

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('profiles').update(updateData).eq('id', id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['profile', variables.id]);
    },
  });
};