import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import Layout from './components/Layout';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import CommunityEnhanced from './pages/CommunityEnhanced';
import Courses from './pages/Courses';
import Discover from './pages/DiscoverEnhanced';
import XelaTalks from './pages/XelaTalks';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import Referral from './pages/Referral';
import Store from './pages/Store';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import VideoLobby from './pages/VideoLobby';
import VideoCall from './pages/VideoCall';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/xelatalks" element={<XelaTalks />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/store" element={<Store />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/video-lobby" element={<VideoLobby />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
