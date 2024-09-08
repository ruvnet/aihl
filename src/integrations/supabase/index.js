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

import {
  useChallengeParticipants,
  useAddChallengeParticipant,
  useRemoveChallengeParticipant,
} from './hooks/challenge_participants';

import {
  useCodeSnapshots,
  useAddCodeSnapshot,
  useLatestCodeSnapshot,
} from './hooks/code_snapshots';

import {
  useCollaborationSessions,
  useAddCollaborationSession,
  useUpdateCollaborationSession,
} from './hooks/collaboration_sessions';

import {
  useSubmissions,
  useAddSubmission,
  useLatestSubmission,
} from './hooks/submissions';

import {
  useEvaluations,
  useAddEvaluation,
  useLatestEvaluation,
} from './hooks/evaluations';

import {
  useParticipantScores,
  useUpdateParticipantScore,
} from './hooks/participant_scores';

import {
  useAIGeneratedChallenges,
  useAddAIGeneratedChallenge,
} from './hooks/ai_generated_challenges';

import {
  useChatMessages,
  useAddChatMessage,
  useLatestChatMessages,
} from './hooks/chat_messages';

import {
  useNotifications,
  useAddNotification,
  useLatestNotifications,
} from './hooks/notifications';

import {
  useSkillProfiles,
  useUpdateSkillProfile,
} from './hooks/skill_profiles';

import {
  useSkillBadges,
  useAddSkillBadge,
} from './hooks/skill_badges';

import {
  useCodingActions,
  useAddCodingAction,
} from './hooks/coding_actions';

import {
  useReplays,
  useAddReplay,
  useLatestReplay,
  useGenerateReplayVisualization,
} from './hooks/replays';

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
  useChallengeParticipants,
  useAddChallengeParticipant,
  useRemoveChallengeParticipant,
  useCodeSnapshots,
  useAddCodeSnapshot,
  useLatestCodeSnapshot,
  useCollaborationSessions,
  useAddCollaborationSession,
  useUpdateCollaborationSession,
  useSubmissions,
  useAddSubmission,
  useLatestSubmission,
  useEvaluations,
  useAddEvaluation,
  useLatestEvaluation,
  useParticipantScores,
  useUpdateParticipantScore,
  useAIGeneratedChallenges,
  useAddAIGeneratedChallenge,
  useChatMessages,
  useAddChatMessage,
  useLatestChatMessages,
  useNotifications,
  useAddNotification,
  useLatestNotifications,
  useSkillProfiles,
  useUpdateSkillProfile,
  useSkillBadges,
  useAddSkillBadge,
  useCodingActions,
  useAddCodingAction,
  useReplays,
  useAddReplay,
  useLatestReplay,
  useGenerateReplayVisualization,
};