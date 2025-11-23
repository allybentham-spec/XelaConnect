import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, CheckCircle2, Loader2 } from 'lucide-react';
import { circlesAPI } from '../utils/api';
import { toast } from '../hooks/use-toast';

const Community = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedCircles, setJoinedCircles] = useState([]);

  const categories = ['All', 'Wellness', 'Fitness', 'Creative', 'Social', 'Outdoor', 'Lifestyle'];

  useEffect(() => {
    fetchCircles();
  }, [selectedCategory]);

  const fetchCircles = async () => {
    try {
      setLoading(true);
      const response = await circlesAPI.getAll(selectedCategory);
      setCircles(response.data.circles || []);
    } catch (error) {
      console.error('Error fetching circles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load circles',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCircles = circles;

  const handleJoinCircle = async (circleId, circleName) => {
    const isJoined = joinedCircles.includes(circleId);
    
    if (isJoined) {
      // If already joined, navigate to circle detail
      navigate(`/circles/${circleId}`);
    } else {
      // Join and then navigate
      try {
        await circlesAPI.join(circleId);
      } catch (error) {
        console.log('Join API call (demo mode):', error);
      }
      
      setJoinedCircles([...joinedCircles, circleId]);
      toast({
        title: '🎉 Welcome!',
        description: `You're now part of ${circleName}`
      });
      
      // Navigate to circle detail page
      setTimeout(() => {
        navigate(`/circles/${circleId}`);
      }, 500);
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#39CCB7] animate-spin" />
          </div>
        )}

        {/* Circles Grid */}
        {!loading && (
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
                      <span className="text-sm">{circle.members_count || circle.members || 0} members</span>
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
        )}

        {/* No circles message */}
        {!loading && filteredCircles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60">No circles found in this category.</p>
          </div>
        )}

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
