import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useCodeSnapshots = (challengeId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`code-snapshots:${challengeId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'code_snapshots', filter: `challenge_id=eq.${challengeId}` }, (payload) => {
        queryClient.invalidateQueries(['code-snapshots', challengeId]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [challengeId, queryClient]);

  return useQuery({
    queryKey: ['code-snapshots', challengeId],
    queryFn: () => fromSupabase(supabase.from('code_snapshots').select('*').eq('challenge_id', challengeId)),
  });
};

export const useAddCodeSnapshot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ challengeId, userId, code }) => {
      const { data, error } = await supabase.from('code_snapshots').insert([
        { challenge_id: challengeId, user_id: userId, code },
      ]);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['code-snapshots', variables.challengeId]);
    },
  });
};

export const useCollaborationSession = (sessionId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`collaboration-session:${sessionId}`)
      .on('presence', { event: 'sync' }, () => {
        queryClient.invalidateQueries(['collaboration-session', sessionId]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, queryClient]);

  return useQuery({
    queryKey: ['collaboration-session', sessionId],
    queryFn: () => fromSupabase(supabase.from('collaboration_sessions').select('*').eq('id', sessionId).single()),
  });
};