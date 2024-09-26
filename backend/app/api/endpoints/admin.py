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
 