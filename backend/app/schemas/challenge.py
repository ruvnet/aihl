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

class ChallengeUpdate(ChallengeBase):
    title: Optional[str] = None
    description: Optional[str] = None
    difficulty: Optional[DifficultyEnum] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    max_participants: Optional[int] = None
    current_participants: Optional[int] = None
    github_repo_url: Optional[str] = None
