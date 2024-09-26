# app/services/supabase_service.py

from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError("Supabase URL or Key is missing.")
    try:
        # Use is_async=True to create an asynchronous client
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY, is_async=True)
    except Exception as e:
        raise ConnectionError(f"An error occurred while initializing Supabase client: {e}")

# Initialize the Supabase client
supabase_client = get_supabase_client()
