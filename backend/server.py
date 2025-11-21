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
    from motor.motor_asyncio import AsyncIOMotorClient
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    client.close()

# ==================== DISCOVER/MATCHING ENDPOINTS ====================

@api_router.get("/discover")
async def get_discover_people(user = Depends(get_current_user)):
    """Get friend recommendations"""
    # Get all users except current user
    all_users = await db.users.find({
        "id": {"$ne": user["id"]},
        "is_guest": False
    }).to_list(100)
    
    # Calculate compatibility (simple matching based on interests)
    recommendations = []
    user_interests = set(user.get("interests", []))
    
    for other_user in all_users:
        other_interests = set(other_user.get("interests", []))
        common_interests = user_interests.intersection(other_interests)
        
        if common_interests:
            compatibility_score = int((len(common_interests) / max(len(user_interests), 1)) * 100)
        else:
            compatibility_score = 50  # Base score
        
        if "_id" in other_user:
            del other_user["_id"]
        if "password_hash" in other_user:
            del other_user["password_hash"]
        
        recommendations.append({
            "user": other_user,
            "compatibility_score": min(compatibility_score, 95),
            "common_interests": list(common_interests)
        })
    
    # Sort by compatibility
    recommendations.sort(key=lambda x: x["compatibility_score"], reverse=True)
    
    return {"people": recommendations[:10]}

@api_router.post("/connections/request")
async def send_connection_request(request_data: dict, user = Depends(get_current_user)):
    """Send connection request"""
    target_user_id = request_data.get("user_id")
    
    if not target_user_id:
        raise HTTPException(status_code=400, detail="user_id required")
    
    # Check if connection already exists
    existing = await db.connections.find_one({
        "$or": [
            {"user_id": user["id"], "connected_user_id": target_user_id},
            {"user_id": target_user_id, "connected_user_id": user["id"]}
        ]
    })
    
    if existing:
        raise HTTPException(status_code=400, detail="Connection already exists")
    
    # Create connection
    connection = Connection(
        user_id=user["id"],
        connected_user_id=target_user_id,
        compatibility_score=85,  # Could be calculated
        status="pending"
    )
    
    await db.connections.insert_one(connection.dict())
    
    return {"message": "Connection request sent", "connection": connection.dict()}

@api_router.post("/connections/{connection_id}/accept")
async def accept_connection(connection_id: str, user = Depends(get_current_user)):
    """Accept connection request"""
    connection = await db.connections.find_one({"id": connection_id})
    
    if not connection:
        raise HTTPException(status_code=404, detail="Connection not found")
    
    if connection["connected_user_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Update connection status
    await db.connections.update_one(
        {"id": connection_id},
        {
            "$set": {
                "status": "accepted",
                "accepted_at": datetime.utcnow()
            }
        }
    )
    
    # Update connection counts
    await db.users.update_one(
        {"id": connection["user_id"]},
        {"$inc": {"connections_count": 1}}
    )
    await db.users.update_one(
        {"id": connection["connected_user_id"]},
        {"$inc": {"connections_count": 1}}
    )
    
    updated_connection = await db.connections.find_one({"id": connection_id})
    if "_id" in updated_connection:
        del updated_connection["_id"]
    
    return {"message": "Connection accepted", "connection": updated_connection}

@api_router.get("/connections")
async def get_connections(user = Depends(get_current_user)):
    """Get user's connections"""
    connections = await db.connections.find({
        "$or": [
            {"user_id": user["id"]},
            {"connected_user_id": user["id"]}
        ],
        "status": "accepted"
    }).to_list(1000)
    
    for conn in connections:
        if "_id" in conn:
            del conn["_id"]
    
    return {"connections": connections}

# ==================== XELATALKS (AI CHAT) ENDPOINTS ====================

from emergentintegrations.llm.chat import LlmChat, UserMessage

EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "sk-emergent-6FdF57b7b5aF21f672")

async def get_ai_response(user_message: str, conversation_history: list, user_id: str) -> str:
    """Get AI response using Emergent LLM integration"""
    system_prompt = """You are Xela, an emotionally intelligent AI companion for XelaConnect.
    
    Your role:
    - Be warm, supportive, and non-judgmental
    - Help users reflect on their emotions
    - Provide gentle guidance for social connection
    - Never diagnose or provide medical advice
    - Keep responses concise (2-3 sentences)
    - Focus on belonging, growth, and connection
    
    Tone: Calm, wise, empathetic, encouraging"""
    
    try:
        # Initialize chat with current session
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"xela_{user_id}",
            system_message=system_prompt
        ).with_model("openai", "gpt-4o")
        
        # Create user message
        message = UserMessage(text=user_message)
        
        # Get AI response
        response = await chat.send_message(message)
        return response
    except Exception as e:
        logger.error(f"AI error: {str(e)}")
        return "I'm here for you. Sometimes my thoughts get tangled, but I'm listening. Could you share a bit more?"

@api_router.get("/xelatalks")
async def get_xelatalks_conversation(user = Depends(get_current_user)):
    """Get user's AI conversation"""
    conversation = await db.conversations.find_one({
        "user_id": user["id"],
        "type": "ai"
    })
    
    if not conversation:
        # Create new conversation
        conversation = Conversation(
            user_id=user["id"],
            type="ai"
        )
        await db.conversations.insert_one(conversation.dict())
    
    if "_id" in conversation:
        del conversation["_id"]
    
    return {"conversation": conversation}

@api_router.post("/xelatalks/message")
async def send_xelatalks_message(message_data: dict, user = Depends(get_current_user)):
    """Send message to Xela AI"""
    user_message = message_data.get("message", "").strip()
    
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Get or create conversation
    conversation = await db.conversations.find_one({
        "user_id": user["id"],
        "type": "ai"
    })
    
    if not conversation:
        conversation = Conversation(
            user_id=user["id"],
            type="ai"
        ).dict()
        await db.conversations.insert_one(conversation)
    
    # Add user message
    user_msg = Message(
        sender_id=user["id"],
        content=user_message,
        is_ai=False
    )
    
    # Get AI response
    ai_response_text = await get_ai_response(
        user_message,
        conversation.get("messages", []),
        user["id"]
    )
    
    # Add AI message
    ai_msg = Message(
        sender_id="xela-ai",
        content=ai_response_text,
        is_ai=True
    )
    
    # Update conversation
    await db.conversations.update_one(
        {"user_id": user["id"], "type": "ai"},
        {
            "$push": {
                "messages": {
                    "$each": [user_msg.dict(), ai_msg.dict()]
                }
            },
            "$set": {"last_message_at": datetime.utcnow()}
        }
    )
    
    return {"ai_message": ai_msg.dict()}

# ==================== ACTIVITY FEED ENDPOINTS ====================

@api_router.get("/activity")
async def get_activity_feed(user = Depends(get_current_user)):
    """Get user's activity feed (AI-curated opportunities)"""
    activities = await db.activities.find({
        "user_id": user["id"]
    }).sort("created_at", -1).to_list(50)
    
    for activity in activities:
        if "_id" in activity:
            del activity["_id"]
    
    # If no activities, create some sample ones
    if not activities:
        sample_activities = [
            Activity(
                user_id=user["id"],
                type="opportunity",
                priority="high",
                title="New Circle Match",
                description="Morning Meditation group is highly aligned with your wellness goals",
                action_text="Join Circle",
                action_link="/community"
            ),
            Activity(
                user_id=user["id"],
                type="insight",
                priority="medium",
                title="Weekly Growth Insight",
                description="Your emotional intelligence score increased by 12%",
                action_text="See Details",
                action_link="/profile"
            )
        ]
        
        for activity in sample_activities:
            await db.activities.insert_one(activity.dict())
        
        activities = [a.dict() for a in sample_activities]
    
    return {"activities": activities}

@api_router.post("/activity/{activity_id}/mark-read")
async def mark_activity_read(activity_id: str, user = Depends(get_current_user)):
    """Mark activity as read"""
    await db.activities.update_one(
        {"id": activity_id, "user_id": user["id"]},
        {"$set": {"read": True}}
    )
    
    return {"message": "Activity marked as read"}
