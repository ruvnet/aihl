from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        logger.error("Supabase URL or Key is missing in the environment variables.")
        raise ValueError("Supabase URL or Key is missing.")
    try:
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    except Exception as e:
        logger.error(f"An error occurred while initializing Supabase client: {e}")
        raise ConnectionError(f"Failed to initialize Supabase client: {e}")

# Initialize the Supabase client
try:
    supabase_client = get_supabase_client()
    logger.info("Supabase client initialized successfully.")
except Exception as e:
    logger.critical(f"Failed to initialize Supabase client: {e}")
    supabase_client = None