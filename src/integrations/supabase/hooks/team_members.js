import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### team_members

| name      | type                     | format    | required |
|-----------|--------------------------|-----------|----------|
| team_id   | uuid                     | uuid      | true     |
| user_id   | uuid                     | uuid      | true     |
| role      | text                     | string    | false    |
| joined_at | timestamp with time zone | timestamp | false    |

Foreign Key Relationships:
- team_id references teams.id
*/

export const useTeamMembers = (teamId) => useQuery({
  queryKey: ['team_members', teamId],
  queryFn: () => fromSupabase(supabase.from('team_members').select('*').eq('team_id', teamId)),
});

export const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newMember) => fromSupabase(supabase.from('team_members').insert([newMember])),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['team_members', variables.team_id]);
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ team_id, user_id, ...updateData }) => fromSupabase(supabase.from('team_members').update(updateData).match({ team_id, user_id })),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['team_members', variables.team_id]);
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ team_id, user_id }) => fromSupabase(supabase.from('team_members').delete().match({ team_id, user_id })),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['team_members', variables.team_id]);
    },
  });
};