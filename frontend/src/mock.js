// Mock data for XelaConnect

export const mockUser = {
  id: 'user-001',
  name: 'Alexandria',
  email: 'alexandria@xelaconnect.com',
  picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  age: 28,
  city: 'San Francisco',
  interests: ['Wellness', 'Fitness', 'Creative', 'Social'],
  identityBadge: 'Connector',
  streak: 7,
  connections: 24,
  emotionalPathProgress: 65,
  credits: 250,
  subscriptionTier: 'premium',
  badges: ['Insightful', 'Connected', 'Early Adopter'],
  referralCode: 'XC8JF02AB1'
};

export const identityBadges = [
  { id: 'connector', name: 'Connector', description: 'Brings people together naturally', emoji: '🤝' },
  { id: 'creator', name: 'Creator', description: 'Expresses through art and innovation', emoji: '🎨' },
  { id: 'thinker', name: 'Thinker', description: 'Loves deep conversations and ideas', emoji: '💭' },
  { id: 'builder', name: 'Builder', description: 'Creates and manifests visions', emoji: '🔨' },
  { id: 'explorer', name: 'Explorer', description: 'Seeks new experiences and adventures', emoji: '🧭' },
  { id: 'visionary', name: 'Visionary', description: 'Sees possibilities others miss', emoji: '🔮' },
  { id: 'calm-presence', name: 'Calm Presence', description: 'Grounds and centers those around', emoji: '🧘' },
  { id: 'funny-friend', name: 'Funny Friend', description: 'Brings joy and laughter', emoji: '😄' },
  { id: 'listener', name: 'Listener', description: 'Holds space for others with empathy', emoji: '👂' },
  { id: 'leader', name: 'Leader', description: 'Guides and inspires action', emoji: '⭐' }
];

export const mockCircles = [
  {
    id: 'circle-001',
    name: 'Mindful Mornings',
    emoji: '🌅',
    category: 'Wellness',
    description: 'Start your day with intention, meditation, and calm reflection',
    members: 142,
    image: 'https://images.unsplash.com/photo-1682278763548-f349e3c73793',
    gradient: 'from-[#39CCB7] to-[#207690]',
    active: true
  },
  {
    id: 'circle-002',
    name: 'Running Club',
    emoji: '👣',
    category: 'Fitness',
    description: 'Connect with fellow runners and explore new trails',
    members: 234,
    image: 'https://images.pexels.com/photos/4534682/pexels-photo-4534682.jpeg',
    gradient: 'from-[#207690] to-[#3240AC]',
    active: true
  },
  {
    id: 'circle-003',
    name: 'Writers & Storytellers',
    emoji: '✍️',
    category: 'Creative',
    description: 'Craft stories, share words, and inspire through writing',
    members: 127,
    image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07',
    gradient: 'from-[#F59E0B] to-[#8834AE]',
    active: true
  },
  {
    id: 'circle-004',
    name: 'Kitchen Table Talks',
    emoji: '☕',
    category: 'Social',
    description: 'Warm conversations over coffee and connection',
    members: 287,
    image: 'https://images.unsplash.com/photo-1625246433906-6cfa33544b31',
    gradient: 'from-[#D97706] to-[#92400E]',
    active: true
  },
  {
    id: 'circle-005',
    name: 'Hiking & Trail Explorers',
    emoji: '⛰️',
    category: 'Outdoor',
    description: 'Explore trails and summit peaks together',
    members: 219,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    gradient: 'from-[#059669] to-[#047857]',
    active: true
  },
  {
    id: 'circle-006',
    name: 'Travel & Wanderlust',
    emoji: '✈️',
    category: 'Lifestyle',
    description: 'Share adventures and discover new destinations',
    members: 245,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    gradient: 'from-[#06B6D4] to-[#0284C7]',
    active: true
  }
];

export const mockCourses = [
  {
    id: 'course-001',
    title: 'Emotional Intelligence Foundations',
    description: 'Build deeper self-awareness and empathy',
    modules: 8,
    duration: '4 weeks',
    progress: 35,
    image: 'https://images.unsplash.com/photo-1759215524566-8aea4761a926',
    category: 'Growth'
  },
  {
    id: 'course-002',
    title: 'Building Meaningful Connections',
    description: 'Learn the art of authentic relationships',
    modules: 6,
    duration: '3 weeks',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1608134225211-dfacaecc0265',
    category: 'Connection'
  },
  {
    id: 'course-003',
    title: 'Mindfulness for Busy Lives',
    description: 'Integrate calm into your daily routine',
    modules: 10,
    duration: '5 weeks',
    progress: 80,
    image: 'https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b',
    category: 'Wellness'
  }
];

export const mockDiscoverPeople = [
  {
    id: 'person-001',
    name: 'Sarah Martinez',
    age: 26,
    city: 'San Francisco',
    picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    interests: ['Wellness', 'Yoga', 'Reading'],
    bio: 'Finding peace in the present moment',
    compatibility: 89
  },
  {
    id: 'person-002',
    name: 'Michael Chen',
    age: 31,
    city: 'Oakland',
    picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    interests: ['Fitness', 'Hiking', 'Photography'],
    bio: 'Exploring the world one trail at a time',
    compatibility: 76
  },
  {
    id: 'person-003',
    name: 'Emma Wilson',
    age: 29,
    city: 'Berkeley',
    picture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300',
    interests: ['Creative', 'Art', 'Music'],
    bio: 'Creating beauty in everyday moments',
    compatibility: 82
  }
];

export const mockActivities = [
  {
    id: 'activity-001',
    type: 'opportunity',
    title: 'New Circle Match',
    description: 'Morning Meditation group is highly aligned with your wellness goals',
    action: 'Join Circle',
    time: '2 hours ago',
    priority: 'high'
  },
  {
    id: 'activity-002',
    type: 'connection',
    title: 'Sarah Martinez viewed your profile',
    description: 'You share 3 common interests',
    action: 'View Profile',
    time: '5 hours ago',
    priority: 'medium'
  },
  {
    id: 'activity-003',
    type: 'insight',
    title: 'Weekly Growth Insight',
    description: 'Your emotional intelligence score increased by 12%',
    action: 'See Details',
    time: '1 day ago',
    priority: 'low'
  }
];

export const mockMessages = [
  {
    id: 'msg-001',
    sender: 'Xela AI',
    content: "Good evening, Alexandria. How are you feeling today?",
    time: '2:34 PM',
    isAI: true
  },
  {
    id: 'msg-002',
    sender: 'User',
    content: "I'm feeling a bit overwhelmed with work lately.",
    time: '2:35 PM',
    isAI: false
  },
  {
    id: 'msg-003',
    sender: 'Xela AI',
    content: "I understand that feeling. Let's explore what might help you find more balance. What part of work feels most overwhelming?",
    time: '2:35 PM',
    isAI: true
  }
];

export const mockDashboardStats = {
  streak: 7,
  connections: 24,
  circlesJoined: 3,
  coursesInProgress: 2,
  emotionalPathProgress: 65,
  weeklyGrowth: 12
};

export const mockDailyMessages = [
  "You showed up — that's enough.",
  "Little interactions add up — you're building something real.",
  "Some days it's hard to connect. You're still doing great.",
  "Your presence matters more than you know.",
  "Even a 10-minute meaningful conversation lowers stress for 24 hours."
];
