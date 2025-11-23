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
        { value: 1, label: "Never", description: "I always feel supported and connected" },
        { value: 2, label: "Rarely", description: "Very occasionally, but I bounce back quickly" },
        { value: 3, label: "Sometimes", description: "It varies depending on the situation" },
        { value: 4, label: "Often", description: "I frequently feel alone" },
        { value: 5, label: "Always", description: "This is a constant feeling for me" }
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
    
    // Auto-advance to next question after selection
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults();
      }
    }, 400); // Small delay for visual feedback
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

  const getCategoryScores = () => {
    const categories = {
      emotional: [1, 2, 3, 4],
      social: [5, 6, 7, 8],
      purpose: [9, 10, 11],
      quality: [12, 13, 14]
    };

    const scores = {};
    Object.keys(categories).forEach(cat => {
      const catQuestions = categories[cat];
      const catScore = catQuestions.reduce((sum, qId) => sum + (answers[qId] || 0), 0);
      const maxScore = catQuestions.length * 3;
      scores[cat] = {
        score: catScore,
        percentage: Math.round((catScore / maxScore) * 100),
        max: maxScore
      };
    });
    return scores;
  };

  const getResultMessage = () => {
    const score = getScore();
    const categoryScores = getCategoryScores();
    
    if (score <= 18) {
      return {
        level: "Thriving",
        color: "#39CCB7",
        title: "You're Flourishing!",
        message: "Your connection ecosystem is healthy and fulfilling. You have meaningful relationships, feel understood, and maintain emotional depth with the people in your life. You're doing the work.",
        recommendations: [
          "Continue nurturing your existing relationships with intentional check-ins",
          "Consider becoming a mentor in community circles to support others",
          "Explore new dimensions of connection through our advanced courses",
          "Share your story—your experience can inspire others on their journey"
        ],
        categoryScores,
        insight: "Your strongest connection area is where you feel most authentic. Keep building on this foundation."
      };
    } else if (score <= 28) {
      return {
        level: "Growing",
        color: "#8834AE",
        title: "You're on the Right Path",
        message: "You have some solid connections but recognize there's room to deepen them. This self-awareness is the first step to transformation. You're ready for the next level.",
        recommendations: [
          "Join 2-3 community circles aligned with your values and interests",
          "Practice vulnerability with one trusted person this week",
          "Use our Emotional Intelligence Path to build connection skills",
          "Schedule regular 1-on-1 time with people who energize you",
          "Try our guided conversation starters in Xela Talks"
        ],
        categoryScores,
        insight: "You have the foundation—now it's about intentionality. Small, consistent actions compound into deep connection."
      };
    } else {
      return {
        level: "Seeking",
        color: "#207690",
        title: "You're Not Alone in This",
        message: "Many high-achieving, thoughtful people feel exactly what you're feeling. The fact that you're here, taking this assessment, shows incredible self-awareness and courage. Connection is a skill—and you're about to learn it.",
        recommendations: [
          "Start with our Emotional Intelligence Path—it's designed for exactly where you are right now",
          "Join beginner-friendly circles where vulnerability is normalized and encouraged",
          "Book a session with Xela Talks to practice opening up in a judgment-free space",
          "Focus on quality over quantity: one genuine connection > 100 surface relationships",
          "Remember: This is temporary. You're building something real.",
          "Consider our Connection Jumpstart program for structured support"
        ],
        categoryScores,
        insight: "Your journey starts now. Every person in our thriving community started exactly where you are."
      };
    }
  };

  const result = showResults ? getResultMessage() : null;
  const progress = started ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Welcome Screen
  if (!started) {
    return (
      <div className="min-h-screen pb-32">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/10 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card className="glass-card rounded-3xl p-12 border-0 animate-fade-in-up">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="flex items-center justify-center mb-6">
                <div className="glass-card-light p-6 rounded-3xl">
                  <Heart className="w-16 h-16 text-[#39CCB7]" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Connection Assessment
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  A science-backed evaluation of your emotional well-being and social connection.
                </p>
              </div>

              <div className="glass-card-light rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-semibold text-white">What You'll Discover</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[#39CCB7]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-white/90 text-sm font-medium">Your connection strengths</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[#39CCB7]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-white/90 text-sm font-medium">Areas for growth</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[#39CCB7]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-white/90 text-sm font-medium">Personalized insights</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[#39CCB7]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-white/90 text-sm font-medium">Actionable next steps</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#39CCB7] mb-1">14</div>
                  <div className="text-sm text-white/60">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#39CCB7] mb-1">~3</div>
                  <div className="text-sm text-white/60">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#39CCB7] mb-1">4</div>
                  <div className="text-sm text-white/60">Dimensions</div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-white/50 text-sm mb-6">
                  Your responses are private and used only to provide personalized recommendations.
                </p>
                <Button
                  onClick={() => setStarted(true)}
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#39CCB7] to-[#8834AE] hover:opacity-90 text-lg font-bold"
                >
                  Begin Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
              <div className="glass-card-light rounded-2xl p-6">
                <p className="text-white/60 text-sm mb-3 text-center">Your Connection Score</p>
                <div className="text-5xl font-bold text-white mb-4 text-center">{getScore()}/42</div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(getScore() / 42) * 100}%`,
                      background: `linear-gradient(to right, ${result.color}, #8834AE)`
                    }}
                  />
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  <p className="text-white/70 text-sm font-medium mb-3">Dimension Breakdown:</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Emotional Connection</span>
                      <span className="text-[#39CCB7] font-semibold">{result.categoryScores.emotional.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#39CCB7] rounded-full transition-all duration-500"
                        style={{ width: `${100 - result.categoryScores.emotional.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Social Belonging</span>
                      <span className="text-[#8834AE] font-semibold">{result.categoryScores.social.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#8834AE] rounded-full transition-all duration-500"
                        style={{ width: `${100 - result.categoryScores.social.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Purpose & Meaning</span>
                      <span className="text-[#207690] font-semibold">{result.categoryScores.purpose.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#207690] rounded-full transition-all duration-500"
                        style={{ width: `${100 - result.categoryScores.purpose.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Relationship Quality</span>
                      <span className="text-[#39CCB7] font-semibold">{result.categoryScores.quality.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#39CCB7] rounded-full transition-all duration-500"
                        style={{ width: `${100 - result.categoryScores.quality.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs text-center italic">
                    {result.insight}
                  </p>
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
            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 glass-card-light px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#39CCB7]" />
              <span className="text-white/80 text-sm font-medium">{questions[currentQuestion].category}</span>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white leading-relaxed mb-2">
                {questions[currentQuestion].question}
              </h2>
              <p className="text-white/60 text-sm italic">
                {questions[currentQuestion].subtext}
              </p>
            </div>

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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{option.label}</span>
                      {answers[questions[currentQuestion].id] === option.value && (
                        <CheckCircle className="w-5 h-5 text-[#39CCB7]" />
                      )}
                    </div>
                    <p className="text-white/60 text-sm">{option.description}</p>
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
