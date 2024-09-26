from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base  # This import registers all models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Hacking League Backend")

@app.api_route("/token", methods=["POST"])
async def token_redirect(request: Request):
    return RedirectResponse(url="/auth/token", status_code=307)

app.include_router(api_router)