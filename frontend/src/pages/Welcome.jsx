import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Heart, Users, ChevronDown, ChevronUp, X, Star } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections = [
    {
      title: "You're Tired of Feeling Alone in a Crowded Room",
      preview: "You're tired of feeling alone in a crowded room. XelaConnect ends that.",
      content: "You've spent too many nights wondering why success feels so hollow. Why winning means nothing when there's no one who truly gets it. You're surrounded by people, yet starving for real connection. XelaConnect ends that. Here, loneliness doesn't exist — because every person you meet actually sees you, challenges you, and celebrates you the way you've been craving."
    },
    {
      title: "People Who Multiply Your Energy",
      preview: "The people here don't just match your energy — they multiply it.",
      content: "Imagine walking into a room where everyone operates at your frequency. No explaining. No code-switching. No dimming your light. Just pure, electric alignment with people who are building empires, chasing dreams, and refusing mediocrity just like you. This is your circle. These are your people. And once you're in, you'll wonder how you survived without them."
    },
    {
      title: "Connections Built to Last",
      preview: "Every connection is built to last — not just to swipe.",
      content: "You're done wasting precious time on people who ghost, flake, or treat you like an option. Here, every single person is intentional, vetted, and hungry for depth. You'll never have to beg for reciprocity again. No more one-sided effort. No more surface-level small talk that drains your soul. Just real humans showing up the way you always have."
    },
    {
      title: "Life Becomes Exponential",
      preview: "This is where your life becomes exponential.",
      content: "The right connection doesn't just change your week — it changes your trajectory. One conversation leads to a business partnership. One friendship unlocks opportunities you never saw coming. One person believes in you so fiercely that you finally believe in yourself. This isn't networking. This is life transformation. And it starts the moment you join."
    },
    {
      title: "How It Works",
      preview: "Three simple steps to meaningful friendship.",
      content: "Tell Us Who You Are: Share what makes you unique — your energy, interests, and what you're looking for in friendships. Our thoughtful onboarding helps us understand you beyond surface-level details.\n\nMeet People Who Actually Get You: Browse authentic profiles, join Community Circles around shared interests, and discover people whose energy matches yours. No endless swiping — just quality connections.\n\nBuild Friendships That Last: Start real conversations, share reflections, and grow together. With tools like Xela Talks (your AI companion) and built-in messaging, meaningful friendships happen naturally."
    },
    {
      title: "A Safe Space You Can Trust",
      preview: "Your peace of mind matters — you're protected here.",
      content: "Your peace of mind matters to us. XelaConnect is built on verified members, clear community standards, and a genuine commitment to keeping this space positive and respectful. You're protected here, and we take that responsibility seriously. This is a place where you can be vulnerable, authentic, and confident that the community will hold that with care."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Entrepreneur",
      text: "I found my business partner and three lifelong friends in my first month. XelaConnect changed everything.",
      rating: 5
    },
    {
      name: "Marcus T.",
      role: "Creative Director",
      text: "Finally, people who understand my drive without jealousy. The energy here is unmatched.",
      rating: 5
    },
    {
      name: "Priya K.",
      role: "Tech Founder",
      text: "No more surface-level conversations. Every connection I've made here has been genuine and transformative.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39CCB7]/10 via-transparent to-[#8834AE]/10" />
      
      <div className="max-w-md w-full space-y-8 animate-fade-in-up relative z-10">
        {/* Logo/Brand */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="glass-card-light p-4 rounded-3xl pulse-glow">
              <img 
                src="https://customer-assets.emergentagent.com/job_brandtone-1/artifacts/11ho960t_AppIcon.png" 
                alt="XelaConnect Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            XelaConnect
          </h1>
          <p className="text-xl text-white/80">
            Let's reconnect you with real people
          </p>
        </div>

        {/* Value Props */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-[#39CCB7] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white/90 text-sm leading-relaxed">
                Real connection is possible. You deserve relationships that feel like home.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-[#8834AE] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white/70 text-xs">
                Built for humans seeking genuine belonging, emotional safety, and aligned friendships.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#39CCB7]/60 mt-1 flex-shrink-0" />
            <div>
              <p className="text-white/60 text-xs">
                3 in 5 adults feel disconnected. Your need for connection is real, valid, and shared.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/signup')}
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg"
          >
            Create Account
          </Button>
          
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-2xl glass-button text-white border-white/20"
          >
            Sign In
          </Button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-center text-sm text-white/60 hover:text-white/80 smooth-transition py-2"
          >
            Continue as Guest
          </button>

          {/* What Changes Link */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full text-center text-base text-[#39CCB7] hover:text-[#39CCB7]/80 smooth-transition py-3 font-medium flex items-center justify-center gap-2"
          >
            What changes when you join <span className="text-lg">→</span>
          </button>
        </div>

        {/* Bottom message */}
        <p className="text-center text-white/50 text-xs px-4">
          Connection begins with one small step.
        </p>
      </div>

      {/* Bottom Sheet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/95 to-[#0f1419]/95 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-2xl animate-slide-up overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full glass-card hover:bg-white/10 smooth-transition z-10"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>

            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  What Changes When You Join
                </h2>
                <p className="text-white/60 text-sm">
                  Where real connection begins.
                </p>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={index} className="glass-card rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 smooth-transition"
                    >
                      <div className="flex-1">
                        <p className="text-white/90 text-sm leading-relaxed">
                          {section.preview}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedSections[index] ? (
                          <ChevronUp className="w-5 h-5 text-[#39CCB7]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </button>
                    
                    {expandedSections[index] && (
                      <div className="px-5 pb-5 pt-2 animate-fade-in">
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA After Sections */}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    setShowModal(false);
                    navigate('/signup');
                  }}
                  className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg"
                >
                  Start Your Journey
                </Button>
              </div>

              {/* Testimonials */}
              <div className="pt-8 space-y-4">
                <h3 className="text-xl font-bold text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                  What Our Community Says
                </h3>
                <p className="text-white/50 text-xs text-center mb-6">
                  Real stories from people experiencing emotional connection
                </p>

                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="glass-card rounded-xl p-5 space-y-3">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#39CCB7] text-[#39CCB7]" />
                        ))}
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/90 text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-white/50 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final CTA Section */}
              <div className="pt-6 space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-white/90 text-base font-medium">
                    Your People Are Already Here
                  </p>
                  <p className="text-white/60 text-sm">
                    The friendships you've been hoping for are happening right now inside XelaConnect.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setShowModal(false);
                    navigate('/signup');
                  }}
                  className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg"
                >
                  Meet the People Who Get You
                </Button>

                <Button
                  onClick={() => {
                    setShowModal(false);
                    navigate('/login');
                  }}
                  variant="outline"
                  className="w-full h-12 text-base font-semibold rounded-2xl glass-button text-white border-white/20"
                >
                  Already a Member? Sign In
                </Button>

                <p className="text-center text-white/40 text-xs pt-2">
                  Every day you wait is another day feeling half-empty.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
