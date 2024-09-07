import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### enrollments

| name         | type                     | format    | required |
|--------------|--------------------------|-----------|----------|
| id           | uuid                     | uuid      | true     |
| user_id      | uuid                     | uuid      | false    |
| challenge_id | uuid                     | uuid      | false    |
| team_id      | uuid                     | uuid      | false    |
| status       | text                     | string    | false    |
| score        | numeric                  | numeric   | false    |
| submitted_at | timestamp with time zone | timestamp | false    |
| created_at   | timestamp with time zone | timestamp | false    |
| updated_at   | timestamp with time zone | timestamp | false    |

Foreign Key Relationships:
- challenge_id references challenges.id
- team_id references teams.id
*/

export const useEnrollments = (userId) => useQuery({
  queryKey: ['enrollments', userId],
  queryFn: () => fromSupabase(supabase.from('enrollments').select('*').eq('user_id', userId)),
});

export const useEnrollment = (id) => useQuery({
  queryKey: ['enrollment', id],
  queryFn: () => fromSupabase(supabase.from('enrollments').select('*').eq('id', id).single()),
});

export const useAddEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEnrollment) => fromSupabase(supabase.from('enrollments').insert([newEnrollment])),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['enrollments', variables.user_id]);
    },
  });
};

export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('enrollments').update(updateData).eq('id', id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['enrollment', variables.id]);
      queryClient.invalidateQueries(['enrollments', variables.user_id]);
    },
  });
};

export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('enrollments').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('enrollments');
    },
  });
};