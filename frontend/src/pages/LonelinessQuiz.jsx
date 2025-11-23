import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, ArrowLeft, ArrowRight, CheckCircle, Users, MessageCircle, TrendingUp } from 'lucide-react';

const LonelinessQuiz = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    // Emotional Loneliness (4 questions)
    {
      id: 1,
      category: "Emotional Connection",
      question: "How often do you feel that you lack companionship?",
      subtext: "Think about the quality of emotional support in your life",
      options: [
        { value: 1, label: "Hardly ever", description: "I feel supported and connected" },
        { value: 2, label: "Some of the time", description: "It varies depending on the day" },
        { value: 3, label: "Often", description: "I frequently feel alone" }
      ]
    },
    {
      id: 2,
      category: "Emotional Connection",
      question: "How often do you feel left out?",
      subtext: "Consider both social situations and deeper relationships",
      options: [
        { value: 1, label: "Hardly ever", description: "I feel included and valued" },
        { value: 2, label: "Some of the time", description: "Sometimes I feel on the outside" },
        { value: 3, label: "Often", description: "I regularly feel excluded" }
      ]
    },
    {
      id: 3,
      category: "Emotional Connection",
      question: "Do you feel understood by the people around you?",
      subtext: "Think about whether people truly 'get' who you are",
      options: [
        { value: 1, label: "Most of the time", description: "People understand my perspective" },
        { value: 2, label: "Sometimes", description: "Some understand, others don't" },
        { value: 3, label: "Rarely or never", description: "I feel misunderstood" }
      ]
    },
    {
      id: 4,
      category: "Emotional Connection",
      question: "How often can you be your authentic self with others?",
      subtext: "No masks, no performance—just you",
      options: [
        { value: 1, label: "Most of the time", description: "I can be myself freely" },
        { value: 2, label: "With select people", description: "Only with a few trusted individuals" },
        { value: 3, label: "Rarely or never", description: "I often hide parts of myself" }
      ]
    },

    // Social Loneliness (4 questions)
    {
      id: 5,
      category: "Social Belonging",
      question: "How would you describe your sense of belonging to a community?",
      subtext: "This could be friends, family, or chosen communities",
      options: [
        { value: 1, label: "Strong sense of belonging", description: "I have my people and my place" },
        { value: 2, label: "Somewhat connected", description: "I belong to some groups but not deeply" },
        { value: 3, label: "Feel like an outsider", description: "I haven't found my community yet" }
      ]
    },
    {
      id: 6,
      category: "Social Belonging",
      question: "When was the last time you had a meaningful conversation?",
      subtext: "A conversation that left you feeling energized, not drained",
      options: [
        { value: 1, label: "Within the past few days", description: "I regularly have deep talks" },
        { value: 2, label: "Within the past month", description: "They happen occasionally" },
        { value: 3, label: "Can't remember", description: "It's been too long" }
      ]
    },
    {
      id: 7,
      category: "Social Belonging",
      question: "How many people could you call if you needed support right now?",
      subtext: "Real support, not just surface-level acquaintances",
      options: [
        { value: 1, label: "Several people", description: "I have a solid support system" },
        { value: 2, label: "One or two people", description: "I have a couple close friends" },
        { value: 3, label: "No one or uncertain", description: "I'm not sure who I'd call" }
      ]
    },
    {
      id: 8,
      category: "Social Belonging",
      question: "How often do you have social interactions that feel forced or draining?",
      subtext: "Quality matters more than quantity",
      options: [
        { value: 1, label: "Rarely", description: "My interactions energize me" },
        { value: 2, label: "Sometimes", description: "About half feel genuine" },
        { value: 3, label: "Most of the time", description: "Social situations exhaust me" }
      ]
    },

    // Existential Isolation (3 questions)
    {
      id: 9,
      category: "Purpose & Meaning",
      question: "Do you feel your relationships align with your values and goals?",
      subtext: "Are the people in your life going in the same direction?",
      options: [
        { value: 1, label: "Yes, we're aligned", description: "We support each other's growth" },
        { value: 2, label: "Somewhat", description: "Some alignment, some disconnect" },
        { value: 3, label: "Not really", description: "I feel out of sync with others" }
      ]
    },
    {
      id: 10,
      category: "Purpose & Meaning",
      question: "How often do you feel isolated despite being around people?",
      subtext: "The 'lonely in a crowded room' feeling",
      options: [
        { value: 1, label: "Rarely", description: "Connection feels real" },
        { value: 2, label: "Occasionally", description: "It happens sometimes" },
        { value: 3, label: "Frequently", description: "I often feel alone in crowds" }
      ]
    },
    {
      id: 11,
      category: "Purpose & Meaning",
      question: "Do you feel like you're living authentically or just going through the motions?",
      subtext: "Are you building the life you actually want?",
      options: [
        { value: 1, label: "Living authentically", description: "I'm aligned with my values" },
        { value: 2, label: "Somewhere in between", description: "Some areas feel right, others don't" },
        { value: 3, label: "Going through motions", description: "I feel disconnected from my life" }
      ]
    },

    // Connection Quality (3 questions)
    {
      id: 12,
      category: "Relationship Quality",
      question: "How would you rate the emotional depth of your closest relationships?",
      subtext: "Can you share your fears, dreams, and vulnerabilities?",
      options: [
        { value: 1, label: "Deep and vulnerable", description: "We share everything" },
        { value: 2, label: "Moderately deep", description: "We share some deeper things" },
        { value: 3, label: "Surface-level", description: "We keep it light" }
      ]
    },
    {
      id: 13,
      category: "Relationship Quality",
      question: "Do your relationships feel reciprocal or one-sided?",
      subtext: "Is the effort and care balanced?",
      options: [
        { value: 1, label: "Mostly reciprocal", description: "We show up for each other" },
        { value: 2, label: "Mixed", description: "Some balanced, some not" },
        { value: 3, label: "Often one-sided", description: "I give more than I receive" }
      ]
    },
    {
      id: 14,
      category: "Relationship Quality",
      question: "How comfortable are you being vulnerable with the people in your life?",
      subtext: "Can you show up as your full, imperfect self?",
      options: [
        { value: 1, label: "Very comfortable", description: "Vulnerability feels safe" },
        { value: 2, label: "Somewhat comfortable", description: "With certain people only" },
        { value: 3, label: "Uncomfortable", description: "I keep my guard up" }
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
