import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeStage, setFadeStage] = useState(0);

  useEffect(() => {
    // Fade-in sequence timing (slower, more contemplative)
    const timers = [
      setTimeout(() => setFadeStage(1), 300),      // Logo fade in (wait a bit)
      setTimeout(() => setFadeStage(2), 1200),     // Tagline fade in (give logo time)
      setTimeout(() => setFadeStage(3), 2000),     // Breathing animation (pause)
      setTimeout(() => setFadeStage(4), 2800),     // Welcome message
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 4500) // Complete after 4.5 seconds (was 3)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#39CCB7] via-[#207690] to-[#8834AE] animate-fade-in">
      <div className="text-center space-y-8">
        {/* Logo with Glow */}
        <div
          className={`transition-all duration-1000 ${
            fadeStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative inline-block">
            {/* Soft glow effect */}
            <div className="absolute inset-0 blur-3xl bg-white/20 rounded-full scale-150 animate-pulse" />
            
            {/* Logo text */}
            <h1
              className="relative text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              XelaConnect
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`text-white/90 text-xl font-light tracking-wide transition-all duration-1000 delay-300 ${
            fadeStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Where real connection begins.
        </p>

        {/* Breathing Animation */}
        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${
            fadeStage >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-16 h-16">
            {/* Outer breathing circle */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-breath" />
            {/* Middle breathing circle */}
            <div className="absolute inset-2 rounded-full bg-white/30 animate-breath-delayed" />
            {/* Inner circle */}
            <div className="absolute inset-4 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Welcome Message */}
        <p
          className={`text-white/70 text-sm font-light tracking-widest uppercase transition-all duration-1000 delay-700 ${
            fadeStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Welcome in...
        </p>
      </div>

      {/* Brand Mark at Bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/30 text-xs tracking-widest">
          XelaConnect™
        </p>
      </div>

      {/* Custom CSS for breathing animation */}
      <style jsx>{`
        @keyframes breath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.4;
          }
        }

        @keyframes breath-delayed {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        .animate-breath {
          animation: breath 4s ease-in-out infinite;
        }

        .animate-breath-delayed {
          animation: breath-delayed 4s ease-in-out infinite 0.6s;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
