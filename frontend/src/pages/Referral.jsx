import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Gift, Copy, Share2, CheckCircle2, Users, Award } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Referral = () => {
  const [copied, setCopied] = useState(false);

  // Mock data - will be replaced with real data from backend
  const referralData = {
    code: 'XC8JF02AB1',
    link: 'https://xelaconnect.app/join/XC8JF02AB1',
    totalReferrals: 7,
    pending: 2,
    converted: 5,
    creditsEarned: 250
  };

  const milestones = [
    { conversions: 1, reward: '50 credits', icon: Gift, completed: true },
    { conversions: 3, reward: '150 credits + badge', icon: Award, completed: true },
    { conversions: 5, reward: '3 months Elite', icon: CheckCircle2, completed: true },
    { conversions: 10, reward: 'Lifetime Elite', icon: Users, completed: false },
    { conversions: 25, reward: 'Founder Badge + Priority', icon: Award, completed: false },
    { conversions: 50, reward: 'Xela Ambassador', icon: Users, completed: false }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralData.link);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join XelaConnect',
        text: 'Connect with real people who understand you. Join me on XelaConnect!',
        url: referralData.link
      });
    } else {
      handleCopy();
    }
  };

  const nextMilestone = milestones.find(m => !m.completed);
  const progressToNext = nextMilestone ? (referralData.converted / nextMilestone.conversions) * 100 : 100;

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="glass-card-light p-6 rounded-3xl">
              <Gift className="w-12 h-12 text-[#39CCB7]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Invite Friends, Earn Rewards
          </h1>
          <p className="text-white/60">
            Share XelaConnect with someone who deserves real connection.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-white mb-1">{referralData.totalReferrals}</div>
            <div className="text-xs text-white/60">Total Referrals</div>
          </Card>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-[#39CCB7] mb-1">{referralData.converted}</div>
            <div className="text-xs text-white/60">Converted</div>
          </Card>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-[#8834AE] mb-1">{referralData.creditsEarned}</div>
            <div className="text-xs text-white/60">Credits Earned</div>
          </Card>
        </div>

        {/* Referral Code Card */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Referral Code</h3>
            
            <div className="glass-card-light rounded-2xl p-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-mono font-bold text-[#39CCB7] tracking-wider">
                  {referralData.code}
                </div>
              </div>
              
              <div className="text-xs text-white/60 mb-3 text-center">
                {referralData.link}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleCopy}
                  className="rounded-xl glass-button text-white hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleShare}
                  className="rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress to Next Milestone */}
        {nextMilestone && (
          <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Next Reward</h3>
                <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                  {referralData.converted}/{nextMilestone.conversions}
                </Badge>
              </div>
              
              <Progress value={progressToNext} className="h-2" />
              
              <div className="flex items-center space-x-3">
                <div className="glass-card-light p-3 rounded-xl">
                  <nextMilestone.icon className="w-5 h-5 text-[#39CCB7]" />
                </div>
                <div>
                  <div className="text-white font-medium">{nextMilestone.reward}</div>
                  <div className="text-sm text-white/60">
                    {nextMilestone.conversions - referralData.converted} more conversions to unlock
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* How It Works */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="glass-card-light p-2 rounded-xl">
                <Share2 className="w-5 h-5 text-[#39CCB7]" />
              </div>
              <div>
                <div className="text-white font-medium">1. Share your link</div>
                <div className="text-sm text-white/60">Send to friends who need connection</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="glass-card-light p-2 rounded-xl">
                <Users className="w-5 h-5 text-[#8834AE]" />
              </div>
              <div>
                <div className="text-white font-medium">2. Friend signs up</div>
                <div className="text-sm text-white/60">They create account and complete profile</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="glass-card-light p-2 rounded-xl">
                <Gift className="w-5 h-5 text-[#207690]" />
              </div>
              <div>
                <div className="text-white font-medium">3. Both get rewards</div>
                <div className="text-sm text-white/60">You both receive 50 credits instantly</div>
              </div>
            </div>
          </div>
        </Card>

        {/* All Milestones */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-semibold text-white">All Rewards</h3>
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            return (
              <Card
                key={idx}
                className={`rounded-2xl p-4 border-0 flex items-center justify-between ${
                  milestone.completed ? 'glass-card' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      background: milestone.completed ? '#39CCB720' : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: milestone.completed ? '#39CCB7' : '#ffffff40' }}
                    />
                  </div>
                  <div>
                    <div className={milestone.completed ? 'text-white' : 'text-white/50'}>
                      {milestone.conversions} conversions
                    </div>
                    <div className="text-sm text-white/60">{milestone.reward}</div>
                  </div>
                </div>
                {milestone.completed && (
                  <CheckCircle2 className="w-5 h-5 text-[#39CCB7]" />
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Referral;
