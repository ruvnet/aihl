from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional
from .challenge import DifficultyEnum

class AIGeneratedChallengeBase(BaseModel):
    title: str
    description: str
    difficulty: DifficultyEnum
    ai_prompt: str

class AIGeneratedChallengeCreate(AIGeneratedChallengeBase):
    pass

class AIGeneratedChallengeOut(AIGeneratedChallengeBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True