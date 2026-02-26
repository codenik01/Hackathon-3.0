import React, { useState, useEffect } from 'react';
import { CheckCircle, Target, X, Play, Pause, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


const GoalsSection = ({ onClose, isModal = false }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('daily');
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    // Load goals from local storage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('user_goals') || '[]');
        // Ensure legacy goals have time tracking properties
        const enhancedGoals = saved.map(g => ({
            ...g,
            timeSpent: g.timeSpent || 0,
            isRunning: g.isRunning || false,
            lastStartTime: g.lastStartTime || null
        }));
        setGoals(enhancedGoals);
    }, []);

    // Timer Tick Effect
    useEffect(() => {
        let interval;
        const hasRunningTimer = goals.some(g => g.isRunning);

        if (hasRunningTimer) {
            interval = setInterval(() => {
                setGoals(currentGoals =>
                    currentGoals.map(g => {
                        if (g.isRunning) {
                            return {
                                ...g,
                                timeSpent: (g.timeSpent || 0) + 1
                            };
                        }
                        return g;
                    })
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [goals.findIndex(g => g.isRunning)]);

    // Update Local Storage Periodically if running
    useEffect(() => {
        const hasRunning = goals.some(g => g.isRunning);
        // Save if running (every 2s to minimize writes but keep sync) or if structure changed
        if (hasRunning) {
            const timer = setTimeout(() => {
                localStorage.setItem('user_goals', JSON.stringify(goals));
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            localStorage.setItem('user_goals', JSON.stringify(goals));
        }
    }, [goals]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    const toggleTimer = (id) => {
        setGoals(currentGoals => {
            const updated = currentGoals.map(g => {
                if (g.id === id) {
                    const isStarting = !g.isRunning;
                    return {
                        ...g,
                        isRunning: isStarting,
                        lastStartTime: isStarting ? Date.now() : null
                    };
                }
                // Optional: Stop others if one starts?
                // if (g.isRunning) return { ...g, isRunning: false };
                return g;
            });
            // Immediate save
            localStorage.setItem('user_goals', JSON.stringify(updated));
            return updated;
        });
    };

    const addGoal = () => {
        if (!newGoal.trim()) return;
        const goal = {
            id: Date.now(),
            title: newGoal,
            type: activeTab,
            completed: false,
            xp: activeTab === 'daily' ? 50 : 200,
            date: new Date().toISOString(),
            timeSpent: 0,
            isRunning: false
        };
        const updated = [goal, ...goals];
        setGoals(updated);
        localStorage.setItem('user_goals', JSON.stringify(updated));
        setNewGoal('');
    };

    const toggleGoal = (id) => {
        const updated = goals.map(g => {
            if (g.id === id) {
                const newCompleted = !g.completed;
                if (newCompleted) {
                    const currentXP = parseInt(localStorage.getItem('user_xp') || '2150');
                    localStorage.setItem('user_xp', (currentXP + g.xp).toString());
                }
                return {
                    ...g,
                    completed: newCompleted,
                    isRunning: newCompleted ? false : g.isRunning
                };
            }
            return g;
        });
        setGoals(updated);
        localStorage.setItem('user_goals', JSON.stringify(updated));
    };

    const deleteGoal = (id) => {
        const updated = goals.filter(g => g.id !== id);
        setGoals(updated);
        localStorage.setItem('user_goals', JSON.stringify(updated));
    }

    const filteredGoals = goals.filter(g => g.type === activeTab);

    return (
        <div className={`bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl relative ${!isModal ? 'max-w-4xl mx-auto mt-10 mb-10' : ''}`}>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    style={{ zIndex: 20 }}
                >
                    <X size={20} />
                </button>
            )}

            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {t('Your Learning Goals 🎯')}
                </h2>
                <p className="text-slate-400 text-sm">{t('Set targets, track time, and earn XP!')}</p>
            </div>

            <div className="flex bg-slate-800/50 p-1 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab('daily')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'daily' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    {t('Daily Goals (50 XP)')}
                </button>
                <button
                    onClick={() => setActiveTab('weekly')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'weekly' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    {t('Weekly Goals (200 XP)')}
                </button>
            </div>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder={activeTab === 'daily' ? t('Add a new daily goal...') : t('Add a new weekly goal...')}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <button
                    onClick={addGoal}
                    className={`px-5 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 ${activeTab === 'daily' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                >
                    {t('Add')}
                </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredGoals.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        {activeTab === 'daily' ? t('No daily goals set yet. Start by adding one above!') : t('No weekly goals set yet. Start by adding one above!')}
                    </div>
                ) : (
                    filteredGoals.map(goal => (
                        <div
                            key={goal.id}
                            className={`flex flex-col p-4 rounded-xl border transition-all ${goal.completed
                                ? 'bg-emerald-500/10 border-emerald-500/20 opacity-75'
                                : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleGoal(goal.id)}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${goal.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500 hover:border-emerald-400'
                                            }`}
                                    >
                                        {goal.completed && <CheckCircle size={12} />}
                                    </button>
                                    <span className={`font-medium text-sm ${goal.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                                        {goal.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${goal.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                                        }`}>
                                        +{goal.xp} XP
                                    </span>
                                    <button onClick={() => deleteGoal(goal.id)} className="text-slate-600 hover:text-red-400">
                                        &times;
                                    </button>
                                </div>
                            </div>

                            {/* Timer Controls */}
                            {!goal.completed && (
                                <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-700/50">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleTimer(goal.id)}
                                            className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${goal.isRunning
                                                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                                                : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
                                                }`}
                                        >
                                            {goal.isRunning ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                            {goal.isRunning ? t('Pause') : t('Start Timer')}
                                        </button>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                                            <Clock size={12} className={goal.isRunning ? 'text-amber-400 animate-pulse' : ''} />
                                            {formatTime(goal.timeSpent)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GoalsSection;
