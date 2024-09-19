# API Integration Documentation

## OpenAI API
### Setup
1. Obtain API key from OpenAI dashboard
2. Store API key in `.env` file
3. Use `useOpenAI` hook for API calls

### Request/Response Handling
```javascript
const { sendMessage } = useOpenAI();
const response = await sendMessage(prompt, context);
```

### Integration Examples
- Code evaluation in AIJudiciaryTab
- Skill assessment in ProfilePage

## Supabase API
### Configuration
1. Set up Supabase project
2. Add Supabase URL and API key to `.env` file
3. Initialize Supabase client in `src/integrations/supabase/supabase.js`

### Data Access
Use React Query hooks in `src/integrations/supabase/hooks/` for data operations

### Real-time Data
Implement Supabase real-time subscriptions for live updates

## Error Handling
- Implement try/catch blocks for API calls
- Use React Query's error handling features
- Log errors for debugging and monitoring

## Performance Considerations
- Implement caching with React Query
- Use pagination for large data sets
- Optimize API call frequency and payload size

## FastAPI Endpoints
### User Endpoints
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login with user credentials.
- `POST /auth/logout`: Logout the current user.
- `GET /auth/me`: Retrieve the current user's profile.

### Challenge Endpoints
- `GET /challenges`: List all available challenges.
- `POST /challenges`: Create a new challenge.
- `GET /challenges/{challenge_id}`: Retrieve a specific challenge.
- `PUT /challenges/{challenge_id}`: Update a specific challenge.
- `DELETE /challenges/{challenge_id}`: Delete a specific challenge.

### Leaderboard Endpoints
- `GET /leaderboard`: View the global leaderboard.
- `GET /leaderboard/challenge/{challenge_id}`: View leaderboard for a specific challenge.

### Team Endpoints
- `GET /teams`: List all available teams.
- `POST /teams`: Create a new team.
- `GET /teams/{team_id}`: Retrieve a specific team.
- `PUT /teams/{team_id}`: Update a specific team.
- `DELETE /teams/{team_id}`: Delete a specific team.

### AI Judicial Endpoints
- `POST /judge/submit`: Submit a code file for AI-based evaluation.

### Achievement Endpoints
- `GET /achievements`: List all available achievements.
- `POST /achievements`: Create a new achievement.
- `GET /achievements/{achievement_id}`: Retrieve a specific achievement.
- `PUT /achievements/{achievement_id}`: Update a specific achievement.
- `DELETE /achievements/{achievement_id}`: Delete a specific achievement.

### Admin Endpoints
- `GET /admin/users`: Retrieve all users (admin only).
- `POST /admin/users`: Create a new user (admin only).
- `GET /admin/users/{user_id}`: Retrieve a specific user (admin only).
- `PUT /admin/users/{user_id}`: Update a specific user (admin only).
- `DELETE /admin/users/{user_id}`: Delete a specific user (admin only).
- `GET /admin/challenges`: Retrieve all challenges (admin only).
- `POST /admin/challenges`: Create a new challenge (admin only).
- `GET /admin/challenges/{challenge_id}`: Retrieve a specific challenge (admin only).
- `PUT /admin/challenges/{challenge_id}`: Update a specific challenge (admin only).
- `DELETE /admin/challenges/{challenge_id}`: Delete a specific challenge (admin only).
- `GET /admin/teams`: Retrieve all teams (admin only).
- `POST /admin/teams`: Create a new team (admin only).
- `GET /admin/teams/{team_id}`: Retrieve a specific team (admin only).
- `PUT /admin/teams/{team_id}`: Update a specific team (admin only).
- `DELETE /admin/teams/{team_id}`: Delete a specific team (admin only).
- `GET /admin/achievements`: Retrieve all achievements (admin only).
- `POST /admin/achievements`: Create a new achievement (admin only).
- `GET /admin/achievements/{achievement_id}`: Retrieve a specific achievement (admin only).
- `PUT /admin/achievements/{achievement_id}`: Update a specific achievement (admin only).
- `DELETE /admin/achievements/{achievement_id}`: Delete a specific achievement (admin only).
- `GET /admin/analytics`: Retrieve analytics data (admin only).
- `GET /admin/leaderboard`: Retrieve leaderboard data (admin only).
- `GET /admin/system-health`: Retrieve system health status (admin only).
- `POST /admin/generate-challenge`: Generate an AI challenge (admin only).
