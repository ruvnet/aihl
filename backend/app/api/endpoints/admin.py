from fastapi import APIRouter, HTTPException, status, Depends, Header
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

async def verify_admin_token(api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")

@router.post("/users", response_model=UserOut)
async def create_user(user: UserCreate, api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
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

@router.post("/challenges", response_model=ChallengeOut)
async def create_challenge(challenge: ChallengeCreate, api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    new_challenge = supabase_client.from_("challenges").insert(challenge.dict()).execute()
    if new_challenge.data:
        return ChallengeOut(**new_challenge.data[0])
    raise HTTPException(status_code=400, detail="Failed to create challenge")

@router.post("/teams", response_model=TeamOut)
async def create_team(team: TeamCreate, api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    new_team = supabase_client.from_("teams").insert(team.dict()).execute()
    if new_team.data:
        return TeamOut(**new_team.data[0])
    raise HTTPException(status_code=400, detail="Failed to create team")

@router.post("/achievements", response_model=AchievementOut)
async def create_achievement(achievement: AchievementCreate, api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    new_achievement = supabase_client.from_("achievements").insert(achievement.dict()).execute()
    if new_achievement.data:
        return AchievementOut(**new_achievement.data[0])
    raise HTTPException(status_code=400, detail="Failed to create achievement")

@router.get("/users", response_model=List[UserOut])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    users = supabase_client.from_("users").select("*").range(skip, skip + limit - 1).execute()
    if users.data:
        return [UserOut(**user) for user in users.data]
    return []

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(
    user_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    user = supabase_client.from_("users").select("*").eq("id", user_id).single().execute()
    if user.data:
        return UserOut(**user.data)
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    updated_user = supabase_client.from_("users").update(user_update.dict(exclude_unset=True)).eq("id", user_id).execute()
    if updated_user.data:
        return UserOut(**updated_user.data[0])
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    supabase_client.auth.admin.delete_user(user_id)
    return {"detail": "User deleted successfully"}

@router.get("/challenges", response_model=List[ChallengeOut])
async def get_all_challenges(
    skip: int = 0,
    limit: int = 100,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    challenges = supabase_client.from_("challenges").select("*").range(skip, skip + limit - 1).execute()
    if challenges.data:
        return [ChallengeOut(**challenge) for challenge in challenges.data]
    return []

@router.get("/challenges/{challenge_id}", response_model=ChallengeOut)
async def get_challenge(
    challenge_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    challenge = supabase_client.from_("challenges").select("*").eq("id", challenge_id).single().execute()
    if challenge.data:
        return ChallengeOut(**challenge.data)
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.put("/challenges/{challenge_id}", response_model=ChallengeOut)
async def update_challenge(
    challenge_id: str,
    challenge_update: ChallengeUpdate,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    updated_challenge = supabase_client.from_("challenges").update(challenge_update.dict(exclude_unset=True)).eq("id", challenge_id).execute()
    if updated_challenge.data:
        return ChallengeOut(**updated_challenge.data[0])
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.delete("/challenges/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_challenge(
    challenge_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    supabase_client.from_("challenges").delete().eq("id", challenge_id).execute()
    return {"detail": "Challenge deleted successfully"}

@router.get("/teams", response_model=List[TeamOut])
async def get_all_teams(
    skip: int = 0,
    limit: int = 100,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    teams = supabase_client.from_("teams").select("*").range(skip, skip + limit - 1).execute()
    if teams.data:
        return [TeamOut(**team) for team in teams.data]
    return []

@router.get("/teams/{team_id}", response_model=TeamOut)
async def get_team(
    team_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    team = supabase_client.from_("teams").select("*").eq("id", team_id).single().execute()
    if team.data:
        return TeamOut(**team.data)
    raise HTTPException(status_code=404, detail="Team not found")

@router.put("/teams/{team_id}", response_model=TeamOut)
async def update_team(
    team_id: str,
    team_update: TeamUpdate,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    updated_team = supabase_client.from_("teams").update(team_update.dict(exclude_unset=True)).eq("id", team_id).execute()
    if updated_team.data:
        return TeamOut(**updated_team.data[0])
    raise HTTPException(status_code=404, detail="Team not found")

@router.delete("/teams/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(
    team_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    supabase_client.from_("teams").delete().eq("id", team_id).execute()
    return {"detail": "Team deleted successfully"}

@router.get("/achievements", response_model=List[AchievementOut])
async def get_all_achievements(
    skip: int = 0,
    limit: int = 100,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    achievements = supabase_client.from_("achievements").select("*").range(skip, skip + limit - 1).execute()
    if achievements.data:
        return [AchievementOut(**achievement) for achievement in achievements.data]
    return []

@router.get("/achievements/{achievement_id}", response_model=AchievementOut)
async def get_achievement(
    achievement_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    achievement = supabase_client.from_("achievements").select("*").eq("id", achievement_id).single().execute()
    if achievement.data:
        return AchievementOut(**achievement.data)
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.put("/achievements/{achievement_id}", response_model=AchievementOut)
async def update_achievement(
    achievement_id: str,
    achievement_update: AchievementUpdate,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    updated_achievement = supabase_client.from_("achievements").update(achievement_update.dict(exclude_unset=True)).eq("id", achievement_id).execute()
    if updated_achievement.data:
        return AchievementOut(**updated_achievement.data[0])
    raise HTTPException(status_code=404, detail="Achievement not found")

@router.delete("/achievements/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_achievement(
    achievement_id: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    supabase_client.from_("achievements").delete().eq("id", achievement_id).execute()
    return {"detail": "Achievement deleted successfully"}

@router.get("/analytics")
async def get_analytics(api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement analytics logic here
    return {"message": "Analytics data"}

@router.get("/leaderboard")
async def get_leaderboard(api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement leaderboard logic here
    return {"message": "Leaderboard data"}

@router.get("/system-health")
async def get_system_health(api_key: str = Header(...)):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
    # Implement system health check logic here
    return {"status": "healthy"}

@router.post("/generate-challenge")
async def generate_challenge(
    prompt: str,
    api_key: str = Header(...)
):
    if api_key != settings.SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")
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
