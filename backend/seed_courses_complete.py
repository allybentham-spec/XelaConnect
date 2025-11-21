"""
Seed complete courses library for XelaConnect
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv
from models import Course, CourseModule

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', '')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

async def seed_all_courses():
    """Seed all courses across 5 categories"""
    
    courses_data = [
        # MENTAL HEALTH
        Course(
            title="The Loneliness Detox",
            description="Overcome loneliness, heal connection patterns, and build genuine relationships",
            category="Mental Health",
            image="https://images.unsplash.com/photo-1494548162494-384bba4ab999",
            price_credits=150,
            price_usd=19.99,
            total_modules=7,
            duration="7 days",
            modules=[
                CourseModule(module_id=1, title="Understanding Your Loneliness", duration_minutes=15, content="Explore the roots of loneliness and why it exists..."),
                CourseModule(module_id=2, title="Breaking Isolation Patterns", duration_minutes=20, content="Identify and change patterns that keep you isolated..."),
                CourseModule(module_id=3, title="Building Connection Skills", duration_minutes=18, content="Learn practical skills for initiating connections..."),
            ]
        ),
        Course(
            title="Depression Breakthrough",
            description="Science-backed roadmap for breaking through depression, focused on real, practical tools",
            category="Mental Health",
            image="https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
            price_credits=400,
            price_usd=49.99,
            total_modules=30,
            duration="90 days",
            modules=[
                CourseModule(module_id=1, title="Understanding Depression", duration_minutes=25, content="Scientific understanding of depression and its mechanisms..."),
            ]
        ),
        Course(
            title="Anxiety to Clarity",
            description="Therapist-grade tools to recognize triggers, break worry spirals, and reclaim calm",
            category="Mental Health",
            image="https://images.unsplash.com/photo-1506126613408-eca07ce68773",
            price_credits=80,
            price_usd=9.99,
            total_modules=3,
            duration="3 days",
            modules=[
                CourseModule(module_id=1, title="Recognizing Anxiety Triggers", duration_minutes=12, content="Learn to identify what triggers your anxiety..."),
            ]
        ),
        Course(
            title="Breaking Out of Loneliness",
            description="Rebuilds connection using therapeutic techniques",
            category="Mental Health",
            image="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f",
            price_credits=150,
            price_usd=19.99,
            total_modules=7,
            duration="7 days",
            modules=[
                CourseModule(module_id=1, title="The Science of Loneliness", duration_minutes=18, content="Understanding loneliness from a therapeutic perspective..."),
            ]
        ),
        Course(
            title="Social Anxiety Toolbox",
            description="CBT and polyvagal tools for overcoming social anxiety",
            category="Mental Health",
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
            price_credits=120,
            price_usd=14.99,
            total_modules=5,
            duration="5 days",
            modules=[
                CourseModule(module_id=1, title="Understanding Social Anxiety", duration_minutes=15, content="What social anxiety is and why it happens..."),
            ]
        ),
        
        # RELATIONSHIPS
        Course(
            title="Boundaries That Don't Break",
            description="Learn to set boundaries, stop people-pleasing, and build authentic relationships",
            category="Relationships",
            image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
            price_credits=150,
            price_usd=19.99,
            total_modules=7,
            duration="7 days",
            modules=[
                CourseModule(module_id=1, title="What Are Healthy Boundaries?", duration_minutes=16, content="Understanding boundaries in relationships..."),
            ]
        ),
        Course(
            title="Attachment Alchemy",
            description="Discover your attachment style and start healing relationship patterns",
            category="Relationships",
            image="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
            price_credits=80,
            price_usd=9.99,
            total_modules=3,
            duration="3 days",
            modules=[
                CourseModule(module_id=1, title="Understanding Attachment Styles", duration_minutes=20, content="Learn about secure, anxious, avoidant, and disorganized attachment..."),
            ]
        ),
        Course(
            title="How to Make Friends as an Adult",
            description="Strategies and scripts for building friendships as an adult",
            category="Relationships",
            image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
            price_credits=120,
            price_usd=14.99,
            total_modules=5,
            duration="5 days",
            modules=[
                CourseModule(module_id=1, title="Why Adult Friendships Are Different", duration_minutes=14, content="Understanding the unique challenges of adult friendships..."),
            ]
        ),
        
        # SELF-GROWTH
        Course(
            title="Purpose Unlocked",
            description="Discover values and create a life direction map",
            category="Self-Growth",
            image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
            price_credits=150,
            price_usd=19.99,
            total_modules=7,
            duration="7 days",
            modules=[
                CourseModule(module_id=1, title="Finding Your Core Values", duration_minutes=18, content="Discover what truly matters to you..."),
            ]
        ),
        Course(
            title="The Confidence Code",
            description="Tools for dismantling imposter syndrome and building inner confidence",
            category="Self-Growth",
            image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            price_credits=80,
            price_usd=9.99,
            total_modules=3,
            duration="3 days",
            modules=[
                CourseModule(module_id=1, title="Understanding Imposter Syndrome", duration_minutes=15, content="What imposter syndrome is and why you feel it..."),
            ]
        ),
        Course(
            title="Confidence Reset Program",
            description="CBT and self-compassion practices to build self-worth",
            category="Self-Growth",
            image="https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
            price_credits=120,
            price_usd=14.99,
            total_modules=5,
            duration="5 days",
            modules=[
                CourseModule(module_id=1, title="The Foundation of Confidence", duration_minutes=17, content="Building confidence from the inside out..."),
            ]
        ),
        
        # MINDFULNESS
        Course(
            title="Present Over Perfect",
            description="Learn to be present and find stillness without sacrificing productivity",
            category="Mindfulness",
            image="https://images.unsplash.com/photo-1506126613408-eca07ce68773",
            price_credits=150,
            price_usd=19.99,
            total_modules=7,
            duration="7 days",
            modules=[
                CourseModule(module_id=1, title="What is Mindfulness?", duration_minutes=14, content="Introduction to mindfulness practices..."),
            ]
        ),
        
        # EMOTIONAL INTELLIGENCE
        Course(
            title="How to Talk to Anyone",
            description="NVC frameworks and social scripts for authentic, natural conversations",
            category="Emotional Intelligence",
            image="https://images.unsplash.com/photo-1551836022-d5d88e9218df",
            price_credits=120,
            price_usd=14.99,
            total_modules=5,
            duration="5 days",
            modules=[
                CourseModule(module_id=1, title="The Art of Conversation", duration_minutes=16, content="Understanding what makes conversations flow..."),
                CourseModule(module_id=2, title="Nonviolent Communication Basics", duration_minutes=20, content="Learn NVC framework for authentic expression..."),
            ]
        ),
    ]
    
    # Clear existing courses
    await db.courses.delete_many({})
    
    # Insert all courses
    for course in courses_data:
        await db.courses.insert_one(course.model_dump())
    
    print(f"✅ Seeded {len(courses_data)} courses across 5 categories:")
    print(f"   • Mental Health: 5 courses")
    print(f"   • Relationships: 3 courses")
    print(f"   • Self-Growth: 3 courses")
    print(f"   • Mindfulness: 1 course")
    print(f"   • Emotional Intelligence: 1 course")

async def main():
    print("🌱 Seeding XelaConnect complete course library...")
    await seed_all_courses()
    print("✨ Course seeding complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
