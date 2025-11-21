import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api`;

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversation();
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchConversation, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = async () => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await axios.get(`${API_URL}/messaging/conversations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversation(response.data.conversation);
      setMessages(response.data.conversation.messages || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || sending) return;

    const messageText = inputValue.trim();
    setInputValue('');
    setSending(true);

    try {
      const token = localStorage.getItem('session_token');
      await axios.post(
        `${API_URL}/messaging/conversations/${userId}/messages`,
        { message: messageText },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Refresh conversation
      fetchConversation();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
      setInputValue(messageText);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAudioCall = () => {
    toast({
      title: 'Audio Call',
      description: 'Audio calling coming soon!'
    });
  };

  const handleVideoCall = () => {
    toast({
      title: 'Video Call',
      description: 'Video calling coming soon!'
    });
  };

  const otherUser = conversation?.other_user;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#39CCB7] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="glass-card border-b border-white/10 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="text-white/70 hover:text-white smooth-transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            {otherUser && (
              <>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={otherUser.picture || 'https://via.placeholder.com/150'}
                    alt={otherUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-white font-semibold">{otherUser.name}</h2>
                  <p className="text-xs text-[#39CCB7]">Online</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleAudioCall}
              className="p-2 rounded-xl glass-button text-white hover:bg-white/10 smooth-transition"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={handleVideoCall}
              className="p-2 rounded-xl glass-button text-white hover:bg-white/10 smooth-transition"
            >
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl glass-button text-white hover:bg-white/10 smooth-transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/60 text-sm">
                Start the conversation by saying hi!
              </p>
            </div>
          )}

          {messages.map((message, idx) => {
            const isOwn = message.sender_id === conversation?.user_id;
            return (
              <div
                key={message.message_id || idx}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    isOwn
                      ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE]'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-white text-sm leading-relaxed break-words">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-end space-x-2 mt-2">
                    <span className="text-xs text-white/50">
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                    {isOwn && message.read && (
                      <span className="text-xs text-white/70">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-card rounded-2xl p-4 max-w-[75%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#39CCB7] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-[#39CCB7] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-[#39CCB7] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 px-6 py-4">
        <div className="max-w-lg mx-auto">
          <Card className="glass-card rounded-2xl p-4 border-0">
            <div className="flex items-center space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || sending}
                size="sm"
                className="rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 disabled:opacity-40"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
