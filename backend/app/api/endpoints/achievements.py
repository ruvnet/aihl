from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.achievement import AchievementCreate, AchievementOut
from app.services.supabase_service import supabase_client

router = APIRouter()

@router.post("/", response_model=AchievementOut)
async def create_achievement(achievement: AchievementCreate):
    # Logic to create an achievement
    return {"id": "123", "name": achievement.name, "description": achievement.description}

@router.get("/", response_model=List[AchievementOut])
async def list_achievements():
    # Logic to list achievements
    return []

@router.get("/{achievement_id}", response_model=AchievementOut)
async def get_achievement(achievement_id: str):
    # Logic to get a specific achievement
    return {"id": achievement_id, "name": "Achievement Name", "description": "Achievement Description"}

@router.put("/{achievement_id}", response_model=AchievementOut)
async def update_achievement(achievement_id: str, achievement: AchievementCreate):
    # Logic to update an achievement
    return {"id": achievement_id, "name": achievement.name, "description": achievement.description}

@router.delete("/{achievement_id}")
async def delete_achievement(achievement_id: str):
    # Logic to delete an achievement
    return {"message": "Achievement deleted successfully"}
