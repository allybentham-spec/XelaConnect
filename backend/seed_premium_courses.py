"""
Premium Course Content Seeder for XelaConnect
Creates transformative, high-quality courses with detailed curriculum
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get('MONGO_URL')

# Premium Course Data
PREMIUM_COURSES = [
    {
        "id": "loneliness-detox-premium",
        "title": "The Loneliness Detox: Reclaim Your Connection",
        "tagline": "Transform isolation into authentic belonging",
        "description": "A 6-week transformative journey to heal from chronic loneliness, rebuild your capacity for connection, and create meaningful relationships that last.",
        "category": "Emotional Intelligence",
        "price": "$97",
        "price_usd": 97,
        "original_price": "$197",
        "instructor": "Dr. Sarah Chen",
        "instructor_bio": "Clinical Psychologist specializing in attachment theory and social neuroscience. 15+ years helping people overcome isolation.",
        "duration": "6 weeks",
        "total_modules": 6,
        "total_lessons": 32,
        "video_hours": "8.5 hours",
        "enrolled": 3847,
        "rating": 4.9,
        "reviews": 892,
        "image": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
        "gradient": "from-[#39CCB7] to-[#207690]",
        "outcomes": [
            "Understand the neuroscience of loneliness and why it feels so painful",
            "Identify and heal your specific attachment patterns",
            "Build genuine confidence in social situations without pretending",
            "Create a personalized connection strategy that fits your personality",
            "Develop the courage to be vulnerable in safe, reciprocal relationships",
            "Transform fear of rejection into curiosity about connection"
        ],
        "preview_modules": [0, 1],  # Modules 0 and 1 are free preview
        "modules": [
            {
                "title": "Week 1: Understanding Your Loneliness Story",
                "description": "Explore the roots of your isolation and begin rewriting your relationship narrative",
                "duration": "1.5 hours",
                "lessons": [
                    {
                        "id": "ld_m1_l1",
                        "title": "The Science of Loneliness: Why It Hurts So Much",
                        "description": "Discover how loneliness impacts your brain, body, and decision-making",
                        "duration": "18 min",
                        "type": "video",
                        "is_preview": True,
                        "content": """Welcome to The Loneliness Detox. I'm Dr. Sarah Chen, and I want to start by saying something important: your loneliness is not your fault.

Loneliness is one of the most misunderstood human experiences. Society tells us it's a character flaw, that we're 'too needy' or 'not trying hard enough.' But neuroscience tells us a different story.

**The Biology of Loneliness**

Your brain treats loneliness the same way it treats physical pain. When you feel isolated, your anterior cingulate cortex lights up—the same region activated when you touch a hot stove. This isn't weakness. This is survival programming.

For 200,000 years, humans survived because we stayed together. Being excluded from the tribe meant death. Your nervous system still operates on this ancient code.

**What Chronic Loneliness Does to You:**

1. **Hypervigilance**: Your brain becomes oversensitive to social threats. You scan for rejection even where it doesn't exist.

2. **Cognitive Distortion**: You start believing 'everyone has friends but me' and 'I'm fundamentally unlikeable.' These are survival thoughts, not truth.

3. **Emotional Numbing**: To protect yourself from pain, you withdraw. But this creates the very isolation you fear.

4. **Physical Health Impact**: Chronic loneliness increases cortisol, weakens your immune system, and affects heart health as much as smoking 15 cigarettes per day.

**The Loneliness Loop**

Loneliness → Hypervigilance → Misreading social cues → Withdrawal → More loneliness

This course will help you break this cycle. Not by 'being more social,' but by healing the root wounds that keep you trapped.

**Your Assignment:**
Write down your loneliness story. When did it start? What happened? No judgment—just observation.""",
                        "key_takeaways": [
                            "Loneliness is a biological signal, not a character flaw",
                            "Your brain's hypervigilance is trying to protect you",
                            "Chronic isolation rewires your perception of social situations",
                            "Breaking the cycle requires healing, not just 'putting yourself out there'"
                        ],
                        "resources": [
                            {"name": "Loneliness Science Research Summary", "type": "PDF", "size": "2.1 MB"},
                            {"name": "Your Loneliness Timeline Worksheet", "type": "PDF", "size": "850 KB"}
                        ]
                    },
                    {
                        "id": "ld_m1_l2",
                        "title": "Attachment Styles: Why Connection Feels Impossible",
                        "description": "Identify your attachment pattern and how it shapes every relationship",
                        "duration": "22 min",
                        "type": "video",
                        "is_preview": True,
                        "content": """Your relationship patterns aren't random. They're based on attachment styles formed in your first relationships.

**The Four Attachment Styles:**

**1. Secure Attachment (50% of people)**
- Comfortable with intimacy and independence
- Trust comes naturally
- Can communicate needs without fear

**2. Anxious Attachment (20%)**
- Crave closeness but fear abandonment
- Overthink texts and social cues
- Feel like you love more than others love you back

**3. Avoidant Attachment (25%)**
- Value independence above connection
- Uncomfortable with vulnerability
- Pull away when people get too close

**4. Disorganized Attachment (5%)**
- Want connection but fear it simultaneously
- Push-pull dynamic in relationships
- Often stems from early trauma

**Your Attachment and Loneliness**

If you're anxious: You might chase connection so desperately that you push people away.

If you're avoidant: You might isolate to feel safe, then wonder why you're alone.

The good news? Attachment styles can change. This is called "earned secure attachment," and it's what we're building together.

**Reflection Exercise:**
Which attachment style resonates most? Write about a recent interaction that shows this pattern.""",
                        "key_takeaways": [
                            "Your attachment style predicts how you form (or avoid) connections",
                            "Anxious and avoidant styles both lead to loneliness—just differently",
                            "Attachment patterns can be rewired with awareness and practice",
                            "Understanding your pattern is the first step to freedom"
                        ]
                    },
                    {
                        "id": "ld_m1_l3",
                        "title": "The Myths That Keep You Stuck",
                        "description": "Dismantle the false beliefs about connection that block your path",
                        "duration": "16 min",
                        "type": "video",
                        "is_preview": False,
                        "content": """Let's identify the lies your loneliness tells you—and replace them with truth.

**Myth 1: "Everyone else has it figured out"**
Reality: 52% of adults experience loneliness weekly. The people who look most connected often feel most alone.

**Myth 2: "I'm too broken/damaged/weird to be loved"**
Reality: Your perceived flaws are often what make you relatable. Vulnerability is magnetic.

**Myth 3: "If I just get out more, I'll feel less lonely"**
Reality: You can be surrounded by people and feel profoundly alone. Quality > quantity.

**Myth 4: "Real friends happen naturally—trying is desperate"**
Reality: ALL relationships require intentional effort. There's no shame in trying.

**Myth 5: "It's too late for me"**
Reality: Neuroplasticity means your brain can form new relationship patterns at any age.

**Exercise: Myth Buster Journal**
Write down every negative belief you hold about connection. Then ask: "Is this objectively true, or is this my loneliness speaking?" """
                    },
                    {
                        "id": "ld_m1_l4",
                        "title": "Creating Your Connection Vision",
                        "description": "Define what meaningful connection actually means for YOU",
                        "duration": "14 min",
                        "type": "video",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m1_l5",
                        "title": "The Self-Compassion Foundation",
                        "description": "Learn to be your own safe place before seeking it in others",
                        "duration": "20 min",
                        "type": "guided_practice",
                        "is_preview": False
                    }
                ]
            },
            {
                "title": "Week 2: Rebuilding Your Social Confidence",
                "description": "Overcome anxiety and develop genuine presence in relationships",
                "duration": "2 hours",
                "lessons": [
                    {
                        "id": "ld_m2_l1",
                        "title": "Social Anxiety vs. Introversion: Know the Difference",
                        "description": "Understand what you're actually dealing with",
                        "duration": "15 min",
                        "type": "video",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m2_l2",
                        "title": "The Art of Small Talk (When You Hate Small Talk)",
                        "description": "Strategies for meaningful conversation without draining yourself",
                        "duration": "19 min",
                        "type": "video",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m2_l3",
                        "title": "Body Language Basics: Appearing Approachable",
                        "description": "Non-verbal cues that invite connection",
                        "duration": "12 min",
                        "type": "video",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m2_l4",
                        "title": "Exposure Therapy for Social Situations",
                        "description": "Gradually expand your comfort zone with science-backed techniques",
                        "duration": "25 min",
                        "type": "workshop",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m2_l5",
                        "title": "Rejection Resilience Training",
                        "description": "Build immunity to the fear that paralyzes you",
                        "duration": "18 min",
                        "type": "interactive",
                        "is_preview": False
                    },
                    {
                        "id": "ld_m2_l6",
                        "title": "Practice Session: Low-Stakes Conversations",
                        "description": "Real scenarios with feedback",
                        "duration": "30 min",
                        "type": "practice",
                        "is_preview": False
                    }
                ]
            },
            {
                "title": "Week 3: Strategic Connection Building",
                "description": "Where and how to meet people who actually match your energy",
                "duration": "1.8 hours",
                "lessons": [
                    {
                        "id": "ld_m3_l1",
                        "title": "Your Friendship Style Assessment",
                        "description": "Identify what kind of connections you naturally thrive in",
                        "duration": "20 min",
                        "type": "assessment"
                    },
                    {
                        "id": "ld_m3_l2",
                        "title": "Finding Your People: Where to Look",
                        "description": "Strategic places to meet compatible humans",
                        "duration": "22 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m3_l3",
                        "title": "The 3-Touch Rule for Deepening Acquaintances",
                        "description": "How to turn surface connections into real friendships",
                        "duration": "17 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m3_l4",
                        "title": "Initiation Without Desperation",
                        "description": "How to reach out first without feeling needy",
                        "duration": "15 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m3_l5",
                        "title": "Digital Connection Strategies",
                        "description": "Using apps and online communities authentically",
                        "duration": "13 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m3_l6",
                        "title": "Creating Your Connection Action Plan",
                        "description": "Personalized weekly strategy",
                        "duration": "21 min",
                        "type": "workbook"
                    }
                ]
            },
            {
                "title": "Week 4: The Vulnerability Advantage",
                "description": "Transform your fear of being seen into your greatest strength",
                "duration": "1.9 hours",
                "lessons": [
                    {
                        "id": "ld_m4_l1",
                        "title": "Why Vulnerability Is Magnetic",
                        "description": "The science of authentic connection",
                        "duration": "18 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m4_l2",
                        "title": "Safe vs. Unsafe People: Reading the Room",
                        "description": "Who deserves your vulnerability",
                        "duration": "20 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m4_l3",
                        "title": "The Vulnerability Ladder",
                        "description": "Gradual disclosure that builds trust",
                        "duration": "16 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m4_l4",
                        "title": "Sharing Your Story Without Over-Sharing",
                        "description": "Finding the balance",
                        "duration": "19 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m4_l5",
                        "title": "Responding to Vulnerability in Others",
                        "description": "How to hold space for people",
                        "duration": "14 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m4_l6",
                        "title": "Practice: The 36 Questions Exercise",
                        "description": "Fast-track intimacy through structured sharing",
                        "duration": "35 min",
                        "type": "practice"
                    }
                ]
            },
            {
                "title": "Week 5: Maintaining Relationships That Last",
                "description": "The unsexy but essential work of keeping connections alive",
                "duration": "1.7 hours",
                "lessons": [
                    {
                        "id": "ld_m5_l1",
                        "title": "Why Friendships Fade (And How to Prevent It)",
                        "duration": "17 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m5_l2",
                        "title": "The Maintenance Minimum: How Much Effort Is Enough?",
                        "duration": "15 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m5_l3",
                        "title": "Conflict in Connection: Fighting Without Losing",
                        "duration": "22 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m5_l4",
                        "title": "When to Let Go: Recognizing One-Sided Relationships",
                        "duration": "19 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m5_l5",
                        "title": "Building Rituals of Connection",
                        "duration": "13 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m5_l6",
                        "title": "Your Relationship Maintenance System",
                        "duration": "18 min",
                        "type": "workbook"
                    }
                ]
            },
            {
                "title": "Week 6: Integration & Lifelong Connection",
                "description": "Cementing your new patterns and planning for the future",
                "duration": "1.5 hours",
                "lessons": [
                    {
                        "id": "ld_m6_l1",
                        "title": "Reviewing Your Transformation",
                        "duration": "15 min",
                        "type": "reflection"
                    },
                    {
                        "id": "ld_m6_l2",
                        "title": "Creating Your Support Network Map",
                        "duration": "20 min",
                        "type": "workshop"
                    },
                    {
                        "id": "ld_m6_l3",
                        "title": "Loneliness Relapse Prevention",
                        "duration": "18 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m6_l4",
                        "title": "Becoming a Safe Person for Others",
                        "duration": "16 min",
                        "type": "video"
                    },
                    {
                        "id": "ld_m6_l5",
                        "title": "Your 90-Day Connection Commitment",
                        "duration": "12 min",
                        "type": "planning"
                    },
                    {
                        "id": "ld_m6_l6",
                        "title": "Graduation & Next Steps",
                        "duration": "10 min",
                        "type": "video"
                    }
                ]
            }
        ],
        "bonuses": [
            "Private community access for course graduates",
            "Monthly live Q&A sessions with Dr. Chen",
            "Connection accountability partner matching",
            "Lifetime access to course updates",
            "Downloadable workbook (120 pages)",
            "Guided meditation audio library"
        ],
        "testimonials": [
            {
                "name": "Marcus T.",
                "text": "I was lonely for 8 years. This course didn't just give me friends—it gave me back my humanity.",
                "rating": 5
            },
            {
                "name": "Priya S.",
                "text": "Dr. Chen understands loneliness in a way nobody else does. Week 4 on vulnerability changed everything.",
                "rating": 5
            }
        ]
    },
    {
        "id": "emotional-intelligence-mastery",
        "title": "Emotional Intelligence Mastery: Lead with Heart",
        "tagline": "From emotional chaos to confident clarity",
        "description": "Master the #1 predictor of success: your ability to understand, manage, and leverage emotions in yourself and others.",
        "category": "Emotional Intelligence",
        "price": "$127",
        "price_usd": 127,
        "original_price": "$247",
        "instructor": "Maya Rodriguez",
        "instructor_bio": "Executive coach and EQ specialist. Former Google People Analytics lead. Trained 10,000+ professionals.",
        "duration": "8 weeks",
        "total_modules": 8,
        "total_lessons": 42,
        "video_hours": "12 hours",
        "enrolled": 5691,
        "rating": 4.8,
        "reviews": 1203,
        "image": "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800",
        "gradient": "from-[#8834AE] to-[#39CCB7]",
        "preview_modules": [0],
        "outcomes": [
            "Identify and name your emotions with precision",
            "Regulate emotional responses in high-stress situations",
            "Read and influence the emotional states of others",
            "Build teams and relationships with emotional intelligence",
            "Navigate conflict without losing yourself",
            "Use emotions as data for better decision-making"
        ],
        "modules": [
            {
                "title": "Module 1: The EQ Foundation",
                "description": "What emotional intelligence actually is (and isn't)",
                "duration": "90 min",
                "lessons": [
                    {"id": "eq_m1_l1", "title": "The 4 Pillars of Emotional Intelligence", "duration": "20 min", "is_preview": True},
                    {"id": "eq_m1_l2", "title": "Why IQ Isn't Enough", "duration": "15 min", "is_preview": True},
                    {"id": "eq_m1_l3", "title": "Your EQ Baseline Assessment", "duration": "25 min", "is_preview": False},
                    {"id": "eq_m1_l4", "title": "The Neuroscience of Emotions", "duration": "18 min", "is_preview": False},
                    {"id": "eq_m1_l5", "title": "Common EQ Myths Debunked", "duration": "12 min", "is_preview": False}
                ]
            }
        ]
    },
    {
        "id": "boundary-mastery",
        "title": "Boundary Mastery: Protect Your Peace",
        "tagline": "Say no without guilt, yes without resentment",
        "description": "Learn to set, communicate, and maintain boundaries that honor your needs without damaging relationships.",
        "category": "Self-Growth",
        "price": "$67",
        "price_usd": 67,
        "original_price": "$127",
        "instructor": "Dr. James Liu",
        "instructor_bio": "Family therapist and author of 'The Boundary Blueprint.' 20 years clinical experience.",
        "duration": "4 weeks",
        "total_modules": 4,
        "total_lessons": 24,
        "video_hours": "6 hours",
        "enrolled": 4128,
        "rating": 4.9,
        "reviews": 981,
        "image": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
        "gradient": "from-[#207690] to-[#39CCB7]",
        "preview_modules": [0],
        "outcomes": [
            "Identify where you need boundaries in your life",
            "Communicate limits clearly and compassionately",
            "Handle boundary violations without escalating",
            "Overcome guilt and people-pleasing patterns",
            "Maintain boundaries with difficult people",
            "Build relationships based on mutual respect"
        ]
    }
]

async def seed_premium_courses():
    """Seed the database with premium courses"""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.xelaconnect
    
    # Clear existing courses
    await db.courses.delete_many({})
    
    # Insert premium courses
    for course in PREMIUM_COURSES:
        await db.courses.insert_one(course)
    
    print(f"✅ Seeded {len(PREMIUM_COURSES)} premium courses")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_premium_courses())
