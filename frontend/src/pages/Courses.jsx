import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { BookOpen, Clock, PlayCircle, Loader2 } from 'lucide-react';
import { coursesAPI } from '../utils/api';
import { toast } from '../hooks/use-toast';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mental Health', 'Relationships', 'Self-Growth', 'Mindfulness', 'Emotional Intelligence'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAll();
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load courses',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = (courseTitle) => {
    toast({
      title: 'Course Started',
      description: `You've started: ${courseTitle}`
    });
  };

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Growth Courses
          </h1>
          <p className="text-white/60">
            Learn, grow, and evolve at your own pace.
          </p>
        </div>

        {/* Featured Course */}
        <Card className="glass-card rounded-3xl overflow-hidden border-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1682278763548-f349e3c73793"
              alt="Featured Course"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className="mb-3 bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                Featured
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-2">Master Your Emotions</h2>
              <p className="text-white/80 text-sm">Build emotional intelligence for deeper connections</p>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap smooth-transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#39CCB7] to-[#8834AE] text-white'
                  : 'glass-card text-white/70 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#39CCB7] animate-spin" />
          </div>
        )}

        {/* Courses List */}
        {!loading && (
          <div className="space-y-4">
            {filteredCourses.map((course, idx) => (
            <Card
              key={course.id}
              className="glass-card rounded-3xl p-6 border-0 hover:bg-white/10 smooth-transition animate-fade-in-up"
              style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
            >
              <div className="flex space-x-4">
                {/* Course Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {course.title}
                      </h3>
                      <Badge
                        className="ml-2 flex-shrink-0"
                        style={{
                          background: course.progress > 0 ? '#39CCB720' : '#20769020',
                          color: course.progress > 0 ? '#39CCB7' : '#207690',
                          border: 0
                        }}
                      >
                        {course.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-white/50">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{course.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {course.progress > 0 ? (
                    <div className="space-y-2">
                      <Progress value={course.progress} className="h-1.5" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">{course.progress}% Complete</span>
                        <Button
                          size="sm"
                          onClick={() => handleStartCourse(course.title)}
                          className="h-8 rounded-lg bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90"
                        >
                          <PlayCircle className="w-4 h-4 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleStartCourse(course.title)}
                      className="w-full h-9 rounded-lg glass-button text-white hover:bg-white/10"
                    >
                      Start Course
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          </div>
        )}

        {/* Encouragement Card */}
        <Card className="glass-card rounded-3xl p-6 border-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-center text-white/70 text-sm leading-relaxed">
            Tiny steps count more than perfect ones. Keep going.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Courses;
