from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from app.core.security import get_current_admin_user
from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.schemas.challenge import ChallengeCreate, ChallengeOut, ChallengeUpdate
from app.schemas.team import TeamCreate, TeamOut, TeamUpdate
from app.schemas.achievement import AchievementCreate, AchievementOut, AchievementUpdate
from app.services.supabase_service import supabase_client
from app.core.config import settings
import openai

router = APIRouter()

# User Management
@router.get("/users", response_model=List[UserOut])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    users = await supabase_client.from_("users").select("*").range(skip, skip + limit - 1).execute()
    return [UserOut(**user) for user in users.data]

@router.post("/users", response_model=UserOut)
async def create_user(
    user: UserCreate,
    current_user: User = Depends(get_current_admin_user)
):
    new_user = await supabase_client.auth.admin.create_user(user.dict())
    return UserOut(**new_user.user.dict())

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(
    user_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    user = await supabase_client.from_("users").select("*").eq("id", user_id).single().execute()
    if user.data:
        return UserOut(**user.data)
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    updated_user = await supabase_client.from_("users").update(user_update.dict(exclude_unset=True)).eq("id", user_id).execute()
    if updated_user.data:
        return UserOut(**updated_user.data[0])
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    await supabase_client.auth.admin.delete_user(user_id)
    return {"detail": "User deleted successfully"}

# Challenge Management
@router.get("/challenges", response_model=List[ChallengeOut])
async def get_all_challenges(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    challenges = await supabase_client.from_("challenges").select("*").range(skip, skip + limit - 1).execute()
    return [ChallengeOut(**challenge) for challenge in challenges.data]

@router.post("/challenges", response_model=ChallengeOut)
async def create_challenge(
    challenge: ChallengeCreate,
    current_user: User = Depends(get_current_admin_user)
):
    new_challenge = await supabase_client.from_("challenges").insert(challenge.dict()).execute()
    return ChallengeOut(**new_challenge.data[0])

@router.get("/challenges/{challenge_id}", response_model=ChallengeOut)
async def get_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    challenge = await supabase_client.from_("challenges").select("*").eq("id", challenge_id).single().execute()
    if challenge.data:
        return ChallengeOut(**challenge.data)
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.put("/challenges/{challenge_id}", response_model=ChallengeOut)
async def update_challenge(
    challenge_id: str,
    challenge_update: ChallengeUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    updated_challenge = await supabase_client.from_("challenges").update(challenge_update.dict(exclude_unset=True)).eq("id", challenge_id).execute()
    if updated_challenge.data:
        return ChallengeOut(**updated_challenge.data[0])
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.delete("/challenges/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    await supabase_client.from_("challenges").delete().eq("id", challenge_id).execute()
    return {"detail": "Challenge deleted successfully"}

# Team Management
# ... (similar CRUD operations for teams)

# Achievement Management
# ... (similar CRUD operations for achievements)

# Analytics
@router.get("/analytics")
async def get_analytics(current_user: User = Depends(get_current_admin_user)):
    # Implement analytics logic here
    return {"message": "Analytics data"}

# Leaderboard
@router.get("/leaderboard")
async def get_leaderboard(current_user: User = Depends(get_current_admin_user)):
    # Implement leaderboard logic here
    return {"message": "Leaderboard data"}

# System Health
@router.get("/system-health")
async def get_system_health(current_user: User = Depends(get_current_admin_user)):
    # Implement system health check logic here
    return {"status": "healthy"}

# AI-powered features
@router.post("/generate-challenge")
async def generate_challenge(
    prompt: str = Query(..., description="Prompt for generating a challenge"),
    current_user: User = Depends(get_current_admin_user)
):
    openai.api_key = settings.OPENAI_API_KEY
    try:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Generate an AI hacking challenge based on the following prompt: {prompt}",
            max_tokens=500
        )
        generated_challenge = response.choices[0].text.strip()
        return {"generated_challenge": generated_challenge}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating challenge: {str(e)}")
