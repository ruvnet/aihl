# app/models/challenge.py

from sqlalchemy import Column, String, Integer, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from app.db.base_class import Base  # Import Base directly from base_class.py

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
