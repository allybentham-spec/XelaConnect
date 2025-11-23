import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Heart, Users, ChevronDown, ChevronUp, X, Star, UserPlus, LogIn } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    // Check if testimonials query param is present
    if (searchParams.get('testimonials') === 'true') {
      setShowModal(true);
      // Scroll to testimonials section after modal opens
      setTimeout(() => {
        const testimonialsSection = document.getElementById('testimonials-section');
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [searchParams]);

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
      content: "You've spent too many nights wondering why success feels so hollow. Why winning means nothing when there's no one who truly gets it. You're surrounded by people, yet starving for real connection. XelaConnect ends that. Here, loneliness doesn't exist — because every person you meet actually sees you, challenges you, and celebrates you the way you've been craving.",
      image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&q=80"
    },
    {
      title: "People Who Multiply Your Energy",
      preview: "The people here don't just match your energy — they multiply it.",
      content: "Imagine walking into a room where everyone operates at your frequency. No explaining. No code-switching. No dimming your light. Just pure, electric alignment with people who are building empires, chasing dreams, and refusing mediocrity just like you. This is your circle. These are your people. And once you're in, you'll wonder how you survived without them.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80"
    },
    {
      title: "Connections Built to Last",
      preview: "Every connection is built to last — not just to swipe.",
      content: "You're done wasting precious time on people who ghost, flake, or treat you like an option. Here, every single person is intentional, vetted, and hungry for depth. You'll never have to beg for reciprocity again. No more one-sided effort. No more surface-level small talk that drains your soul. Just real humans showing up the way you always have.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"
    },
    {
      title: "Life Becomes Exponential",
      preview: "This is where your life becomes exponential.",
      content: "The right connection doesn't just change your week — it changes your trajectory. One conversation leads to a business partnership. One friendship unlocks opportunities you never saw coming. One person believes in you so fiercely that you finally believe in yourself. This isn't networking. This is life transformation. And it starts the moment you join.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
    },
    {
      title: "How It Works",
      preview: "Three simple steps to meaningful friendship.",
      isHowItWorks: true,
      steps: [
        {
          number: "1",
          title: "Tell Us Who You Are",
          content: "Share what makes you unique — your energy, interests, and what you're looking for in friendships. Our thoughtful onboarding helps us understand you beyond surface-level details."
        },
        {
          number: "2",
          title: "Meet People Who Actually Get You",
          content: "Browse authentic profiles, join Community Circles around shared interests, and discover people whose energy matches yours. No endless swiping — just quality connections."
        },
        {
          number: "3",
          title: "Build Friendships That Last",
          content: "Start real conversations, share reflections, and grow together. With tools like Xela Talks (your AI companion) and built-in messaging, meaningful friendships happen naturally."
        }
      ],
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80"
    },
    {
      title: "A Safe Space You Can Trust",
      preview: "Your peace of mind matters — you're protected here.",
      content: "Your peace of mind matters to us. XelaConnect is built on verified members, clear community standards, and a genuine commitment to keeping this space positive and respectful. You're protected here, and we take that responsibility seriously. This is a place where you can be vulnerable, authentic, and confident that the community will hold that with care.",
      image: null
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
      
      {/* Auth Buttons - Top Right */}
      <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
        <button
          onClick={() => navigate('/signup')}
          className="glass-card-light px-4 py-2 rounded-xl hover:bg-white/20 smooth-transition group flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4 text-white group-hover:text-[#39CCB7] transition-colors" />
          <span className="text-white text-sm font-medium group-hover:text-[#39CCB7] transition-colors">
            Create Account
          </span>
        </button>
        <button
          onClick={() => navigate('/login')}
          className="glass-card-light px-4 py-2 rounded-xl hover:bg-white/20 smooth-transition group flex items-center space-x-2"
        >
          <LogIn className="w-4 h-4 text-white group-hover:text-[#39CCB7] transition-colors" />
          <span className="text-white text-sm font-medium group-hover:text-[#39CCB7] transition-colors">
            Sign In
          </span>
        </button>
      </div>
      
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

        {/* Network Info Section with Imagery */}
        <div className="glass-card rounded-3xl overflow-hidden border border-[#39CCB7]/20 animate-fade-in-up relative" style={{ animationDelay: '0.1s' }}>
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              alt="Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#39CCB7]/40 via-transparent to-[#8834AE]/40" />
          </div>

          <div className="relative z-10 p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#39CCB7] animate-pulse" />
                <span className="text-[#39CCB7] text-sm font-semibold">Growing Community</span>
              </div>
              <span className="text-white/70 text-xs font-medium">Active members online</span>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="glass-card-light rounded-xl p-4 text-center backdrop-blur-xl">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-xs text-white/70">Members</div>
              </div>
              <div className="glass-card-light rounded-xl p-4 text-center backdrop-blur-xl">
                <div className="text-2xl font-bold text-white mb-1">25+</div>
                <div className="text-xs text-white/70">Circles</div>
              </div>
              <div className="glass-card-light rounded-xl p-4 text-center backdrop-blur-xl">
                <div className="text-2xl font-bold text-white mb-1">Real</div>
                <div className="text-xs text-white/70">Connections</div>
              </div>
            </div>

            {/* People Preview */}
            <div className="flex items-center justify-center -space-x-3 py-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" alt="Member" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" alt="Member" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" alt="Member" />
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" alt="Member" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold">
                +500
              </div>
            </div>

            <div className="glass-card-light rounded-2xl p-4 backdrop-blur-xl">
              <p className="text-white/90 text-sm text-center leading-relaxed font-medium">
                Join a network where emotional intelligence meets authentic connection. Where depth isn't optional—it's the standard.
              </p>
            </div>

            <Button
              onClick={() => navigate('/subscription')}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#39CCB7] via-[#5BB8A8] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg text-lg font-bold relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Begin Your Journey
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8834AE] to-[#39CCB7] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </div>

        {/* What Changes Link */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="text-center text-base text-[#39CCB7] hover:text-[#39CCB7]/80 smooth-transition py-3 font-medium flex items-center gap-2"
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
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/95 to-[#0f1419]/95 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-2xl animate-slide-up overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full glass-card hover:bg-white/10 smooth-transition z-10"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>

            <div className="p-10 space-y-8">
              {/* Header with Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
                  alt="Community"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/60 to-transparent flex items-end justify-center pb-8">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      What Changes When You Join
                    </h2>
                    <p className="text-white/90 text-lg">
                      Where real connection begins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="grid md:grid-cols-2 gap-4">
                {sections.map((section, index) => (
                  <div 
                    key={index} 
                    className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    {expandedSections[index] ? (
                      <div className="animate-fade-in">
                        {/* Expanded View */}
                        {section.image && (
                          <div className="relative h-72 overflow-hidden">
                            <img 
                              src={section.image}
                              alt={section.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(index);
                              }}
                              className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-white/20"
                            >
                              <ChevronUp className="w-5 h-5 text-white" />
                            </button>
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{section.title}</h3>
                            {!section.image && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSection(index);
                                }}
                                className="p-2 rounded-full glass-card hover:bg-white/20"
                              >
                                <ChevronUp className="w-5 h-5 text-white" />
                              </button>
                            )}
                          </div>
                          
                          {section.isHowItWorks ? (
                            <div className="space-y-4">
                              {section.steps.map((step, stepIdx) => (
                                <div key={stepIdx} className="glass-card-light rounded-xl p-5">
                                  <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center flex-shrink-0">
                                      <span className="text-white font-bold text-lg">{step.number}</span>
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                                      <p className="text-white/80 text-sm leading-relaxed">{step.content}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                              {section.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Collapsed Preview */}
                        {section.image ? (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={section.image}
                              alt={section.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-white font-semibold text-base leading-relaxed">
                                {section.preview}
                              </p>
                            </div>
                            <div className="absolute top-4 right-4 p-2 rounded-full glass-card-light">
                              <ChevronDown className="w-5 h-5 text-[#39CCB7]" />
                            </div>
                          </div>
                        ) : (
                          <div className="p-6">
                            <div className="flex items-center justify-between">
                              <p className="text-white font-semibold text-base leading-relaxed pr-4">
                                {section.preview}
                              </p>
                              <div className="p-2 rounded-full glass-card-light flex-shrink-0">
                                <ChevronDown className="w-5 h-5 text-[#39CCB7]" />
                              </div>
                            </div>
                          </div>
                        )}
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
              <div id="testimonials-section" className="pt-8 space-y-4">
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
