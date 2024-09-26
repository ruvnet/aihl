from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.core.security import get_current_admin_user
from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.schemas.challenge import ChallengeOut, ChallengeCreate, ChallengeUpdate
from app.services.supabase_service import supabase_client
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/users", response_model=List[UserOut])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    try:
        logger.info(f"Attempting to fetch users with skip={skip} and limit={limit}")
        response = await supabase_client.from_("users").select("*").range(skip, skip + limit - 1).execute()
        if response.error:
            logger.error(f"Supabase error: {response.error.message}")
            raise HTTPException(status_code=500, detail=f"Error fetching users: {response.error.message}")
        logger.info(f"Successfully fetched {len(response.data)} users")
        return [UserOut(**user) for user in (response.data or [])]
    except Exception as e:
        logger.exception(f"Unexpected error in get_all_users: {str(e)}")
        raise HTTPException(status_code=503, detail=f"Error fetching users: {str(e)}")

@router.post("/users", response_model=UserOut)
async def create_user(
    user: UserCreate,
    current_user: User = Depends(get_current_admin_user)
):
    try:
        logger.info(f"Creating user with email: {user.email}")
        new_user = await supabase_client.auth.admin.create_user(user.dict())
        return UserOut(**new_user.user)
    except Exception as e:
        logger.exception(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(
    user_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Fetching user with ID: {user_id}")
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
    logger.info(f"Updating user with ID: {user_id}")
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
        logger.info(f"Deleting user with ID: {user_id}")
        await supabase_client.auth.admin.delete_user(user_id)
        return {"detail": "User deleted successfully"}
    except Exception as e:
        logger.exception(f"Error deleting user: {str(e)}")
        raise HTTPException(status_code=404, detail=f"User not found: {str(e)}")

# Challenge Management
@router.get("/challenges", response_model=List[ChallengeOut])
async def get_all_challenges(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Fetching challenges with skip={skip} and limit={limit}")
    response = await supabase_client.from_("challenges").select("*").range(skip, skip + limit - 1).execute()
    return [ChallengeOut(**challenge) for challenge in (response.data or [])]

@router.post("/challenges", response_model=ChallengeOut)
async def create_challenge(
    challenge: ChallengeCreate,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Creating challenge with title: {challenge.title}")
    response = await supabase_client.from_("challenges").insert(challenge.dict()).execute()
    return ChallengeOut(**response.data[0])

@router.get("/challenges/{challenge_id}", response_model=ChallengeOut)
async def get_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Fetching challenge with ID: {challenge_id}")
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
    logger.info(f"Updating challenge with ID: {challenge_id}")
    response = await supabase_client.from_("challenges").update(challenge_update.dict(exclude_unset=True)).eq("id", challenge_id).execute()
    if response.data:
        return ChallengeOut(**response.data[0])
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.delete("/challenges/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_challenge(
    challenge_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Deleting challenge with ID: {challenge_id}")
    response = await supabase_client.from_("challenges").delete().eq("id", challenge_id).execute()
    if response.data:
        return {"detail": "Challenge deleted successfully"}
    raise HTTPException(status_code=404, detail="Challenge not found")

# Add other admin endpoints as needed...
