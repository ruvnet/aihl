from fastapi import APIRouter, HTTPException, status, Depends
from typing import List, Optional
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.schemas.challenge import ChallengeCreate, ChallengeOut, ChallengeUpdate
from app.schemas.team import TeamCreate, TeamOut, TeamUpdate
from app.schemas.achievement import AchievementCreate, AchievementOut, AchievementUpdate
from app.services.supabase_service import supabase_client
from app.core.config import settings
import openai
from gotrue.errors import AuthApiError

router = APIRouter()

def handle_supabase_error(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except AuthApiError as e:
            if e.status == 403:
                raise HTTPException(status_code=403, detail="Not authorized to perform this action. Admin privileges required.")
            else:
                raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    return wrapper

@router.get("/users", response_model=List[UserOut])
@handle_supabase_error
def get_all_users(
    skip: int = 0,
    limit: int = 100,
):
    users = supabase_client.from_("users").select("*").range(skip, skip + limit - 1).execute()
    if users.data:
        return [UserOut(**user) for user in users.data]
    return []

@router.post("/users", response_model=UserOut)
async def create_user(user: UserCreate):
    try:
        new_user = supabase_client.auth.admin.create_user({
            "email": user.email,
            "password": user.password,
            "user_metadata": {"username": user.username}
        })
        if new_user.user:
            return UserOut(
                id=new_user.user.id,
                email=new_user.user.email,
                username=new_user.user.user_metadata.get('username'),
                created_at=new_user.user.created_at,
                is_active=True,
                is_superuser=False
            )
        raise HTTPException(status_code=400, detail="Failed to create user")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/users/{user_id}", response_model=UserOut)
@handle_supabase_error
def get_user(
    user_id: str,
):
    user = supabase_client.from_("users").select("*").eq("id", user_id).single().execute()
    if user.data:
        return UserOut(**user.data)
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}", response_model=UserOut)
@handle_supabase_error
def update_user(
    user_id: str,
    user_update: UserUpdate,
):
    updated_user = supabase_client.from_("users").update(user_update.dict(exclude_unset=True)).eq("id", user_id).execute()
    if updated_user.data:
        return UserOut(**updated_user.data[0])
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
@handle_supabase_error
def delete_user(
    user_id: str,
):
    supabase_client.auth.admin.delete_user(user_id)
    return {"detail": "User deleted successfully"}

# Challenge Management
@router.get("/challenges", response_model=List[ChallengeOut])
@handle_supabase_error
def get_all_challenges(
    skip: int = 0,
    limit: int = 100,
):
    challenges = supabase_client.from_("challenges").select("*").range(skip, skip + limit - 1).execute()
    if challenges.data:
        return [ChallengeOut(**challenge) for challenge in challenges.data]
    return []

@router.post("/challenges", response_model=ChallengeOut)
@handle_supabase_error
def create_challenge(
    challenge: ChallengeCreate,
):
    new_challenge = supabase_client.from_("challenges").insert(challenge.dict()).execute()
    if new_challenge.data:
        return ChallengeOut(**new_challenge.data[0])
    raise HTTPException(status_code=400, detail="Failed to create challenge")

@router.get("/challenges/{challenge_id}", response_model=ChallengeOut)
@handle_supabase_error
def get_challenge(
    challenge_id: str,
):
    challenge = supabase_client.from_("challenges").select("*").eq("id", challenge_id).single().execute()
    if challenge.data:
        return ChallengeOut(**challenge.data)
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.put("/challenges/{challenge_id}", response_model=ChallengeOut)
@handle_supabase_error
def update_challenge(
    challenge_id: str,
    challenge_update: ChallengeUpdate,
):
    updated_challenge = supabase_client.from_("challenges").update(challenge_update.dict(exclude_unset=True)).eq("id", challenge_id).execute()
    if updated_challenge.data:
        return ChallengeOut(**updated_challenge.data[0])
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.delete("/challenges/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
@handle_supabase_error
def delete_challenge(
    challenge_id: str,
):
    supabase_client.from_("challenges").delete().eq("id", challenge_id).execute()
    return {"detail": "Challenge deleted successfully"}

# Team Management
@router.get("/teams", response_model=List[TeamOut])
@handle_supabase_error
def get_all_teams(
    skip: int = 0,
    limit: int = 100,
):
    teams = supabase_client.from_("teams").select("*").range(skip, skip + limit - 1).execute()
    if teams.data:
        return [TeamOut(**team) for team in teams.data]
    return []

@router.post("/teams", response_model=TeamOut)
@handle_supabase_error
def create_team(
    team: TeamCreate,
):
    new_team = supabase_client.from_("teams").insert(team.dict()).execute()
    if new_team.data:
        return TeamOut(**new_team.data[0])
    raise HTTPException(status_code=400, detail="Failed to create team")

@router.get("/teams/{team_id}", response_model=TeamOut)
@handle_supabase_error
def get_team(
    team_id: str,
):
    team = supabase_client.from_("teams").select("*").eq("id", team_id).single().execute()
    if team.data:
        return TeamOut(**team.data)
    raise HTTPException(status_code=404, detail="Team not found")

@router.put("/teams/{team_id}", response_model=TeamOut)
@handle_supabase_error
def update_team(
    team_id: str,
    team_update: TeamUpdate,
):
    updated_team = supabase_client.from_("teams").update(team_update.dict(exclude_unset=True)).eq("id", team_id).execute()
    if updated_team.data:
        return TeamOut(**updated_team.data[0])
    raise HTTPException(status_code=404, detail="Team not found")

@router.delete("/teams/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
@handle_supabase_error
def delete_team(
    team_id: str,
):
    supabase_client.from_("teams").delete().eq("id", team_id).execute()
    return {"detail": "Team deleted successfully"}

# Achievement Management
@router.get("/achievements", response_model=List[AchievementOut])
@handle_supabase_error
def get_all_achievements(
    skip: int = 0,
    limit: int = 100,
):
    achievements = supabase_client.from_("achievements").select("*").range(skip, skip + limit - 1).execute()
    if achievements.data:
        return [AchievementOut(**achievement) for achievement in achievements.data]
    return []

@router.post("/achievements", response_model=AchievementOut)
@handle_supabase_error
def create_achievement(
    achievement: AchievementCreate,
):
    new_achievement = supabase_client.from_("achievements").insert(achievement.dict()).execute()
    if new_achievement.data:
        return AchievementOut(**new_achievement.data[0])
    raise HTTPException(status_code=400, detail="Failed to create achievement")

@router.get("/achievements/{achievement_id}", response_model=AchievementOut)
@handle_supabase_error
def get_achievement(
    achievement_id: str,
):
    achievement = supabase_client.from_("achievements").select("*").eq("id", achievement_id).single().execute()
    if achievement.data:
        return AchievementOut(**achievement.data)
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.put("/achievements/{achievement_id}", response_model=AchievementOut)
@handle_supabase_error
def update_achievement(
    achievement_id: str,
    achievement_update: AchievementUpdate,
):
    updated_achievement = supabase_client.from_("achievements").update(achievement_update.dict(exclude_unset=True)).eq("id", achievement_id).execute()
    if updated_achievement.data:
        return AchievementOut(**updated_achievement.data[0])
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.delete("/achievements/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
@handle_supabase_error
def delete_achievement(
    achievement_id: str,
):
    supabase_client.from_("achievements").delete().eq("id", achievement_id).execute()
    return {"detail": "Achievement deleted successfully"}

# Analytics
@router.get("/analytics")
@handle_supabase_error
def get_analytics():
    # Implement analytics logic here
    return {"message": "Analytics data"}

# Leaderboard
@router.get("/leaderboard")
@handle_supabase_error
def get_leaderboard():
    # Implement leaderboard logic here
    return {"message": "Leaderboard data"}

# System Health
@router.get("/system-health")
@handle_supabase_error
def get_system_health():
    # Implement system health check logic here
    return {"status": "healthy"}

@router.post("/generate-challenge")
@handle_supabase_error
def generate_challenge(
    prompt: str,
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
