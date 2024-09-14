#!/bin/bash

# init.sh - Script to initialize the AI Hacking League Backend project
# This script sets up the project directory structure, initializes a Poetry environment,
# installs dependencies, and creates necessary files with boilerplate code.

# Exit immediately if a command exits with a non-zero status
set -e

# Define the project root directory
PROJECT_ROOT="backend"

# Create the project directory
mkdir -p $PROJECT_ROOT

# Navigate into the project directory
cd $PROJECT_ROOT

echo "Creating directory structure..."

# Create the directory structure as per the project layout
mkdir -p app/api/endpoints
mkdir -p app/core
mkdir -p app/db
mkdir -p app/models
mkdir -p app/schemas
mkdir -p app/services
mkdir -p tests/api
mkdir -p tests/services

# Create empty __init__.py files to make directories Python packages
touch app/__init__.py
touch app/api/__init__.py
touch app/api/endpoints/__init__.py
touch app/core/__init__.py
touch app/db/__init__.py
touch app/models/__init__.py
touch app/schemas/__init__.py
touch app/services/__init__.py
touch tests/__init__.py
touch tests/api/__init__.py
touch tests/services/__init__.py

echo "Initializing Poetry environment..."

# Initialize a new Poetry project
poetry init -n \
  --name "ai-hacking-league-backend" \
  --description "Backend for the AI Hacking League application" \
  --author "Your Name <youremail@example.com>" \
  --python "^3.9"

# Add dependencies
poetry add fastapi[all] "pydantic>=2.0,<3.0" supabase pyjwt requests python-dotenv sqlalchemy

# Add development dependencies
poetry add --dev pytest pytest-asyncio

echo "Creating .env.example..."

# Create .env.example file with environment variables
cat <<EOL > .env.example
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_api_key
GITHUB_TOKEN=your_github_token
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOL

echo "Creating Dockerfile..."

# Create Dockerfile
cat <<EOL > Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in poetry
RUN pip install --no-cache-dir poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev --no-interaction --no-ansi

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.main:app when the container launches
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOL

echo "Creating requirements.txt..."

# Export requirements.txt from Poetry
poetry export -f requirements.txt --output requirements.txt --without-hashes

echo "Creating app/main.py..."

# Create main.py with FastAPI app
cat <<EOL > app/main.py
from fastapi import FastAPI
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Hacking League Backend")

app.include_router(api_router)
EOL

echo "Creating app/api/api.py..."

# Create api.py to include routers
cat <<EOL > app/api/api.py
from fastapi import APIRouter
from app.api.endpoints import auth, challenges, leaderboard, teams, users

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(challenges.router, prefix="/challenges", tags=["challenges"])
api_router.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
EOL

echo "Creating endpoint files..."

# Create auth.py endpoint
cat <<EOL > app/api/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserCreate, UserOut
from app.core.security import create_access_token
from app.services.supabase_service import supabase_client
from app.models.user import User
from datetime import timedelta
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate) -> Any:
    # Registration logic here
    return user_in

@router.post("/login")
async def login():
    # Login logic here
    pass

@router.post("/logout")
async def logout():
    # Logout logic here
    pass

@router.get("/me", response_model=UserOut)
async def get_current_user():
    # Get current user logic here
    pass
EOL

# Create challenges.py endpoint
cat <<EOL > app/api/endpoints/challenges.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.challenge import ChallengeCreate, ChallengeOut
from app.services.supabase_service import supabase_client
from app.models.challenge import Challenge

router = APIRouter()

@router.get("/", response_model=List[ChallengeOut])
async def list_challenges():
    # List challenges logic here
    return []

# Additional endpoints...
EOL

# Create leaderboard.py endpoint
cat <<EOL > app/api/endpoints/leaderboard.py
from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
async def get_global_leaderboard():
    # Logic to get global leaderboard
    return []

@router.get("/challenge/{challenge_id}")
async def get_challenge_leaderboard(challenge_id: str):
    # Logic to get leaderboard for a specific challenge
    return []
EOL

# Create teams.py endpoint
cat <<EOL > app/api/endpoints/teams.py
from fastapi import APIRouter
from typing import List
from app.schemas.team import TeamCreate, TeamOut

router = APIRouter()

@router.get("/", response_model=List[TeamOut])
async def list_teams():
    # List teams logic here
    return []

# Additional endpoints...
EOL

# Create users.py endpoint
cat <<EOL > app/api/endpoints/users.py
from fastapi import APIRouter
from typing import List
from app.schemas.user import UserOut

router = APIRouter()

@router.get("/{user_id}", response_model=UserOut)
async def get_user_profile(user_id: str):
    # Get user profile logic here
    return {}

# Additional endpoints...
EOL

echo "Creating core configuration files..."

# Create config.py
cat <<EOL > app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

settings = Settings()
EOL

# Create security.py
cat <<EOL > app/core/security.py
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta if expires_delta else datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
EOL

echo "Creating database session files..."

# Create session.py
cat <<EOL > app/db/session.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Use SQLite for simplicity
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
EOL

# Create base_class.py
cat <<EOL > app/db/base_class.py
from sqlalchemy.orm import declarative_base

Base = declarative_base()
EOL

# Create base.py
cat <<EOL > app/db/base.py
from app.db.base_class import Base
# Import all the models here for Alembic to recognize
from app.models.user import User
from app.models.challenge import Challenge
from app.models.team import Team
EOL

echo "Creating models..."

# Create user.py model
cat <<EOL > app/models/user.py
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
EOL

# Create challenge.py model
cat <<EOL > app/models/challenge.py
from sqlalchemy import Column, String, Integer, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from app.db.base_class import Base

class DifficultyEnum(str, enum.Enum):
    Easy = "Easy"
    Medium = "Medium"
    Hard = "Hard"
    Expert = "Expert"

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String)
    description = Column(String)
    difficulty = Column(Enum(DifficultyEnum))
    start_time = Column(DateTime(timezone=True))
    end_time = Column(DateTime(timezone=True))
    max_participants = Column(Integer)
    current_participants = Column(Integer, default=0)
    github_repo_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
EOL

# Create team.py model
cat <<EOL > app/models/team.py
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.db.base_class import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
EOL

echo "Creating schemas..."

# Create user.py schema
cat <<EOL > app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
EOL

# Create challenge.py schema
cat <<EOL > app/schemas/challenge.py
from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional
from enum import Enum

class DifficultyEnum(str, Enum):
    Easy = "Easy"
    Medium = "Medium"
    Hard = "Hard"
    Expert = "Expert"

class ChallengeBase(BaseModel):
    title: str
    description: str
    difficulty: DifficultyEnum
    start_time: datetime
    end_time: datetime
    max_participants: int

class ChallengeCreate(ChallengeBase):
    pass

class ChallengeOut(ChallengeBase):
    id: UUID
    current_participants: int
    github_repo_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
EOL

# Create team.py schema
cat <<EOL > app/schemas/team.py
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TeamBase(BaseModel):
    name: str
    description: str

class TeamCreate(TeamBase):
    pass

class TeamOut(TeamBase):
    id: UUID
    created_by: UUID
    created_at: datetime

    class Config:
        from_attributes = True
EOL

echo "Creating services..."

# Create supabase_service.py with exception handling
cat <<EOL > app/services/supabase_service.py
from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    try:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        else:
            print("Warning: Supabase URL or Key is missing.")
            return None
    except Exception as e:
        print(f"An error occurred while initializing Supabase client: {e}")
        return None

# Initialize the Supabase client
supabase_client = get_supabase_client()
EOL

# Create github_service.py
cat <<EOL > app/services/github_service.py
import requests
from app.core.config import settings

# Define functions to interact with GitHub API
# For example:
def create_challenge_repo(challenge_id: str, title: str) -> str:
    # Logic to create a GitHub repository
    return "https://github.com/your-org/" + title
EOL

echo "Creating tests..."

# Create conftest.py
cat <<EOL > tests/conftest.py
import pytest

# Define fixtures for testing
EOL

echo "Initialization complete!"
