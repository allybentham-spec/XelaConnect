import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  ArrowLeft,
  Heart,
  Phone,
  MessageCircle,
  Shield,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Check,
  Users,
  Activity,
  Target
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const EmotionalIntelligencePath = () => {
  const navigate = useNavigate();
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [showAuditResult, setShowAuditResult] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [currentCoachingIndex, setCurrentCoachingIndex] = useState(0);

  // Mock emotional growth stats - in production, these would come from user data
  const emotionalStats = {
    reflections: 47,
    awareness: 89,
    streak: 12,
    boundaries: 23,
    connections: 34,
    checkIns: 156,
    mindfulness: 78
  };

  const connectionChecklist = [
    "I have someone I could call at 2 AM.",
    "I have someone who listens without fixing or judging.",
    "I have someone who checks on me without being asked.",
    "I have someone who celebrates my wins with genuine joy.",
    "I have someone who respects my boundaries.",
    "I have someone I feel emotionally safe around.",
    "I have someone who sees me clearly and kindly."
  ];

  const reflectionPrompts = [
    "What do I need emotionally today?",
    "When did I last feel connected to someone?",
    "What boundary protected my peace recently?",
    "Who energizes my spirit? Who drains it?",
    "What emotion has been asking for my attention?",
    "Where in my body am I holding tension right now?"
  ];

  const coachingLines = [
    "Connection begins with a single honest moment.",
    "Your emotions are the map — not the enemy.",
    "Isolation often comes from protection, not disinterest.",
    "You are learning to lead your life from alignment, not survival mode.",
    "You deserve relationships that feel like peace."
  ];

  useEffect(() => {
    // Rotate coaching messages every 5 seconds
    const interval = setInterval(() => {
      setCurrentCoachingIndex((prev) => (prev + 1) % coachingLines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckboxToggle = (index) => {
    if (selectedConnections.includes(index)) {
      setSelectedConnections(selectedConnections.filter(i => i !== index));
    } else {
      setSelectedConnections([...selectedConnections, index]);
    }
    setShowAuditResult(true);
  };

  const getAuditMessage = () => {
    const count = selectedConnections.length;
    if (count <= 2) {
      return "You deserve deeper connection. Let's build slowly, with courage and truth.";
    } else if (count <= 5) {
      return "There is love here. Let's strengthen your circle with intention.";
    } else {
      return "Your support system is meaningful. Keep nurturing the ones who show up.";
    }
  };

  const handlePromptExpand = (index) => {
    if (expandedPrompt === index) {
      setExpandedPrompt(null);
    } else {
      setExpandedPrompt(index);
      setJournalText('');
    }
  };

  const handleSaveReflection = () => {
    toast({
      title: '✨ Reflection Saved',
      description: 'Your words matter. Keep tending to your inner world.'
    });
    setExpandedPrompt(null);
    setJournalText('');
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-white hover:bg-white/10 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="relative animate-fade-in-up">
          <Card className="glass-card rounded-3xl p-8 border-0 overflow-hidden relative">
            {/* Breathing animation glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8834ae]/20 to-[#39ccb7]/20 animate-pulse" />
            
            <div className="relative z-10 space-y-6 text-center">
              {/* Progress Ring */}
              <div className="mx-auto w-32 h-32 rounded-full border-4 border-[#39ccb7] flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#39ccb7] to-[#8834ae] opacity-20 blur-xl animate-pulse" />
                <Heart className="w-12 h-12 text-[#39ccb7]" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Emotional Intelligence Path
                </h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                  A deeper destination for emotional mastery, connection awareness & real support.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Truth About Connection Section */}
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#39ccb7]" />
              <Activity className="w-5 h-5 text-[#39ccb7]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#39ccb7]" />
            </div>

            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Human connection is a core need. When it's missing, your nervous system feels it. 
              This isn't weakness — it's biology, protection, and evolution.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "52% of adults experience loneliness weekly.",
              "1 in 3 people report having no one they can confide in.",
              "Loneliness is now considered a global health risk.",
              "Emotional isolation impacts health as much as 15 cigarettes a day."
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="glass-card rounded-2xl p-6 border-0 hover:bg-white/10 transition-all animate-fade-in-up"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#39ccb7] mt-2 flex-shrink-0" />
                  <p className="text-white/80">{stat}</p>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-white/60 italic text-sm mt-6">
            Your feelings have a place. They have context. They matter.
          </p>
        </div>

        {/* Genuine Connection Audit */}
        <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Do You Have Genuine Connection?
              </h2>
              <p className="text-white/60">Check all that feel true for you:</p>
            </div>

            <div className="space-y-3">
              {connectionChecklist.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCheckboxToggle(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    selectedConnections.includes(idx)
                      ? 'bg-[#39ccb7]/20 border-2 border-[#39ccb7]'
                      : 'glass-card hover:bg-white/10 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      selectedConnections.includes(idx)
                        ? 'bg-[#39ccb7]'
                        : 'glass-card'
                    }`}>
                      {selectedConnections.includes(idx) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Dynamic Result */}
            {showAuditResult && (
              <div className="mt-6 p-6 glass-card rounded-2xl border-2 border-[#39ccb7]/30 animate-fade-in-up">
                <p className="text-white/90 text-center leading-relaxed">
                  {getAuditMessage()}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* The Anchor Message */}
        <Card className="glass-card rounded-3xl p-12 border-0 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Your Heart Needs to Hear This
            </h2>

            <div className="space-y-4">
              <p className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                You are not difficult to love.
              </p>
              <p className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                You are not too much.
              </p>
              <p className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your emotions are valid, and so are you.
              </p>
            </div>

            <p className="text-white/70 text-lg mt-8">
              Let this land. Your sensitivity is wisdom. Your awareness is strength.
            </p>
          </div>
        </Card>

        {/* Support + Hotline Access */}
        <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              You Don't Have to Hold Everything Alone
            </h2>

            {/* Hotline Block */}
            <Card className="bg-gradient-to-br from-[#39ccb7]/20 to-[#8834ae]/20 rounded-2xl p-8 border-2 border-[#39ccb7]/30">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#39ccb7]/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-[#39ccb7] animate-ping opacity-20" />
                  <Phone className="w-8 h-8 text-[#39ccb7] relative z-10" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  Loneliness & Emotional Support Line
                </h3>
                <p className="text-3xl font-bold text-[#39ccb7]">
                  📞 1-800-273-8255
                </p>
                <p className="text-white/60 text-sm">
                  For moments when you need a calm human voice.
                </p>
              </div>
            </Card>

            {/* Additional Resources */}
            <div className="grid md:grid-cols-2 gap-3 mt-6">
              {[
                { label: "Crisis Text Line", icon: MessageCircle },
                { label: "Anonymous Listener Chat", icon: Users },
                { label: "Emotional Safety Resources", icon: Shield },
                { label: "Community Support Circles", icon: Heart },
                { label: "Professional Guidance Directory", icon: Target }
              ].map((resource, idx) => (
                <button
                  key={idx}
                  className="glass-card rounded-2xl p-4 hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-center space-x-3">
                    <resource.icon className="w-5 h-5 text-[#39ccb7]" />
                    <span className="text-white">{resource.label}</span>
                    <ChevronRight className="w-4 h-4 text-white/40 ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Emotional Growth Stats */}
        <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Emotional Intelligence in Motion
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Reflections Completed", value: emotionalStats.reflections },
                { label: "Moments of Awareness", value: emotionalStats.awareness },
                { label: "Regulation Streak", value: `${emotionalStats.streak} days` },
                { label: "Boundaries Strengthened", value: emotionalStats.boundaries },
                { label: "Connection Attempts", value: emotionalStats.connections },
                { label: "Self-Check-Ins", value: emotionalStats.checkIns }
              ].map((stat, idx) => (
                <div key={idx} className="text-center space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#39ccb7] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#39ccb7] to-[#8834ae] opacity-20 blur-lg" />
                    <span className="text-2xl font-bold text-white relative z-10">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-white/60 italic text-sm mt-6">
              Small shifts become identity shifts.
            </p>
          </div>
        </Card>

        {/* Reflection Prompts */}
        <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Pause. Breathe. Reflect.
              </h2>
            </div>

            <div className="space-y-3">
              {reflectionPrompts.map((prompt, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => handlePromptExpand(idx)}
                    className="w-full text-left p-4 glass-card rounded-2xl hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{prompt}</span>
                      <ChevronRight className={`w-5 h-5 text-white/40 transition-transform ${
                        expandedPrompt === idx ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Expanded Journal Area */}
                  {expandedPrompt === idx && (
                    <div className="mt-3 p-6 glass-card rounded-2xl border-2 border-[#39ccb7]/30 animate-fade-in-up">
                      <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        placeholder="Take your time. Write freely..."
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[#39ccb7] outline-none resize-none"
                      />
                      <Button
                        onClick={handleSaveReflection}
                        className="mt-4 w-full bg-gradient-to-r from-[#39ccb7] to-[#8834ae] hover:opacity-90"
                      >
                        Save Reflection
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Micro-Coaching by Xela */}
        <Card className="glass-card rounded-3xl p-8 border-0 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#8834ae]/10 to-[#39ccb7]/10" />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#39ccb7]" />
              <h2 className="text-2xl font-semibold text-white">
                Wisdom for the Journey
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-2xl text-white/90 leading-relaxed italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                "{coachingLines[currentCoachingIndex]}"
              </p>
            </div>

            {/* Indicator dots */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {coachingLines.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentCoachingIndex
                      ? 'bg-[#39ccb7] w-6'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <Button
            onClick={() => navigate('/dashboard')}
            className="px-12 py-6 text-lg bg-gradient-to-r from-[#39ccb7] to-[#8834ae] hover:opacity-90 rounded-2xl group"
          >
            Continue Your Alignment
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-white/60 text-sm italic">
            Your inner world is worth tending to. You're doing beautifully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionalIntelligencePath;
