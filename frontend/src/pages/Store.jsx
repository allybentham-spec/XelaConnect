import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, Zap, Eye, MapPin, TrendingUp, Crown, Target, Heart } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Store = () => {
  const navigate = useNavigate();
  const userCredits = 250; // Mock data - will come from backend

  const handlePurchase = (item) => {
    toast({
      title: 'Purchase Successful',
      description: `You've purchased ${item.name}`
    });
  };

  const powerUps = [
    {
      name: 'Profile Boost',
      description: '3x visibility for 24 hours',
      icon: TrendingUp,
      credits: 30,
      usd: 2.99,
      color: '#39CCB7',
      popular: true
    },
    {
      name: 'Super Boost',
      description: '10x visibility for 48 hours',
      icon: Zap,
      credits: 80,
      usd: 7.99,
      color: '#8834AE',
      popular: false
    },
    {
      name: 'Extra AI Sessions',
      description: '10 additional XelaTalks sessions',
      icon: Sparkles,
      credits: 20,
      usd: 1.99,
      color: '#207690',
      popular: false
    },
    {
      name: 'Stealth Mode',
      description: 'Browse profiles privately for 7 days',
      icon: Eye,
      credits: 60,
      usd: 5.99,
      color: '#6AAD73',
      popular: false
    },
    {
      name: 'Extended Reach',
      description: 'Visible in 5+ additional cities',
      icon: MapPin,
      credits: 130,
      usd: 12.99,
      color: '#3240AC',
      popular: false
    },
    {
      name: 'Priority Matching',
      description: 'Get matched faster for 14 days',
      icon: Target,
      credits: 45,
      usd: 4.49,
      color: '#39CCB7',
      popular: false
    },
    {
      name: 'Connection Bundle',
      description: '50 extra connection requests',
      icon: Heart,
      credits: 100,
      usd: 9.99,
      color: '#8834AE',
      popular: false
    },
    {
      name: 'Premium Badge',
      description: 'Stand out with a premium badge for 30 days',
      icon: Crown,
      credits: 150,
      usd: 14.99,
      color: '#207690',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Power-Ups Store
              </h1>
              <p className="text-white/70">Boost your profile and accelerate your connections</p>
            </div>
            <Badge className="glass-card-light border-0 text-white px-5 py-3 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              {userCredits} credits
            </Badge>
          </div>

          {/* Subscription CTA Banner */}
          <Card 
            onClick={() => navigate('/subscription')}
            className="glass-card rounded-2xl p-6 border border-[#39CCB7]/30 cursor-pointer hover:scale-[1.01] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#39CCB7]/10 to-[#8834AE]/10" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="glass-card-light p-3 rounded-xl">
                  <Crown className="w-6 h-6 text-[#39CCB7]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Want Unlimited Access?</h3>
                  <p className="text-white/60 text-sm">Check out our Premium & Elite subscriptions</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90">
                View Plans
              </Button>
            </div>
          </Card>
        </div>

        {/* Power-Ups Grid */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Available Power-Ups</h2>
            <button 
              onClick={() => navigate('/subscription')}
              className="text-[#39CCB7] hover:text-[#39CCB7]/80 text-sm font-medium"
            >
              Many included in Premium →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {powerUps.map((powerUp, idx) => {
              const Icon = powerUp.icon;
              return (
                <Card 
                  key={idx} 
                  className={`glass-card rounded-3xl p-6 border-0 hover:bg-white/5 transition-all ${
                    powerUp.popular ? 'ring-2 ring-[#39CCB7]/50' : ''
                  }`}
                >
                  {powerUp.popular && (
                    <Badge className="absolute top-4 right-4 bg-[#39CCB7]/20 text-[#39CCB7] border-0 text-xs">
                      Popular
                    </Badge>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className="p-4 rounded-2xl flex-shrink-0"
                        style={{ background: `${powerUp.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: powerUp.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{powerUp.name}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{powerUp.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <div className="text-white/60 text-xs mb-1">Price</div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-white font-bold text-xl">${powerUp.usd}</span>
                          <span className="text-white/50 text-sm">or {powerUp.credits} credits</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handlePurchase(powerUp)}
                        className={`h-11 px-6 rounded-xl font-semibold ${
                          powerUp.popular
                            ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90'
                            : 'glass-button text-white hover:bg-white/10'
                        }`}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Credits Info */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start space-x-4">
            <div className="glass-card-light p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-[#39CCB7]" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">How Credits Work</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Purchase credits to use across all power-ups. Credits never expire and can be used anytime. 
                Buy credits in bundles for better value, or use cash for individual purchases.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Store;
