# app/db/base.py

from app.db.base_class import Base  # Import Base without causing circular imports

# Import all models here for Alembic to recognize them
from app.models.user import User
from app.models.challenge import Challenge
from app.models.team import Team
