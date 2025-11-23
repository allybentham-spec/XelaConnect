import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Settings, LogOut, ChevronRight, User as UserIcon, Shield, Bell, HelpCircle, Gift, ShoppingBag, Sparkles, Award, BookOpen, Lock, Globe, Trash2, Edit, Upload, CheckCircle, AlertCircle, Camera, Moon, Sun, CreditCard, BarChart3, AlertTriangle, Power } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { identityBadges } from '../mock';
import { reflectionsAPI } from '../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reflections, setReflections] = useState([]);
  const [loadingReflections, setLoadingReflections] = useState(true);
  const [editingReflection, setEditingReflection] = useState(null);
  
  // New state for enhanced profile
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    energyType: '',
    interests: []
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [currentPlan, setCurrentPlan] = useState('Premium'); // Mock: Premium, Elite, or Free
  
  const interestOptions = [
    'Wellness & Self-Care',
    'Fitness & Health',
    'Creative Arts',
    'Personal Growth',
    'Career & Business',
    'Travel & Adventure',
    'Music & Entertainment',
    'Food & Cooking',
    'Reading & Writing',
    'Technology & Innovation',
    'Mental Health',
    'Spirituality',
    'Social Impact',
    'Photography',
    'Sports & Outdoors'
  ];
  
  // Profile completeness calculation
  const calculateCompleteness = () => {
    let completed = 0;
    const total = 6;
    
    if (profilePhoto || user?.picture) completed++;
    if (profileData.bio) completed++;
    if (profileData.energyType) completed++;
    if (profileData.interests.length > 0) completed++;
    if (isVerified) completed++;
    if (user?.name) completed++;
    
    return Math.round((completed / total) * 100);
  };
  
  const getIncompleteItems = () => {
    const items = [];
    if (!profilePhoto && !user?.picture) items.push('Add profile photo');
    if (!profileData.bio) items.push('Write your bio');
    if (!profileData.energyType) items.push('Complete energy signature');
    if (profileData.interests.length === 0) items.push('Add interests');
    if (!isVerified) items.push('Verify your identity');
    return items;
  };

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      setLoadingReflections(true);
      const response = await reflectionsAPI.getAll();
      setReflections(response.data.reflections || []);
    } catch (error) {
      console.error('Error fetching reflections:', error);
    } finally {
      setLoadingReflections(false);
    }
  };

  const handleTogglePrivacy = async (reflectionId, currentPrivacy) => {
    try {
      await reflectionsAPI.update(reflectionId, { is_public: !currentPrivacy });
      toast({
        title: 'Privacy Updated',
        description: !currentPrivacy ? 'Reflection is now public' : 'Reflection is now private'
      });
      fetchReflections();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update privacy',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteReflection = async (reflectionId) => {
    if (!window.confirm('Are you sure you want to delete this reflection?')) {
      return;
    }

    try {
      await reflectionsAPI.delete(reflectionId);
      toast({
        title: 'Reflection Deleted',
        description: 'Your reflection has been removed'
      });
      fetchReflections();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete reflection',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'See you soon!'
    });
    navigate('/');
  };

  const userIdentityBadge = identityBadges.find(b => b.name === user?.identityBadge);
  
  const completeness = calculateCompleteness();
  const incompleteItems = getIncompleteItems();

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      toast({
        title: 'Photo Uploaded',
        description: 'Your profile photo has been updated'
      });
    }
  };

  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setIdFile(file);
      toast({
        title: 'ID Uploaded',
        description: 'Your identity verification is under review'
      });
      setShowUploadModal(false);
      // Simulate verification
      setTimeout(() => {
        setIsVerified(true);
        toast({
          title: 'Verified!',
          description: 'Your identity has been verified successfully'
        });
      }, 2000);
    } else {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive'
      });
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully'
    });
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate it anytime by logging back in.')) {
      toast({
        title: 'Account Deactivated',
        description: 'Your account has been deactivated'
      });
      setTimeout(() => logout(), 2000);
    }
  };

  const handleDeleteAccount = () => {
    const confirmText = prompt('Type "DELETE" to permanently delete your account:');
    if (confirmText === 'DELETE') {
      toast({
        title: 'Account Deleted',
        description: 'Your account and all data has been permanently deleted',
        variant: 'destructive'
      });
      setTimeout(() => logout(), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Page Title */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Profile & Settings
          </h1>
          <p className="text-white/60">Manage your account and preferences</p>
        </div>
        {/* Profile Completeness */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Profile Completeness</h2>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-[#39CCB7]" />
                <span className="text-2xl font-bold text-white">{completeness}%</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#39CCB7] to-[#8834AE] rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>

            {completeness < 100 && (
              <>
                <div className="pt-2">
                  <p className="text-red-400 font-medium mb-3">Your profile needs attention</p>
                  <p className="text-white/70 text-sm mb-4">Complete your profile to make better connections:</p>
                  
                  <ul className="space-y-2 mb-4">
                    {incompleteItems.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {incompleteItems.length > 3 && (
                      <li className="text-white/60 text-sm pl-4">+{incompleteItems.length - 3} more items</li>
                    )}
                  </ul>
                </div>

                <Button
                  onClick={() => document.getElementById('profile-section').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90"
                >
                  Complete Your Profile
                </Button>
              </>
            )}

            {completeness === 100 && (
              <div className="flex items-center space-x-3 pt-2">
                <CheckCircle className="w-6 h-6 text-[#39CCB7]" />
                <p className="text-[#39CCB7] font-medium">Your profile is complete!</p>
              </div>
            )}
          </div>
        </Card>

        {/* Profile Section */}
        <div id="profile-section" className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <UserIcon className="w-6 h-6 text-[#39CCB7]" />
            <span>Profile</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#39CCB7]/20">
                    <img
                      src={profilePhoto || user?.picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute -bottom-1 -right-1 glass-card-light p-2 rounded-full cursor-pointer hover:bg-white/20 transition-all">
                    <Camera className="w-4 h-4 text-[#39CCB7]" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoUpload}
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <label className="w-full cursor-pointer">
                    <div className="glass-card-light rounded-xl p-4 hover:bg-white/10 transition-all text-center">
                      <Upload className="w-5 h-5 text-[#39CCB7] mx-auto mb-1" />
                      <p className="text-white/80 text-sm font-medium">Upload Photo</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-white/70 text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full glass-card-light rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-[#39CCB7] outline-none"
                  placeholder={user?.name || 'allybentham'}
                />
                <p className="text-white/40 text-xs mt-2">Name is managed through your authentication provider</p>
              </div>

              {/* Email */}
              <div>
                <label className="text-white/70 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  className="w-full glass-card-light rounded-xl px-4 py-3 text-white/60 border-0 outline-none cursor-not-allowed"
                  placeholder={user?.email || 'allybentham@gmail.com'}
                  disabled
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-white/70 text-sm mb-2 block">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full glass-card-light rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-[#39CCB7] outline-none resize-none"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Energy Type */}
              <div>
                <label className="text-white/70 text-sm mb-2 block">Energy Type</label>
                <select
                  value={profileData.energyType}
                  onChange={(e) => setProfileData({ ...profileData, energyType: e.target.value })}
                  className="w-full glass-card-light rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-[#39CCB7] outline-none"
                >
                  <option value="">Select your energy type...</option>
                  <option value="builder">Builder - Action-oriented & driven</option>
                  <option value="connector">Connector - Relationship-focused</option>
                  <option value="creative">Creative - Innovative & expressive</option>
                  <option value="analyzer">Analyzer - Strategic & thoughtful</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="text-white/70 text-sm mb-2 block">Interests</label>
                <input
                  type="text"
                  placeholder="Wellness, Fitness, Creative (comma-separated)"
                  className="w-full glass-card-light rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-[#39CCB7] outline-none"
                  onChange={(e) => setProfileData({ ...profileData, interests: e.target.value.split(',').map(i => i.trim()) })}
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveProfile}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>

        {/* Identity Verification */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Shield className="w-6 h-6 text-[#39CCB7]" />
            <span>Identity Verification</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <div className="space-y-4">
              <p className="text-white/80 text-sm">
                Get a verified badge on your profile by uploading a government-issued ID
              </p>

              {isVerified ? (
                <div className="glass-card-light rounded-xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-[#39CCB7] mx-auto mb-3" />
                  <p className="text-[#39CCB7] font-semibold text-lg mb-1">Verified</p>
                  <p className="text-white/60 text-sm">Your identity has been verified successfully</p>
                </div>
              ) : (
                <>
                  <div className="glass-card-light rounded-xl p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <p className="text-yellow-500 font-semibold text-lg mb-1">Not Verified</p>
                    <p className="text-white/60 text-sm mb-4">
                      Upload a government-issued ID to get verified and build trust with other members
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowUploadModal(true)}
                    className="w-full h-12 rounded-xl glass-button border border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload ID
                  </Button>

                  <div className="text-white/50 text-xs space-y-1 pt-2">
                    <p>• Accepted formats: JPG, PNG, PDF (max 10MB)</p>
                    <p>• We accept: Driver's License, Passport, National ID Card</p>
                    <p>• Your ID will be securely stored and only used for verification purposes</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* ID Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowUploadModal(false)}
            />
            <Card className="relative glass-card rounded-3xl p-8 border-0 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-4">Upload Your ID</h3>
              <p className="text-white/70 text-sm mb-6">
                Please upload a clear photo of your government-issued ID
              </p>
              
              <label className="block">
                <div className="glass-card-light rounded-2xl p-12 border-2 border-dashed border-white/20 hover:border-[#39CCB7]/50 transition-all cursor-pointer text-center">
                  <Upload className="w-12 h-12 text-[#39CCB7] mx-auto mb-4" />
                  <p className="text-white/80 font-medium mb-2">Choose File</p>
                  <p className="text-white/50 text-xs">JPG, PNG, PDF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={handleIdUpload}
                />
              </label>

              <Button
                onClick={() => setShowUploadModal(false)}
                variant="outline"
                className="w-full mt-4 h-12 rounded-xl glass-button text-white border-white/20"
              >
                Cancel
              </Button>
            </Card>
          </div>
        )}

        {/* Preferences */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Settings className="w-6 h-6 text-[#39CCB7]" />
            <span>Preferences</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {darkMode ? <Moon className="w-6 h-6 text-[#39CCB7]" /> : <Sun className="w-6 h-6 text-[#39CCB7]" />}
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-white/60 text-sm">Adjust your display theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  darkMode ? 'bg-[#39CCB7]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                    darkMode ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </Card>
        </div>

        {/* Subscription Management */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-[#39CCB7]" />
            <span>Subscription Management</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <div className="space-y-4">
              <p className="text-white/80 text-sm">Manage your subscription plan and billing</p>
              
              <div className="glass-card-light rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Current Plan</p>
                    <p className="text-white font-bold text-2xl">Premium</p>
                  </div>
                  <Badge className="glass-card bg-gradient-to-r from-[#39CCB7] to-[#8834AE] border-0 text-white px-4 py-2">
                    Premium
                  </Badge>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl glass-button text-white border-white/20 hover:bg-white/10"
                  onClick={() => toast({ title: 'Coming Soon', description: 'Subscription management will be available soon' })}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Usage */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-[#39CCB7]" />
            <span>Daily Usage</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <p className="text-white/80 text-sm mb-4">
              Your daily limits reset every 24 hours. Upgrade for unlimited access.
            </p>
            
            <div className="glass-card-light rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39CCB7] mx-auto mb-3"></div>
              <p className="text-white/60 text-sm">Loading usage data...</p>
            </div>
          </Card>
        </div>

        {/* Account Management */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Shield className="w-6 h-6 text-[#39CCB7]" />
            <span>Account Management</span>
          </h2>
          
          <Card className="glass-card rounded-3xl p-6 border-0">
            <p className="text-white/80 text-sm mb-6">
              Manage your account status. These actions are reversible or permanent.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={handleDeactivateAccount}
                variant="outline"
                className="w-full h-12 rounded-xl glass-button text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10"
              >
                <Power className="w-5 h-5 mr-2" />
                Deactivate Account
              </Button>
              
              <Button
                onClick={handleDeleteAccount}
                variant="outline"
                className="w-full h-12 rounded-xl glass-button text-red-400 border-red-400/30 hover:bg-red-400/10"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account Permanently
              </Button>
            </div>
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 rounded-2xl glass-button text-white border-white/20 hover:bg-white/10 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

      </div>
    </div>
  );
};

export default Profile;
