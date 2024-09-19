from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.enrollment import EnrollmentCreate, EnrollmentOut
from app.services.supabase_service import supabase_client

router = APIRouter()

@router.post("/", response_model=EnrollmentOut)
async def create_enrollment(enrollment: EnrollmentCreate):
    # Logic to create an enrollment
    return {"id": "123", "user_id": enrollment.user_id, "challenge_id": enrollment.challenge_id}

@router.get("/", response_model=List[EnrollmentOut])
async def list_enrollments():
    # Logic to list enrollments
    return []

@router.get("/{enrollment_id}", response_model=EnrollmentOut)
async def get_enrollment(enrollment_id: str):
    # Logic to get a specific enrollment
    return {"id": enrollment_id, "user_id": "user123", "challenge_id": "challenge456"}

@router.delete("/{enrollment_id}")
async def delete_enrollment(enrollment_id: str):
    # Logic to delete an enrollment
    return {"message": "Enrollment deleted successfully"}
