from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.core.security import get_current_admin_user
from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.services.supabase_service import supabase_client

router = APIRouter()

@router.get("/users", response_model=List[UserOut])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    try:
        response = await supabase_client.from_("users").select("*").range(skip, skip + limit - 1).execute()
        if response.error:
            raise HTTPException(status_code=500, detail=f"Error fetching users: {response.error.message}")
        return [UserOut(**user) for user in (response.data or [])]
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error fetching users: {str(e)}")

@router.post("/users", response_model=UserOut)
async def create_user(
    user: UserCreate,
    current_user: User = Depends(get_current_admin_user)
):
    try:
        new_user = await supabase_client.auth.admin.create_user(user.dict())
        return UserOut(**new_user.user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(
    user_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("users").select("*").eq("id", user_id).maybe_single().execute()
    if response.data:
        return UserOut(**response.data)
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("users").update(user_update.dict(exclude_unset=True)).eq("id", user_id).execute()
    if response.data:
        return UserOut(**response.data[0])
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    try:
        await supabase_client.auth.admin.delete_user(user_id)
        return {"detail": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"User not found: {str(e)}")

# Challenge Management
@router.get("/challenges", response_model=List[ChallengeOut])
async def get_all_challenges(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("challenges").select("*").range(skip, skip + limit - 1).execute()
    return [ChallengeOut(**challenge) for challenge in (response.data or [])]

@router.post("/challenges", response_model=ChallengeOut)
async def create_challenge(
    challenge: ChallengeCreate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("challenges").insert(challenge.dict()).execute()
    return ChallengeOut(**response.data[0])

@router.get("/challenges/{challenge_id}", response_model=ChallengeOut)
async def get_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("challenges").select("*").eq("id", challenge_id).maybe_single().execute()
    if response.data:
        return ChallengeOut(**response.data)
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.put("/challenges/{challenge_id}", response_model=ChallengeOut)
async def update_challenge(
    challenge_id: str,
    challenge_update: ChallengeUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("challenges").update(challenge_update.dict(exclude_unset=True)).eq("id", challenge_id).execute()
    if response.data:
        return ChallengeOut(**response.data[0])
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.delete("/challenges/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("challenges").delete().eq("id", challenge_id).execute()
    if response.data:
        return {"detail": "Challenge deleted successfully"}
    raise HTTPException(status_code=404, detail="Challenge not found")

# Team Management
@router.get("/teams", response_model=List[TeamOut])
async def get_all_teams(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("teams").select("*").range(skip, skip + limit - 1).execute()
    return [TeamOut(**team) for team in (response.data or [])]

@router.post("/teams", response_model=TeamOut)
async def create_team(
    team: TeamCreate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("teams").insert(team.dict()).execute()
    return TeamOut(**response.data[0])

@router.get("/teams/{team_id}", response_model=TeamOut)
async def get_team(
    team_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("teams").select("*").eq("id", team_id).maybe_single().execute()
    if response.data:
        return TeamOut(**response.data)
    raise HTTPException(status_code=404, detail="Team not found")

@router.put("/teams/{team_id}", response_model=TeamOut)
async def update_team(
    team_id: str,
    team_update: TeamUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("teams").update(team_update.dict(exclude_unset=True)).eq("id", team_id).execute()
    if response.data:
        return TeamOut(**response.data[0])
    raise HTTPException(status_code=404, detail="Team not found")

@router.delete("/teams/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(
    team_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("teams").delete().eq("id", team_id).execute()
    if response.data:
        return {"detail": "Team deleted successfully"}
    raise HTTPException(status_code=404, detail="Team not found")

# Achievement Management
@router.get("/achievements", response_model=List[AchievementOut])
async def get_all_achievements(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("achievements").select("*").range(skip, skip + limit - 1).execute()
    return [AchievementOut(**achievement) for achievement in (response.data or [])]

@router.post("/achievements", response_model=AchievementOut)
async def create_achievement(
    achievement: AchievementCreate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("achievements").insert(achievement.dict()).execute()
    return AchievementOut(**response.data[0])

@router.get("/achievements/{achievement_id}", response_model=AchievementOut)
async def get_achievement(
    achievement_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("achievements").select("*").eq("id", achievement_id).maybe_single().execute()
    if response.data:
        return AchievementOut(**response.data)
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.put("/achievements/{achievement_id}", response_model=AchievementOut)
async def update_achievement(
    achievement_id: str,
    achievement_update: AchievementUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("achievements").update(achievement_update.dict(exclude_unset=True)).eq("id", achievement_id).execute()
    if response.data:
        return AchievementOut(**response.data[0])
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.delete("/achievements/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_achievement(
    achievement_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    response = await supabase_client.from_("achievements").delete().eq("id", achievement_id).execute()
    if response.data:
        return {"detail": "Achievement deleted successfully"}
    raise HTTPException(status_code=404, detail="Achievement not found")

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