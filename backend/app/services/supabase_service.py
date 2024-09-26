from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def get_supabase_client() -> Client:
    try:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            logger.debug(f"Initializing Supabase client with URL: {settings.SUPABASE_URL}")
            logger.debug(f"Using API Key (last 4 chars): ...{settings.SUPABASE_KEY[-4:]}")
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        else:
            logger.error("Supabase URL or Key is missing.")
            return None
    except Exception as e:
        logger.exception(f"An error occurred while initializing Supabase client: {e}")
        return None

def get_admin_supabase_client() -> Client:
    try:
        if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
            logger.debug(f"Initializing Admin Supabase client with URL: {settings.SUPABASE_URL}")
            logger.debug(f"Using Service Role Key (last 4 chars): ...{settings.SUPABASE_SERVICE_ROLE_KEY[-4:]}")
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
        else:
            logger.error("Supabase URL or Service Role Key is missing.")
            return None
    except Exception as e:
        logger.exception(f"An error occurred while initializing Admin Supabase client: {e}")
        return None

# Initialize the Supabase clients
supabase_client = get_supabase_client()
admin_supabase_client = get_admin_supabase_client()

if supabase_client:
    logger.info("Supabase client initialized successfully.")
else:
    logger.warning("Failed to initialize Supabase client.")

if admin_supabase_client:
    logger.info("Admin Supabase client initialized successfully.")
else:
    logger.warning("Failed to initialize Admin Supabase client.")