from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Header
import os
import secrets
import requests
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_urlsafe(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', '')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

def hash_password(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    return pwd_context.verify(plain_password, hashed_password)

def create_session_token() -> str:
    """Create a unique session token"""
    return secrets.token_urlsafe(32)

async def get_user_from_emergent_session(session_id: str) -> dict:
    """Get user data from Emergent Auth API"""
    try:
        response = requests.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id},
            timeout=10
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=401, detail="Invalid session ID")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Auth service error: {str(e)}")

async def create_user_session(user_id: str) -> str:
    """Create a new session for a user"""
    session_token = create_session_token()
    expires_at = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    
    session = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.utcnow()
    }
    
    await db.user_sessions.insert_one(session)
    return session_token

async def get_current_user(authorization: str = Header(None)):
    """Get current user from session token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No authorization token")
    
    session_token = authorization.replace("Bearer ", "")
    
    # Find session
    session = await db.user_sessions.find_one({
        "session_token": session_token,
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Get user
    user = await db.users.find_one({"id": session["user_id"]})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove MongoDB _id for clean response
    if "_id" in user:
        del user["_id"]
    
    return user

async def delete_session(session_token: str):
    """Delete a session (logout)"""
    await db.user_sessions.delete_one({"session_token": session_token})
