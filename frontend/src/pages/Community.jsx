import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { mockCircles } from '../mock';
import { toast } from '../hooks/use-toast';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [joinedCircles, setJoinedCircles] = useState(['circle-001', 'circle-002']);

  const categories = ['All', 'Wellness', 'Fitness', 'Creative', 'Social', 'Outdoor', 'Lifestyle'];

  const filteredCircles = selectedCategory === 'All'
    ? mockCircles
    : mockCircles.filter(circle => circle.category === selectedCategory);

  const handleJoinCircle = (circleId, circleName) => {
    if (joinedCircles.includes(circleId)) {
      setJoinedCircles(joinedCircles.filter(id => id !== circleId));
      toast({
        title: 'Left Circle',
        description: `You've left ${circleName}`
      });
    } else {
      setJoinedCircles([...joinedCircles, circleId]);
      toast({
        title: 'Welcome in!',
        description: `You're part of ${circleName} now.`
      });
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Community Circles
          </h1>
          <p className="text-white/60">
            A community is growing around what matters to you.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap smooth-transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                  : 'glass-card text-white/70 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Circles Grid */}
        <div className="space-y-4">
          {filteredCircles.map((circle, idx) => {
            const isJoined = joinedCircles.includes(circle.id);
            
            return (
              <Card
                key={circle.id}
                className="glass-card rounded-3xl overflow-hidden border-0 hover:bg-white/10 smooth-transition animate-fade-in-up"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={circle.image}
                    alt={circle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${circle.gradient || 'from-[#39CCB7] to-[#8834AE]'} opacity-60`} />
                  
                  {/* Emoji Badge */}
                  <div className="absolute top-4 left-4 glass-card-light p-3 rounded-2xl">
                    <span className="text-3xl">{circle.emoji || '✨'}</span>
                  </div>
                  
                  {/* Category Badge */}
                  <Badge
                    className="absolute top-4 right-4 glass-card-light border-0 text-white text-xs"
                  >
                    {circle.category}
                  </Badge>

                  {/* Active Status */}
                  {circle.active && (
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#39CCB7] rounded-full animate-pulse" />
                      <span className="text-white text-xs font-medium">Active Now</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{circle.name}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {circle.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{circle.members} members</span>
                    </div>

                    <Button
                      onClick={() => handleJoinCircle(circle.id, circle.name)}
                      className={`rounded-xl smooth-transition ${
                        isJoined
                          ? 'bg-white/10 text-white hover:bg-white/15'
                          : 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Joined
                        </>
                      ) : (
                        'Join Circle'
                      )}
                    </Button>
                  </div>

                  {/* Micro message */}
                  {isJoined && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50 text-center">
                        You just brought new energy into this space.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Message */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up">
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Connection starts with saying yes to yourself.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Community;
