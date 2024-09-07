import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

// Import all hooks
import {
  useLeaderboard,
  useAddLeaderboardEntry,
  useUpdateLeaderboardEntry,
  useDeleteLeaderboardEntry,
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

// Export all imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useLeaderboard,
  useAddLeaderboardEntry,
  useUpdateLeaderboardEntry,
  useDeleteLeaderboardEntry,
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
  useAddEnrollment,
  useUpdateEnrollment,
  useDeleteEnrollment,
  useTeamMembers,
  useAddTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
};