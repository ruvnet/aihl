from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserOut, UserLogin
from app.core.security import create_access_token, get_password_hash, verify_password, get_current_user
from app.services.supabase_service import supabase_client
from app.models.user import User
from app.core.config import settings
from datetime import timedelta
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate) -> Any:
    existing_user = await supabase_client.from_("users").select("*").eq("email", user_in.email).execute()
    if existing_user.data:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_in.password)
    new_user = {
        "email": user_in.email,
        "username": user_in.username,
        "hashed_password": hashed_password
    }
    result = await supabase_client.from_("users").insert(new_user).execute()
    
    if result.error:
        raise HTTPException(status_code=400, detail=str(result.error))
    
    return UserOut(**result.data[0])

@router.post("/login")
async def login(user_credentials: UserLogin):
    user = await supabase_client.from_("users").select("*").eq("email", user_credentials.email).single().execute()
    if not user.data or not verify_password(user_credentials.password, user.data["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.data["id"])}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout():
    # In a stateless JWT system, logout is typically handled client-side
    # by removing the token. Here we can add any server-side logout logic if needed.
    return {"detail": "Successfully logged out"}

@router.get("/me", response_model=UserOut)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserOut(**current_user.__dict__)
