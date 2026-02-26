import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, Clock, Trophy, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Dashboard = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const [activityData, setActivityData] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        // Load Data from LocalStorage
        const history = JSON.parse(localStorage.getItem('practice_history') || '[]');
        const goals = JSON.parse(localStorage.getItem('user_goals') || '[]');

        // 1. Calculate Stats
        const baseXP = 2150;
        const quizXP = history.reduce((acc, curr) => acc + (curr.score * 10), 0); // 10 XP per correct answer
        const goalsXP = goals.filter(g => g.completed).reduce((acc, curr) => acc + curr.xp, 0);
        const totalXP = baseXP + quizXP + goalsXP;

        const modulesCompleted = history.length + goals.filter(g => g.completed).length;
        const historyTimeSeconds = history.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
        const goalsTimeSeconds = goals.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
        const totalTimeSpentSeconds = historyTimeSeconds + goalsTimeSeconds;
        const totalHours = Math.floor(totalTimeSpentSeconds / 3600);


        setStats([
            { label: t("Total XP"), value: totalXP.toLocaleString(), icon: Zap, color: "text-yellow-400" },
            { label: t("Streak"), value: "5 Days", icon: Trophy, color: "text-orange-400" }, // Mock streak for now
            { label: t("Hours Learnt"), value: `${totalHours}h`, icon: Clock, color: "text-cyan-400" },
            { label: t("Modules"), value: `${modulesCompleted}`, icon: BookOpen, color: "text-emerald-400" },
        ]);

        // 2. Calculate Activity (Last 7 Days)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const activityMap = new Array(7).fill(0);

        [...history, ...goals.filter(g => g.completed)].forEach(item => {
            const date = new Date(item.date);
            const dayIndex = date.getDay(); // 0-6
            activityMap[dayIndex] += 10; // Arbitrary activity score
        });

        const chartData = days.map((day, i) => ({
            name: day,
            completion: Math.min(activityMap[i] + 20, 100) // Base 20 visually
        }));
        setActivityData(chartData);

        // 3. Calculate Skills (Radar)
        const topicScores = {};
        const topicCounts = {};

        history.forEach(h => {
            const topic = h.topic.split('_')[0].toUpperCase(); // 'c_intro' -> 'C'
            if (!topicScores[topic]) { topicScores[topic] = 0; topicCounts[topic] = 0; }
            topicScores[topic] += h.percentage;
            topicCounts[topic] += 1;
        });

        const radarData = Object.keys(topicScores).length > 0 ? Object.keys(topicScores).map(topic => ({
            subject: topic,
            A: Math.round(topicScores[topic] / topicCounts[topic]),
            fullMark: 100
        })) : [
            { subject: 'C', A: 40, fullMark: 100 },
            { subject: 'CPP', A: 30, fullMark: 100 },
            { subject: 'PYTHON', A: 50, fullMark: 100 },
            { subject: 'WEB', A: 20, fullMark: 100 },
            { subject: 'DSA', A: 10, fullMark: 100 },
            { subject: 'JAVA', A: 10, fullMark: 100 },
        ]; // Default if empty
        setSkillData(radarData);

    }, []);

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300
      ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold mb-2
                            ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
                        `}>
                            {t("Welcome Back, Warrior! 🚀")}
                        </h1>
                        <p className="text-slate-500">{t("Your learning journey is on fire today.")}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl border flex items-center gap-4
                                ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}
                            `}
                        >
                            <div className={`p-3 rounded-xl bg-slate-900/50 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <p className="text-xs text-slate-500 uppercase font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Chart */}
                    <div className={`lg:col-span-2 p-6 rounded-3xl border 
                        ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}
                    `}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Activity className="text-indigo-400" /> {t("Learning Activity")}
                        </h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <defs>
                                        <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', borderRadius: '12px', border: 'none' }}
                                        labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                                    />
                                    <Area type="monotone" dataKey="completion" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Skill Radar */}
                    <div className={`p-6 rounded-3xl border 
                        ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}
                    `}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Target className="text-pink-400" /> {t("Skill Radar")}
                        </h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Skill Level" dataKey="A" stroke="#f472b6" strokeWidth={2} fill="#f472b6" fillOpacity={0.4} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Activity (Dynamic from History) */}
                <div className={`p-6 rounded-3xl border 
                    ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'}
                `}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{t("Recent Activity")} 🕒</h2>
                    </div>

                    <div className="space-y-4">
                        {(() => {
                            const history = JSON.parse(localStorage.getItem('practice_history') || '[]');
                            if (history.length === 0) return <p className="text-slate-500 text-center py-4">{t('No recent activity. Start a quiz!')}</p>;

                            return history.slice(0, 5).map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${item.percentage >= 60 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {item.percentage}%
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.topic.replace(/_/g, ' ').toUpperCase()}</h3>
                                            <p className="text-xs text-slate-500">
                                                {new Date(item.date).toLocaleDateString()} • {item.score}/{item.total} Correct
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                                        <Clock size={16} />
                                        <span>
                                            {item.timeSpent ? (
                                                `${Math.floor(item.timeSpent / 60)}m ${item.timeSpent % 60}s`
                                            ) : (
                                                '--'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Dashboard;
