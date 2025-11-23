import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Heart,
  Shield,
  CheckCircle2,
  Trophy,
  Sparkles,
  Calendar,
  Target,
  Flag,
  Lock,
  Globe,
  Settings,
  MoreVertical,
  Search,
  Filter,
  Star
} from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { circlesAPI } from '../utils/api';

const CircleDetail = () => {
  const { circleId } = useParams();
  const navigate = useNavigate();
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [alignmentFilter, setAlignmentFilter] = useState('all');

  // Mock data - in production, fetch from API
  const mockCircleData = {
    id: circleId,
    name: "Golden Energy",
    tagline: "Cultivate vitality through community & intention",
    mission: "This circle is for people who want to cultivate vitality, joy, and life force energy through community, movement, and intention.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    members_count: 847,
    activity_level: "Very Active",
    values: [
      "Respect",
      "Reflection", 
      "Emotional Safety",
      "Non-judgment",
      "Authenticity",
      "Privacy"
    ],
    benefits: [
      "Weekly activities & challenges",
      "Group discussions & support",
      "Connection prompts",
      "Shared wins & celebrations",
      "Emotional support circle",
      "Mini wellness challenges"
    ],
    weekly_activity: {
      title: "5-Minute Grounding Practice",
      description: "This week's challenge: Practice grounding for 5 minutes each morning",
      type: "Mindfulness",
      participants: 234
    },
    moderator: {
      name: "Alexandria Rose",
      title: "Circle Guide",
      bio: "Creating spaces for authentic connection and emotional wellness",
      avatar: null
    },
    members: [
      {
        id: 1,
        name: "Sarah M.",
        location: "Miami, FL",
        age_range: "25-30",
        alignment_score: 95,
        alignment_label: "Highly Aligned",
        bio: "Seeking genuine friendships focused on personal growth and emotional awareness",
        connection_goals: ["Friendship", "Support", "Growth"],
        energy_type: "Calm & Reflective",
        social_bandwidth: "Weekly",
        communication_style: "Long Messages",
        emotional_needs: ["Support", "Belonging"],
        shared_interests: ["Mindful movement", "Intentional friendships", "Calm communication"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
      },
      {
        id: 2,
        name: "Marcus T.",
        location: "Austin, TX",
        age_range: "28-35",
        alignment_score: 88,
        alignment_label: "Highly Aligned",
        bio: "Building authentic connections after years of isolation",
        connection_goals: ["Friendship", "Accountability"],
        energy_type: "Outgoing & Warm",
        social_bandwidth: "Daily",
        communication_style: "Voice Notes",
        emotional_needs: ["Accountability", "Healing"],
        shared_interests: ["Personal growth", "Vulnerability", "Community building"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
      },
      {
        id: 3,
        name: "Priya K.",
        location: "Seattle, WA",
        age_range: "30-35",
        alignment_score: 82,
        alignment_label: "Moderately Aligned",
        bio: "Exploring new connections while honoring my introverted nature",
        connection_goals: ["Growth", "Support"],
        energy_type: "Soft & Introspective",
        social_bandwidth: "Occasional",
        communication_style: "Text",
        emotional_needs: ["Support", "Understanding"],
        shared_interests: ["Journaling", "Quiet connection", "Emotional intelligence"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
      }
    ],
    discussion_threads: [
      { id: 1, title: "Welcome Thread", posts: 234, latest: "2 min ago" },
      { id: 2, title: "Introductions", posts: 847, latest: "5 min ago" },
      { id: 3, title: "Weekly Check-In", posts: 156, latest: "10 min ago" },
      { id: 4, title: "Wins of the Week", posts: 89, latest: "1 hour ago" },
      { id: 5, title: "Support Corner", posts: 112, latest: "2 hours ago" }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCircle(mockCircleData);
      setLoading(false);
    }, 1000);
  }, [circleId]);

  const getAlignmentColor = (score) => {
    if (score >= 90) return 'text-[#39CCB7]';
    if (score >= 75) return 'text-[#8834AE]';
    return 'text-white/60';
  };

  const filteredMembers = circle?.members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (alignmentFilter === 'high') return matchesSearch && member.alignment_score >= 85;
    if (alignmentFilter === 'moderate') return matchesSearch && member.alignment_score < 85;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39CCB7]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/community')}
          className="text-white hover:bg-white/10 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Circles
        </Button>

        {/* Circle Header */}
        <Card className="glass-card rounded-3xl overflow-hidden border-0">
          <div className="relative h-48">
            <img
              src={circle.image}
              alt={circle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Badge className="mb-3 bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                {circle.activity_level}
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {circle.name}
              </h1>
              <p className="text-white/80 text-lg italic">{circle.tagline}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/70">
                  <Users className="w-5 h-5" />
                  <span>{circle.members_count} members</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE]">
                <Settings className="w-4 h-4 mr-2" />
                Circle Settings
              </Button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-2 border-b border-white/10">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'discussions', label: 'Discussions', icon: MessageCircle },
                { id: 'activities', label: 'Activities', icon: Sparkles }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#39CCB7] text-white'
                      : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.slice(0, 8)}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Mission */}
            <Card className="glass-card rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Circle Mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {circle.mission}
              </p>
            </Card>

            {/* What You'll Get */}
            <Card className="glass-card rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Get in This Circle</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {circle.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#39CCB7] flex-shrink-0 mt-0.5" />
                    <p className="text-white/80">{benefit}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Circle Values */}
            <Card className="glass-card rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-bold text-white mb-6">Circle Values</h2>
              <div className="flex flex-wrap gap-3">
                {circle.values.map((value, idx) => (
                  <Badge
                    key={idx}
                    className="glass-card-light border-0 text-white px-4 py-2 text-base"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Circle Guide */}
            <Card className="glass-card rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-bold text-white mb-6">Circle Guide</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center text-white font-semibold text-2xl">
                  {circle.moderator.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg">{circle.moderator.name}</p>
                  <p className="text-[#39CCB7] text-sm mb-2">{circle.moderator.title}</p>
                  <p className="text-white/70 text-sm">{circle.moderator.bio}</p>
                </div>
                <Button className="glass-button">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Guide
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="glass-card rounded-3xl p-6 border-0">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[#39CCB7] outline-none"
                  />
                </div>
                <select
                  value={alignmentFilter}
                  onChange={(e) => setAlignmentFilter(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:bg-white/10 focus:border-[#39CCB7] outline-none"
                >
                  <option value="all">All Alignments</option>
                  <option value="high">Highly Aligned</option>
                  <option value="moderate">Moderately Aligned</option>
                </select>
              </div>
            </Card>

            {/* Members Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <Card
                  key={member.id}
                  className="glass-card rounded-3xl p-6 border-0 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => {/* TODO: Open member profile modal */}}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                        <Badge className={`${getAlignmentColor(member.alignment_score)} bg-white/10 border-0`}>
                          {member.alignment_score}% Match
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm mb-2">
                        {member.location} • {member.age_range}
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                      
                      {/* Alignment Label */}
                      <div className="mt-3 flex items-center space-x-2">
                        <Star className={`w-4 h-4 ${getAlignmentColor(member.alignment_score)}`} />
                        <span className={`text-sm ${getAlignmentColor(member.alignment_score)}`}>
                          {member.alignment_label}
                        </span>
                      </div>

                      {/* Quick Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {member.connection_goals.slice(0, 2).map((goal, idx) => (
                          <Badge key={idx} className="bg-[#39CCB7]/20 text-[#39CCB7] border-0 text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: 'Message sent!', description: `Started conversation with ${member.name}` });
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-[#39CCB7] to-[#8834AE]"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {circle.discussion_threads.map((thread) => (
              <Card
                key={thread.id}
                onClick={() => navigate(`/circles/${circleId}/thread/${thread.id}`)}
                className="glass-card rounded-3xl p-6 border-0 hover:bg-white/10 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{thread.title}</h3>
                    <p className="text-white/60 text-sm">
                      {thread.posts} posts • Last activity {thread.latest}
                    </p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-[#39CCB7]" />
                </div>
              </Card>
            ))}
            
            {/* Create New Thread Button */}
            <Card
              onClick={() => {/* TODO: Open create thread modal */}}
              className="glass-card rounded-3xl p-6 border-2 border-dashed border-white/20 hover:border-[#39CCB7]/50 hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-3 text-white/60 hover:text-[#39CCB7] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Start a New Discussion</span>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'activities' && (
          <Card className="glass-card rounded-3xl p-8 border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">This Week's Activity</h2>
              <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                {circle.weekly_activity.participants} participating
              </Badge>
            </div>
            
            <div className="glass-card rounded-2xl p-6 mb-6">
              <Badge className="mb-3 bg-[#8834AE]/20 text-[#8834AE] border-0">
                {circle.weekly_activity.type}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-3">
                {circle.weekly_activity.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {circle.weekly_activity.description}
              </p>
            </div>

            <Button className="w-full bg-gradient-to-r from-[#39CCB7] to-[#8834AE] py-6 text-lg">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CircleDetail;
