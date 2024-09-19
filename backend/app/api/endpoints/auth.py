from fastapi import APIRouter, Depends, HTTPException, status, Body
from app.schemas.user import UserCreate, UserOut, UserLogin
from app.core.security import create_access_token, get_password_hash, verify_password
from app.services.supabase_service import supabase_client
from app.models.user import User
from datetime import timedelta
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate) -> Any:
    # Check if user already exists
    existing_user = await supabase_client.from_("users").select("*").eq("email", user_in.email).execute()
    if existing_user.data:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user_in.password)
    new_user = {
        "email": user_in.email,
        "username": user_in.username,
        "hashed_password": hashed_password
    }
    result = await supabase_client.from_("users").insert(new_user).execute()
    
    if result.error:
        raise HTTPException(status_code=400, detail=str(result.error))
    
    return UserOut(**result.data[0])

@router.post("/login")
async def login(user_login: UserLogin = Body(...)):
    user = await supabase_client.from_("users").select("*").eq("email", user_login.email).single().execute()
    if not user.data or not verify_password(user_login.password, user.data["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user.data["id"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout():
    # In a stateless JWT system, logout is typically handled client-side
    # by removing the token. Here we can add any server-side logout logic if needed.
    return {"detail": "Successfully logged out"}

@router.get("/me", response_model=UserOut)
async def get_current_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/forgot-password")
async def forgot_password(email: str = Body(..., embed=True)):
    # Check if user exists
    user = await supabase_client.from_("users").select("*").eq("email", email).single().execute()
    if not user.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    # In a real application, you would generate a password reset token and send an email
    # For this example, we'll just return a success message
    return {"detail": "Password reset instructions sent to your email"}

# Helper function to get the current user (to be implemented)
async def get_current_user():
    # Implement user authentication logic here
    pass
