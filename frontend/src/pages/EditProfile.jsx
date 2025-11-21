import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Save, Loader2, Camera, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { identityBadges } from '../mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api`;

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    age: user?.age || '',
    city: user?.city || '',
    picture: user?.picture || '',
    identity_badge: user?.identityBadge || user?.identity_badge || '',
    interests: user?.interests || []
  });

  const allInterests = [
    'Wellness', 'Fitness', 'Creative', 'Social', 'Outdoor', 'Lifestyle',
    'Yoga', 'Meditation', 'Running', 'Cycling', 'Swimming', 'Hiking',
    'Art', 'Music', 'Writing', 'Photography', 'Reading', 'Cooking',
    'Travel', 'Technology', 'Philosophy', 'Books', 'Coffee', 'Nature',
    'Mental Health', 'Personal Growth', 'Mindfulness', 'Community'
  ];

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('session_token');
      
      await axios.put(
        `${API_URL}/users/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local storage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('xela_user', JSON.stringify(updatedUser));

      toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully'
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInterestToggle = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const selectedBadge = identityBadges.find(b => b.name === formData.identity_badge);

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 text-white/70 hover:text-white smooth-transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Edit Profile
          </h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Profile Picture */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#39CCB7]/20">
                <img
                  src={formData.picture || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 glass-card-light p-2 rounded-full hover:bg-white/20 smooth-transition">
                <Camera className="w-4 h-4 text-[#39CCB7]" />
              </button>
            </div>
            <div className="w-full space-y-2">
              <Label className="text-white/90 text-sm">Profile Picture URL</Label>
              <Input
                value={formData.picture}
                onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                placeholder="https://example.com/your-photo.jpg"
                className="h-10 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </Card>

        {/* Basic Info */}
        <Card className="glass-card rounded-3xl p-6 border-0 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-white/90">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell people about yourself..."
              rows={4}
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
            />
            <p className="text-xs text-white/50">Share what makes you unique</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white/90">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-white/90">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="San Francisco"
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </Card>

        {/* Identity Badge */}
        <Card className="glass-card rounded-3xl p-6 border-0 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Connection Identity</h3>
            <p className="text-sm text-white/60">How you show up in the world</p>
          </div>

          {selectedBadge && (
            <div className="glass-card-light rounded-2xl p-4 flex items-center space-x-4">
              <div className="text-4xl">{selectedBadge.emoji}</div>
              <div className="flex-1">
                <div className="text-white font-semibold">{selectedBadge.name}</div>
                <div className="text-sm text-white/70">{selectedBadge.description}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {identityBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setFormData({ ...formData, identity_badge: badge.name })}
                className={`glass-card-light rounded-2xl p-4 text-left hover:bg-white/10 smooth-transition ${
                  formData.identity_badge === badge.name ? 'ring-2 ring-[#39CCB7]' : ''
                }`}
              >
                <div className="text-2xl mb-2">{badge.emoji}</div>
                <div className="text-white text-sm font-medium">{badge.name}</div>
                <div className="text-white/60 text-xs mt-1">{badge.description}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Interests */}
        <Card className="glass-card rounded-3xl p-6 border-0 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Your Interests</h3>
            <p className="text-sm text-white/60">Select all that apply ({formData.interests.length} selected)</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium smooth-transition ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                      : 'glass-card-light text-white/70 hover:text-white'
                  }`}
                >
                  {interest}
                  {isSelected && <X className="w-3 h-3 inline ml-1" />}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Save Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-lg font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Encouragement */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            How you show up matters more than the details.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
