"""
Seed complete circles data for XelaConnect
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv
from models import Circle

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', '')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

async def seed_all_circles():
    """Seed all circles with complete data"""
    
    circles_data = [
        # WELLNESS
        Circle(
            name="Mindful Mornings",
            emoji="🌅",
            category="Wellness",
            description="Start your day with intention, meditation, and calm reflection",
            image="https://images.unsplash.com/photo-1682278763548-f349e3c73793",
            gradient="from-[#39CCB7] to-[#207690]",
            tags=["meditation", "mindfulness", "morning routine"],
            members_count=142,
            created_by="system",
            active=True
        ),
        Circle(
            name="Golden Energy",
            emoji="⚡",
            category="Wellness",
            description="Channel your inner vitality and positive life force",
            image="https://images.unsplash.com/photo-1545205597-3d9d02c29597",
            gradient="from-[#F59E0B] to-[#EF4444]",
            tags=["energy", "vitality", "wellness"],
            members_count=98,
            created_by="system",
            active=True
        ),
        Circle(
            name="The Healing Circle",
            emoji="❤️",
            category="Wellness",
            description="A safe space for emotional healing and support",
            image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
            gradient="from-[#EC4899] to-[#8B5CF6]",
            tags=["healing", "emotional wellness", "support"],
            members_count=203,
            created_by="system",
            active=True
        ),
        Circle(
            name="Yoga & Mindful Movement",
            emoji="🏃",
            category="Wellness",
            description="Flow through yoga and mindful body practices",
            image="https://images.unsplash.com/photo-1602192509154-0b900ee1f851",
            gradient="from-[#6AAD73] to-[#39CCB7]",
            tags=["yoga", "movement", "flexibility"],
            members_count=167,
            created_by="system",
            active=True
        ),
        Circle(
            name="Meditation & Inner Peace",
            emoji="✨",
            category="Wellness",
            description="Find stillness and cultivate inner tranquility",
            image="https://images.unsplash.com/photo-1506126613408-eca07ce68773",
            gradient="from-[#8834AE] to-[#3240AC]",
            tags=["meditation", "peace", "mindfulness"],
            members_count=189,
            created_by="system",
            active=True
        ),
        
        # FITNESS
        Circle(
            name="Running Club",
            emoji="👣",
            category="Fitness",
            description="Connect with fellow runners and explore new trails",
            image="https://images.pexels.com/photos/4534682/pexels-photo-4534682.jpeg",
            gradient="from-[#207690] to-[#3240AC]",
            tags=["running", "cardio", "outdoor"],
            members_count=234,
            created_by="system",
            active=True
        ),
        Circle(
            name="Tennis & Racquet Sports",
            emoji="🏆",
            category="Fitness",
            description="Serve, volley, and connect on the court",
            image="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
            gradient="from-[#10B981] to-[#059669]",
            tags=["tennis", "racquet sports", "competition"],
            members_count=87,
            created_by="system",
            active=True
        ),
        Circle(
            name="Cycling Adventures",
            emoji="🚴",
            category="Fitness",
            description="Pedal through scenic routes and group rides",
            image="https://images.unsplash.com/photo-1541625602330-2277a4c46182",
            gradient="from-[#F59E0B] to-[#D97706]",
            tags=["cycling", "biking", "adventure"],
            members_count=156,
            created_by="system",
            active=True
        ),
        Circle(
            name="Swimming & Water Sports",
            emoji="💧",
            category="Fitness",
            description="Dive into aquatic fitness and water activities",
            image="https://images.unsplash.com/photo-1519315901367-f34ff9154487",
            gradient="from-[#06B6D4] to-[#0284C7]",
            tags=["swimming", "water sports", "aquatics"],
            members_count=112,
            created_by="system",
            active=True
        ),
        Circle(
            name="Golf & Green Fairways",
            emoji="🚩",
            category="Fitness",
            description="Tee off and enjoy the greens with fellow golfers",
            image="https://images.unsplash.com/photo-1535131749006-b7f58c99034b",
            gradient="from-[#059669] to-[#047857]",
            tags=["golf", "outdoor", "leisure"],
            members_count=94,
            created_by="system",
            active=True
        ),
        Circle(
            name="Bodybuilding & Fitness",
            emoji="🏋️",
            category="Fitness",
            description="Build strength, muscle, and discipline",
            image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
            gradient="from-[#EF4444] to-[#DC2626]",
            tags=["bodybuilding", "strength", "gym"],
            members_count=178,
            created_by="system",
            active=True
        ),
        
        # CREATIVE
        Circle(
            name="Creative Souls",
            emoji="🎨",
            category="Creative",
            description="Express yourself through art, design, and creativity",
            image="https://images.pexels.com/photos/34803285/pexels-photo-34803285.jpeg",
            gradient="from-[#8834AE] to-[#EC4899]",
            tags=["art", "creativity", "expression"],
            members_count=145,
            created_by="system",
            active=True
        ),
        Circle(
            name="Music & Memory",
            emoji="🎵",
            category="Creative",
            description="Share the soundtrack of your life and discover new melodies",
            image="https://images.unsplash.com/photo-1511379938547-c1f69419868d",
            gradient="from-[#A855F7] to-[#9333EA]",
            tags=["music", "melody", "harmony"],
            members_count=198,
            created_by="system",
            active=True
        ),
        Circle(
            name="Writers & Storytellers",
            emoji="✍️",
            category="Creative",
            description="Craft stories, share words, and inspire through writing",
            image="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
            gradient="from-[#F59E0B] to-[#8834AE]",
            tags=["writing", "storytelling", "literature"],
            members_count=127,
            created_by="system",
            active=True
        ),
        Circle(
            name="Photography Enthusiasts",
            emoji="📷",
            category="Creative",
            description="Capture moments and share your visual perspective",
            image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
            gradient="from-[#6366F1] to-[#4F46E5]",
            tags=["photography", "visual arts", "moments"],
            members_count=163,
            created_by="system",
            active=True
        ),
        
        # SOCIAL
        Circle(
            name="Legacy & Life Lessons",
            emoji="📖",
            category="Social",
            description="Share wisdom, stories, and lessons learned over time",
            image="https://images.unsplash.com/photo-1476275466078-4007374efbbe",
            gradient="from-[#92400E] to-[#78350F]",
            tags=["wisdom", "legacy", "life lessons"],
            members_count=231,
            created_by="system",
            active=True
        ),
        Circle(
            name="Kitchen Table Talks",
            emoji="☕",
            category="Social",
            description="Warm conversations over coffee and connection",
            image="https://images.unsplash.com/photo-1625246433906-6cfa33544b31",
            gradient="from-[#D97706] to-[#92400E]",
            tags=["conversation", "coffee", "connection"],
            members_count=287,
            created_by="system",
            active=True
        ),
        
        # OUTDOOR
        Circle(
            name="Fishing & Angling",
            emoji="🌊",
            category="Outdoor",
            description="Cast lines, share catches, and enjoy the water",
            image="https://images.unsplash.com/photo-1544551763-46a013bb70d5",
            gradient="from-[#0891B2] to-[#0E7490]",
            tags=["fishing", "angling", "nature"],
            members_count=104,
            created_by="system",
            active=True
        ),
        Circle(
            name="Hiking & Trail Explorers",
            emoji="⛰️",
            category="Outdoor",
            description="Explore trails and summit peaks together",
            image="https://images.unsplash.com/photo-1551632811-561732d1e306",
            gradient="from-[#059669] to-[#047857]",
            tags=["hiking", "trails", "mountains"],
            members_count=219,
            created_by="system",
            active=True
        ),
        Circle(
            name="Garden & Plant Lovers",
            emoji="🌺",
            category="Outdoor",
            description="Cultivate gardens and grow green connections",
            image="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
            gradient="from-[#10B981] to-[#6AAD73]",
            tags=["gardening", "plants", "nature"],
            members_count=167,
            created_by="system",
            active=True
        ),
        
        # LIFESTYLE
        Circle(
            name="Philosophy & Wonder",
            emoji="💡",
            category="Lifestyle",
            description="Explore big ideas and life's deepest questions",
            image="https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
            gradient="from-[#F59E0B] to-[#FB923C]",
            tags=["philosophy", "ideas", "thinking"],
            members_count=143,
            created_by="system",
            active=True
        ),
        Circle(
            name="Culinary Adventures",
            emoji="👨‍🍳",
            category="Lifestyle",
            description="Cook, taste, and share delicious experiences",
            image="https://images.unsplash.com/photo-1556910103-1c02745aae4d",
            gradient="from-[#EF4444] to-[#F97316]",
            tags=["cooking", "food", "culinary"],
            members_count=201,
            created_by="system",
            active=True
        ),
        Circle(
            name="Tech & Innovation",
            emoji="💻",
            category="Lifestyle",
            description="Discuss technology, innovation, and the digital future",
            image="https://images.unsplash.com/photo-1518770660439-4636190af475",
            gradient="from-[#3B82F6] to-[#2563EB]",
            tags=["technology", "innovation", "digital"],
            members_count=189,
            created_by="system",
            active=True
        ),
        Circle(
            name="Travel & Wanderlust",
            emoji="✈️",
            category="Lifestyle",
            description="Share adventures and discover new destinations",
            image="https://images.unsplash.com/photo-1488646953014-85cb44e25828",
            gradient="from-[#06B6D4] to-[#0284C7]",
            tags=["travel", "adventure", "exploration"],
            members_count=245,
            created_by="system",
            active=True
        ),
        Circle(
            name="Book Club Connections",
            emoji="📚",
            category="Lifestyle",
            description="Read together and discuss stories that move us",
            image="https://images.unsplash.com/photo-1512820790803-83ca734da794",
            gradient="from-[#7C3AED] to-[#6D28D9]",
            tags=["books", "reading", "literature"],
            members_count=176,
            created_by="system",
            active=True
        ),
    ]
    
    # Clear existing circles
    await db.circles.delete_many({})
    
    # Insert all circles
    for circle in circles_data:
        await db.circles.insert_one(circle.model_dump())
    
    print(f"✅ Seeded {len(circles_data)} circles across 6 categories")
    print(f"   • Wellness: 5 circles")
    print(f"   • Fitness: 6 circles")
    print(f"   • Creative: 4 circles")
    print(f"   • Social: 2 circles")
    print(f"   • Outdoor: 3 circles")
    print(f"   • Lifestyle: 5 circles")

async def main():
    print("🌱 Seeding XelaConnect complete circles...")
    await seed_all_circles()
    print("✨ Database seeding complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
