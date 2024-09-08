import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

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