import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, MessageCircle, Heart, Send, MoreVertical, Pin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ThreadDetail = () => {
  const { circleId, threadId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  // Mock thread data
  const mockThreadData = {
    1: {
      id: 1,
      title: "Welcome Thread",
      description: "Introduce yourself and share what brought you to this circle!",
      isPinned: true,
      created_at: "2024-01-15",
      author: {
        name: "Circle Guide",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        role: "Guide"
      },
      posts: [
        {
          id: 1,
          author: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
          content: "Hi everyone! I'm Sarah and I'm here to build deeper connections. I've been feeling isolated despite being surrounded by people, and I'm ready to change that. Looking forward to connecting with you all! 💚",
          timestamp: "2 min ago",
          likes: 12,
          liked: false
        },
        {
          id: 2,
          author: "Marcus Anderson",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
          content: "Welcome Sarah! I felt the same way before joining. This community has been incredible for authentic connections. Feel free to reach out anytime!",
          timestamp: "1 min ago",
          likes: 8,
          liked: true
        },
        {
          id: 3,
          author: "Emily Rodriguez",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
          content: "Hey everyone! First time joining a circle like this. A bit nervous but excited to be part of a community that values depth and authenticity.",
          timestamp: "30 sec ago",
          likes: 5,
          liked: false
        }
      ]
    },
    2: {
      id: 2,
      title: "Introductions",
      description: "Tell us your story and what you're looking for in this community",
      isPinned: false,
      posts: []
    },
    3: {
      id: 3,
      title: "Weekly Check-In",
      description: "How are you feeling this week? Share your wins and challenges",
      isPinned: false,
      posts: []
    },
    4: {
      id: 4,
      title: "Wins of the Week",
      description: "Celebrate your victories, big or small!",
      isPinned: false,
      posts: []
    },
    5: {
      id: 5,
      title: "Support Corner",
      description: "A safe space to ask for support and encouragement",
      isPinned: false,
      posts: []
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const threadData = mockThreadData[threadId] || mockThreadData[1];
      setThread(threadData);
      setLoading(false);
    }, 500);
  }, [threadId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // TODO: Send message to backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
    setReplyTo(null);
  };

  const handleLike = (postId) => {
    // TODO: Like post
    console.log('Liked post:', postId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39CCB7]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/circles/${circleId}`)}
          className="text-white hover:bg-white/10 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Circle
        </Button>

        {/* Thread Header */}
        <Card className="glass-card rounded-3xl p-8 border-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {thread.isPinned && (
                  <Pin className="w-5 h-5 text-[#39CCB7]" />
                )}
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {thread.title}
                </h1>
              </div>
              <p className="text-white/70 text-lg mb-4">
                {thread.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>Started by {thread.author.name}</span>
                <span>•</span>
                <span>{thread.posts?.length || 0} replies</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {thread.posts && thread.posts.length > 0 ? (
            thread.posts.map((post) => (
              <Card key={post.id} className="glass-card rounded-3xl p-6 border-0 hover:bg-white/5 transition-all">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{post.author}</h3>
                        <p className="text-white/50 text-sm">{post.timestamp}</p>
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center space-x-6 pt-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 text-sm transition-colors ${
                          post.liked ? 'text-[#39CCB7]' : 'text-white/60 hover:text-[#39CCB7]'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => setReplyTo(post.id)}
                        className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="glass-card rounded-3xl p-12 border-0 text-center">
              <MessageCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-white/60">Be the first to share in this thread!</p>
            </Card>
          )}
        </div>

        {/* Reply Box */}
        <Card className="glass-card rounded-3xl p-6 border-0 sticky bottom-24">
          {replyTo && (
            <div className="mb-4 flex items-center justify-between glass-card-light p-3 rounded-xl">
              <span className="text-white/70 text-sm">Replying to message #{replyTo}</span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex items-start space-x-4">
            <img
              src={user?.picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'}
              alt={user?.name || 'User'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[#39CCB7] outline-none resize-none"
                rows="3"
              />
              <div className="flex items-center justify-end mt-3">
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThreadDetail;
