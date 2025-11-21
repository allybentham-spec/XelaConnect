import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { mockActivities } from '../mock';
import { toast } from '../hooks/use-toast';

const Activity = () => {
  const handleAction = (activity) => {
    toast({
      title: 'Action Taken',
      description: `${activity.action} for: ${activity.title}`
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#39CCB7';
      case 'medium':
        return '#8834AE';
      case 'low':
        return '#207690';
      default:
        return '#6AAD73';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return Sparkles;
      case 'connection':
        return Users;
      case 'insight':
        return TrendingUp;
      default:
        return Zap;
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Activity
          </h1>
          <p className="text-white/60">
            Curated by your AI Concierge
          </p>
        </div>

        {/* AI Concierge Banner */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start space-x-4">
            <div className="glass-card-light p-3 rounded-2xl">
              <Sparkles className="w-6 h-6 text-[#39CCB7]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-2">
                We found the highest-value opportunities for you today
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Your AI Concierge has identified {mockActivities.length} personalized opportunities based on your goals and energy.
              </p>
            </div>
          </div>
        </Card>

        {/* Activities List */}
        <div className="space-y-4">
          {mockActivities.map((activity, idx) => {
            const Icon = getTypeIcon(activity.type);
            const priorityColor = getPriorityColor(activity.priority);

            return (
              <Card
                key={activity.id}
                className="glass-card rounded-3xl p-6 border-0 hover:bg-white/10 smooth-transition animate-fade-in-up"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div
                    className="p-3 rounded-2xl flex-shrink-0"
                    style={{ background: `${priorityColor}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: priorityColor }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white leading-tight">
                          {activity.title}
                        </h3>
                        <Badge
                          className="ml-2 flex-shrink-0 border-0"
                          style={{
                            background: `${priorityColor}20`,
                            color: priorityColor
                          }}
                        >
                          {activity.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{activity.time}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAction(activity)}
                        className="h-9 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90"
                      >
                        {activity.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Weekly Insight Card */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="glass-card-light p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-[#39CCB7]" />
              </div>
              <h3 className="text-lg font-semibold text-white">This Week's Growth</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-light rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-white/60">New Connections</div>
              </div>
              <div className="glass-card-light rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">8</div>
                <div className="text-xs text-white/60">Deep Conversations</div>
              </div>
            </div>

            <p className="text-center text-white/60 text-sm pt-2">
              Your connections don't need to be many — just meaningful.
            </p>
          </div>
        </Card>

        {/* Encouragement */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Even one conversation can shift your emotional world.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Activity;
