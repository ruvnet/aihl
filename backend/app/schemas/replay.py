from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ReplayBase(BaseModel):
    challenge_id: UUID
    user_id: UUID
    replay_data: str

class ReplayCreate(ReplayBase):
    pass

class ReplayOut(ReplayBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True