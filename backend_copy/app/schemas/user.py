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
