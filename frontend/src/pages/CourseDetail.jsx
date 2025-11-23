import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Users,
  Award,
  Play,
  CheckCircle2,
  Lock,
  Star,
  Download,
  Share2,
  Heart,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { coursesAPI } from '../utils/api';
import { toast } from '../hooks/use-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      // Fetch course details
      const response = await coursesAPI.get(courseId);
      setCourse(response.data);
      
      // Check enrollment status
      const enrollmentStatus = await coursesAPI.checkEnrollment(courseId);
      setIsEnrolled(enrollmentStatus.data.enrolled);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: 'Error',
        description: 'Failed to load course details',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (course.price === 'Free') {
      // Free course - enroll directly
      try {
        await coursesAPI.enroll(courseId);
        setIsEnrolled(true);
        toast({
          title: '🎉 Enrolled Successfully!',
          description: `You're now enrolled in ${course.title}. Let's begin your journey!`
        });
        navigate(`/course/${courseId}/learn`);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to enroll. Please try again.',
          variant: 'destructive'
        });
      }
    } else {
      // Paid course - show payment modal
      setShowPayment(true);
    }
  };

  const handleStartLearning = () => {
    navigate(`/course/${courseId}/learn`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39CCB7] mx-auto mb-4"></div>
          <p className="text-white/60">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Course not found</p>
          <Button onClick={() => navigate('/courses')} className="mt-4">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <Card className="glass-card rounded-3xl overflow-hidden border-0">
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient || 'from-[#39CCB7] to-[#8834AE]'} opacity-60`} />
            
            {/* Badge */}
            <Badge className="absolute top-4 right-4 bg-white/20 text-white border-0 backdrop-blur-md">
              {course.category}
            </Badge>

            {/* Enrollment Status */}
            {isEnrolled && (
              <div className="absolute top-4 left-4 glass-card-light px-4 py-2 rounded-full backdrop-blur-md">
                <span className="text-white text-sm font-medium flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#39CCB7]" />
                  Enrolled
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {course.title}
              </h1>
              {course.tagline && (
                <p className="text-[#39CCB7] text-lg italic mb-3">
                  {course.tagline}
                </p>
              )}
              <p className="text-white/70 text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Price and Stats */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              {course.price && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Course Investment</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl font-bold text-white">{course.price}</span>
                      {course.original_price && (
                        <span className="text-lg text-white/40 line-through">{course.original_price}</span>
                      )}
                    </div>
                  </div>
                  {course.original_price && course.price && (
                    <div className="text-right">
                      <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0 text-lg px-4 py-2">
                        Save {Math.round(((parseFloat(course.original_price.replace('$', '')) - parseFloat(course.price.replace('$', ''))) / parseFloat(course.original_price.replace('$', ''))) * 100)}%
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-6 py-2 border-t border-white/10">
                <div className="flex items-center space-x-2 text-white/70">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration || '6 weeks'}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.total_lessons || course.lessons || 24} lessons</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolled || 1240} enrolled</span>
                </div>
                <div className="flex items-center space-x-2 text-[#39CCB7]">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">{course.rating || 4.8}</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center space-x-4 p-6 glass-card rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center text-white font-semibold text-2xl">
                {course.instructor?.charAt(0) || 'X'}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">{course.instructor || 'Expert Instructor'}</p>
                <p className="text-white/60 text-sm mb-2">Course Instructor</p>
                {course.instructor_bio && (
                  <p className="text-white/70 text-sm leading-relaxed">{course.instructor_bio}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isEnrolled ? (
                <Button
                  onClick={handleStartLearning}
                  className="flex-1 bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white py-6 rounded-xl text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Continue Learning
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleEnroll}
                    className="flex-1 bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white py-6 rounded-xl text-lg font-semibold"
                  >
                    {course.price === 'Free' || !course.price ? 'Start Free Preview' : `Enroll Now - ${course.price}`}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 p-4 rounded-xl"
                  >
                    <Heart className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 p-4 rounded-xl"
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* What You'll Learn */}
        <Card className="glass-card rounded-3xl p-8 border-0">
          <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(course.learningOutcomes || [
              'Master core concepts and techniques',
              'Build practical, real-world skills',
              'Gain confidence in your abilities',
              'Connect with like-minded learners'
            ]).map((outcome, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#39CCB7] flex-shrink-0 mt-0.5" />
                <p className="text-white/80">{outcome}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Curriculum */}
        <Card className="glass-card rounded-3xl p-8 border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
            {course.preview_modules && course.preview_modules.length > 0 && (
              <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                {course.preview_modules.length} Free Preview Module{course.preview_modules.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <div className="space-y-3">
            {(course.modules || [
              { title: 'Introduction & Foundations', lessons: [{ title: 'Getting Started' }], duration: '45 min' },
              { title: 'Core Concepts', lessons: [{ title: 'Deep Dive' }], duration: '1.5 hours' }
            ]).map((module, idx) => {
              const isPreview = course.preview_modules && course.preview_modules.includes(idx);
              const isLocked = !isEnrolled && !isPreview;
              
              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-5 transition-all ${
                    isLocked ? 'opacity-60' : 'hover:bg-white/10 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg ${
                        isPreview ? 'bg-gradient-to-br from-[#39CCB7] to-[#8834AE]' : 
                        isLocked ? 'bg-white/10' : 'bg-gradient-to-br from-[#39CCB7] to-[#8834AE]'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-white font-semibold">{module.title}</h3>
                          {isPreview && (
                            <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0 text-xs">
                              FREE PREVIEW
                            </Badge>
                          )}
                        </div>
                        {module.description && (
                          <p className="text-white/60 text-sm mb-1">{module.description}</p>
                        )}
                        <p className="text-white/50 text-sm">
                          {module.lessons?.length || 0} lessons · {module.duration}
                        </p>
                      </div>
                    </div>
                    {isLocked ? (
                      <Lock className="w-5 h-5 text-white/40" />
                    ) : (
                      <Play className="w-5 h-5 text-[#39CCB7]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Reviews */}
        <Card className="glass-card rounded-3xl p-8 border-0">
          <h2 className="text-2xl font-bold text-white mb-6">Student Testimonials</h2>
          <div className="space-y-4">
            {(course.testimonials || [
              { name: 'Sarah M.', rating: 5, text: 'Life-changing course! The instructor explains everything so clearly.' },
              { name: 'John D.', rating: 5, text: 'Best investment in myself. Highly recommend to anyone starting their journey.' },
              { name: 'Emily R.', rating: 4, text: 'Great content and well-structured. Would love more practical examples.' }
            ]).map((review, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{review.name}</p>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#39CCB7] fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/70">{review.text || review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          course={course}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setIsEnrolled(true);
            setShowPayment(false);
            toast({
              title: '🎉 Payment Successful!',
              description: 'You are now enrolled in the course',
            });
            navigate(`/course/${courseId}/learn`);
          }}
        />
      )}
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ course, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="glass-card rounded-3xl p-8 border-0 max-w-md w-full mx-4 animate-slide-up">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Enroll in Course</h2>
          <p className="text-white/60">You're about to start your learning journey</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70">Course Fee</span>
            <span className="text-2xl font-bold text-white">{course.price}</span>
          </div>
          <div className="h-px bg-white/10 my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">Total</span>
            <span className="text-2xl font-bold text-[#39CCB7]">{course.price}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white py-6 rounded-xl text-lg"
          >
            {processing ? 'Processing...' : 'Complete Payment'}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 py-6 rounded-xl"
          >
            Cancel
          </Button>
        </div>

        <p className="text-center text-white/40 text-xs mt-4">
          Secure payment powered by XelaConnect
        </p>
      </Card>
    </div>
  );
};

export default CourseDetail;
