from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
async def get_global_leaderboard():
    # Logic to get global leaderboard
    return []

@router.get("/challenge/{challenge_id}")
async def get_challenge_leaderboard(challenge_id: str):
    # Logic to get leaderboard for a specific challenge
    return []
