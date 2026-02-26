import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SkillPrintSection = ({ onClose, isModal = false }) => {
    const { t } = useLanguage();
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [loading, setLoading] = useState(false);
    const [generatedTasks, setGeneratedTasks] = useState([]);

    const handleGenerateTasks = async () => {
        if (!topic) return;
        setLoading(true);
        setGeneratedTasks([]);

        try {
            const prompt = `
                Act as a Senior Tech Lead. Create 3 ${difficulty} level coding tasks/mini-projects for "${topic}".
                Return STRICT JSON ONLY:
                [
                    { "title": "Task Title", "description": "Brief description...", "tags": ["Tag1", "Tag2"] }
                ]
            `;

            const API_KEY = "AIzaSyAdLPxoetB5VBJGBZTNji-jNLMw2Bj3yYQ";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const tasks = JSON.parse(jsonText);
            if (Array.isArray(tasks)) setGeneratedTasks(tasks);
        } catch (error) {
            console.error("SkillPrint Error:", error);
            setGeneratedTasks([
                { title: `Learn ${topic} Basics`, description: "Start with the fundamentals and core concepts.", tags: ["Basics", "Theory"] },
                { title: `Build a Simple ${topic} App`, description: "Create a small project to apply what you learned.", tags: ["Project", "Hands-on"] },
                { title: `${topic} Deep Dive`, description: "Explore advanced features and best practices.", tags: ["Advanced", "Optimization"] }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden ${!isModal ? 'max-w-5xl mx-auto mt-10' : ''}`}>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
                >
                    <X size={20} />
                </button>
            )}

            <div className="relative z-10 text-center mb-8">
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2 block">{t('AI-POWERED')}</span>
                <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {t('SkillPrint 🧬')}
                </h2>
                <p className="text-slate-400 text-sm">{t('Generate personalized project tasks & assignments.')}</p>
            </div>

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
                {/* Dynamic Analysis Section */}
                {(() => {
                    try {
                        const historyData = localStorage.getItem('practice_history');
                        const history = historyData ? JSON.parse(historyData) : [];

                        if (Array.isArray(history) && history.length > 0) {
                            const latest = history[0];
                            // Safely sort to find weakest area
                            const sortedHistory = [...history].sort((a, b) => (a.percentage || 0) - (b.percentage || 0));
                            const weakest = sortedHistory[0];

                            if (latest && weakest) {
                                return (
                                    <div className="mb-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                                        <h3 className="text-base font-bold text-white mb-1">{t('Analysis 🧬')}</h3>
                                        <p className="text-slate-300 text-xs mb-2">
                                            {t('Recent')}: <strong>{latest.topic}</strong> ({latest.percentage}%).
                                        </p>
                                        <button
                                            onClick={() => {
                                                setTopic(`${weakest.topic} Advanced Concepts`);
                                                setDifficulty('Intermediate');
                                            }}
                                            className="text-indigo-400 text-xs font-bold hover:text-indigo-300 underline"
                                        >
                                            {t('Auto-fill for')} {weakest.topic}
                                        </button>
                                    </div>
                                );
                            }
                        }
                    } catch (err) {
                        console.error("Error parsing practice history:", err);
                    }
                    return null;
                })()}

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">{t('What do you want to practice?')}</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. React Hooks, Python Lists..."
                        className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">{t('Difficulty Level')}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all border
                                    ${difficulty === level
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }
                                `}
                            >
                                {t(level)}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerateTasks}
                    disabled={loading || !topic}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-xl shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t('Generating...')}
                        </>
                    ) : (
                        <>{t('Generate SkillPrint')} <ArrowRight size={18} /></>
                    )}
                </button>
            </div>

            {/* Generated Tasks */}
            {generatedTasks.length > 0 && (
                <div className="mt-8 grid gap-4 md:grid-cols-2 relative z-10">
                    {generatedTasks.map((task, i) => (
                        <div
                            key={i}
                            className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl hover:bg-slate-800/60 transition-colors"
                        >
                            <h3 className="font-bold text-sm text-white mb-1">
                                <span className="text-indigo-400 mr-2">#{i + 1}</span>
                                {task.title}
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-2">{task.description}</p>
                            <div className="flex gap-1 flex-wrap">
                                {task.tags.map((tag, idx) => (
                                    <span key={idx} className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-700/50 rounded-md text-slate-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillPrintSection;
