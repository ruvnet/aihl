# app/services/supabase_service.py

from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    try:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        else:
            print("Warning: Supabase URL or Key is missing.")
            return None
    except Exception as e:
        print(f"An error occurred while initializing Supabase client: {e}")
        return None

# Initialize the Supabase client
supabase_client = get_supabase_client()
