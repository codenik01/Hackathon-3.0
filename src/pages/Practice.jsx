
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Play, Lock, Star, CheckCircle, Code, Terminal, Cpu, Database, Coffee, Globe, Sparkles, Flame, Trophy, Map, User, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import QuizGenerator from '../components/QuizGenerator';

import { questTopics } from '../data/advancedQuestions';

// Quests Data (Visual Metadata)
const quests = [
    { id: 1, title: 'C Basics: The Foundation', xp: 50, locked: false, completed: true, stars: 3, icon: <Terminal size={24} />, topicId: 1 },
    { id: 2, title: 'C++ OOPs Concepts', xp: 100, locked: false, completed: false, stars: 0, icon: <Code size={24} />, topicId: 2 },
    { id: 3, title: 'Python: AI & Scripting', xp: 120, locked: false, completed: false, stars: 0, icon: <Code size={24} className="text-blue-400" />, topicId: 3 },
    { id: 4, title: 'HTML5 Structure', xp: 150, locked: false, completed: false, stars: 0, icon: <Globe size={24} className="text-orange-500" />, topicId: 4 },
    { id: 5, title: 'CSS3 Styling Mastery', xp: 180, locked: false, completed: false, stars: 0, icon: <Sparkles size={24} className="text-blue-500" />, topicId: 5 },
    { id: 6, title: 'JavaScript Interactivity', xp: 200, locked: false, completed: false, stars: 0, icon: <Code size={24} className="text-yellow-400" />, topicId: 6 },
    { id: 7, title: 'Data Structures (DSA)', xp: 250, locked: false, completed: false, stars: 0, icon: <Database size={24} />, topicId: 7 },
    { id: 8, title: 'Java Mastery Curriculum', xp: 300, locked: false, completed: false, stars: 0, icon: <Coffee size={24} />, topicId: 8 },
];

const Practice = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === 'dark';
    const glassClass = "glass-panel"; // From index.css

    // View State: 'path', 'topics', 'leaderboard', 'quiz'
    const [view, setView] = useState('path');

    const [selectedQuestId, setSelectedQuestId] = useState(null); // ID of the clicked quest (e.g., 1 for C)
    const [currentPathTopic, setCurrentPathTopic] = useState(null); // Specific topic ID for Quiz (e.g., 'c_intro')

    // Handlers
    const handleQuestClick = (questId) => {
        setSelectedQuestId(questId);
        setView('topics');
    };

    const handleTopicClick = (topicId) => {
        setCurrentPathTopic(topicId);
        setView('quiz');
    };

    const handleBack = () => {
        if (view === 'quiz') setView('topics');
        else if (view === 'topics') setView('path');
        else setView('path');
    };

    // Get Topics for selected Quest
    const currentQuestData = selectedQuestId ? questTopics[selectedQuestId] : null;

    return (
        <div className={`min-h-screen transition-colors duration-300 relative pb-20 md:pb-0
            ${isDark ? 'bg-[#09090b] text-slate-100' : 'bg-slate-50 text-slate-900'}
        `}>
            {/* Top Navigation / Stats Header */}
            <div className={`sticky top-0 z-30 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center max-w-5xl mx-auto rounded-b-3xl shadow-xl transition-colors
                ${isDark ? 'bg-[#09090b]/80 border-white/10' : 'bg-white/80 border-slate-200'}
            `}>
                <div className="flex items-center gap-4 md:gap-6">
                    {(view === 'topics' || view === 'quiz') && (
                        <button onClick={handleBack} className={`p-2 rounded-full transition ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}>
                            <ArrowLeft size={20} />
                        </button>
                    )}
                   <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                   </div>
                </div>

                {/* Desktop Nav Tabs */}
                <div className="hidden md:flex items-center gap-2">
                    <button onClick={() => setView('path')} className={`px-4 py-2 rounded-xl font-bold transition-all ${['path', 'topics', 'quiz'].includes(view) ? (isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-900') : 'text-slate-500 hover:text-slate-400'}`}>{t('Map')}</button>
                   
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className={`md:hidden fixed bottom-0 left-0 w-full z-50 border-t flex justify-around p-4 backdrop-blur-xl
                ${isDark ? 'bg-[#09090b]/90 border-white/10' : 'bg-white/90 border-slate-200'}
            `}>
                <button onClick={() => setView('path')} className={`flex flex-col items-center gap-1 ${['path', 'topics', 'quiz'].includes(view) ? 'text-violet-500' : 'text-slate-400'}`}>
                    <Map size={24} /> <span className="text-xs font-bold">{t('Map')}</span>
                </button>
                <button onClick={() => setView('leaderboard')} className={`flex flex-col items-center gap-1 ${view === 'leaderboard' ? 'text-violet-500' : 'text-slate-400'}`}>
                    <Trophy size={24} /> <span className="text-xs font-bold">{t('Rank')}</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[80vh]">
                {view === 'quiz' && (
                    <div className="p-4 md:p-8">
                        <QuizGenerator
                            initialTopic={currentPathTopic}
                            onBack={handleBack}
                        />
                    </div>
                )}

                {view === 'topics' && currentQuestData && (
                    <div className="max-w-2xl mx-auto py-10 space-y-8 animate-fade-in p-4">
                        <div className="text-center space-y-2 mb-8">
                            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentQuestData.title}</h1>
                            <p className={isDark ? 'text-gray-400' : 'text-slate-500'}>{t('Select a topic to start your quest')}</p>
                        </div>

                        <div className="grid gap-4">
                            {currentQuestData.topics.map((topic, idx) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => handleTopicClick(topic.id)}
                                    className={`${glassClass} p-4 flex items-center justify-between cursor-pointer group hover:border-violet-500/50`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                            {topic.icon || '📜'}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'} group-hover:text-violet-500 transition-colors`}>{topic.title}</h3>
                                            <p className="text-xs text-gray-500">{topic.count} questions • 50 XP</p>
                                        </div>
                                    </div>
                                    <button className={`p-2 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-violet-500 group-hover:text-white' : 'bg-slate-200 group-hover:bg-violet-500 group-hover:text-white'} transition-colors`}>
                                        <Play size={16} fill="currentColor" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'path' && (
                    <div className="max-w-2xl mx-auto py-10 space-y-8 animate-fade-in p-4">
                        <div className="text-center space-y-2 mb-12">
                            <h1 className={`text-4xl font-bold font-heading 
                                ${isDark ? 'text-white' : 'text-slate-900'}
                            `}>
                                {t('Code Mastery Path')}
                            </h1>
                            <p className={isDark ? 'text-gray-400' : 'text-slate-500'}>{t('Master C, C++, Python, Web Dev & DSA to become a dev legend!')}</p>
                        </div>

                        <div className="relative flex flex-col items-center gap-12">
                            <div className={`absolute top-8 bottom-8 w-1 rounded-full -z-10 ${isDark ? 'bg-white/5' : 'bg-slate-200'}`} />

                            {quests.map((quest, index) => (
                                <motion.div
                                    key={quest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative group w-full max-w-md ${index % 2 === 0 ? 'ml-0' : 'ml-0'}`}
                                >
                                    <div
                                        onClick={() => !quest.locked && handleQuestClick(quest.id)}
                                        className={`
                                          glass-panel p-6 flex items-center justify-between gap-6 cursor-pointer
                                          ${quest.locked ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:scale-[1.02] border-violet-500/30'}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg
                                                ${quest.completed
                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-emerald-500/20'
                                                    : quest.locked
                                                        ? 'bg-gray-800 text-gray-500'
                                                        : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-violet-500/20 animate-pulse'}
                                            `}>
                                                {quest.completed ? <CheckCircle size={24} /> : quest.locked ? <Lock size={24} /> : quest.icon}
                                            </div>

                                            <div className="flex-1">
                                                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{quest.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <span className="text-yellow-500 flex items-center gap-1 font-semibold">
                                                        <Star size={14} fill="currentColor" /> {quest.xp} XP
                                                    </span>
                                                    <span className="flex items-center gap-1"><BookOpen size={12} /> {questTopics[quest.id]?.topics.length || 10} Units</span>
                                                </div>
                                            </div>
                                        </div>

                                        {!quest.locked && !quest.completed && (
                                            <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                                                ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}
                                            `}>
                                                {t('Start')}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'leaderboard' && <PracticeLeaderboard />}
            </div>
        </div>
    );
};

export default Practice;
