# AI Hacking League - Supabase Integration Specification

## 1. Real-time Challenge Management

### Supabase Realtime
- Implement Realtime channels for broadcasting challenge events:
  - Challenge start/end notifications
  - Participant join/leave updates
  - Real-time countdown timer updates

### Edge Functions
- Create functions for:
  - Initiating challenges
  - Ending challenges
  - Calculating and updating scores

### Database Tables
- `challenges`: Store challenge details
- `challenge_participants`: Track active participants

## 2. Live Coding Collaboration

### Supabase Realtime
- Use Broadcast feature to sync code changes between team members
- Implement Presence to show active collaborators

### Database Tables
- `code_snapshots`: Store code at regular intervals
- `collaboration_sessions`: Track active coding sessions

### Edge Functions
- Implement plagiarism detection for code submissions

## 3. AI Judging System

### Edge Functions
- Create an OpenAI-integrated function for code evaluation
- Implement scoring algorithms based on AI evaluation

### Database Tables
- `submissions`: Store participant code submissions
- `evaluations`: Store AI-generated evaluation results

### Supabase Realtime
- Broadcast real-time updates of scores and rankings

## 4. Dynamic Leaderboards

### Database Tables
- `leaderboards`: Store current rankings
- `participant_scores`: Track individual and team scores

### Supabase Realtime
- Implement real-time leaderboard updates

### Edge Functions
- Create complex ranking algorithms if needed

## 5. Secure Authentication

### Supabase Auth
- Implement user registration and login
- Use custom claims in JWT for role management (participant, judge, admin)

### Row Level Security (RLS)
- Implement RLS policies for data access control based on user roles

## 6. AI-Generated Challenges

### Edge Functions
- Create a GPT-integrated function for generating coding challenges

### Database Tables
- `ai_generated_challenges`: Store AI-created challenge details

### Supabase Realtime
- Broadcast newly generated challenges to participants

## 7. Real-time Chat and Notifications

### Supabase Realtime
- Implement chat channels for participant communication
- Set up notification channels for system announcements

### Edge Functions
- Create a content moderation function for chat messages

### Database Tables
- `chat_messages`: Store chat history
- `notifications`: Log system notifications

## 8. Automated Reward Distribution

### Edge Functions
- Implement prize calculation based on challenge outcomes
- Update user balances automatically

### Database Tables
- `user_balances`: Track participant account balances
- `transactions`: Log all balance changes and rewards

### Supabase Realtime
- Send real-time notifications for rewards and balance updates

## 9. AI Skill Assessment

### Edge Functions
- Create a function to analyze participant code history and assess skill levels

### Database Tables
- `skill_profiles`: Store participant skill assessments
- `skill_badges`: Define available skill badges or levels

### Supabase Realtime
- Update skill badges or levels in real-time

## 10. Replay and Analysis System

### Database Tables
- `coding_actions`: Log detailed coding actions during challenges
- `replays`: Store generated replay data

### Edge Functions
- Generate replay visualizations and analytics

### Supabase Realtime
- Enable live spectator mode for ongoing challenges

## Implementation Notes

1. Ensure all Realtime channels are properly secured with authentication.
2. Optimize database queries and indexes for performance.
3. Implement proper error handling and logging in all edge functions.
4. Use Supabase storage for any large files or assets if needed.
5. Regularly backup the database and test the restoration process.
6. Implement rate limiting on API calls to prevent abuse.
7. Use Supabase's built-in caching mechanisms where appropriate to improve performance.
8. Conduct thorough testing of real-time features to ensure reliability at scale.

## Project Setup and Integration

1. Install necessary dependencies:
   ```
   npm install @supabase/supabase-js @supabase/auth-helpers-react
   ```

2. Create `src/supabaseClient.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. Update existing components to use Supabase:
   - Modify `src/components/ChallengeManager.jsx` to use Realtime for challenge updates
   - Update `src/components/TeamWizard.jsx` to integrate with Supabase Auth and database
   - Refactor `src/pages/ChallengeManagement.jsx` to use Realtime for live updates

4. Create new components for Supabase integration:
   - `src/components/CodeCollaboration.tsx` for live coding features
   - `src/components/Leaderboard.tsx` for real-time leaderboard updates

5. Implement Edge Functions:
   - Create `judge-submission` function for AI code evaluation
   - Develop functions for challenge management and reward distribution

6. Set up Supabase Auth in `src/App.jsx` or a dedicated auth component

7. Configure Row Level Security (RLS) policies in Supabase dashboard for all tables

8. Implement and test all Realtime features, ensuring proper channel management and security

9. Integrate AI-powered features using Edge Functions and OpenAI API

10. Thoroughly test all components and functions, focusing on real-time capabilities and security