from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# User Models
class UserBase(BaseModel):
    name: str
    email: str
    age: Optional[int] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    picture: Optional[str] = None
    identity_badge: Optional[str] = None
    interests: List[str] = []

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    streak: int = 0
    connections_count: int = 0
    circles_joined: List[str] = []
    courses_progress: List[dict] = []
    emotional_path_progress: int = 0
    weekly_growth: int = 0
    subscription_tier: str = "free"
    credits: int = 0
    referral_code: str = Field(default_factory=lambda: f"XC{str(uuid.uuid4())[:8].upper()}")
    referred_by: Optional[str] = None
    referrals_count: int = 0
    referral_conversions: int = 0
    badges: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    last_active: datetime = Field(default_factory=lambda: datetime.utcnow())
    is_guest: bool = False

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

# User Session
class UserSession(BaseModel):
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())

# Circle Models
class Circle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    emoji: str
    category: str  # Wellness, Fitness, Creative, Social, Outdoor, Lifestyle
    description: str
    image: str
    gradient: str  # Gradient colors for display
    tags: List[str] = []
    members_count: int = 0
    members: List[str] = []
    active: bool = True
    created_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    recent_activity: List[dict] = []

# Course Models
class CourseModule(BaseModel):
    module_id: int
    title: str
    duration_minutes: int
    content: str
    video_url: Optional[str] = None

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str  # Growth, Connection, Wellness
    image: str
    price_credits: int
    price_usd: float
    modules: List[CourseModule] = []
    total_modules: int
    duration: str
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())

# Connection Models
class Connection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    connected_user_id: str
    compatibility_score: int
    status: str = "pending"  # pending, accepted, declined
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    accepted_at: Optional[datetime] = None

# Conversation Models
class Message(BaseModel):
    message_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sender_id: str
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.utcnow())
    is_ai: bool = False

class Conversation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    type: str  # ai or user_to_user
    with_user_id: Optional[str] = None
    messages: List[Message] = []
    last_message_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())

# Activity Models
class Activity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    type: str  # opportunity, connection, insight, boost
    priority: str  # high, medium, low
    title: str
    description: str
    action_text: str
    action_link: str
    read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())

# Referral Models
class Referral(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referrer_user_id: str
    referred_user_id: str
    referral_code: str
    status: str = "pending"  # pending, completed
    rewards_given: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    completed_at: Optional[datetime] = None

# Auth Models
class LoginRequest(BaseModel):
    email: str
    password: str

class GoogleAuthRequest(BaseModel):
    session_id: str

class AuthResponse(BaseModel):
    user: User
    session_token: str


# Reflection Models
class Reflection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    prompt: str
    content: str
    is_public: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    updated_at: datetime = Field(default_factory=lambda: datetime.utcnow())

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

class ReflectionCreate(BaseModel):
    prompt: str
    content: str
    is_public: bool = False

class ReflectionUpdate(BaseModel):
    content: Optional[str] = None
    is_public: Optional[bool] = None
