"""
Seed initial data for XelaConnect
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv
from models import Circle, Course, CourseModule

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME')]

async def seed_circles():
    """Seed circles data"""
    circles_data = [
        Circle(
            name="Mindful Mornings",
            category="Wellness",
            description="Start your day with intention and calm",
            image="https://images.unsplash.com/photo-1682278763548-f349e3c73793",
            color="#39CCB7",
            members_count=142,
            created_by="system",
            active=True
        ),
        Circle(
            name="Running Club",
            category="Fitness",
            description="Connect with fellow runners in your area",
            image="https://images.pexels.com/photos/4534682/pexels-photo-4534682.jpeg",
            color="#207690",
            members_count=89,
            created_by="system",
            active=True
        ),
        Circle(
            name="Creative Writers",
            category="Creative",
            description="Share stories, poems, and creative expression",
            image="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
            color="#8834AE",
            members_count=67,
            created_by="system",
            active=False
        ),
        Circle(
            name="Coffee & Connection",
            category="Social",
            description="Meet new people over coffee and conversation",
            image="https://images.unsplash.com/photo-1625246433906-6cfa33544b31",
            color="#6AAD73",
            members_count=203,
            created_by="system",
            active=True
        ),
        Circle(
            name="Yoga Flow",
            category="Wellness",
            description="Find your balance and inner peace",
            image="https://images.unsplash.com/photo-1602192509154-0b900ee1f851",
            color="#39CCB7",
            members_count=156,
            created_by="system",
            active=True
        ),
        Circle(
            name="Art Collective",
            category="Creative",
            description="Visual artists connecting and collaborating",
            image="https://images.pexels.com/photos/34803285/pexels-photo-34803285.jpeg",
            color="#3240AC",
            members_count=94,
            created_by="system",
            active=False
        )
    ]
    
    # Clear existing circles
    await db.circles.delete_many({})
    
    # Insert new circles
    for circle in circles_data:
        await db.circles.insert_one(circle.dict())
    
    print(f"✅ Seeded {len(circles_data)} circles")

async def seed_courses():
    """Seed courses data"""
    courses_data = [
        Course(
            title="Emotional Intelligence Foundations",
            description="Build deeper self-awareness and empathy",
            category="Growth",
            image="https://images.unsplash.com/photo-1759215524566-8aea4761a926",
            price_credits=100,
            price_usd=14.99,
            total_modules=8,
            duration="4 weeks",
            modules=[
                CourseModule(
                    module_id=1,
                    title="Understanding Your Emotions",
                    duration_minutes=15,
                    content="Learn to identify and name your emotions..."
                ),
                CourseModule(
                    module_id=2,
                    title="Building Self-Awareness",
                    duration_minutes=20,
                    content="Develop a deeper understanding of your inner world..."
                )
            ]
        ),
        Course(
            title="Building Meaningful Connections",
            description="Learn the art of authentic relationships",
            category="Connection",
            image="https://images.unsplash.com/photo-1608134225211-dfacaecc0265",
            price_credits=80,
            price_usd=11.99,
            total_modules=6,
            duration="3 weeks",
            modules=[
                CourseModule(
                    module_id=1,
                    title="The Foundation of Connection",
                    duration_minutes=18,
                    content="Understanding what makes relationships meaningful..."
                )
            ]
        ),
        Course(
            title="Mindfulness for Busy Lives",
            description="Integrate calm into your daily routine",
            category="Wellness",
            image="https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
            price_credits=70,
            price_usd=9.99,
            total_modules=10,
            duration="5 weeks",
            modules=[
                CourseModule(
                    module_id=1,
                    title="What is Mindfulness?",
                    duration_minutes=12,
                    content="Introduction to mindfulness practices..."
                )
            ]
        )
    ]
    
    # Clear existing courses
    await db.courses.delete_many({})
    
    # Insert new courses
    for course in courses_data:
        await db.courses.insert_one(course.dict())
    
    print(f"✅ Seeded {len(courses_data)} courses")

async def main():
    print("🌱 Seeding XelaConnect database...")
    await seed_circles()
    await seed_courses()
    print("✨ Database seeding complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
