from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.core.security import oauth2_scheme

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hacking League Backend",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
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
