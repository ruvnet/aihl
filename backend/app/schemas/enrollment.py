from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class EnrollmentBase(BaseModel):
    user_id: UUID
    challenge_id: UUID
    team_id: Optional[UUID] = None
    status: str = "enrolled"

class EnrollmentCreate(EnrollmentBase):
    pass

class EnrollmentOut(EnrollmentBase):
    id: UUID
    score: Optional[float] = None
    submitted_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True