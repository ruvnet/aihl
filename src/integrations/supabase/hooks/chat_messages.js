import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useAddChatMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ challengeId, userId, message }) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{ challenge_id: challengeId, user_id: userId, message }]);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['chat-messages', variables.challengeId]);
    },
  });
};

export const useLatestChatMessages = (challengeId) => useQuery({
  queryKey: ['chat-messages', challengeId],
  queryFn: () => fromSupabase(supabase
    .from('chat_messages')
    .select('*')
    .eq('challenge_id', challengeId)
    .order('created_at', { ascending: false })
    .limit(10)
  ),
});