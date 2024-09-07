import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

import {
  useLeaderboards,
  useLeaderboard,
  useAddLeaderboard,
  useUpdateLeaderboard,
  useDeleteLeaderboard,
} from './hooks/leaderboard';

import {
  useWallet,
  useUpdateWallet,
} from './hooks/wallet';

import {
  useUserAchievements,
  useAddUserAchievement,
  useDeleteUserAchievement,
} from './hooks/user_achievements';

import {
  useProfile,
  useUpdateProfile,
} from './hooks/profiles';

import {
  useTransactions,
  useAddTransaction,
} from './hooks/transactions';

import {
  useAchievements,
  useAchievement,
  useAddAchievement,
  useUpdateAchievement,
  useDeleteAchievement,
} from './hooks/achievements';

import {
  useChallenges,
  useChallenge,
  useAddChallenge,
  useUpdateChallenge,
  useDeleteChallenge,
} from './hooks/challenges';

import {
  useTeams,
  useTeam,
  useAddTeam,
  useUpdateTeam,
  useDeleteTeam,
} from './hooks/teams';

import {
  useEnrollments,
  useEnrollment,
  useAddEnrollment,
  useUpdateEnrollment,
  useDeleteEnrollment,
} from './hooks/enrollments';

import {
  useTeamMembers,
  useAddTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
} from './hooks/team_members';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useLeaderboards,
  useLeaderboard,
  useAddLeaderboard,
  useUpdateLeaderboard,
  useDeleteLeaderboard,
  useWallet,
  useUpdateWallet,
  useUserAchievements,
  useAddUserAchievement,
  useDeleteUserAchievement,
  useProfile,
  useUpdateProfile,
  useTransactions,
  useAddTransaction,
  useAchievements,
  useAchievement,
  useAddAchievement,
  useUpdateAchievement,
  useDeleteAchievement,
  useChallenges,
  useChallenge,
  useAddChallenge,
  useUpdateChallenge,
  useDeleteChallenge,
  useTeams,
  useTeam,
  useAddTeam,
  useUpdateTeam,
  useDeleteTeam,
  useEnrollments,
  useEnrollment,
  useAddEnrollment,
  useUpdateEnrollment,
  useDeleteEnrollment,
  useTeamMembers,
  useAddTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
};