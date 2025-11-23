import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, ArrowLeft, ArrowRight, CheckCircle, Users, MessageCircle, TrendingUp } from 'lucide-react';

const LonelinessQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How often do you feel that you lack companionship?",
      options: [
        { value: 1, label: "Hardly ever" },
        { value: 2, label: "Some of the time" },
        { value: 3, label: "Often" }
      ]
    },
    {
      id: 2,
      question: "How often do you feel left out?",
      options: [
        { value: 1, label: "Hardly ever" },
        { value: 2, label: "Some of the time" },
        { value: 3, label: "Often" }
      ]
    },
    {
      id: 3,
      question: "How often do you feel isolated from others?",
      options: [
        { value: 1, label: "Hardly ever" },
        { value: 2, label: "Some of the time" },
        { value: 3, label: "Often" }
      ]
    },
    {
      id: 4,
      question: "How would you rate the quality of your relationships?",
      options: [
        { value: 3, label: "I feel disconnected" },
        { value: 2, label: "Some are meaningful" },
        { value: 1, label: "Most are meaningful" }
      ]
    },
    {
      id: 5,
      question: "When was the last time you had a deep conversation?",
      options: [
        { value: 1, label: "Within the past week" },
        { value: 2, label: "Within the past month" },
        { value: 3, label: "Can't remember" }
      ]
    },
    {
      id: 6,
      question: "Do you feel understood by the people around you?",
      options: [
        { value: 1, label: "Most of the time" },
        { value: 2, label: "Sometimes" },
        { value: 3, label: "Rarely or never" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    return total;
  };

  const getResultMessage = () => {
    const score = getScore();
    
    if (score <= 8) {
      return {
        level: "Low Loneliness",
        color: "#39CCB7",
        title: "You're Doing Great!",
        message: "Your connection levels are healthy. You have meaningful relationships and feel supported. Keep nurturing these connections and continue being open to new friendships.",
        recommendations: [
          "Join community circles to expand your network",
          "Share your experience with others who are struggling",
          "Maintain your current relationships through regular check-ins"
        ]
      };
    } else if (score <= 13) {
      return {
        level: "Moderate Loneliness",
        color: "#8834AE",
        title: "Room for Growth",
        message: "You experience some feelings of disconnection. This is common and there are clear paths to deepen your connections. Small steps can make a big difference.",
        recommendations: [
          "Discover people who match your interests and values",
          "Join 2-3 community circles that resonate with you",
          "Practice reaching out to existing connections more often",
          "Try our guided conversation prompts in Xela Talks"
        ]
      };
    } else {
      return {
        level: "High Loneliness",
        color: "#207690",
        title: "You're Not Alone in This",
        message: "Many people feel this way, and it takes courage to acknowledge it. The good news? Connection is a skill that can be learned and practiced. You're in the right place.",
        recommendations: [
          "Start with our Emotional Intelligence Path",
          "Join supportive circles where vulnerability is welcomed",
          "Use Xela Talks to practice opening up in a safe space",
          "Consider our guided programs for building connection skills",
          "Remember: Reaching out is strength, not weakness"
        ]
      };
    }
  };

  const result = showResults ? getResultMessage() : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen pb-32">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/10 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Results Card */}
          <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: `${result.color}20` }}
                >
                  <CheckCircle className="w-10 h-10" style={{ color: result.color }} />
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {result.title}
                </h1>
                <p className="text-xl font-semibold mb-4" style={{ color: result.color }}>
                  {result.level}
                </p>
                <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
                  {result.message}
                </p>
              </div>

              {/* Score Display */}
              <div className="glass-card-light rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-white/60 text-sm mb-2">Your Connection Score</p>
                <div className="text-5xl font-bold text-white mb-2">{getScore()}/18</div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(getScore() / 18) * 100}%`,
                      background: `linear-gradient(to right, ${result.color}, #8834AE)`
                    }}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="text-left space-y-4 pt-6">
                <h3 className="text-xl font-semibold text-white text-center mb-4">
                  Recommended Next Steps
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 glass-card-light rounded-xl p-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${result.color}30` }}
                      >
                        <span className="text-sm font-bold" style={{ color: result.color }}>
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-3 pt-6">
                <Button
                  onClick={() => navigate('/community')}
                  className="h-16 rounded-xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
                >
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-sm font-semibold">Join Circles</span>
                </Button>
                <Button
                  onClick={() => navigate('/discover')}
                  className="h-16 rounded-xl glass-button text-white hover:bg-white/10 flex flex-col items-center justify-center"
                >
                  <Heart className="w-5 h-5 mb-1" />
                  <span className="text-sm font-semibold">Discover</span>
                </Button>
                <Button
                  onClick={() => navigate('/emotional-intelligence')}
                  className="h-16 rounded-xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 flex flex-col items-center justify-center"
                >
                  <TrendingUp className="w-5 h-5 mb-1" />
                  <span className="text-sm font-semibold">Start Path</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-white hover:bg-white/10 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <div className="glass-card-light p-4 rounded-2xl">
              <Heart className="w-8 h-8 text-[#39CCB7]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Connection Check-In
          </h1>
          <p className="text-white/70">
            Understanding where you are is the first step to meaningful connection
          </p>
        </div>

        {/* Progress Bar */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-[#39CCB7] text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#39CCB7] to-[#8834AE] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card rounded-3xl p-8 border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                  className={`w-full p-5 rounded-2xl text-left transition-all ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'glass-card-light ring-2 ring-[#39CCB7] bg-[#39CCB7]/10'
                      : 'glass-card hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option.label}</span>
                    {answers[questions[currentQuestion].id] === option.value && (
                      <CheckCircle className="w-5 h-5 text-[#39CCB7]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            variant="outline"
            className="glass-button text-white border-white/20 hover:bg-white/10 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
            className="bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LonelinessQuiz;
