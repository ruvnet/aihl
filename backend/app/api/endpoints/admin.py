from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.user import UserOut
from typing import List
from app.services.supabase_service import supabase_client

router = APIRouter()

@router.get("/users", response_model=List[UserOut])
async def get_all_users(current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    users = await supabase_client.from_("users").select("*").execute()
    return [UserOut(**user) for user in users.data]

@router.get("/analytics")
async def get_analytics(current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement analytics logic here
    return {"message": "Analytics data"}

@router.get("/challenges")
async def get_all_challenges(current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    challenges = await supabase_client.from_("challenges").select("*").execute()
    return challenges.data

@router.get("/leaderboard")
async def get_leaderboard(current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement leaderboard logic here
    return {"message": "Leaderboard data"}

@router.get("/system-health")
async def get_system_health(current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement system health check logic here
    return {"status": "healthy"}