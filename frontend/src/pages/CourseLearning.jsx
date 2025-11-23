import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Volume2,
  Maximize,
  Download,
  FileText,
  MessageCircle,
  BookOpen,
  Award,
  ChevronDown,
  ChevronRight,
  Lock
} from 'lucide-react';
import { coursesAPI } from '../utils/api';
import { toast } from '../hooks/use-toast';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, notes, resources, discussions

  useEffect(() => {
    fetchCourseContent();
  }, [courseId]);

  const fetchCourseContent = async () => {
    try {
      const response = await coursesAPI.getContent(courseId);
      setCourse(response.data);
      
      // Set first lesson as current
      if (response.data.modules && response.data.modules[0]?.lessons) {
        setCurrentLesson(response.data.modules[0].lessons[0]);
      }

      // Fetch progress
      const progressData = await coursesAPI.getProgress(courseId);
      setProgress(progressData.data.progress || 0);
      setCompletedLessons(progressData.data.completedLessons || []);
    } catch (error) {
      console.error('Error fetching course content:', error);
    }
  };

  const handleLessonComplete = async () => {
    if (!currentLesson) return;

    try {
      await coursesAPI.markComplete(courseId, currentLesson.id);
      setCompletedLessons([...completedLessons, currentLesson.id]);
      
      // Calculate new progress
      const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
      const newProgress = ((completedLessons.length + 1) / totalLessons) * 100;
      setProgress(newProgress);

      toast({
        title: '✅ Lesson Complete!',
        description: 'Great progress! Keep going.',
      });

      // Auto-navigate to next lesson
      handleNextLesson();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const handleNextLesson = () => {
    // Find next lesson
    for (let i = 0; i < course.modules.length; i++) {
      const module = course.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
      
      if (lessonIndex !== -1) {
        // Found current lesson
        if (lessonIndex < module.lessons.length - 1) {
          // Next lesson in same module
          setCurrentLesson(module.lessons[lessonIndex + 1]);
          return;
        } else if (i < course.modules.length - 1) {
          // First lesson of next module
          setCurrentLesson(course.modules[i + 1].lessons[0]);
          return;
        }
      }
    }
    
    // No next lesson - course complete!
    toast({
      title: '🎉 Course Complete!',
      description: 'Congratulations! You\'ve completed the entire course.',
    });
  };

  const handlePreviousLesson = () => {
    // Find previous lesson
    for (let i = course.modules.length - 1; i >= 0; i--) {
      const module = course.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
      
      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          // Previous lesson in same module
          setCurrentLesson(module.lessons[lessonIndex - 1]);
          return;
        } else if (i > 0) {
          // Last lesson of previous module
          const prevModule = course.modules[i - 1];
          setCurrentLesson(prevModule.lessons[prevModule.lessons.length - 1]);
          return;
        }
      }
    }
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39CCB7] mx-auto mb-4"></div>
          <p className="text-white/60">Loading course...</p>
        </div>
      </div>
    );
  }

  const isLessonComplete = completedLessons.includes(currentLesson.id);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Course Content */}
      {showSidebar && (
        <div className="w-80 glass-card border-r border-white/10 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate(`/course/${courseId}`)}
                className="text-white hover:bg-white/10 mb-4 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
              <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-white/60 text-sm">
                  {Math.round(progress)}% Complete · {completedLessons.length}/{course.totalLessons || 0} Lessons
                </p>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-3">
              {course.modules.map((module, moduleIdx) => (
                <ModuleAccordion
                  key={moduleIdx}
                  module={module}
                  moduleIndex={moduleIdx}
                  currentLesson={currentLesson}
                  completedLessons={completedLessons}
                  onLessonSelect={setCurrentLesson}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Video/Content Player */}
        <div className="bg-black">
          <div className="aspect-video relative">
            {currentLesson.videoUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">Video Player</p>
                  <p className="text-white/40 text-sm mt-2">{currentLesson.videoUrl}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#39CCB7]/20 to-[#8834AE]/20">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white">Reading Material</p>
                </div>
              </div>
            )}

            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="absolute top-4 left-4 glass-card-light p-2 rounded-lg backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 text-white transition-transform ${showSidebar ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Lesson Info & Controls */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 space-y-6">
            {/* Lesson Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0">
                  Lesson {currentLesson.order || 1}
                </Badge>
                {isLessonComplete && (
                  <Badge className="bg-[#39CCB7]/20 text-[#39CCB7] border-0 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                {currentLesson.title}
              </h1>
              <p className="text-white/70 text-lg">
                {currentLesson.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 border-b border-white/10">
              {['overview', 'notes', 'resources', 'discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 capitalize rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? 'text-[#39CCB7] border-b-2 border-[#39CCB7]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <Card className="glass-card rounded-2xl p-6 border-0">
                    <h3 className="text-xl font-semibold text-white mb-4">Lesson Overview</h3>
                    <div className="text-white/80 leading-relaxed space-y-4">
                      <p>{currentLesson.content || 'In this lesson, you\'ll learn the fundamental concepts that will build the foundation for your understanding.'}</p>
                      <p>We'll cover key topics and practical examples that you can apply immediately to your own journey.</p>
                    </div>
                  </Card>

                  {/* Key Takeaways */}
                  <Card className="glass-card rounded-2xl p-6 border-0">
                    <h3 className="text-xl font-semibold text-white mb-4">Key Takeaways</h3>
                    <div className="space-y-3">
                      {(currentLesson.keyTakeaways || [
                        'Understand core principles',
                        'Apply practical techniques',
                        'Build confidence in your skills',
                        'Prepare for the next lesson'
                      ]).map((takeaway, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-[#39CCB7] flex-shrink-0 mt-0.5" />
                          <p className="text-white/80">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'notes' && (
                <Card className="glass-card rounded-2xl p-6 border-0">
                  <h3 className="text-xl font-semibold text-white mb-4">Your Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes as you learn..."
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[#39CCB7] outline-none resize-none"
                  />
                  <Button className="mt-4 bg-gradient-to-r from-[#39CCB7] to-[#8834AE]">
                    Save Notes
                  </Button>
                </Card>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-3">
                  {(currentLesson.resources || [
                    { name: 'Lesson PDF Guide', size: '2.4 MB', type: 'PDF' },
                    { name: 'Practice Worksheet', size: '1.2 MB', type: 'PDF' },
                    { name: 'Additional Reading', size: '850 KB', type: 'PDF' }
                  ]).map((resource, idx) => (
                    <Card key={idx} className="glass-card rounded-2xl p-4 border-0 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{resource.name}</p>
                            <p className="text-white/50 text-sm">{resource.type} · {resource.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-[#39CCB7] hover:bg-white/10">
                          <Download className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'discussions' && (
                <Card className="glass-card rounded-2xl p-6 border-0">
                  <h3 className="text-xl font-semibold text-white mb-4">Discussion</h3>
                  <div className="space-y-4">
                    <div className="glass-card rounded-xl p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#39CCB7] to-[#8834AE] flex items-center justify-center text-white text-sm font-semibold">
                          S
                        </div>
                        <div>
                          <p className="text-white font-medium">Sarah K.</p>
                          <p className="text-white/50 text-xs">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-white/80">This lesson really helped me understand the concept! Thank you!</p>
                    </div>
                    
                    <Button className="w-full bg-white/10 hover:bg-white/15 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join Discussion
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Lesson Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <Button
                onClick={handlePreviousLesson}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>

              <div className="flex items-center space-x-3">
                {!isLessonComplete && (
                  <Button
                    onClick={handleLessonComplete}
                    className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
                <Button
                  onClick={handleNextLesson}
                  className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white"
                >
                  Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Certificate Section (if course complete) */}
            {progress === 100 && (
              <Card className="glass-card rounded-3xl p-8 border-0 bg-gradient-to-br from-[#39CCB7]/10 to-[#8834AE]/10">
                <div className="text-center">
                  <Award className="w-16 h-16 text-[#39CCB7] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-white/70 mb-6">
                    You've completed the entire course. Download your certificate!
                  </p>
                  <Button className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-white px-8">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Module Accordion Component
const ModuleAccordion = ({ module, moduleIndex, currentLesson, completedLessons, onLessonSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 glass-card rounded-xl hover:bg-white/10 transition-all"
      >
        <div className="flex items-center space-x-3">
          <ChevronRight className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          <div className="text-left">
            <p className="text-white font-medium">Module {moduleIndex + 1}</p>
            <p className="text-white/50 text-sm">{module.title}</p>
          </div>
        </div>
        <Badge className="bg-white/10 text-white/70 border-0 text-xs">
          {module.lessons.length}
        </Badge>
      </button>

      {isOpen && (
        <div className="space-y-1 ml-4">
          {module.lessons.map((lesson, idx) => {
            const isComplete = completedLessons.includes(lesson.id);
            const isCurrent = currentLesson?.id === lesson.id;

            return (
              <button
                key={lesson.id}
                onClick={() => onLessonSelect(lesson)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-[#39CCB7]/20 text-[#39CCB7]'
                    : 'hover:bg-white/5 text-white/70'
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-[#39CCB7] flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="text-sm flex-1 text-left truncate">
                  {lesson.title}
                </span>
                {lesson.duration && (
                  <span className="text-xs text-white/40">{lesson.duration}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseLearning;
