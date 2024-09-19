from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class AchievementBase(BaseModel):
    name: str
    description: str

class AchievementCreate(AchievementBase):
    pass

class AchievementOut(AchievementBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class AchievementUpdate(AchievementBase):
    name: Optional[str] = None
    description: Optional[str] = None
