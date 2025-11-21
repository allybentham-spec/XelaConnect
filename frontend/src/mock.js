// Mock data for XelaConnect

export const mockUser = {
  id: 'user-001',
  name: 'Alexandria',
  email: 'alexandria@xelaconnect.com',
  picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  age: 28,
  city: 'San Francisco',
  interests: ['Wellness', 'Fitness', 'Creative', 'Social'],
  streak: 7,
  connections: 24,
  emotionalPathProgress: 65
};

export const mockCircles = [
  {
    id: 'circle-001',
    name: 'Mindful Mornings',
    category: 'Wellness',
    description: 'Start your day with intention and calm',
    members: 142,
    image: 'https://images.unsplash.com/photo-1682278763548-f349e3c73793',
    active: true,
    color: '#39CCB7'
  },
  {
    id: 'circle-002',
    name: 'Running Club',
    category: 'Fitness',
    description: 'Connect with fellow runners in your area',
    members: 89,
    image: 'https://images.pexels.com/photos/4534682/pexels-photo-4534682.jpeg',
    active: true,
    color: '#207690'
  },
  {
    id: 'circle-003',
    name: 'Creative Writers',
    category: 'Creative',
    description: 'Share stories, poems, and creative expression',
    members: 67,
    image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07',
    active: false,
    color: '#8834AE'
  },
  {
    id: 'circle-004',
    name: 'Coffee & Connection',
    category: 'Social',
    description: 'Meet new people over coffee and conversation',
    members: 203,
    image: 'https://images.unsplash.com/photo-1625246433906-6cfa33544b31',
    active: true,
    color: '#6AAD73'
  },
  {
    id: 'circle-005',
    name: 'Yoga Flow',
    category: 'Wellness',
    description: 'Find your balance and inner peace',
    members: 156,
    image: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851',
    active: true,
    color: '#39CCB7'
  },
  {
    id: 'circle-006',
    name: 'Art Collective',
    category: 'Creative',
    description: 'Visual artists connecting and collaborating',
    members: 94,
    image: 'https://images.pexels.com/photos/34803285/pexels-photo-34803285.jpeg',
    active: false,
    color: '#3240AC'
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
