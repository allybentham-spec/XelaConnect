from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

from models import (
    User, UserCreate, LoginRequest, GoogleAuthRequest, AuthResponse,
    Circle, Course, Connection, Conversation, Message, Activity, Referral
)
from auth import (
    hash_password, verify_password, create_user_session,
    get_current_user, get_user_from_emergent_session, delete_session, db
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== AUTHENTICATION ENDPOINTS ====================

@api_router.post("/auth/signup", response_model=AuthResponse)
async def signup(user_data: UserCreate):
    """Sign up with email and password"""
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_dict = user_data.dict(exclude={"password"})
    user = User(**user_dict)
    user_dict_with_id = user.dict()
    user_dict_with_id["password_hash"] = hash_password(user_data.password)
    
    await db.users.insert_one(user_dict_with_id)
    
    # Create session
    session_token = await create_user_session(user.id)
    
    # Remove password hash from response
    user_dict_clean = user.dict()
    
    return AuthResponse(user=user, session_token=session_token)

@api_router.post("/auth/login", response_model=AuthResponse)
async def login(login_data: LoginRequest):
    """Login with email and password"""
    # Find user
    user_doc = await db.users.find_one({"email": login_data.email})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(login_data.password, user_doc.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Update last active
    await db.users.update_one(
        {"email": login_data.email},
        {"$set": {"last_active": datetime.utcnow()}}
    )
    
    # Create session
    session_token = await create_user_session(user_doc["id"])
    
    # Clean user data
    if "_id" in user_doc:
        del user_doc["_id"]
    if "password_hash" in user_doc:
        del user_doc["password_hash"]
    
    user = User(**user_doc)
    
    return AuthResponse(user=user, session_token=session_token)

@api_router.post("/auth/google", response_model=AuthResponse)
async def google_auth(auth_data: GoogleAuthRequest):
    """Authenticate with Google via Emergent Auth"""
    # Get user data from Emergent
    emergent_user_data = await get_user_from_emergent_session(auth_data.session_id)
    
    # Check if user exists
    user_doc = await db.users.find_one({"email": emergent_user_data["email"]})
    
    if not user_doc:
        # Create new user
        user = User(
            name=emergent_user_data.get("name", ""),
            email=emergent_user_data["email"],
            picture=emergent_user_data.get("picture", "")
        )
        user_dict = user.dict()
        await db.users.insert_one(user_dict)
        user_id = user.id
    else:
        user_id = user_doc["id"]
        # Update last active
        await db.users.update_one(
            {"id": user_id},
            {"$set": {"last_active": datetime.utcnow()}}
        )
        if "_id" in user_doc:
            del user_doc["_id"]
        user = User(**user_doc)
    
    # Create session
    session_token = await create_user_session(user_id)
    
    return AuthResponse(user=user, session_token=session_token)

@api_router.get("/auth/me")
async def get_me(user = Depends(get_current_user)):
    """Get current user"""
    return {"user": user}

@api_router.post("/auth/logout")
async def logout(authorization: str = Depends(lambda x: x)):
    """Logout user"""
    if authorization and authorization.startswith("Bearer "):
        session_token = authorization.replace("Bearer ", "")
        await delete_session(session_token)
    
    return {"message": "Logged out successfully"}

# ==================== USER ENDPOINTS ====================

@api_router.get("/users/dashboard")
async def get_dashboard(user = Depends(get_current_user)):
    """Get dashboard data"""
    daily_messages = [
        "You showed up — that's enough.",
        "Little interactions add up — you're building something real.",
        "Some days it's hard to connect. You're still doing great.",
        "Your presence matters more than you know.",
        "Even a 10-minute meaningful conversation lowers stress for 24 hours."
    ]
    
    import random
    daily_message = random.choice(daily_messages)
    
    stats = {
        "streak": user.get("streak", 0),
        "connections": user.get("connections_count", 0),
        "circles_joined": len(user.get("circles_joined", [])),
        "courses_in_progress": len(user.get("courses_progress", [])),
        "emotional_path_progress": user.get("emotional_path_progress", 0),
        "weekly_growth": user.get("weekly_growth", 0)
    }
    
    return {"stats": stats, "daily_message": daily_message}

@api_router.put("/users/profile")
async def update_profile(profile_data: dict, user = Depends(get_current_user)):
    """Update user profile"""
    # Update allowed fields
    allowed_fields = ["name", "bio", "interests", "identity_badge", "age", "city", "picture"]
    update_data = {k: v for k, v in profile_data.items() if k in allowed_fields}
    
    if update_data:
        await db.users.update_one(
            {"id": user["id"]},
            {"$set": update_data}
        )
    
    # Get updated user
    updated_user = await db.users.find_one({"id": user["id"]})
    if "_id" in updated_user:
        del updated_user["_id"]
    
    return {"user": updated_user}

@api_router.get("/users/referral")
async def get_referral_data(user = Depends(get_current_user)):
    """Get user referral data"""
    # Get referrals
    referrals = await db.referrals.find({"referrer_user_id": user["id"]}).to_list(1000)
    
    total_referrals = len(referrals)
    conversions = len([r for r in referrals if r["status"] == "completed"])
    pending = total_referrals - conversions
    credits_earned = conversions * 50
    
    return {
        "referral_code": user.get("referral_code", ""),
        "referrals_count": total_referrals,
        "conversions": conversions,
        "pending": pending,
        "credits_earned": credits_earned
    }

# ==================== CIRCLES/COMMUNITY ENDPOINTS ====================

@api_router.get("/circles")
async def get_circles(category: str = None):
    """Get all circles with optional category filter"""
    query = {}
    if category and category != "All":
        query["category"] = category
    
    circles = await db.circles.find(query).to_list(1000)
    
    # Clean _id from response
    for circle in circles:
        if "_id" in circle:
            del circle["_id"]
    
    return {"circles": circles}

@api_router.get("/circles/{circle_id}")
async def get_circle_detail(circle_id: str, user = Depends(get_current_user)):
    """Get circle details"""
    circle = await db.circles.find_one({"id": circle_id})
    
    if not circle:
        raise HTTPException(status_code=404, detail="Circle not found")
    
    if "_id" in circle:
        del circle["_id"]
    
    is_member = user["id"] in circle.get("members", [])
    
    return {
        "circle": circle,
        "is_member": is_member,
        "recent_activity": circle.get("recent_activity", [])
    }

@api_router.post("/circles/{circle_id}/join")
async def join_circle(circle_id: str, user = Depends(get_current_user)):
    """Join a circle"""
    circle = await db.circles.find_one({"id": circle_id})
    
    if not circle:
        raise HTTPException(status_code=404, detail="Circle not found")
    
    # Add user to circle members
    await db.circles.update_one(
        {"id": circle_id},
        {
            "$addToSet": {"members": user["id"]},
            "$inc": {"members_count": 1}
        }
    )
    
    # Add circle to user's joined circles
    await db.users.update_one(
        {"id": user["id"]},
        {"$addToSet": {"circles_joined": circle_id}}
    )
    
    # Get updated circle
    updated_circle = await db.circles.find_one({"id": circle_id})
    if "_id" in updated_circle:
        del updated_circle["_id"]
    
    return {"message": "Successfully joined circle", "circle": updated_circle}

@api_router.post("/circles/{circle_id}/leave")
async def leave_circle(circle_id: str, user = Depends(get_current_user)):
    """Leave a circle"""
    # Remove user from circle members
    await db.circles.update_one(
        {"id": circle_id},
        {
            "$pull": {"members": user["id"]},
            "$inc": {"members_count": -1}
        }
    )
    
    # Remove circle from user's joined circles
    await db.users.update_one(
        {"id": user["id"]},
        {"$pull": {"circles_joined": circle_id}}
    )
    
    return {"message": "Successfully left circle"}

# ==================== COURSES ENDPOINTS ====================

@api_router.get("/courses")
async def get_courses():
    """Get all courses"""
    courses = await db.courses.find().to_list(1000)
    
    for course in courses:
        if "_id" in course:
            del course["_id"]
    
    return {"courses": courses}

@api_router.get("/courses/{course_id}")
async def get_course_detail(course_id: str, user = Depends(get_current_user)):
    """Get course details with user progress"""
    course = await db.courses.find_one({"id": course_id})
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if "_id" in course:
        del course["_id"]
    
    # Get user's progress for this course
    user_progress = next(
        (p for p in user.get("courses_progress", []) if p.get("course_id") == course_id),
        {"progress": 0, "completed_modules": []}
    )
    
    return {
        "course": course,
        "user_progress": user_progress,
        "is_purchased": course_id in [p.get("course_id") for p in user.get("courses_progress", [])]
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
