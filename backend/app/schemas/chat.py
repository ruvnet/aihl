from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ChatMessageBase(BaseModel):
    user_id: UUID
    content: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessageOut(ChatMessageBase):
    id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True