import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Heart, X, MapPin, Sparkles } from 'lucide-react';
import { mockDiscoverPeople } from '../mock';
import { toast } from '../hooks/use-toast';

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  const currentPerson = mockDiscoverPeople[currentIndex];

  const handleSkip = () => {
    if (currentIndex < mockDiscoverPeople.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: 'No more suggestions',
        description: 'Check back soon for new connections!'
      });
    }
  };

  const handleConnect = () => {
    setMatches([...matches, currentPerson.id]);
    toast({
      title: 'Connection Request Sent',
      description: `You've reached out to ${currentPerson.name}!`
    });
    
    if (currentIndex < mockDiscoverPeople.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: 'No more suggestions',
        description: 'Check back soon for new connections!'
      });
    }
  };

  if (!currentPerson) {
    return (
      <div className="min-h-screen pb-32 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center space-y-4">
          <Sparkles className="w-16 h-16 text-[#39CCB7] mx-auto" />
          <h2 className="text-2xl font-bold text-white">You're all caught up!</h2>
          <p className="text-white/60">Check back later for new connection suggestions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Discover
          </h1>
          <p className="text-white/60">
            Your next friend might be right here.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="glass-card rounded-3xl overflow-hidden border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Profile Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={currentPerson.picture}
              alt={currentPerson.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Compatibility Badge */}
            <Badge className="absolute top-6 right-6 glass-card-light border-0 text-white px-3 py-2">
              <Sparkles className="w-4 h-4 mr-1" />
              {currentPerson.compatibility}% Match
            </Badge>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {currentPerson.name}, {currentPerson.age}
                </h2>
                <div className="flex items-center space-x-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{currentPerson.city}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-4">
            {/* Bio */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-2">About</h3>
              <p className="text-white/90 leading-relaxed">
                {currentPerson.bio}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentPerson.interests.map((interest, idx) => (
                  <Badge
                    key={idx}
                    className="glass-card-light border-0 text-white px-3 py-1"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={handleSkip}
            size="lg"
            className="w-16 h-16 rounded-full glass-card hover:bg-white/10 p-0"
          >
            <X className="w-7 h-7 text-white/70" />
          </Button>
          
          <Button
            onClick={handleConnect}
            size="lg"
            className="w-20 h-20 rounded-full bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 p-0 pulse-glow"
          >
            <Heart className="w-8 h-8 text-white" />
          </Button>
        </div>

        {/* Encouragement */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Someone compatible just arrived near you.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Discover;
