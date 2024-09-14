# app/main.py

from fastapi import FastAPI
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base  # This import registers all models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Hacking League Backend")

app.include_router(api_router)
