# XelaConnect - Backend Implementation Contracts

## 📋 Overview
This document outlines the complete backend implementation for XelaConnect - The World's First Emotional Wellness Social Network.

---

## 🎯 Core Vision
- **NOT a dating app** - Focus on genuine friendships & community
- **Emotional wellness platform** - AI-powered growth & connection
- **Premium experience** - Glass morphism UI, thoughtful interactions
- **Monetization model** - Courses, subscriptions, referrals, marketplace

---

## 🗄️ Database Models

### 1. Users Collection
```python
{
  "_id": ObjectId / "user-uuid",
  "email": "user@example.com",
  "name": "Alexandria",
  "password_hash": "bcrypt_hash" (for email/password auth),
  "picture": "url_to_profile_image",
  "age": 28,
  "city": "San Francisco",
  "bio": "Finding peace in the present moment",
  
  # Connection Identity Badge
  "identity_badge": "Connector" | "Creator" | "Thinker" | "Builder" | "Explorer" | "Visionary" | "Calm Presence" | "Funny Friend" | "Listener" | "Leader",
  
  # Interests
  "interests": ["Wellness", "Fitness", "Creative", "Social"],
  
  # Stats
  "streak": 7,
  "connections_count": 24,
  "circles_joined": ["circle-001", "circle-002"],
  "courses_progress": [
    {
      "course_id": "course-001",
      "progress": 35,
      "completed_modules": [1, 2]
    }
  ],
  
  # Emotional Intelligence Tracking
  "emotional_path_progress": 65,
  "weekly_growth": 12,
  
  # Premium/Subscription
  "subscription_tier": "free" | "premium" | "elite" | "lifetime_elite",
  "credits": 150,
  
  # Referral
  "referral_code": "XC8JF02AB1",
  "referred_by": "user-uuid",
  "referrals_count": 5,
  "referral_conversions": 3,
  
  # Badges & Achievements
  "badges": ["Insightful", "Connected", "Founder"],
  
  # Auth
  "created_at": ISODate,
  "last_active": ISODate,
  "is_guest": false
}
```

### 2. User Sessions Collection (for Emergent Auth + JWT)
```python
{
  "_id": ObjectId,
  "user_id": "user-uuid",
  "session_token": "session_token_string",
  "expires_at": ISODate (7 days from creation),
  "created_at": ISODate
}
```

### 3. Circles Collection
```python
{
  "_id": "circle-uuid",
  "name": "Mindful Mornings",
  "category": "Wellness" | "Fitness" | "Creative" | "Social",
  "description": "Start your day with intention and calm",
  "image": "url_to_circle_image",
  "color": "#39CCB7",
  "members_count": 142,
  "members": ["user-001", "user-002"],
  "active": true,
  "created_by": "user-uuid",
  "created_at": ISODate,
  
  # Activity Feed (last 50 messages)
  "recent_activity": [
    {
      "user_id": "user-001",
      "message": "Great session today!",
      "timestamp": ISODate
    }
  ]
}
```

### 4. Courses Collection
```python
{
  "_id": "course-uuid",
  "title": "Emotional Intelligence Foundations",
  "description": "Build deeper self-awareness and empathy",
  "category": "Growth" | "Connection" | "Wellness",
  "image": "url_to_course_image",
  "price_credits": 100,
  "price_usd": 14.99,
  
  # Modules
  "modules": [
    {
      "module_id": 1,
      "title": "Understanding Your Emotions",
      "duration_minutes": 15,
      "content": "Module content here...",
      "video_url": "optional_video_url"
    }
  ],
  
  "total_modules": 8,
  "duration": "4 weeks",
  "created_at": ISODate
}
```

### 5. Connections Collection (Friend Matches)
```python
{
  "_id": ObjectId,
  "user_id": "user-001",
  "connected_user_id": "user-002",
  "compatibility_score": 89,
  "status": "pending" | "accepted" | "declined",
  "created_at": ISODate,
  "accepted_at": ISODate | null
}
```

### 6. Conversations Collection (XelaTalks AI + User Messages)
```python
{
  "_id": "conversation-uuid",
  "user_id": "user-001",
  "type": "ai" | "user_to_user",
  "with_user_id": "user-002" | null (for AI chats),
  
  "messages": [
    {
      "message_id": "msg-uuid",
      "sender_id": "user-001" | "xela-ai",
      "content": "Message text",
      "timestamp": ISODate,
      "is_ai": true
    }
  ],
  
  "last_message_at": ISODate,
  "created_at": ISODate
}
```

### 7. Activities Collection (AI Concierge Opportunities)
```python
{
  "_id": "activity-uuid",
  "user_id": "user-001",
  "type": "opportunity" | "connection" | "insight" | "boost",
  "priority": "high" | "medium" | "low",
  "title": "New Circle Match",
  "description": "Morning Meditation group is highly aligned with your wellness goals",
  "action_text": "Join Circle",
  "action_link": "/community/circle-uuid",
  "read": false,
  "created_at": ISODate
}
```

### 8. Referrals Collection
```python
{
  "_id": ObjectId,
  "referrer_user_id": "user-001",
  "referred_user_id": "user-002",
  "referral_code": "XC8JF02AB1",
  "status": "pending" | "completed",
  "rewards_given": false,
  "created_at": ISODate,
  "completed_at": ISODate | null
}
```

---

## 🔌 API Endpoints

### Authentication Endpoints

#### 1. POST /api/auth/signup
**Email/Password Signup**
```python
Request Body:
{
  "name": "Alexandria",
  "email": "user@example.com",
  "password": "password123",
  "age": 28,
  "city": "San Francisco"
}

Response:
{
  "user": { user_object },
  "session_token": "jwt_token"
}
```

#### 2. POST /api/auth/login
**Email/Password Login**
```python
Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": { user_object },
  "session_token": "jwt_token"
}
```

#### 3. POST /api/auth/google
**Process Emergent Auth session_id**
```python
Request Body:
{
  "session_id": "session_id_from_url"
}

Steps:
1. Call Emergent API with session_id to get user data
2. Check if user exists by email
3. If not, create new user
4. Create session in database
5. Return user + session_token

Response:
{
  "user": { user_object },
  "session_token": "session_token_string"
}
```

#### 4. GET /api/auth/me
**Get current user from session**
```python
Headers: Authorization: Bearer <session_token>

Response:
{
  "user": { user_object }
}
```

#### 5. POST /api/auth/logout
**Logout user**
```python
Headers: Authorization: Bearer <session_token>

Response:
{
  "message": "Logged out successfully"
}
```

---

### User Endpoints

#### 6. GET /api/users/dashboard
**Get dashboard data**
```python
Headers: Authorization: Bearer <session_token>

Response:
{
  "stats": {
    "streak": 7,
    "connections": 24,
    "circles_joined": 3,
    "courses_in_progress": 2,
    "emotional_path_progress": 65,
    "weekly_growth": 12
  },
  "daily_message": "You showed up — that's enough."
}
```

#### 7. PUT /api/users/profile
**Update user profile**
```python
Request Body:
{
  "name": "Alexandria",
  "bio": "New bio",
  "interests": ["Wellness", "Art"],
  "identity_badge": "Connector"
}

Response:
{
  "user": { updated_user_object }
}
```

#### 8. GET /api/users/referral
**Get user referral data**
```python
Response:
{
  "referral_code": "XC8JF02AB1",
  "referrals_count": 5,
  "conversions": 3,
  "pending": 2,
  "credits_earned": 250
}
```

---

### Circles/Community Endpoints

#### 9. GET /api/circles
**Get all circles (with optional category filter)**
```python
Query Params: ?category=Wellness

Response:
{
  "circles": [ array_of_circle_objects ]
}
```

#### 10. GET /api/circles/:circle_id
**Get circle details**
```python
Response:
{
  "circle": { circle_object },
  "is_member": true,
  "recent_activity": [ array_of_activities ]
}
```

#### 11. POST /api/circles/:circle_id/join
**Join a circle**
```python
Response:
{
  "message": "Successfully joined circle",
  "circle": { updated_circle_object }
}
```

#### 12. POST /api/circles/:circle_id/leave
**Leave a circle**
```python
Response:
{
  "message": "Successfully left circle"
}
```

---

### Courses Endpoints

#### 13. GET /api/courses
**Get all courses**
```python
Response:
{
  "courses": [ array_of_course_objects ]
}
```

#### 14. GET /api/courses/:course_id
**Get course details with user progress**
```python
Response:
{
  "course": { course_object },
  "user_progress": {
    "progress": 35,
    "completed_modules": [1, 2],
    "current_module": 3
  },
  "is_purchased": true
}
```

#### 15. POST /api/courses/:course_id/purchase
**Purchase course with credits or Stripe**
```python
Request Body:
{
  "payment_method": "credits" | "stripe",
  "stripe_token": "optional_stripe_token"
}

Response:
{
  "message": "Course purchased successfully",
  "course": { course_object }
}
```

#### 16. POST /api/courses/:course_id/progress
**Update course progress**
```python
Request Body:
{
  "module_id": 3,
  "completed": true
}

Response:
{
  "progress": 45,
  "completed_modules": [1, 2, 3]
}
```

---

### Discover/Matching Endpoints

#### 17. GET /api/discover
**Get friend recommendations**
```python
Response:
{
  "people": [
    {
      "user": { user_object },
      "compatibility_score": 89,
      "common_interests": ["Wellness", "Yoga"]
    }
  ]
}
```

#### 18. POST /api/connections/request
**Send connection request**
```python
Request Body:
{
  "user_id": "user-002"
}

Response:
{
  "message": "Connection request sent",
  "connection": { connection_object }
}
```

#### 19. POST /api/connections/:connection_id/accept
**Accept connection request**
```python
Response:
{
  "message": "Connection accepted",
  "connection": { updated_connection_object }
}
```

#### 20. GET /api/connections
**Get user's connections**
```python
Response:
{
  "connections": [ array_of_connections ]
}
```

---

### XelaTalks (AI Chat) Endpoints

#### 21. GET /api/xelatalks
**Get user's AI conversation**
```python
Response:
{
  "conversation": {
    "messages": [ array_of_messages ]
  }
}
```

#### 22. POST /api/xelatalks/message
**Send message to Xela AI**
```python
Request Body:
{
  "message": "I'm feeling overwhelmed with work lately."
}

Steps:
1. Save user message to conversation
2. Call OpenAI GPT-5 API with context
3. Save AI response to conversation
4. Return AI response

Response:
{
  "ai_message": {
    "content": "I hear you. That takes courage to share...",
    "timestamp": ISODate
  }
}
```

---

### Activity Feed Endpoints

#### 23. GET /api/activity
**Get user's activity feed (AI-curated opportunities)**
```python
Response:
{
  "activities": [ array_of_activity_objects ]
}
```

#### 24. POST /api/activity/:activity_id/mark-read
**Mark activity as read**
```python
Response:
{
  "message": "Activity marked as read"
}
```

---

## 🔐 Authentication Middleware

```python
async def get_current_user(session_token: str):
    # 1. Check session_token in database
    session = await db.user_sessions.find_one({
        "session_token": session_token,
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not session:
        raise HTTPException(401, "Invalid or expired session")
    
    # 2. Get user
    user = await db.users.find_one({"_id": session["user_id"]})
    
    if not user:
        raise HTTPException(404, "User not found")
    
    return user

# Use in routes:
@api_router.get("/api/auth/me")
async def get_me(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "No authorization token")
    
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    return {"user": user}
```

---

## 🤖 AI Integration (XelaTalks)

### OpenAI GPT-5 Integration using Emergent LLM Key

```python
from emergentintegrations import OpenAI

client = OpenAI(api_key=EMERGENT_LLM_KEY)

async def get_ai_response(user_message: str, conversation_history: list):
    # System prompt for Xela AI
    system_prompt = """You are Xela, an emotionally intelligent AI companion for XelaConnect.
    
    Your role:
    - Be warm, supportive, and non-judgmental
    - Help users reflect on their emotions
    - Provide gentle guidance for social connection
    - Never diagnose or provide medical advice
    - Keep responses concise (2-3 sentences)
    - Focus on belonging, growth, and connection
    
    Tone: Calm, wise, empathetic, encouraging"""
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history
    for msg in conversation_history[-10:]:  # Last 10 messages for context
        messages.append({
            "role": "user" if not msg["is_ai"] else "assistant",
            "content": msg["content"]
        })
    
    # Add current user message
    messages.append({"role": "user", "content": user_message})
    
    # Call OpenAI
    response = client.chat.completions.create(
        model="gpt-5.1-turbo",
        messages=messages,
        temperature=0.7,
        max_tokens=150
    )
    
    return response.choices[0].message.content
```

---

## 💰 Monetization Implementation

### 1. Credits System
- Users earn credits through referrals
- Credits can purchase courses, boosts, AI sessions
- 1 credit = $0.10 USD equivalent

### 2. Subscription Tiers (RevenueCat integration - future)
- **Free**: Basic access
- **Premium** ($9.99/mo): Unlimited circles, advanced matching
- **Elite** ($19.99/mo): All courses, priority visibility, AI unlimited

### 3. Referral Rewards
- 1 conversion = 50 credits to both users
- 5 conversions = 3 months Elite
- 10 conversions = Lifetime Elite

---

## 🔄 Frontend Integration Steps

1. **Replace mock.js data with API calls**
2. **Update AuthContext to use real authentication**
3. **Add API client utility** (axios with auth headers)
4. **Update all pages to fetch from backend**
5. **Handle loading states and errors**
6. **Add toast notifications for success/error**

---

## ✅ Backend Implementation Checklist

- [ ] Install required packages (emergentintegrations, passlib, python-jose)
- [ ] Set up MongoDB models
- [ ] Implement authentication (Emergent + JWT)
- [ ] Create all API endpoints
- [ ] Integrate OpenAI GPT-5 for XelaTalks
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Add error handling and validation
- [ ] Update frontend to use backend APIs
- [ ] Test complete user journey

---

## 📝 Notes

- **Mock data in mock.js will be COMPLETELY REPLACED** with real database operations
- All dates should use timezone-aware UTC timestamps
- Use proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Implement request validation using Pydantic models
- Add proper error logging
- Keep responses consistent with { "data": {}, "message": "" } format
