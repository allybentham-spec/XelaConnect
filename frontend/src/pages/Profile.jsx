import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Settings, LogOut, ChevronRight, User as UserIcon, Shield, Bell, HelpCircle, Gift, ShoppingBag, Sparkles, Award } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { identityBadges } from '../mock';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'See you soon!'
    });
    navigate('/');
  };

  const userIdentityBadge = identityBadges.find(b => b.name === user?.identityBadge);

  const menuItems = [
    {
      icon: Gift,
      label: 'Referral Program',
      description: 'Invite friends, earn rewards',
      action: () => navigate('/referral'),
      highlight: true
    },
    {
      icon: ShoppingBag,
      label: 'Store',
      description: `${user?.credits || 0} credits available`,
      action: () => navigate('/store'),
      highlight: true
    },
    {
      icon: UserIcon,
      label: 'Edit Profile',
      description: 'Update your information',
      action: () => toast({ title: 'Coming soon', description: 'Profile editing will be available soon' })
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage your preferences',
      action: () => toast({ title: 'Coming soon', description: 'Notification settings will be available soon' })
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      description: 'You\'re in control of what you share',
      action: () => toast({ title: 'Coming soon', description: 'Privacy settings will be available soon' })
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'We\'re here to help',
      action: () => toast({ title: 'Coming soon', description: 'Support will be available soon' })
    }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Profile Header */}
        <Card className="glass-card rounded-3xl p-8 border-0 text-center animate-fade-in-up">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#39CCB7]/20">
                <img
                  src={user?.picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                  alt={user?.name || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 glass-card-light p-2 rounded-full">
                <Settings className="w-4 h-4 text-[#39CCB7]" />
              </div>
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {user?.name || 'Guest User'}
              </h1>
              <p className="text-white/60 text-sm">
                {user?.email || 'guest@xelaconnect.com'}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-xs text-white/60">Connections</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-white/60">Circles</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">7</div>
                <div className="text-xs text-white/60">Day Streak</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Identity Badge */}
        {userIdentityBadge && (
          <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{userIdentityBadge.emoji}</div>
              <div className="flex-1">
                <div className="text-sm text-white/60 mb-1">Connection Identity</div>
                <h3 className="text-xl font-semibold text-white mb-1">{userIdentityBadge.name}</h3>
                <p className="text-sm text-white/70">{userIdentityBadge.description}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Badges & Achievements */}
        {user?.badges && user.badges.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-lg font-semibold text-white mb-3">Achievements</h2>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  className="glass-card-light border-0 text-white px-4 py-2 flex items-center space-x-2"
                >
                  <Award className="w-4 h-4 text-[#39CCB7]" />
                  <span>{badge}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold text-white mb-3">Your Interests</h2>
          <div className="flex flex-wrap gap-2">
            {(user?.interests || ['Wellness', 'Fitness', 'Creative']).map((interest, idx) => (
              <Badge
                key={idx}
                className="glass-card-light border-0 text-white px-4 py-2"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Credits Display */}
        {user?.credits !== undefined && (
          <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="glass-card-light p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-[#39CCB7]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Your Credits</div>
                  <div className="text-2xl font-bold text-white">{user.credits}</div>
                </div>
              </div>
              <Button
                onClick={() => navigate('/store')}
                className="rounded-xl glass-button text-white hover:bg-white/10"
              >
                Get More
              </Button>
            </div>
          </Card>
        )}

        {/* Menu Items */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                onClick={item.action}
                className={`rounded-2xl p-4 border-0 hover:bg-white/10 smooth-transition cursor-pointer ${
                  item.highlight ? 'glass-card ring-1 ring-[#39CCB7]/30' : 'glass-card'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    item.highlight ? 'bg-gradient-to-br from-[#39CCB7]/20 to-[#8834AE]/20' : 'glass-card-light'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      item.highlight ? 'text-[#39CCB7]' : 'text-[#39CCB7]'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.label}</h3>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 rounded-2xl glass-button text-white border-white/20 hover:bg-white/10 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* Bottom Message */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            How you show up matters more than the details.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
