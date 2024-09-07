# AI Hacking League Backend

This document outlines the backend architecture and API specification for the AI Hacking League application.

## Technology Stack

- FastAPI: For building the API
- Pydantic: For data validation and settings management
- Supabase: For database and authentication
- GitHub API: For challenge repository management
- Docker: For containerization and deployment

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── auth.py
│   │   │   ├── challenges.py
│   │   │   ├── leaderboard.py
│   │   │   ├── teams.py
│   │   │   └── users.py
│   │   └── api.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   ├── base.py
│   │   └── session.py
│   ├── models/
│   │   ├── challenge.py
│   │   ├── team.py
│   │   └── user.py
│   ├── schemas/
│   │   ├── challenge.py
│   │   ├── team.py
│   │   └── user.py
│   ├── services/
│   │   ├── github_service.py
│   │   └── supabase_service.py
│   └── main.py
├── tests/
│   ├── api/
│   ├── services/
│   └── conftest.py
├── Dockerfile
├── requirements.txt
└── .env.example
```

## API Endpoints

### Authentication

- POST /api/auth/register: Register a new user
- POST /api/auth/login: User login
- POST /api/auth/logout: User logout
- GET /api/auth/me: Get current user info

### Challenges

- GET /api/challenges: List all challenges
- GET /api/challenges/{challenge_id}: Get challenge details
- POST /api/challenges: Create a new challenge (admin only)
- PUT /api/challenges/{challenge_id}: Update challenge details (admin only)
- DELETE /api/challenges/{challenge_id}: Delete a challenge (admin only)
- POST /api/challenges/{challenge_id}/enroll: Enroll in a challenge
- POST /api/challenges/{challenge_id}/submit: Submit a challenge solution

### Leaderboard

- GET /api/leaderboard: Get global leaderboard
- GET /api/leaderboard/challenge/{challenge_id}: Get leaderboard for a specific challenge

### Teams

- GET /api/teams: List all teams
- GET /api/teams/{team_id}: Get team details
- POST /api/teams: Create a new team
- PUT /api/teams/{team_id}: Update team details
- DELETE /api/teams/{team_id}: Delete a team
- POST /api/teams/{team_id}/join: Join a team
- POST /api/teams/{team_id}/leave: Leave a team

### Users

- GET /api/users/{user_id}: Get user profile
- PUT /api/users/{user_id}: Update user profile
- GET /api/users/{user_id}/challenges: Get user's enrolled challenges
- GET /api/users/{user_id}/teams: Get user's teams

## Data Models

### User

- id: UUID
- username: str
- email: str
- hashed_password: str
- is_active: bool
- is_superuser: bool
- created_at: datetime
- updated_at: datetime

### Challenge

- id: UUID
- title: str
- description: str
- difficulty: Enum('Easy', 'Medium', 'Hard', 'Expert')
- start_time: datetime
- end_time: datetime
- max_participants: int
- current_participants: int
- github_repo_url: str
- created_at: datetime
- updated_at: datetime

### Team

- id: UUID
- name: str
- description: str
- created_by: UUID (User ID)
- created_at: datetime
- updated_at: datetime

### Enrollment

- id: UUID
- user_id: UUID
- challenge_id: UUID
- team_id: UUID (optional)
- status: Enum('Enrolled', 'In Progress', 'Completed', 'Disqualified')
- score: float
- submitted_at: datetime
- created_at: datetime
- updated_at: datetime

## Services

### GitHub Service

- create_challenge_repo(challenge_id: UUID, title: str) -> str
- get_repo_contents(repo_url: str) -> List[Dict]
- create_commit(repo_url: str, file_path: str, content: str, message: str)
- create_pull_request(repo_url: str, title: str, body: str, head: str, base: str)

### Supabase Service

- initialize_supabase()
- create_user(username: str, email: str, password: str) -> User
- get_user_by_email(email: str) -> User
- update_user(user_id: UUID, data: Dict) -> User
- create_challenge(data: Dict) -> Challenge
- get_challenge(challenge_id: UUID) -> Challenge
- update_challenge(challenge_id: UUID, data: Dict) -> Challenge
- delete_challenge(challenge_id: UUID)
- create_team(data: Dict) -> Team
- get_team(team_id: UUID) -> Team
- update_team(team_id: UUID, data: Dict) -> Team
- delete_team(team_id: UUID)

## Authentication and Security

- JWT-based authentication
- Role-based access control (RBAC) for admin functions
- Rate limiting on API endpoints
- CORS configuration

## Environment Variables

- SUPABASE_URL: Supabase project URL
- SUPABASE_KEY: Supabase API key
- GITHUB_TOKEN: GitHub personal access token
- SECRET_KEY: Secret key for JWT encoding
- ALGORITHM: JWT algorithm (e.g., HS256)
- ACCESS_TOKEN_EXPIRE_MINUTES: JWT token expiration time

## Dockerfile

```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Deployment

1. Build the Docker image:
   ```
   docker build -t ai-hacking-league-backend .
   ```

2. Run the container:
   ```
   docker run -d -p 8000:8000 ai-hacking-league-backend
   ```

3. Access the API at `http://localhost:8000`

## Testing

- Use pytest for unit and integration tests
- Implement test fixtures for database and API clients
- Mock external services (GitHub, Supabase) for isolated testing

## Future Considerations

- Implement WebSocket for real-time updates during challenges
- Add caching layer (e.g., Redis) for frequently accessed data
- Set up CI/CD pipeline for automated testing and deployment
- Implement logging and monitoring solutions