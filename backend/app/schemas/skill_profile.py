from pydantic import BaseModel
from uuid import UUID
from typing import Dict

class SkillProfileBase(BaseModel):
    user_id: UUID
    skills: Dict[str, int]

class SkillProfileCreate(SkillProfileBase):
    pass

class SkillProfileOut(SkillProfileBase):
    id: UUID

    class Config:
        from_attributes = True