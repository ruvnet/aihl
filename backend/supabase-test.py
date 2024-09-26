from supabase import create_client, Client
import os

SUPABASE_URL = "https://hpkluyywkugnyouucvwr.supabase.co/"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwa2x1eXl3a3VnbnlvdXVjdndyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTcyNjM5NiwiZXhwIjoyMDQxMzAyMzk2fQ.JpAxQZTEGx5xjn79h9b-se-YqVkaEi-mTWycvioP7Tg"

# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Query the users table
def get_users():
    try:
        response = supabase.table('users').select('*').execute()
        
        # Check if data exists in the response
        if response.data:
            print(f"Users: {response.data}")
        else:
            print("No data returned from the query.")
    except Exception as e:
        # Handle exceptions and print error message
        print(f"An error occurred: {e}")

# Call the function to get users
get_users()
