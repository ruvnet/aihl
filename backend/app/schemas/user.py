from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None

class UserOut(UserBase):
    id: UUID
    created_at: datetime
    is_active: bool
    is_superuser: bool

    class Config:
        from_attributes = True

class UserInDB(UserOut):
    hashed_password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
