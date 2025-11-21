import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sparkles, Send } from 'lucide-react';
import { mockMessages } from '../mock';

const XelaTalks = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'User',
      content: inputValue,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isAI: false
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I hear you. That takes courage to share. What would help most right now?",
        "You're doing better than you think. What's one small thing that brought you peace today?",
        "Sometimes the best next step is the smallest one. What feels manageable?",
        "Your feelings are valid. Would it help to explore what's underneath that?"
      ];

      const aiMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'Xela AI',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isAI: true
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pb-32 flex flex-col">
      <div className="max-w-lg mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="px-6 py-6 space-y-3 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <div className="glass-card-light p-3 rounded-2xl">
              <Sparkles className="w-6 h-6 text-[#39CCB7]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                XelaTalks
              </h1>
              <p className="text-white/60 text-sm">
                Your AI companion for reflection and growth
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-6">
          {messages.map((message, idx) => (
            <div
              key={message.id}
              className={`flex ${
                message.isAI ? 'justify-start' : 'justify-end'
              } animate-fade-in-up`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.isAI
                    ? 'glass-card'
                    : 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE]'
                }`}
              >
                {message.isAI && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#39CCB7]" />
                    <span className="text-xs font-medium text-white/70">Xela</span>
                  </div>
                )}
                <p className="text-white text-sm leading-relaxed">
                  {message.content}
                </p>
                <span className="text-xs text-white/50 mt-2 block">
                  {message.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="glass-card rounded-2xl p-4 max-w-[80%]">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#39CCB7]" />
                  <span className="text-xs font-medium text-white/70">Xela</span>
                </div>
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

        {/* Input Area */}
        <div className="px-6 pb-6">
          <Card className="glass-card rounded-2xl p-4 border-0">
            <div className="flex items-center space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                size="sm"
                className="rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <p className="text-center text-white/50 text-xs mt-3">
            One meaningful message can shift your whole day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default XelaTalks;
