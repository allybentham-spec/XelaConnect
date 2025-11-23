import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, Zap, Crown, Eye, MapPin, TrendingUp, BookOpen } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Store = () => {
  const userCredits = 250; // Mock data - will come from backend

  const handlePurchase = (item) => {
    toast({
      title: 'Purchase Successful',
      description: `You've purchased ${item.name}`
    });
  };

  const subscriptionTiers = [
    {
      name: 'Premium',
      price: 9.99,
      period: 'month',
      features: [
        'Unlimited circles',
        'Unlimited messages',
        'All course previews',
        'Advanced matching',
        'Priority support'
      ],
      color: '#39CCB7',
      popular: false
    },
    {
      name: 'Elite',
      price: 19.99,
      period: 'month',
      features: [
        'Everything in Premium',
        'ALL courses unlocked',
        'Unlimited AI sessions',
        'Priority visibility',
        'Profile boosts included',
        'Exclusive circles',
        'Advanced analytics'
      ],
      color: '#8834AE',
      popular: true
    },
    {
      name: 'Lifetime Elite',
      price: 149,
      period: 'once',
      features: [
        'Everything in Elite',
        'Lifetime access',
        'Founder badge',
        'Early feature access',
        'VIP support',
        'Never pay again'
      ],
      color: '#207690',
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Profile Boost',
      description: '3x visibility for 24 hours',
      icon: TrendingUp,
      credits: 30,
      usd: 2.99,
      color: '#39CCB7'
    },
    {
      name: 'Circle Spotlight',
      description: 'Feature your circle for 7 days',
      icon: Zap,
      credits: 50,
      usd: 4.99,
      color: '#8834AE'
    },
    {
      name: 'Extra AI Sessions',
      description: '10 additional XelaTalks sessions',
      icon: Sparkles,
      credits: 20,
      usd: 1.99,
      color: '#207690'
    },
    {
      name: 'Stealth Mode',
      description: 'Browse profiles privately',
      icon: Eye,
      credits: 60,
      usd: 5.99,
      color: '#6AAD73'
    },
    {
      name: 'Extended Reach',
      description: 'Visible in more cities',
      icon: MapPin,
      credits: 130,
      usd: 12.99,
      color: '#3240AC'
    }
  ];

  const courseBundles = [
    {
      name: 'Social Confidence Bundle',
      courses: 3,
      value: 59.97,
      price: 39,
      credits: 390,
      icon: BookOpen
    },
    {
      name: 'Complete Growth Package',
      courses: 7,
      value: 139.93,
      price: 79,
      credits: 790,
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Expand
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-white/60">Unlock your full potential</p>
            <Badge className="glass-card-light border-0 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {userCredits} credits
            </Badge>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-semibold text-white">Subscriptions</h2>
          {subscriptionTiers.map((tier, idx) => (
            <Card
              key={idx}
              className={`glass-card rounded-3xl p-6 border-0 relative overflow-hidden ${
                tier.popular ? 'ring-2 ring-[#8834AE]' : ''
              }`}
            >
              {tier.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#39CCB7] to-[#8834AE] border-0">
                  Most Popular
                </Badge>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-white/60">/{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2 text-sm text-white/80">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: tier.color }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handlePurchase(tier)}
                  className={`w-full h-12 rounded-xl font-semibold ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90'
                      : 'glass-button text-white hover:bg-white/10'
                  }`}
                >
                  Subscribe Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold text-white">Power-Ups</h2>
          <div className="grid grid-cols-1 gap-3">
            {addOns.map((addon, idx) => {
              const Icon = addon.icon;
              return (
                <Card key={idx} className="glass-card rounded-2xl p-4 border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: `${addon.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: addon.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{addon.name}</div>
                        <div className="text-sm text-white/60">{addon.description}</div>
                        <div className="text-xs text-white/50 mt-1">
                          {addon.credits} credits or ${addon.usd}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(addon)}
                      className="h-9 rounded-xl glass-button text-white hover:bg-white/10"
                    >
                      Buy
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Course Bundles */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-semibold text-white">Course Bundles</h2>
          {courseBundles.map((bundle, idx) => {
            const Icon = bundle.icon;
            return (
              <Card key={idx} className="glass-card rounded-3xl p-6 border-0">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="glass-card-light p-3 rounded-xl">
                        <Icon className="w-6 h-6 text-[#39CCB7]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{bundle.name}</h3>
                        <p className="text-sm text-white/60">{bundle.courses} courses included</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-white">${bundle.price}</span>
                    <span className="text-white/50 line-through">${bundle.value}</span>
                    <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                      Save ${(bundle.value - bundle.price).toFixed(0)}
                    </Badge>
                  </div>

                  <Button
                    onClick={() => handlePurchase(bundle)}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 font-semibold"
                  >
                    Purchase Bundle
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Message */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Invest in yourself. Your growth matters.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Store;
