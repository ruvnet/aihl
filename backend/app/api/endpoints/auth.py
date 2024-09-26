from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserOut, UserLogin
from app.core.security import create_access_token, get_current_user
from app.services.supabase_service import supabase_client
from app.models.user import User
from app.core.config import settings
from datetime import timedelta
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate) -> Any:
    try:
        result = supabase_client.auth.sign_up({
            "email": user_in.email,
            "password": user_in.password,
            "options": {
                "data": {
                    "username": user_in.username
                }
            }
        })
        
        if result.user is None:
            raise HTTPException(status_code=400, detail="Registration failed")
        
        return UserOut(
            id=result.user.id,
            email=result.user.email,
            username=result.user.user_metadata.get('username'),
            created_at=result.user.created_at,
            is_active=True,
            is_superuser=False
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        result = supabase_client.auth.sign_in_with_password({
            "email": form_data.username,
            "password": form_data.password
        })
        
        if result.user is None:
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(result.user.id)}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

@router.post("/logout")
async def logout():
    try:
        supabase_client.auth.sign_out()
        return {"detail": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me", response_model=UserOut)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserOut(**current_user.__dict__)