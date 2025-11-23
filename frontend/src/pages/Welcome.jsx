import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Heart, Users } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39CCB7]/10 via-transparent to-[#8834AE]/10" />
      
      <div className="max-w-md w-full space-y-8 animate-fade-in-up relative z-10">
        {/* Logo/Brand */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="glass-card-light p-4 rounded-3xl pulse-glow">
              <img 
                src="https://customer-assets.emergentagent.com/job_brandtone-1/artifacts/11ho960t_AppIcon.png" 
                alt="XelaConnect Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            XelaConnect
          </h1>
          <p className="text-xl text-white/80">
            Let's reconnect you with real people
          </p>
        </div>

        {/* Value Props */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-[#39CCB7] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white/90 text-sm leading-relaxed">
                Real connection is possible. You deserve relationships that feel like home.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-[#8834AE] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white/70 text-xs">
                Built for humans seeking genuine belonging, emotional safety, and aligned friendships.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/signup')}
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 smooth-transition shadow-lg"
          >
            Create Account
          </Button>
          
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-2xl glass-button text-white border-white/20"
          >
            Sign In
          </Button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-center text-sm text-white/60 hover:text-white/80 smooth-transition py-2"
          >
            Continue as Guest
          </button>
        </div>

        {/* Bottom message */}
        <p className="text-center text-white/50 text-xs px-4">
          Connection begins with one small step.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
