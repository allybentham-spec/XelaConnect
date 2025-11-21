import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { MessageCircle, Users, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api`;

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('session_token');
      const response = await axios.get(`${API_URL}/messaging/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return 'No messages yet';
    const last = messages[messages.length - 1];
    return last.content.substring(0, 50) + (last.content.length > 50 ? '...' : '');
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Messages
          </h1>
          <p className="text-white/60">
            Your connections and conversations
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#39CCB7] animate-spin" />
          </div>
        )}

        {/* No conversations */}
        {!loading && conversations.length === 0 && (
          <Card className="glass-card rounded-3xl p-12 border-0 text-center">
            <MessageCircle className="w-16 h-16 text-[#39CCB7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Messages Yet</h3>
            <p className="text-white/60 mb-6">
              Start a conversation with someone from Discover or your Circles
            </p>
            <button
              onClick={() => navigate('/discover')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white font-medium hover:opacity-90 smooth-transition"
            >
              Discover People
            </button>
          </Card>
        )}

        {/* Conversations List */}
        {!loading && conversations.length > 0 && (
          <div className="space-y-3">
            {conversations.map((conversation, idx) => {
              const otherUser = conversation.other_user;
              if (!otherUser) return null;

              const unreadCount = conversation.messages?.filter(m => 
                !m.read && m.sender_id !== conversation.user_id
              ).length || 0;

              return (
                <Card
                  key={conversation.id}
                  onClick={() => navigate(`/chat/${otherUser.id}`)}
                  className="glass-card rounded-3xl p-4 border-0 hover:bg-white/10 smooth-transition cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden">
                        <img
                          src={otherUser.picture || 'https://via.placeholder.com/150'}
                          alt={otherUser.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#39CCB7] rounded-full border-2 border-[#1a1625]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold truncate">
                          {otherUser.name}
                        </h3>
                        <span className="text-xs text-white/50">
                          {getTimeAgo(conversation.last_message_at)}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 truncate">
                        {getLastMessage(conversation.messages)}
                      </p>
                    </div>

                    {/* Unread badge and arrow */}
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <Badge className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] border-0 h-6 min-w-6 flex items-center justify-center">
                          {unreadCount}
                        </Badge>
                      )}
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Bottom Message */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up">
          <p className="text-center text-white/70 text-sm leading-relaxed">
            One meaningful message can shift your whole day.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
