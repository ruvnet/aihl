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

export const useGetEvaluation = (challengeId, userId) => {
  return useQuery({
    queryKey: ['evaluation', challengeId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .eq('challenge_id', challengeId)
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const { data, error } = await supabase
        .from('evaluations')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['evaluation', variables.challenge_id, variables.user_id]);
    },
  });
};