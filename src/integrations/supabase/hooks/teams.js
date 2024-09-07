import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### teams

| name        | type                     | format    | required |
|-------------|--------------------------|-----------|----------|
| id          | uuid                     | uuid      | true     |
| name        | text                     | string    | true     |
| description | text                     | string    | false    |
| created_by  | uuid                     | uuid      | false    |
| created_at  | timestamp with time zone | timestamp | false    |
| updated_at  | timestamp with time zone | timestamp | false    |
*/

export const useTeams = () => useQuery({
  queryKey: ['teams'],
  queryFn: () => fromSupabase(supabase.from('teams').select('*')),
});

export const useTeam = (id) => useQuery({
  queryKey: ['team', id],
  queryFn: () => fromSupabase(supabase.from('teams').select('*').eq('id', id).single()),
});

export const useAddTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTeam) => fromSupabase(supabase.from('teams').insert([newTeam])),
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('teams').update(updateData).eq('id', id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['team', variables.id]);
      queryClient.invalidateQueries('teams');
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('teams').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
    },
  });
};