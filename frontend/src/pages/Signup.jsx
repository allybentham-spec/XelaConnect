import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    city: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await signup(formData);
      toast({
        title: 'Welcome to XelaConnect!',
        description: 'Your account has been created successfully.'
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign up with Google.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <button
        onClick={() => step === 1 ? navigate('/') : setStep(1)}
        className="flex items-center space-x-2 text-white/70 hover:text-white smooth-transition mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              {step === 1 ? 'Join XelaConnect' : 'Tell Us About You'}
            </h1>
            <p className="text-white/60">
              {step === 1 ? 'Connection begins with one small step' : 'Just a few more details'}
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-6">
            {step === 1 && (
              <>
                {/* Google Sign Up */}
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full h-12 rounded-xl glass-button text-white font-medium hover:bg-white/10"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 text-white/50 bg-[#1a1625]">
                      Or create with email
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/90">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#39CCB7] focus:ring-[#39CCB7]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#39CCB7] focus:ring-[#39CCB7]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                      className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#39CCB7] focus:ring-[#39CCB7]"
                    />
                    <p className="text-xs text-white/40">Loneliness is your mind reminding you it's time for more connection.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white/90">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                      min={18}
                      className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#39CCB7] focus:ring-[#39CCB7]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white/90">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#39CCB7] focus:ring-[#39CCB7]"
                    />
                    <p className="text-xs text-white/40">Even one meaningful connection can change everything.</p>
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  step === 1 ? 'Continue' : 'Create Account'
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-white/60 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#39CCB7] hover:text-[#39CCB7]/80 font-medium smooth-transition"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
