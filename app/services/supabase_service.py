from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def get_supabase_client() -> Client:
    try:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            # Removed 'is_async=True' parameter
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        else:
            logger.error("Supabase URL or Key is missing.")
            return None
    except Exception as e:
        logger.error(f"An error occurred while initializing Supabase client: {e}")
        return None

# Initialize the Supabase client
supabase_client = get_supabase_client()