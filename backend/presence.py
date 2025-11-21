"""
User presence and safety features for XelaConnect
"""
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta
from auth import get_current_user, db
import uuid

presence_router = APIRouter(prefix="/presence")
safety_router = APIRouter(prefix="/safety")

# ==================== PRESENCE ENDPOINTS ====================

@presence_router.post("/online")
async def set_online(user = Depends(get_current_user)):
    """Set user as online"""
    await db.users.update_one(
        {"id": user["id"]},
        {
            "$set": {
                "last_active": datetime.utcnow(),
                "is_online": True
            }
        }
    )
    return {"status": "online"}

@presence_router.post("/offline")
async def set_offline(user = Depends(get_current_user)):
    """Set user as offline"""
    await db.users.update_one(
        {"id": user["id"]},
        {
            "$set": {
                "last_active": datetime.utcnow(),
                "is_online": False
            }
        }
    )
    return {"status": "offline"}

@presence_router.get("/status/{user_id}")
async def get_user_status(user_id: str):
    """Get user's online status"""
    user = await db.users.find_one({"id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    is_online = user.get("is_online", False)
    last_active = user.get("last_active", datetime.utcnow())
    
    # If last active was less than 5 minutes ago, consider online
    if (datetime.utcnow() - last_active).seconds < 300:
        status = "online"
    elif (datetime.utcnow() - last_active).seconds < 3600:
        status = "recently_active"
    else:
        status = "offline"
    
    return {
        "status": status,
        "last_active": last_active.isoformat()
    }

@presence_router.get("/online-users")
async def get_online_users(user = Depends(get_current_user)):
    """Get list of online users"""
    five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
    
    online_users = await db.users.find({
        "id": {"$ne": user["id"]},
        "last_active": {"$gte": five_minutes_ago}
    }).to_list(100)
    
    for u in online_users:
        if "_id" in u:
            del u["_id"]
        if "password_hash" in u:
            del u["password_hash"]
    
    return {"online_users": online_users, "count": len(online_users)}

# ==================== BLOCK & REPORT ENDPOINTS ====================

@safety_router.post("/block/{user_id}")
async def block_user(user_id: str, user = Depends(get_current_user)):
    """Block a user"""
    if user_id == user["id"]:
        raise HTTPException(status_code=400, detail="Cannot block yourself")
    
    # Add to blocked users list
    await db.users.update_one(
        {"id": user["id"]},
        {"$addToSet": {"blocked_users": user_id}}
    )
    
    # Remove any existing connections
    await db.connections.delete_many({
        "$or": [
            {"user_id": user["id"], "connected_user_id": user_id},
            {"user_id": user_id, "connected_user_id": user["id"]}
        ]
    })
    
    return {"message": "User blocked successfully"}

@safety_router.post("/unblock/{user_id}")
async def unblock_user(user_id: str, user = Depends(get_current_user)):
    """Unblock a user"""
    await db.users.update_one(
        {"id": user["id"]},
        {"$pull": {"blocked_users": user_id}}
    )
    
    return {"message": "User unblocked successfully"}

@safety_router.get("/blocked")
async def get_blocked_users(user = Depends(get_current_user)):
    """Get list of blocked users"""
    user_data = await db.users.find_one({"id": user["id"]})
    blocked_ids = user_data.get("blocked_users", [])
    
    if not blocked_ids:
        return {"blocked_users": []}
    
    blocked_users = await db.users.find({"id": {"$in": blocked_ids}}).to_list(100)
    
    for u in blocked_users:
        if "_id" in u:
            del u["_id"]
        if "password_hash" in u:
            del u["password_hash"]
    
    return {"blocked_users": blocked_users}

@safety_router.post("/report")
async def report_user(report_data: dict, user = Depends(get_current_user)):
    """Report a user for inappropriate behavior"""
    reported_user_id = report_data.get("user_id")
    reason = report_data.get("reason")
    details = report_data.get("details", "")
    
    if not reported_user_id or not reason:
        raise HTTPException(status_code=400, detail="user_id and reason required")
    
    report = {
        "id": str(uuid.uuid4()),
        "reporter_id": user["id"],
        "reported_user_id": reported_user_id,
        "reason": reason,
        "details": details,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    await db.user_reports.insert_one(report)
    
    return {"message": "Report submitted successfully", "report_id": report["id"]}

@safety_router.get("/is-blocked/{user_id}")
async def check_if_blocked(user_id: str, user = Depends(get_current_user)):
    """Check if a user is blocked"""
    user_data = await db.users.find_one({"id": user["id"]})
    blocked_ids = user_data.get("blocked_users", [])
    
    # Also check if we are blocked by them
    other_user_data = await db.users.find_one({"id": user_id})
    blocked_by_them = user["id"] in other_user_data.get("blocked_users", [])
    
    return {
        "is_blocked_by_me": user_id in blocked_ids,
        "is_blocked_by_them": blocked_by_them,
        "can_message": user_id not in blocked_ids and not blocked_by_them
    }
