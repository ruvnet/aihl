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
