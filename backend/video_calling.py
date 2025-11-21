"""
Daily.co Video Calling Service
Handles room creation, token generation, and video call management
"""

import httpx
import os
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from auth import get_current_user
import logging

logger = logging.getLogger(__name__)

# Pydantic models for requests/responses
class RoomCreateRequest(BaseModel):
    room_name: Optional[str] = None
    privacy: str = "public"
    max_participants: Optional[int] = None

class RoomResponse(BaseModel):
    url: str
    name: str
    privacy: str
    created_at: str

class MeetingTokenRequest(BaseModel):
    room_name: str
    user_name: str
    is_owner: bool = False
    expiration_minutes: int = 120

class MeetingTokenResponse(BaseModel):
    token: str
    room_name: str
    user_name: str
    expires_at: str

class DailyService:
    """Service for interacting with Daily.co API"""
    BASE_URL = "https://api.daily.co/v1"
    
    def __init__(self):
        self.api_key = os.getenv("DAILY_API_KEY")
        if not self.api_key:
            raise ValueError("DAILY_API_KEY not found in environment variables")
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def create_room(
        self,
        room_name: Optional[str] = None,
        privacy: str = "public",
        max_participants: Optional[int] = None
    ) -> Dict[str, Any]:
        """Create a new Daily.co room"""
        try:
            payload = {
                "properties": {
                    "exp": int((datetime.utcnow() + timedelta(days=1)).timestamp())
                }
            }
            
            # Only set max_participants if explicitly provided
            if max_participants is not None:
                payload["properties"]["max_participants"] = max_participants
            
            if room_name:
                payload["name"] = room_name
            
            payload["privacy"] = privacy
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.BASE_URL}/rooms",
                    json=payload,
                    headers=self.headers
                )
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            logger.error(f"Daily.co API error: {e.response.text}")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Failed to create room: {e.response.text}"
            )
        except Exception as e:
            logger.error(f"Error creating room: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    
    async def get_room(self, room_name: str) -> Dict[str, Any]:
        """Get details for a specific room"""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/rooms/{room_name}",
                    headers=self.headers
                )
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(status_code=404, detail="Room not found")
            logger.error(f"Daily.co API error: {e.response.text}")
            raise HTTPException(status_code=500, detail="Failed to retrieve room")
        except Exception as e:
            logger.error(f"Error getting room: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    
    async def create_meeting_token(
        self,
        room_name: str,
        user_name: str,
        is_owner: bool = False,
        expiration_minutes: int = 120
    ) -> Dict[str, Any]:
        """Generate a meeting token for a participant"""
        try:
            expiration_time = int((
                datetime.utcnow() + timedelta(minutes=expiration_minutes)
            ).timestamp())
            
            payload = {
                "properties": {
                    "room_name": room_name,
                    "user_name": user_name,
                    "is_owner": is_owner,
                    "exp": expiration_time
                }
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.BASE_URL}/meeting-tokens",
                    json=payload,
                    headers=self.headers
                )
                response.raise_for_status()
                token_data = response.json()
                token_data["expires_at"] = datetime.fromtimestamp(expiration_time).isoformat()
                return token_data
        except httpx.HTTPStatusError as e:
            logger.error(f"Daily.co API error: {e.response.text}")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Failed to generate token: {e.response.text}"
            )
        except Exception as e:
            logger.error(f"Error creating meeting token: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    
    async def list_rooms(self) -> Dict[str, Any]:
        """List all rooms"""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/rooms",
                    headers=self.headers
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error listing rooms: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    
    async def delete_room(self, room_name: str) -> bool:
        """Delete a room"""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.delete(
                    f"{self.BASE_URL}/rooms/{room_name}",
                    headers=self.headers
                )
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Error deleting room: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


# Create router
video_router = APIRouter(prefix="/video", tags=["video"])

# Dependency to get Daily service
async def get_daily_service():
    return DailyService()


@video_router.post("/rooms/create", response_model=RoomResponse)
async def create_room(
    request: RoomCreateRequest,
    current_user: dict = Depends(get_current_user),
    daily_service: DailyService = Depends(get_daily_service)
):
    """Create a new video call room"""
    try:
        room_data = await daily_service.create_room(
            room_name=request.room_name,
            privacy=request.privacy,
            max_participants=request.max_participants
        )
        
        return RoomResponse(
            url=room_data["url"],
            name=room_data["name"],
            privacy=room_data["privacy"],
            created_at=room_data["created_at"]
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating room: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create room")


@video_router.get("/rooms/{room_name}")
async def get_room(
    room_name: str,
    current_user: dict = Depends(get_current_user),
    daily_service: DailyService = Depends(get_daily_service)
):
    """Get details about a specific room"""
    return await daily_service.get_room(room_name)


@video_router.post("/rooms/token", response_model=MeetingTokenResponse)
async def generate_token(
    request: MeetingTokenRequest,
    current_user: dict = Depends(get_current_user),
    daily_service: DailyService = Depends(get_daily_service)
):
    """Generate a meeting token for a participant"""
    try:
        token_data = await daily_service.create_meeting_token(
            room_name=request.room_name,
            user_name=request.user_name or current_user.get("name", "User"),
            is_owner=request.is_owner,
            expiration_minutes=request.expiration_minutes
        )
        
        return MeetingTokenResponse(
            token=token_data["token"],
            room_name=request.room_name,
            user_name=request.user_name,
            expires_at=token_data["expires_at"]
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error generating token: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate token")


@video_router.get("/rooms")
async def list_rooms(
    current_user: dict = Depends(get_current_user),
    daily_service: DailyService = Depends(get_daily_service)
):
    """List all available rooms"""
    return await daily_service.list_rooms()


@video_router.delete("/rooms/{room_name}")
async def delete_room(
    room_name: str,
    current_user: dict = Depends(get_current_user),
    daily_service: DailyService = Depends(get_daily_service)
):
    """Delete a video call room"""
    await daily_service.delete_room(room_name)
    return {"message": f"Room {room_name} deleted successfully"}
