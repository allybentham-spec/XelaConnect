import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Video, Users, Sparkles, AlertCircle } from 'lucide-react';

const VideoLobby = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  
  useEffect(() => {
    // Check if user is using mock account (no session_token)
    if (isAuthenticated && user && !user.session_token) {
      setShowDemoWarning(true);
    }
  }, [isAuthenticated, user]);

  const startNewCall = () => {
    setIsLoading(true);
    // Navigate to video call without room name - will create new room
    navigate('/video-call?host=true');
  };

  const joinCall = () => {
    if (!roomName.trim()) {
      alert('Please enter a room name to join');
      return;
    }
    setIsLoading(true);
    navigate(`/video-call?room=${roomName.trim()}&host=false`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8834AE] via-purple-600 to-[#39CCB7] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Demo Warning */}
        {showDemoWarning && (
          <div className="mb-6 bg-yellow-500/20 backdrop-blur-md border-2 border-yellow-400/50 rounded-xl p-4 text-white">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Demo Account Limitation</h3>
                <p className="text-white/90 text-sm mb-3">
                  Video calling requires a full account with authentication. Your current demo account doesn't support video calls.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 h-auto"
                  >
                    Sign Up for Full Access
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    className="bg-transparent hover:bg-white/10 text-white text-sm px-4 py-2 h-auto border border-white/30"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            XelaConnect Video Calls
          </h1>
          <p className="text-white/80 text-lg">
            Connect face-to-face with your community
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Start New Call Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#39CCB7]/20">
                  <Sparkles className="w-6 h-6 text-[#39CCB7]" />
                </div>
                <CardTitle className="text-2xl">Start New Call</CardTitle>
              </div>
              <CardDescription className="text-white/70 text-base">
                Create a new video room and invite others to join
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Host a 1-on-1 or group call</li>
                    <li>• Up to 200 participants</li>
                    <li>• Audio & video controls</li>
                    <li>• Screen sharing</li>
                  </ul>
                </div>
                <Button
                  onClick={startNewCall}
                  disabled={isLoading || showDemoWarning}
                  className="w-full bg-gradient-to-r from-[#39CCB7] to-[#39CCB7]/80 hover:from-[#39CCB7]/90 hover:to-[#39CCB7]/70 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Starting...' : showDemoWarning ? 'Requires Full Account' : 'Start New Call'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Join Existing Call Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#8834AE]/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Join Call</CardTitle>
              </div>
              <CardDescription className="text-white/70 text-base">
                Enter a room name to join an existing call
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName" className="text-white font-medium">
                    Room Name
                  </Label>
                  <Input
                    id="roomName"
                    type="text"
                    placeholder="e.g., wellness-chat-2025"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        joinCall();
                      }
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 h-12"
                  />
                  <p className="text-xs text-white/60">
                    Ask the host for the room name to join
                  </p>
                </div>

                <Button
                  onClick={joinCall}
                  disabled={isLoading || !roomName.trim() || showDemoWarning}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Joining...' : showDemoWarning ? 'Requires Full Account' : 'Join Call'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <p className="text-white/80 text-sm">
              <span className="font-semibold text-white">Free Tier:</span> 10,000 minutes/month • 
              Up to 200 participants per room • HD video & audio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLobby;
