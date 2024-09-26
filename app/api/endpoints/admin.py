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
        # Removed 'await' from the following line
        response = supabase_client.table("users").select("*").range(skip, skip + limit - 1).execute()
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
        # Removed 'await' from the following line
        new_user = supabase_client.auth.admin.create_user(user.dict())
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
    # Removed 'await' from the following line
    response = supabase_client.table("users").select("*").eq("id", user_id).execute()
    if response.data:
        return UserOut(**response.data[0])
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    logger.info(f"Updating user with ID: {user_id}")
    # Removed 'await' from the following line
    response = supabase_client.table("users").update(user_update.dict(exclude_unset=True)).eq("id", user_id).execute()
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
        # Removed 'await' from the following line
        supabase_client.auth.admin.delete_user(user_id)
        return {"detail": "User deleted successfully"}
    except Exception as e:
        logger.exception(f"Error deleting user: {str(e)}")
        raise HTTPException(status_code=404, detail=f"User not found: {str(e)}")

# Challenge Management endpoints remain unchanged
# ... (rest of the file remains the same)