import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Flame, Users, BookOpen, TrendingUp, MessageCircle, Sparkles, Video } from 'lucide-react';
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
      subtitle: 'Keep going!'
    },
    {
      icon: Users,
      label: 'Connections',
      value: mockDashboardStats.connections,
      color: '#8834AE',
      subtitle: 'Your people'
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: mockDashboardStats.coursesInProgress,
      color: '#207690',
      subtitle: 'Learning'
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
                className="glass-card rounded-2xl p-4 border-0 hover:bg-white/10 smooth-transition cursor-pointer"
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
          </div>
        </div>

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
