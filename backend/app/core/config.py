import os
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

logger.debug(f"Current working directory: {os.getcwd()}")
logger.debug(f".env file path: {dotenv_path}")

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    def __init__(self):
        logger.debug(f"SUPABASE_URL: {'set' if self.SUPABASE_URL else 'not set'}")
        logger.debug(f"SUPABASE_KEY: {'set' if self.SUPABASE_KEY else 'not set'}")
        logger.debug(f"SUPABASE_SERVICE_ROLE_KEY: {'set' if self.SUPABASE_SERVICE_ROLE_KEY else 'not set'}")

settings = Settings()