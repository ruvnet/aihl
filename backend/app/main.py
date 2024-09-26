from fastapi import FastAPI
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base  # This import registers all models
from app.core.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hacking League Backend",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Add the token endpoint to the main app
from app.api.endpoints.auth import router as auth_router
app.include_router(auth_router, prefix="/token", tags=["token"])