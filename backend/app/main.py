from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base  # This import registers all models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Hacking League Backend")

app.include_router(api_router)

@app.post("/token")
async def token_redirect(request: Request):
    return RedirectResponse(url="/auth/login", status_code=307)