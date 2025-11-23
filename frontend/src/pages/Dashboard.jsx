import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Flame, Users, BookOpen, TrendingUp, MessageCircle, Sparkles, Video, Heart } from 'lucide-react';
import { mockDashboardStats, mockDailyMessages } from '../mock';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [dailyMessage, setDailyMessage] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Random daily message
    const randomMsg = mockDailyMessages[Math.floor(Math.random() * mockDailyMessages.length)];
    setDailyMessage(randomMsg);
  }, []);

  const stats = [
    {
      icon: Flame,
      label: 'Day Streak',
      value: mockDashboardStats.streak,
      color: '#39CCB7',
      subtitle: 'Keep going!',
      action: () => navigate('/activity')
    },
    {
      icon: Users,
      label: 'Connections',
      value: mockDashboardStats.connections,
      color: '#8834AE',
      subtitle: 'Your people',
      action: () => navigate('/discover')
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: mockDashboardStats.coursesInProgress,
      color: '#207690',
      subtitle: 'Learning',
      action: () => navigate('/courses')
    }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                {greeting}, {user?.name || 'Friend'}
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {dailyMessage}
              </p>
            </div>
            <button
              onClick={() => navigate('/activity')}
              className="glass-card-light p-3 rounded-2xl hover:bg-white/10 smooth-transition"
            >
              <Sparkles className="w-6 h-6 text-[#39CCB7]" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                onClick={stat.action}
                className="glass-card rounded-2xl p-4 border-0 hover:bg-white/10 hover:scale-[1.05] smooth-transition cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: `${stat.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Emotional Growth Card */}
        <Card 
          onClick={() => navigate('/emotional-intelligence')}
          className="glass-card rounded-3xl p-6 border-0 cursor-pointer hover:bg-white/10 hover:scale-[1.02] smooth-transition animate-fade-in-up" 
          style={{ animationDelay: '0.2s' }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Emotional Intelligence Path</h3>
                <p className="text-sm text-white/60 mt-1">
                  You're already growing. Keep trusting the process.
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#39CCB7]" />
            </div>
            <Progress value={mockDashboardStats.emotionalPathProgress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{mockDashboardStats.emotionalPathProgress}% Complete</span>
              <span className="text-[#39CCB7] font-medium">+{mockDashboardStats.weeklyGrowth}% this week</span>
            </div>
          </div>
        </Card>

        {/* XelaTalks Card */}
        <Card
          onClick={() => navigate('/xelatalks')}
          className="glass-card rounded-3xl p-6 border-0 cursor-pointer hover:bg-white/10 smooth-transition animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-start space-x-4">
            <div className="glass-card-light p-3 rounded-2xl">
              <MessageCircle className="w-6 h-6 text-[#8834AE]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Talk with Xela</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Reflect, get motivated, or just chat. Xela's here to listen.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/video-lobby')}
              className="h-20 rounded-2xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
            >
              <Video className="w-6 h-6 mb-2" />
              <span className="text-sm">Video Call</span>
            </Button>
            <Button
              onClick={() => navigate('/community')}
              className="h-20 rounded-2xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">Explore Circles</span>
            </Button>
            <Button
              onClick={() => navigate('/discover')}
              className="h-20 rounded-2xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
            >
              <Sparkles className="w-6 h-6 mb-2" />
              <span className="text-sm">Discover People</span>
            </Button>
            <Button
              onClick={() => navigate('/expand')}
              className="h-20 rounded-2xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              <span className="text-sm">Expand</span>
            </Button>
          </div>
        </div>

        {/* Connection Check-In Section */}
        <Card 
          className="glass-card rounded-3xl overflow-hidden border border-[#39CCB7]/30 animate-fade-in-up relative cursor-pointer hover:scale-[1.01] transition-all" 
          style={{ animationDelay: '0.45s' }}
          onClick={() => navigate('/connection-quiz')}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Connection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#39CCB7]/50 via-[#1a1a2e]/80 to-[#8834AE]/50" />
          </div>
          
          <div className="relative z-10 p-8 space-y-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center mb-4">
                <div className="glass-card-light p-4 rounded-2xl backdrop-blur-xl">
                  <Heart className="w-8 h-8 text-[#39CCB7]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                How Connected Do You Feel?
              </h3>
              <p className="text-white/90 text-base leading-relaxed max-w-lg mx-auto">
                Take our quick 2-minute check-in to understand your connection needs and get personalized recommendations.
              </p>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="glass-card-light rounded-xl p-3 text-center backdrop-blur-xl">
                <div className="text-lg font-bold text-[#39CCB7]">4min</div>
                <div className="text-xs text-white/70">Complete</div>
              </div>
              <div className="glass-card-light rounded-xl p-3 text-center backdrop-blur-xl">
                <div className="text-lg font-bold text-[#39CCB7]">14</div>
                <div className="text-xs text-white/70">Questions</div>
              </div>
              <div className="glass-card-light rounded-xl p-3 text-center backdrop-blur-xl">
                <div className="text-lg font-bold text-[#39CCB7]">4</div>
                <div className="text-xs text-white/70">Dimensions</div>
              </div>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/connection-quiz');
              }}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg text-lg font-bold relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Check-In
              </span>
            </Button>
          </div>
        </Card>

        {/* Gentle Reminder */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Your connections don't need to be many — just meaningful.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
