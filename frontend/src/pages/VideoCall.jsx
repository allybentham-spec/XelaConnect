import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DailyIframe from '@daily-co/daily-js';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Users,
  Monitor,
  MonitorOff 
} from 'lucide-react';

const VideoCall = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [callObject, setCallObject] = useState(null);
  const [callFrame, setCallFrame] = useState(null);
  const [participants, setParticipants] = useState({});
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  
  const containerRef = useRef(null);
  const roomName = searchParams.get('room');
  const isHost = searchParams.get('host') === 'true';

  useEffect(() => {
    const initializeCall = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        if (!isAuthenticated || !user) {
          setError('Please login to join a call');
          setTimeout(() => navigate('/login'), 1500);
          return;
        }
        
        // Check if user has real authentication (not mock)
        if (!user.session_token) {
          setError('Video calling requires a full account. Please sign up or login with a real account.');
          setLoading(false);
          setTimeout(() => navigate('/signup'), 3000);
          return;
        }

        const userName = user.name || 'User';
        const token = user.session_token;
        let finalRoomName = roomName;

        try {
          // If no room name, create a new room
          if (!finalRoomName) {
            const roomResponse = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/video/rooms/create`,
              {
                privacy: 'public'
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            finalRoomName = roomResponse.data.name;
          }

          // Generate meeting token
          const tokenResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/video/rooms/token`,
            {
              room_name: finalRoomName,
              user_name: userName,
              is_owner: isHost,
              expiration_minutes: 120
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const meetingToken = tokenResponse.data.token;

        // Create Daily call object with iframe
        const newCallFrame = DailyIframe.createFrame(containerRef.current, {
          showLeaveButton: false,
          showFullscreenButton: false,
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: '0',
            borderRadius: '12px'
          }
        });

        setCallFrame(newCallFrame);
        
        // Set up event listeners
        newCallFrame
          .on('joined-meeting', () => {
            console.log('Joined meeting successfully');
            setCallStarted(true);
            setLoading(false);
          })
          .on('left-meeting', () => {
            console.log('Left meeting');
            navigate('/dashboard');
          })
          .on('participant-joined', (event) => {
            console.log('Participant joined:', event.participant);
            updateParticipants(newCallFrame);
          })
          .on('participant-left', (event) => {
            console.log('Participant left:', event.participant);
            updateParticipants(newCallFrame);
          })
          .on('error', (error) => {
            console.error('Daily error:', error);
            setError(`Call error: ${error.errorMsg || 'Unknown error'}`);
          });

        // Join the room
        const joinOptions = {
          url: `https://xelaconnect.daily.co/${finalRoomName}`,
          userName: userName
        };
        
        // Only add token if we have one (real auth users)
        if (meetingToken) {
          joinOptions.token = meetingToken;
        }
        
        await newCallFrame.join(joinOptions);

        setCallObject(newCallFrame);

      } catch (err) {
        console.error('Error initializing call:', err);
        setError(
          err.response?.data?.detail || 
          err.message || 
          'Failed to initialize call'
        );
        setLoading(false);
      }
    };

    initializeCall();

    // Cleanup
    return () => {
      if (callFrame) {
        callFrame.destroy();
      }
    };
  }, [roomName, isHost, navigate, isAuthenticated, user]);

  const updateParticipants = (frame) => {
    if (frame) {
      const allParticipants = frame.participants();
      setParticipants(allParticipants);
    }
  };

  const toggleMicrophone = async () => {
    if (callFrame) {
      await callFrame.setLocalAudio(!isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = async () => {
    if (callFrame) {
      await callFrame.setLocalVideo(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleScreenShare = async () => {
    if (callFrame) {
      if (isScreenSharing) {
        await callFrame.stopScreenShare();
        setIsScreenSharing(false);
      } else {
        await callFrame.startScreenShare();
        setIsScreenSharing(true);
      }
    }
  };

  const leaveCall = async () => {
    if (callFrame) {
      await callFrame.leave();
      navigate('/dashboard');
    }
  };

  const participantCount = Object.keys(participants).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8834AE] via-purple-600 to-[#39CCB7] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5" />
            <span className="font-semibold">
              {participantCount} {participantCount === 1 ? 'participant' : 'participants'}
            </span>
          </div>
          
          {error && (
            <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Video Container */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl backdrop-blur-sm z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg font-semibold">Joining call...</p>
              </div>
            </div>
          )}
          
          <div 
            ref={containerRef}
            className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}
          />
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            onClick={toggleMicrophone}
            variant={isMicOn ? 'default' : 'destructive'}
            size="lg"
            className={`rounded-full w-14 h-14 ${
              isMicOn 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          <Button
            onClick={toggleCamera}
            variant={isCameraOn ? 'default' : 'destructive'}
            size="lg"
            className={`rounded-full w-14 h-14 ${
              isCameraOn 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            onClick={toggleScreenShare}
            variant="default"
            size="lg"
            className={`rounded-full w-14 h-14 ${
              isScreenSharing
                ? 'bg-[#39CCB7] hover:bg-[#39CCB7]/80 text-white'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isScreenSharing ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
          </Button>

          <Button
            onClick={leaveCall}
            variant="destructive"
            size="lg"
            className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Room Info */}
        {callStarted && roomName && (
          <div className="mt-4 text-center">
            <p className="text-white/80 text-sm">
              Room: <span className="font-semibold text-white">{roomName}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
