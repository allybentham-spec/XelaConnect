import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Crown, Check, Sparkles, Users, MessageCircle, BookOpen, TrendingUp, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

const Subscription = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const handleSubscribe = (tier) => {
    toast({
      title: 'Redirecting to Checkout',
      description: `Processing ${tier.name} subscription...`
    });
    // TODO: Integrate with payment provider
  };

  const subscriptionTiers = [
    {
      name: 'Premium',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      description: 'For those ready to deepen their connections',
      features: [
        'Unlimited circle access',
        'Unlimited direct messages',
        'Course previews & samples',
        'Advanced matching algorithm',
        'Priority support',
        'Remove ads',
        'Profile customization'
      ],
      color: '#39CCB7',
      icon: Users,
      popular: false
    },
    {
      name: 'Elite',
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      description: 'The complete emotional growth experience',
      features: [
        'Everything in Premium',
        'ALL courses unlocked',
        'Unlimited AI conversations',
        'Priority profile visibility',
        '2 free profile boosts/month',
        'Exclusive VIP circles',
        'Advanced analytics dashboard',
        'Early access to features',
        'Verified badge'
      ],
      color: '#8834AE',
      icon: Crown,
      popular: true
    },
    {
      name: 'Lifetime Elite',
      monthlyPrice: null,
      annualPrice: 499,
      description: 'Invest once, grow forever',
      features: [
        'Everything in Elite',
        'Lifetime access - forever',
        'Founder badge',
        'Early feature beta access',
        'VIP support line',
        'Never pay again',
        'Lock in current price',
        'Exclusive founder events'
      ],
      color: '#207690',
      icon: Star,
      popular: false
    }
  ];

  const getPrice = (tier) => {
    if (tier.monthlyPrice === null) return `$${tier.annualPrice}`;
    return billingCycle === 'monthly' 
      ? `$${tier.monthlyPrice}` 
      : `$${tier.annualPrice}`;
  };

  const getPeriod = (tier) => {
    if (tier.monthlyPrice === null) return 'one-time';
    return billingCycle === 'monthly' ? 'month' : 'year';
  };

  const getSavings = (tier) => {
    if (tier.monthlyPrice === null) return null;
    if (billingCycle === 'annual') {
      const monthlyCost = tier.monthlyPrice * 12;
      const savings = monthlyCost - tier.annualPrice;
      return Math.round(savings);
    }
    return null;
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="glass-card-light p-4 rounded-2xl">
              <Crown className="w-10 h-10 text-[#39CCB7]" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Choose Your Path
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Unlock unlimited connections, premium courses, and exclusive features designed to accelerate your emotional growth journey.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card rounded-2xl p-2 inline-flex items-center space-x-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-xl font-medium transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annual
              <Badge className="absolute -top-2 -right-2 bg-[#39CCB7] border-0 text-xs">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {subscriptionTiers.map((tier, idx) => {
            const Icon = tier.icon;
            const savings = getSavings(tier);
            
            return (
              <Card
                key={idx}
                className={`glass-card rounded-3xl p-8 border-0 relative overflow-hidden hover:scale-[1.02] transition-all ${
                  tier.popular ? 'ring-2 ring-[#8834AE]' : ''
                }`}
              >
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ background: `linear-gradient(135deg, ${tier.color} 0%, transparent 100%)` }}
                />

                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#39CCB7] to-[#8834AE] py-2 text-center">
                    <span className="text-white text-sm font-bold">MOST POPULAR</span>
                  </div>
                )}
                
                <div className={`relative z-10 space-y-6 ${tier.popular ? 'mt-8' : ''}`}>
                  {/* Icon & Name */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-card-light mb-4">
                      <Icon className="w-8 h-8" style={{ color: tier.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-white/60 text-sm">{tier.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center py-4">
                    <div className="flex items-baseline justify-center space-x-2 mb-2">
                      <span className="text-5xl font-bold text-white">{getPrice(tier)}</span>
                      <span className="text-white/60 text-lg">/{getPeriod(tier)}</span>
                    </div>
                    {savings && (
                      <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                        Save ${savings}/year
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSubscribe(tier)}
                    className={`w-full h-12 rounded-xl font-bold transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 shadow-lg'
                        : 'glass-button text-white hover:bg-white/10 border border-white/20'
                    }`}
                  >
                    {tier.monthlyPrice === null ? 'Buy Lifetime' : 'Start Free Trial'}
                  </Button>

                  {tier.monthlyPrice && (
                    <p className="text-center text-white/50 text-xs">
                      7-day free trial • Cancel anytime
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Card className="glass-card rounded-2xl p-6 border-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-[#39CCB7]/20">
                <Shield className="w-5 h-5 text-[#39CCB7]" />
              </div>
              <h3 className="text-white font-semibold">Secure & Private</h3>
            </div>
            <p className="text-white/60 text-sm">Your data is encrypted and protected. Cancel anytime.</p>
          </Card>

          <Card 
            onClick={() => navigate('/?testimonials=true')}
            className="glass-card rounded-2xl p-6 border-0 cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-[#8834AE]/20">
                <TrendingUp className="w-5 h-5 text-[#8834AE]" />
              </div>
              <h3 className="text-white font-semibold">Proven Results</h3>
            </div>
            <p className="text-white/60 text-sm">95% of premium members report deeper connections.</p>
            <p className="text-[#39CCB7] text-xs mt-2 font-medium">View testimonials →</p>
          </Card>

          <Card className="glass-card rounded-2xl p-6 border-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-[#39CCB7]/20">
                <Sparkles className="w-5 h-5 text-[#39CCB7]" />
              </div>
              <h3 className="text-white font-semibold">Money-Back Guarantee</h3>
            </div>
            <p className="text-white/60 text-sm">Not satisfied? Get a full refund within 30 days.</p>
          </Card>
        </div>

        {/* FAQ Link */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/emotional-intelligence')}
            className="text-[#39CCB7] hover:text-[#39CCB7]/80 font-medium transition-colors"
          >
            Questions? View our FAQ →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
