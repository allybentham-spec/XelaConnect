import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, MessageCircle, Zap, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Discover', href: '/discover', icon: BookOpen },
    { name: 'Activity', href: '/activity', icon: Zap },
    { name: 'Profile', href: '/profile', icon: User }
  ];

  // Don't show navigation on auth pages
  const authPages = ['/', '/login', '/signup'];
  const showNav = isAuthenticated && !authPages.includes(location.pathname);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0c1a 0%, #1a1625 100%)' }}>
      {children}
      
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-lg mx-auto px-4 pb-6">
            <div className="glass-card rounded-3xl p-2">
              <div className="flex justify-around items-center">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl smooth-transition ${
                        isActive
                          ? 'bg-gradient-to-br from-[#39CCB7]/20 to-[#8834AE]/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 smooth-transition ${
                          isActive
                            ? 'text-[#39CCB7]'
                            : 'text-white/60'
                        }`}
                      />
                      <span
                        className={`text-xs mt-1 smooth-transition ${
                          isActive
                            ? 'text-white font-medium'
                            : 'text-white/50'
                        }`}
                      >
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
