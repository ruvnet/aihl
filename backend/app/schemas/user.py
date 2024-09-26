from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str = Field(..., example="johndoe")
    email: EmailStr = Field(..., example="johndoe@example.com")

class UserCreate(UserBase):
    password: str = Field(..., example="securepassword123")

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, example="johndoe_updated")
    email: Optional[EmailStr] = Field(None, example="johndoe_updated@example.com")
    password: Optional[str] = Field(None, example="newsecurepassword456")
    is_active: Optional[bool] = Field(None, example=True)
    is_superuser: Optional[bool] = Field(None, example=False)

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
    email: EmailStr = Field(..., example="johndoe@example.com")
    password: str = Field(..., example="securepassword123")
