import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useAIGeneratedChallenges = () => useQuery({
  queryKey: ['ai-generated-challenges'],
  queryFn: () => fromSupabase(supabase.from('ai_generated_challenges').select('*')),
});

export const useAddAIGeneratedChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (challengePrompt) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-challenge', {
        body: { prompt: challengePrompt },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('ai-generated-challenges');
    },
  });
};

export const useLatestAIGeneratedChallenge = () => useQuery({
  queryKey: ['latest-ai-generated-challenge'],
  queryFn: () => fromSupabase(supabase.from('ai_generated_challenges').select('*').order('created_at', { ascending: false }).limit(1).single()),
});