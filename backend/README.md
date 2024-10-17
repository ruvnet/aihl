# AI Hacking League Backend README

## Overview

The AI Hacking League Backend is a FastAPI-based backend system designed to manage various aspects of the AI Hacking League, such as user authentication, challenges, leaderboard tracking, team management, and an AI-powered judicial system. This backend is modular, scalable, and integrated with Supabase for database handling and GitHub for repository management.

## Features

- **User Authentication and Authorization**: Implements registration, login, and user management.
- **Challenge Management**: Allows the creation, listing, and management of coding challenges with varying difficulty levels.
- **Leaderboard**: Tracks participants' progress and displays a global or challenge-specific leaderboard.
- **Team Management**: Supports team creation, listing, and management.
- **Supabase Integration**: Uses Supabase as the database backend for storing user, challenge, and team information.
- **GitHub Integration**: Creates GitHub repositories for coding challenges and maintains challenge repositories.
- **Secure Token Management**: JWT-based token creation for secure API access.
- **AI Judicial System**: Uses OpenAI GPT-4 to evaluate code submissions based on a weighted scoring system.
- **Docker Support**: The backend is containerized using Docker for easy deployment and scalability.
- **Environment Configurations**: Sensitive credentials and configurations are stored securely using environment variables.

## AI Judicial System

### Overview

The AI Judicial System leverages the power of OpenAI's GPT-4 model to automatically evaluate code submissions for challenges. The system provides objective scoring and feedback based on predefined evaluation criteria.

### Evaluation Criteria

1. **Functionality (40%)**: How well does the solution solve the given problem?
2. **Innovation (30%)**: Does the solution present novel approaches or creative use of AI technologies?
3. **Efficiency (20%)**: How optimized and performant is the code?
4. **Code Quality (10%)**: Is the code well-structured, readable, and following best practices?

### Configuration

To enable the AI Judicial System, ensure the following environment variable is set in your `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

Additional configuration can be managed through the `app/core/config.py` file:

- **AI Model**: Default is `gpt-4`, but you can modify it by setting the `AI_MODEL` variable in the `.env` file if needed.

```bash
AI_MODEL=gpt-4
```

### Using the AI Judicial System

The `/judge/submit` endpoint allows users to submit their code for evaluation. The response will include a score out of 100 and detailed feedback for each of the evaluation criteria.

### Example

To submit a code file for evaluation, make a POST request to `/judge/submit` with the file as a form-data field. Optionally, you can include a `language` parameter to specify the programming language (default is Python).

```bash
curl -X POST "http://localhost:8000/judge/submit" \
  -F "file=@your_code.py" \
  -F "language=Python"
```

The response will include a detailed evaluation of the submission.

## Directory Structure

```bash
backend/
├── app/
│   ├── api/                # API routers for various features
│   │   ├── endpoints/      # Individual API endpoint modules
│   └── core/               # Core configurations and security modules
│   └── db/                 # Database models and session management
│   └── models/             # SQLAlchemy models for the database
│   └── schemas/            # Pydantic schemas for request validation
│   └── services/           # Services handling external integrations (Supabase, GitHub, AI Judge)
├── tests/                  # Unit and integration tests
├── .env.example            # Example environment configuration
├── Dockerfile              # Dockerfile for containerizing the application
├── requirements.txt        # Python dependencies
└── poetry.lock             # Poetry lock file for dependency management
```

## Setup

### 1. Prerequisites

- **Python 3.9+** is required to run the backend.
- **Docker** is recommended for containerized deployment.
- **Supabase** project and API credentials.
- **GitHub** personal access token.
- **OpenAI API Key** to enable the AI Judicial System.

### 2. Environment Setup

1. Install Python dependencies using [Poetry](https://python-poetry.org/):
 
### install poetry 
```
curl -sSL https://install.python-poetry.org | python3 -

```


   ```bash
   poetry install
   ```

3. Set up the environment variables by creating a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Fill in the environment variables in the `.env` file:
   ```bash
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_api_key
   GITHUB_TOKEN=your_github_token
   SECRET_KEY=your_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

### 3. Docker Setup

To run the backend in a Docker container:
1. Build the Docker image:
   ```bash
   docker build -t ai-hacking-league-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8000:8000 ai-hacking-league-backend
   ```

The backend will be accessible at `http://localhost:8000`.

### 4. Running the Application

To run the FastAPI application locally:
1. Start the backend:
   ```bash
   poetry run uvicorn app.main:app --reload
   ```

The backend will be accessible at `http://localhost:8000`.

### 5. Testing

Unit tests are written using `pytest`. To run the tests:
```bash
poetry run pytest
```

## API Documentation

FastAPI provides interactive API documentation available once the server is running. You can access it at:

- Swagger UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`

### Endpoints Overview

- **User Endpoints**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Login with user credentials.
  - `POST /auth/logout`: Logout the current user.
  - `GET /auth/me`: Retrieve the current user's profile.

- **Challenge Endpoints**:
  - `GET /challenges`: List all available challenges.
  - `POST /challenges`: Create a new challenge.
  - `GET /challenges/{challenge_id}`: Retrieve a specific challenge.
  - `PUT /challenges/{challenge_id}`: Update a specific challenge.
  - `DELETE /challenges/{challenge_id}`: Delete a specific challenge.

- **Leaderboard Endpoints**:
  - `GET /leaderboard`: View the global leaderboard.
  - `GET /leaderboard/challenge/{challenge_id}`: View leaderboard for a specific challenge.

- **Team Endpoints**:
  - `GET /teams`: List all available teams.
  - `POST /teams`: Create a new team.
  - `GET /teams/{team_id}`: Retrieve a specific team.
  - `PUT /teams/{team_id}`: Update a specific team.
  - `DELETE /teams/{team_id}`: Delete a specific team.

- **AI Judicial Endpoints**:
  - `POST /judge/submit`: Submit a code file for AI-based evaluation.

- **Achievement Endpoints**:
  - `GET /achievements`: List all available achievements.
  - `POST /achievements`: Create a new achievement.
  - `GET /achievements/{achievement_id}`: Retrieve a specific achievement.
  - `PUT /achievements/{achievement_id}`: Update a specific achievement.
  - `DELETE /achievements/{achievement_id}`: Delete a specific achievement.

- **Admin Endpoints**:
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

## Configuration

Configuration settings are managed via environment variables defined in the `.env` file. Key configuration variables include:

- `SUPABASE_URL`: The Supabase project URL.
- `SUPABASE_KEY`: The Supabase API key.
- `GITHUB_TOKEN`: Personal access token for GitHub API interactions.
- `SECRET_KEY`: Secret key used for JWT token encryption.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time in minutes.
- `OPENAI_API_KEY`: API key used for interacting with OpenAI for code evaluation.
- `AI_MODEL`: The OpenAI model used for code evaluation (default: `gpt-4`).

## External Services

- **Supabase**: Used for data storage. Ensure you have a valid Supabase project set up and configure it in the `.env` file.
- **GitHub**: Handles repository creation for challenges.
- **OpenAI**: Provides AI-based code evaluation for the judicial system.

## Conclusion

The AI Hacking League Backend provides a robust API for managing users, challenges, teams, leaderboards, and AI-based code evaluations. It integrates seamlessly with Supabase for data storage, GitHub for repository management, and OpenAI for AI-powered judicial evaluations. The Docker setup ensures easy deployment and scalability, while comprehensive environment configurations ensure secure management of sensitive credentials.
