import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useReplays = (challengeId) => useQuery({
  queryKey: ['replays', challengeId],
  queryFn: () => fromSupabase(supabase.from('coding_actions').select('*').eq('challenge_id', challengeId)),
});

export const useAddReplay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (replayData) => {
      const { data, error } = await supabase.from('coding_actions').insert([replayData]);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['replays', variables.challenge_id]);
    },
  });
};

export const useLatestReplay = (challengeId) => useQuery({
  queryKey: ['latest-replay', challengeId],
  queryFn: () => fromSupabase(supabase.from('coding_actions').select('*').eq('challenge_id', challengeId).order('created_at', { ascending: false }).limit(1)),
});

export const useGenerateReplayVisualization = () => {
  return useMutation({
    mutationFn: async (challengeId) => {
      const { data, error } = await supabase.functions.invoke('generate-replay-visualization', {
        body: { challengeId },
      });
      if (error) throw error;
      return data;
    },
  });
};