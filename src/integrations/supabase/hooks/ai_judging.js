import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

export const useEvaluateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ challengeId, userId, code }) => {
      const { data, error } = await supabase.functions.invoke('evaluate-submission', {
        body: { challengeId, userId, code },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['challenge-results', variables.challengeId]);
    },
  });
};