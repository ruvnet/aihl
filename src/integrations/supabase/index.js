// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';

// Import all hooks
import * as leaderboardHooks from './hooks/leaderboard';
import * as walletHooks from './hooks/wallet';
import * as userAchievementsHooks from './hooks/user_achievements';
import * as profilesHooks from './hooks/profiles';
import * as transactionsHooks from './hooks/transactions';
import * as achievementsHooks from './hooks/achievements';
import * as challengesHooks from './hooks/challenges';
import * as teamsHooks from './hooks/teams';
import * as enrollmentsHooks from './hooks/enrollments';
import * as teamMembersHooks from './hooks/team_members';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  ...leaderboardHooks,
  ...walletHooks,
  ...userAchievementsHooks,
  ...profilesHooks,
  ...transactionsHooks,
  ...achievementsHooks,
  ...challengesHooks,
  ...teamsHooks,
  ...enrollmentsHooks,
  ...teamMembersHooks,
};