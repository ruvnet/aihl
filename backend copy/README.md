# AI Hacking League Backend README

## Overview

The AI Hacking League Backend is a FastAPI-based backend system designed to manage various aspects of the AI Hacking League, such as user authentication, challenges, leaderboard tracking, and team management. This backend is modular, scalable, and integrated with Supabase for database handling and GitHub for repository management.

## Features

- **User Authentication and Authorization**: Implements registration, login, and user management.
- **Challenge Management**: Allows the creation, listing, and management of coding challenges with varying difficulty levels.
- **Leaderboard**: Tracks participants' progress and displays a global or challenge-specific leaderboard.
- **Team Management**: Supports team creation, listing, and management.
- **Supabase Integration**: Uses Supabase as the database backend for storing user, challenge, and team information.
- **GitHub Integration**: Creates GitHub repositories for coding challenges and maintains challenge repositories.
- **Secure Token Management**: JWT-based token creation for secure API access.
- **Docker Support**: The backend is containerized using Docker for easy deployment and scalability.
- **Environment Configurations**: Sensitive credentials and configurations are stored securely using environment variables.

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
│   └── services/           # Services handling external integrations (Supabase, GitHub)
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

### 2. Environment Setup

1. Install Python dependencies using [Poetry](https://python-poetry.org/):
   ```bash
   poetry install
   ```

2. Set up the environment variables by creating a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Fill in the environment variables in the `.env` file:
   ```bash
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_api_key
   GITHUB_TOKEN=your_github_token
   SECRET_KEY=your_secret_key
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
  
- **Leaderboard Endpoints**:
  - `GET /leaderboard`: View the global leaderboard.
  - `GET /leaderboard/challenge/{challenge_id}`: View leaderboard for a specific challenge.

- **Team Endpoints**:
  - `GET /teams`: List all available teams.

## Configuration

Configuration settings are managed via environment variables defined in the `.env` file. Key configuration variables include:

- `SUPABASE_URL`: The Supabase project URL.
- `SUPABASE_KEY`: The Supabase API key.
- `GITHUB_TOKEN`: Personal access token for GitHub API interactions.
- `SECRET_KEY`: Secret key used for JWT token encryption.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time in minutes.

## External Services

- **Supabase**: Used for data storage. Ensure you have a valid Supabase project set up and configure it in the `.env` file.
- **GitHub**: Handles repository creation for challenges.

## Conclusion

The AI Hacking League Backend provides a robust API for managing users, challenges, teams, and leaderboards. It integrates seamlessly with Supabase for data storage and GitHub for repository management. The Docker setup ensures easy deployment and scalability, while comprehensive environment configurations ensure secure management of sensitive credentials.