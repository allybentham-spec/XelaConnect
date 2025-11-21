import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Heart, Users, Sparkles, MessageCircle, TrendingUp } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const DiscoverEnhanced = () => {
  const [people] = useState([
    {
      id: 'p1',
      name: 'Sarah Martinez',
      age: 26,
      city: 'San Francisco',
      picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      interests: ['Wellness', 'Yoga', 'Reading'],
      circles: ['Mindful Mornings', 'Yoga Flow'],
      compatibilityScore: 89,
      whyMatched: 'Both love wellness and morning routines',
      tagline: 'Looking for wellness friends',
      section: 'highMatch'
    },
    {
      id: 'p2',
      name: 'Michael Chen',
      age: 31,
      city: 'San Francisco',
      picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      interests: ['Fitness', 'Hiking', 'Photography'],
      circles: ['Running Club', 'Hiking Explorers'],
      compatibilityScore: 82,
      whyMatched: 'Shares 3 communities with you',
      tagline: 'Active this morning',
      section: 'nearby'
    },
    {
      id: 'p3',
      name: 'Emma Wilson',
      age: 29,
      city: 'Oakland',
      picture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300',
      interests: ['Creative', 'Art', 'Music'],
      circles: ['Creative Souls', 'Music & Memory'],
      compatibilityScore: 76,
      whyMatched: 'Similar creative energy and interests',
      tagline: 'New to the area',
      section: 'sameInterests'
    },
    {
      id: 'p4',
      name: 'David Park',
      age: 34,
      city: 'Berkeley',
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      interests: ['Philosophy', 'Books', 'Coffee'],
      circles: ['Philosophy & Wonder', 'Book Club'],
      compatibilityScore: 88,
      whyMatched: 'Both love deep conversations and philosophy',
      tagline: 'Looking for accountability buddy',
      section: 'highMatch'
    },
    {
      id: 'p5',
      name: 'Lisa Rodriguez',
      age: 27,
      city: 'San Francisco',
      picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      interests: ['Travel', 'Photography', 'Adventure'],
      circles: ['Travel & Wanderlust'],
      compatibilityScore: 79,
      whyMatched: 'Aligned with your goals',
      tagline: 'New member starting their journey',
      section: 'newMembers'
    }
  ]);

  const handleConnect = (person) => {
    toast({
      title: 'Connection Request Sent',
      description: `You've reached out to ${person.name}!`
    });
  };

  const getCompatibilityColor = (score) => {
    if (score >= 85) return 'from-[#39CCB7] to-[#8834AE]';
    if (score >= 75) return 'from-[#8834AE] to-[#3240AC]';
    return 'from-[#6AAD73] to-[#39CCB7]';
  };

  const sections = [
    {
      id: 'highMatch',
      title: 'People You Will Really Connect With',
      subtitle: 'Based on personality + goals',
      icon: Sparkles
    },
    {
      id: 'nearby',
      title: 'Near You',
      subtitle: 'Local opportunities',
      icon: MapPin
    },
    {
      id: 'sameInterests',
      title: 'Same Interests',
      subtitle: 'Your shared hobbies',
      icon: Heart
    },
    {
      id: 'newMembers',
      title: 'New Members Starting Their Journey',
      subtitle: 'Great for first connections',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            People You Will Click With
          </h1>
          <p className="text-white/60">
            Not based on looks — based on compatibility and what you care about.
          </p>
        </div>

        <Card className="glass-card rounded-2xl p-4 border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3">
            <div className="glass-card-light p-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-[#39CCB7]" />
            </div>
            <p className="text-white/80 text-sm">
              <span className="text-[#39CCB7] font-semibold">32 new compatible people</span> joined today
            </p>
          </div>
        </Card>

        {sections.map((section, sectionIdx) => {
          const sectionPeople = people.filter(p => p.section === section.id);
          if (sectionPeople.length === 0) return null;

          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="space-y-4 animate-fade-in-up" style={{ animationDelay: `${0.2 + sectionIdx * 0.1}s` }}>
              <div className="flex items-center space-x-3">
                <div className="glass-card-light p-2 rounded-xl">
                  <SectionIcon className="w-5 h-5 text-[#39CCB7]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                  <p className="text-xs text-white/50">{section.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {sectionPeople.map((person) => (
                  <Card
                    key={person.id}
                    className="glass-card rounded-3xl overflow-hidden border-0 hover:bg-white/10 smooth-transition"
                  >
                    <div className="flex space-x-4 p-5">
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-20 h-20 rounded-2xl overflow-hidden ring-2 bg-gradient-to-br ${getCompatibilityColor(person.compatibilityScore)}`}
                          style={{ padding: '3px' }}
                        >
                          <img
                            src={person.picture}
                            alt={person.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#39CCB7] to-[#8834AE] border-0 text-xs px-2">
                          {person.compatibilityScore}%
                        </Badge>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{person.name}, {person.age}</h3>
                          <div className="flex items-center space-x-1 text-white/60 text-sm">
                            <MapPin className="w-3 h-3" />
                            <span>{person.city}</span>
                          </div>
                        </div>

                        <Badge className="glass-card-light border-0 text-white/80 text-xs">
                          {person.tagline}
                        </Badge>

                        <div className="glass-card-light rounded-xl p-3">
                          <p className="text-xs text-white/60 mb-1">Why we think you will click:</p>
                          <p className="text-sm text-white/90">{person.whyMatched}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {person.interests.slice(0, 3).map((interest, idx) => (
                            <Badge key={idx} className="bg-white/5 border-0 text-white/70 text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            onClick={() => handleConnect(person)}
                            className="flex-1 h-9 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-sm"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Say Hi
                          </Button>
                          <Button
                            variant="outline"
                            className="h-9 rounded-xl glass-button text-white border-white/20 text-sm px-4"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up">
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Your next friend may be one message away.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DiscoverEnhanced;
