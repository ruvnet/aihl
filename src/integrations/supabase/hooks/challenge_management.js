import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useRealTimeChallenges = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('public:challenges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, (payload) => {
        queryClient.invalidateQueries('challenges');
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => fromSupabase(supabase.from('challenges').select('*')),
  });
};

export const useStartChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (challengeId) => {
      const { data, error } = await supabase.functions.invoke('start-challenge', {
        body: { challengeId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('challenges');
    },
  });
};

export const useEndChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (challengeId) => {
      const { data, error } = await supabase.functions.invoke('end-challenge', {
        body: { challengeId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('challenges');
    },
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ challengeId, userId, score }) => {
      const { data, error } = await supabase.functions.invoke('update-score', {
        body: { challengeId, userId, score },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('challenges');
    },
  });
};