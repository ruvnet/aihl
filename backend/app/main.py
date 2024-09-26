from fastapi import FastAPI
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base
from app.core.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hacking League Backend",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Add OAuth2 security scheme to the OpenAPI schema
app.openapi()["components"]["securitySchemes"] = {
    "OAuth2PasswordBearer": {
        "type": "oauth2",
        "flows": {
            "password": {
                "tokenUrl": f"{settings.API_V1_STR}/auth/login",
                "scopes": {}
            }
        }
    }
}

app.openapi()["security"] = [{"OAuth2PasswordBearer": []}]