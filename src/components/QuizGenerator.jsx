
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Timer, Code, Terminal, Cpu, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { topicQuestions } from '../data/advancedQuestions';

const QuizGenerator = ({ initialTopic, onBack }) => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === 'dark';

    // State Variables
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [loading, setLoading] = useState(false);

    // Initialization Logic (Static vs AI)
    useEffect(() => {
        if (initialTopic) {
            const staticData = topicQuestions[initialTopic];

            if (staticData && staticData.length > 0) {
                // Use Static Data (LinguaQuest content)
                // Use Static Data (LinguaQuest content)
                // Shuffle questions themselves
                // Load ALL questions (User request: 'usme que jayda the')
                const shuffledQs = [...staticData].sort(() => Math.random() - 0.5);
                setShuffledQuestions(shuffledQs);
                setLoading(false);
            } else {
                // Fallback to AI Generation
                generateQuestions(initialTopic);
            }
        }
    }, [initialTopic]);

    // Timer Logic
    useEffect(() => {
        if (showResult || shuffledQuestions.length === 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowResult(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [showResult, shuffledQuestions.length]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const generateQuestions = async (topic) => {
        setLoading(true);
        try {
            const prompt = `
                Act as **Khanmigo Quiz Generator**. Create a strictly structured JSON quiz about "${topic}".
                
                Rules:
                1. **5 Questions** (Progressive Difficulty).
                2. Format: Multiple Choice (4 Options).
                3. **Explanation**: Short, clear reason why the correct answer is right.
                4. **CRITICAL**: Ensure 'correctIndex' (0-3) EXACTLY matches the correct option.
                5. Include a 'codeSnippet' field if relevant (optional).

                Output Strictly JSON Array:
                [
                    {
                        "question": "Question text?",
                        "options": ["A", "B", "C", "D"],
                        "correctAnswer": 0,
                        "explanation": "Explanation text...",
                        "codeSnippet": "console.log('hello')" // Optional
                    }
                ]
            `;
            const API_KEY = "AIzaSyAdLPxoetB5VBJGBZTNji-jNLMw2Bj3yYQ";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error('Failed');
            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const quizData = JSON.parse(jsonText);

            if (Array.isArray(quizData) && quizData.length > 0) {
                // Map Gemini format to Quiz.jsx format if needed
                // Gemini: correctAnswer, Quiz.jsx: correctAnswer
                setShuffledQuestions(quizData);
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(false);
                setTimeLeft(3600);
            } else { throw new Error('No questions'); }
        } catch (error) {
            console.error("Quiz Error:", error);
            // Fallback
            setShuffledQuestions([{
                question: `What is the core concept of ${topic}? (Offline)`,
                options: ["Abstraction", "Complexity", "Decoration", "Nothing"],
                correctAnswer: 0,
                explanation: "Fallback question.",
                codeSnippet: null
            }]);
        } finally { setLoading(false); }
    };

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const checkAnswer = () => {
        if (selectedOption === null) return;
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const correct = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setIsAnswered(true);
        if (correct) setScore(prev => prev + 1);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsCorrect(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        const finalScore = score; // Use current score state
        const percentage = Math.round((finalScore / shuffledQuestions.length) * 100);
        const timeSpentSeconds = 3600 - timeLeft; // Calculate time spent

        // Save to LocalStorage for SkillPrint Analysis
        const historyItem = {
            topic: initialTopic || 'General Quiz',
            score: finalScore,
            total: shuffledQuestions.length,
            percentage: percentage,
            timeSpent: timeSpentSeconds,
            date: new Date().toISOString()
        };

        const existingHistory = JSON.parse(localStorage.getItem('practice_history') || '[]');
        localStorage.setItem('practice_history', JSON.stringify([historyItem, ...existingHistory]));

        setShowResult(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className={isDark ? "text-gray-400" : "text-slate-500"}>{t('Generating Quest...')}</p>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="max-w-xl mx-auto py-10 text-center space-y-8 animate-fade-in">
                <div className="glass-panel p-10 flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <CheckCircle size={48} className="text-white" />
                    </div>

                    <div className="space-y-4">
                        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Quest Completed!')}</h2>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">{t('Score')}</p>
                                <p className="text-2xl font-mono text-violet-400">{score}/{shuffledQuestions.length}</p>
                            </div>
                            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                                <p className="text-sm text-emerald-500 uppercase tracking-wider font-bold">{t('Accuracy')}</p>
                                <p className="text-2xl font-mono text-emerald-400">
                                    {shuffledQuestions.length > 0 ? Math.round((score / shuffledQuestions.length) * 100) : 0}%
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-lg">
                            {shuffledQuestions.length > 0 && Math.round((score / shuffledQuestions.length) * 100) >= 70
                                ? "🎉 Outstanding! You've mastered this topic!"
                                : "Keep practicing! You're getting better every day."}
                        </p>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button onClick={onBack} className="btn btn-secondary flex-1">{t('Back to Path')}</button>
                    </div>
                </div>
            </div>
        );
    }

    if (shuffledQuestions.length === 0) return null;

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (!currentQuestion) return null;
    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className={`p-2 rounded-full transition ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-200 text-slate-700'}`}>
                    <ArrowLeft size={24} />
                </button>

                {/* Timer */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <Timer size={18} className={timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-violet-400'} />
                    <span className={`font-mono text-sm font-bold ${timeLeft < 300 ? 'text-red-500' : (isDark ? 'text-gray-200' : 'text-slate-700')}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>

                <div className={`flex-1 mx-6 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-slate-200'}`}>
                    <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {currentQuestionIndex + 1}/{shuffledQuestions.length}
                </span>
            </div>

            {/* Question Card */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-4">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentQuestion.question}</h2>
                        {currentQuestion.codeSnippet && (
                            <pre className="bg-[#1e1e1e] p-4 rounded-xl text-left text-sm font-mono overflow-x-auto shadow-inner border border-white/5 text-slate-300">
                                <code>{currentQuestion.codeSnippet}</code>
                            </pre>
                        )}
                    </div>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                className={`
                  p-4 rounded-xl border text-left font-medium transition-all duration-200
                  ${isAnswered
                                        ? index === currentQuestion.correctAnswer
                                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                            : index === selectedOption
                                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                                : (isDark ? 'bg-white/5 border-white/5 opacity-50' : 'bg-slate-100 border-slate-200 opacity-50')
                                        : selectedOption === index
                                            ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20 scale-[1.02]'
                                            : (isDark
                                                ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300'
                                                : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-violet-300 text-slate-700')
                                    }
                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Bottom Action Bar */}
            <div className={`fixed bottom-0 left-0 w-full p-6 border-t z-50 backdrop-blur-lg transition-colors
                ${isDark ? 'bg-[#09090b]/90 border-white/10' : 'bg-white/90 border-slate-200'}
            `}>
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    {isAnswered ? (
                        <div className={`flex items-center gap-3 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
                            <div>
                                <p className="font-bold text-lg">{isCorrect ? t('Excellent!') : t('Incorrect')}</p>
                                {!isCorrect && <p className="text-sm text-gray-400">{t('Correct')}: {currentQuestion.options[currentQuestion.correctAnswer]}</p>}
                            </div>
                        </div>
                    ) : (
                        <div /> // Spacer
                    )}

                    <button
                        type="button"
                        onClick={isAnswered ? nextQuestion : checkAnswer}
                        disabled={selectedOption === null}
                        className={`
              px-10 py-4 rounded-xl font-bold text-lg transition-all relative z-50 cursor-pointer
              ${selectedOption === null
                                ? (isDark ? 'bg-gray-800 text-gray-500' : 'bg-slate-200 text-slate-400') + ' cursor-not-allowed opacity-50'
                                : isAnswered
                                    ? isCorrect
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 active:scale-95'
                                        : 'bg-gray-700 text-white hover:bg-gray-600 active:scale-95'
                                    : 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700 active:scale-95'
                            }
            `}
                        style={{ pointerEvents: 'auto' }}
                    >
                        {isAnswered ? (currentQuestionIndex === shuffledQuestions.length - 1 ? t('Finish') : t('Next')) : t('Check')}
                    </button>
                </div>
            </div>

            {/* Spacer for fixed footer */}
            <div className="h-24" />
        </div>
    );
};

export default QuizGenerator;
