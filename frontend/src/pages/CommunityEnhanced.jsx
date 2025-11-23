import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Users, 
  CheckCircle2, 
  Loader2, 
  Search, 
  Filter,
  TrendingUp,
  MessageCircle,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { circlesAPI } from '../utils/api';
import { toast } from '../hooks/use-toast';

const CommunityEnhanced = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedCircles, setJoinedCircles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, active
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 
    'Wellness', 
    'Fitness', 
    'Creative', 
    'Social', 
    'Outdoor', 
    'Lifestyle',
    'Mental Health',
    'Career',
    'Parenting'
  ];

  useEffect(() => {
    fetchCircles();
  }, [selectedCategory, sortBy]);

  const fetchCircles = async () => {
    try {
      setLoading(true);
      const response = await circlesAPI.getAll(selectedCategory);
      let fetchedCircles = response.data.circles || [];
      
      // Sort circles
      if (sortBy === 'popular') {
        fetchedCircles.sort((a, b) => (b.members_count || 0) - (a.members_count || 0));
      } else if (sortBy === 'newest') {
        fetchedCircles.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      } else if (sortBy === 'active') {
        fetchedCircles.sort((a, b) => (b.activity_score || 0) - (a.activity_score || 0));
      }
      
      setCircles(fetchedCircles);
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

  const handleJoinCircle = async (circle) => {
    try {
      const isJoined = joinedCircles.includes(circle.id);
      
      if (isJoined) {
        // Navigate to circle detail if already joined
        navigate(`/circle/${circle.id}`);
      } else {
        // Join the circle first
        try {
          await circlesAPI.join(circle.id);
        } catch (apiError) {
          // Even if API fails, still allow navigation for demo
          console.log('API call completed with error (expected in demo mode):', apiError);
        }
        
        setJoinedCircles([...joinedCircles, circle.id]);
        
        // Show welcome toast
        toast({
          title: '🎉 Welcome to the Circle!',
          description: `You're now part of ${circle.name}`
        });
        
        // Navigate to circle detail immediately
        navigate(`/circle/${circle.id}`);
      }
      
      fetchCircles();
    } catch (error) {
      console.error('Error joining circle:', error);
      // Still navigate even if there's an error (for demo purposes)
      navigate(`/circle/${circle.id}`);
    }
  };

  const filteredCircles = circles.filter(circle => 
    circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circle.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCircles = circles
    .sort((a, b) => (b.members_count || 0) - (a.members_count || 0))
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Community Circles
              </h1>
              <p className="text-white/60 mt-2">
                Find your tribe. Build real connections.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white hover:bg-white/10"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:bg-white/15"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="glass-card rounded-2xl p-4 border-0 space-y-4 animate-fade-in">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Sort By</label>
                <div className="flex space-x-2">
                  {['popular', 'newest', 'active'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                        sortBy === sort
                          ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-white">{circles.length}</div>
            <div className="text-xs text-white/60 mt-1">Total Circles</div>
          </Card>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-[#39CCB7]">{joinedCircles.length}</div>
            <div className="text-xs text-white/60 mt-1">Joined</div>
          </Card>
          <Card className="glass-card rounded-2xl p-4 border-0 text-center">
            <div className="text-2xl font-bold text-[#8834AE]">
              {circles.reduce((sum, c) => sum + (c.members_count || 0), 0)}
            </div>
            <div className="text-xs text-white/60 mt-1">Members</div>
          </Card>
        </div>

        {/* Popular Circles */}
        {!searchQuery && popularCircles.length > 0 && (
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#39CCB7]" />
              <h2 className="text-xl font-semibold text-white">Trending Circles</h2>
            </div>
            
            <div className="space-y-3">
              {popularCircles.map((circle, idx) => (
                <Card
                  key={circle.id}
                  className="glass-card rounded-2xl p-4 border-0 hover:bg-white/10 cursor-pointer transition-all"
                  onClick={() => setSelectedCircle(circle)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center text-2xl">
                      {circle.emoji || '✨'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{circle.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-white/60 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {circle.members_count || 0}
                        </span>
                        <Badge className="text-xs bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                          {circle.category}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#39CCB7] animate-spin mx-auto mb-4" />
              <p className="text-white/60">Loading circles...</p>
            </div>
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
                  className="glass-card rounded-3xl overflow-hidden border-0 hover:bg-white/10 smooth-transition animate-fade-in-up group"
                  style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedCircle(circle)}>
                    <img
                      src={circle.image}
                      alt={circle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${circle.gradient || 'from-[#39CCB7] to-[#8834AE]'} opacity-60`} />
                    
                    {/* Emoji Badge */}
                    <div className="absolute top-4 left-4 glass-card-light p-3 rounded-2xl backdrop-blur-md">
                      <span className="text-3xl">{circle.emoji || '✨'}</span>
                    </div>
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 right-4 glass-card-light border-0 text-white text-xs backdrop-blur-md">
                      {circle.category}
                    </Badge>

                    {/* Active Status */}
                    {circle.active && (
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2 glass-card-light px-3 py-1.5 rounded-full backdrop-blur-md">
                        <div className="w-2 h-2 bg-[#39CCB7] rounded-full animate-pulse" />
                        <span className="text-white text-xs font-medium">Active Now</span>
                      </div>
                    )}

                    {/* Trending Badge */}
                    {circle.trending && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] border-0 text-white text-xs flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#39CCB7] transition-colors">
                        {circle.name}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                        {circle.description}
                      </p>
                    </div>

                    {/* Circle Stats */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{circle.members_count || 0}</div>
                        <div className="text-xs text-white/50">Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#39CCB7]">{circle.posts_count || 0}</div>
                        <div className="text-xs text-white/50">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#8834AE]">{circle.events_count || 0}</div>
                        <div className="text-xs text-white/50">Events</div>
                      </div>
                    </div>

                    {/* Member Previews */}
                    {circle.recent_members && circle.recent_members.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {circle.recent_members.slice(0, 4).map((member, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] border-2 border-[#1a1a2e] flex items-center justify-center text-white text-xs font-semibold"
                            >
                              {member.name?.charAt(0) || 'U'}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-white/60">
                          +{(circle.members_count || 0) - 4} others
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    {circle.tags && circle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {circle.tags.slice(0, 3).map((tag, i) => (
                          <Badge
                            key={i}
                            className="bg-white/10 text-white/70 border-0 text-xs hover:bg-white/15 cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleJoinCircle(circle)}
                        className={`flex-1 rounded-xl smooth-transition ${
                          isJoined
                            ? 'bg-white/10 text-white hover:bg-white/15'
                            : 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white'
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Joined
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-2" />
                            Join Circle
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => setSelectedCircle(circle)}
                        variant="ghost"
                        className="text-white hover:bg-white/10 rounded-xl"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Joined Message */}
                    {isJoined && (
                      <div className="bg-[#39CCB7]/10 border border-[#39CCB7]/20 rounded-xl p-3">
                        <p className="text-xs text-[#39CCB7] text-center flex items-center justify-center space-x-2">
                          <Sparkles className="w-3 h-3" />
                          <span>You're bringing new energy to this space</span>
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCircles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <p className="text-white/60 mb-2">No circles found</p>
            {searchQuery && (
              <p className="text-white/40 text-sm">
                Try adjusting your search or filters
              </p>
            )}
          </div>
        )}

        {/* Encouragement Card */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-[#39CCB7]" />
            <p className="text-white/70 text-sm leading-relaxed">
              Every circle you join is a step toward deeper connection. Keep going.
            </p>
          </div>
        </Card>
      </div>

      {/* Circle Detail Modal */}
      {selectedCircle && (
        <CircleDetailModal
          circle={selectedCircle}
          isJoined={joinedCircles.includes(selectedCircle.id)}
          onClose={() => setSelectedCircle(null)}
          onJoin={() => handleJoinCircle(selectedCircle)}
        />
      )}
    </div>
  );
};

// Circle Detail Modal Component
const CircleDetailModal = ({ circle, isJoined, onClose, onJoin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header Image */}
        <div className="relative h-56">
          <img
            src={circle.image}
            alt={circle.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${circle.gradient || 'from-[#39CCB7] to-[#8834AE]'} opacity-60`} />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card-light backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="glass-card-light backdrop-blur-md px-3 py-1 rounded-full inline-block mb-3">
                  <span className="text-2xl">{circle.emoji || '✨'}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{circle.name}</h2>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-md">
                  {circle.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-white font-semibold mb-2">About This Circle</h3>
            <p className="text-white/70 leading-relaxed">{circle.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-4 text-center">
              <Users className="w-6 h-6 text-[#39CCB7] mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{circle.members_count || 0}</div>
              <div className="text-xs text-white/50">Members</div>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <MessageCircle className="w-6 h-6 text-[#8834AE] mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{circle.posts_count || 0}</div>
              <div className="text-xs text-white/50">Posts</div>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Calendar className="w-6 h-6 text-[#39CCB7] mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{circle.events_count || 0}</div>
              <div className="text-xs text-white/50">Events</div>
            </div>
          </div>

          {/* Recent Activity */}
          {circle.recent_activity && circle.recent_activity.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {circle.recent_activity.slice(0, 3).map((activity, i) => (
                  <div key={i} className="glass-card rounded-xl p-3">
                    <p className="text-white/80 text-sm">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={onJoin}
            className={`w-full py-6 rounded-xl text-lg ${
              isJoined
                ? 'bg-white/10 text-white hover:bg-white/15'
                : 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white'
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Already Joined
              </>
            ) : (
              <>
                <Users className="w-5 h-5 mr-2" />
                Join This Circle
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityEnhanced;
