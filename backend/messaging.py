"""
Real-time messaging endpoints for XelaConnect
"""
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import List
from models import Message
from auth import get_current_user, db
import uuid

messaging_router = APIRouter(prefix="/messaging")

@messaging_router.get("/conversations")
async def get_conversations(user = Depends(get_current_user)):
    """Get all conversations for current user"""
    conversations = await db.conversations.find({
        "$or": [
            {"user_id": user["id"]},
            {"with_user_id": user["id"]}
        ],
        "type": "user_to_user"
    }).sort("last_message_at", -1).to_list(100)
    
    # Get other user details for each conversation
    for conv in conversations:
        other_user_id = conv["with_user_id"] if conv["user_id"] == user["id"] else conv["user_id"]
        other_user = await db.users.find_one({"id": other_user_id})
        if other_user:
            if "_id" in other_user:
                del other_user["_id"]
            if "password_hash" in other_user:
                del other_user["password_hash"]
            conv["other_user"] = other_user
        
        if "_id" in conv:
            del conv["_id"]
    
    return {"conversations": conversations}

@messaging_router.get("/conversations/{user_id}")
async def get_conversation_with_user(user_id: str, user = Depends(get_current_user)):
    """Get or create conversation with specific user"""
    # Try to find existing conversation
    conversation = await db.conversations.find_one({
        "$or": [
            {"user_id": user["id"], "with_user_id": user_id},
            {"user_id": user_id, "with_user_id": user["id"]}
        ],
        "type": "user_to_user"
    })
    
    if not conversation:
        # Create new conversation
        conversation = {
            "id": str(uuid.uuid4()),
            "user_id": user["id"],
            "with_user_id": user_id,
            "type": "user_to_user",
            "messages": [],
            "last_message_at": datetime.utcnow(),
            "created_at": datetime.utcnow()
        }
        await db.conversations.insert_one(conversation)
    
    # Get other user details
    other_user = await db.users.find_one({"id": user_id})
    if other_user:
        if "_id" in other_user:
            del other_user["_id"]
        if "password_hash" in other_user:
            del other_user["password_hash"]
        conversation["other_user"] = other_user
    
    if "_id" in conversation:
        del conversation["_id"]
    
    return {"conversation": conversation}

@messaging_router.post("/conversations/{user_id}/messages")
async def send_message(user_id: str, message_data: dict, user = Depends(get_current_user)):
    """Send message to user"""
    message_text = message_data.get("message", "").strip()
    if not message_text:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Find or create conversation
    conversation = await db.conversations.find_one({
        "$or": [
            {"user_id": user["id"], "with_user_id": user_id},
            {"user_id": user_id, "with_user_id": user["id"]}
        ],
        "type": "user_to_user"
    })
    
    if not conversation:
        conversation = {
            "id": str(uuid.uuid4()),
            "user_id": user["id"],
            "with_user_id": user_id,
            "type": "user_to_user",
            "messages": [],
            "last_message_at": datetime.utcnow(),
            "created_at": datetime.utcnow()
        }
        await db.conversations.insert_one(conversation)
    
    # Create message
    new_message = {
        "message_id": str(uuid.uuid4()),
        "sender_id": user["id"],
        "content": message_text,
        "timestamp": datetime.utcnow(),
        "is_ai": False,
        "read": False,
        "delivered": True
    }
    
    # Add message to conversation
    await db.conversations.update_one(
        {"id": conversation["id"]},
        {
            "$push": {"messages": new_message},
            "$set": {"last_message_at": datetime.utcnow()}
        }
    )
    
    # TODO: Send push notification to recipient
    
    return {"message": new_message}

@messaging_router.post("/conversations/{conversation_id}/read")
async def mark_messages_read(conversation_id: str, user = Depends(get_current_user)):
    """Mark all messages in conversation as read"""
    conversation = await db.conversations.find_one({"id": conversation_id})
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Mark all messages from other user as read
    for msg in conversation.get("messages", []):
        if msg["sender_id"] != user["id"]:
            msg["read"] = True
    
    await db.conversations.update_one(
        {"id": conversation_id},
        {"$set": {"messages": conversation["messages"]}}
    )
    
    return {"message": "Messages marked as read"}

@messaging_router.post("/typing")
async def send_typing_indicator(data: dict, user = Depends(get_current_user)):
    """Send typing indicator (to be handled by websocket in production)"""
    user_id = data.get("user_id")
    is_typing = data.get("is_typing", True)
    
    # Store typing status temporarily (use Redis in production)
    await db.typing_indicators.update_one(
        {"user_id": user["id"], "typing_to": user_id},
        {
            "$set": {
                "is_typing": is_typing,
                "timestamp": datetime.utcnow()
            }
        },
        upsert=True
    )
    
    return {"status": "typing indicator sent"}

@messaging_router.get("/typing/{user_id}")
async def get_typing_indicator(user_id: str, user = Depends(get_current_user)):
    """Check if user is typing"""
    indicator = await db.typing_indicators.find_one({
        "user_id": user_id,
        "typing_to": user["id"]
    })
    
    if indicator and (datetime.utcnow() - indicator["timestamp"]).seconds < 5:
        return {"is_typing": indicator.get("is_typing", False)}
    
    return {"is_typing": False}
