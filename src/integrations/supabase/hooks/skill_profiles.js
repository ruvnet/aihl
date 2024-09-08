import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

export const useUpdateSkillProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, skillName, skillLevel }) => {
      const { data, error } = await supabase
        .from('skill_profiles')
        .upsert({ user_id: userId, skill_name: skillName, skill_level: skillLevel });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['skill-profile', variables.userId]);
    },
  });
};