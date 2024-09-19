from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.chat import ChatMessageCreate, ChatMessageOut
from app.services.supabase_service import supabase_client

router = APIRouter()

@router.post("/", response_model=ChatMessageOut)
async def create_chat_message(message: ChatMessageCreate):
    # Logic to create a chat message
    return {"id": "123", "user_id": message.user_id, "content": message.content, "timestamp": "2023-05-01T12:00:00Z"}

@router.get("/", response_model=List[ChatMessageOut])
async def list_chat_messages():
    # Logic to list chat messages
    return []

@router.get("/{message_id}", response_model=ChatMessageOut)
async def get_chat_message(message_id: str):
    # Logic to get a specific chat message
    return {"id": message_id, "user_id": "user123", "content": "Hello, world!", "timestamp": "2023-05-01T12:00:00Z"}

@router.delete("/{message_id}")
async def delete_chat_message(message_id: str):
    # Logic to delete a chat message
    return {"message": "Chat message deleted successfully"}
