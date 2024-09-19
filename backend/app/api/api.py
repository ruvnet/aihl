from fastapi import APIRouter
from app.api.endpoints import auth, challenges, leaderboard, teams, users, judge, enrollments, achievements, chat, replays, wallet, skill_profiles, ai_generated_challenges, admin

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(challenges.router, prefix="/challenges", tags=["challenges"])
api_router.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(judge.router, prefix="/judge", tags=["judge"])
api_router.include_router(enrollments.router, prefix="/enrollments", tags=["enrollments"])
api_router.include_router(achievements.router, prefix="/achievements", tags=["achievements"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(replays.router, prefix="/replays", tags=["replays"])
api_router.include_router(wallet.router, prefix="/wallet", tags=["wallet"])
api_router.include_router(skill_profiles.router, prefix="/skill-profiles", tags=["skill-profiles"])
api_router.include_router(ai_generated_challenges.router, prefix="/ai-generated-challenges", tags=["ai-generated-challenges"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
