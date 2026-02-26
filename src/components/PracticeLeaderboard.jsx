
import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const users = [
    { rank: 1, name: 'Sarah Wilson', xp: 2450, avatar: 'SW', league: 'Diamond' },
    { rank: 2, name: 'Mike Chen', xp: 2300, avatar: 'MC', league: 'Diamond' },
    { rank: 3, name: 'You', xp: 2150, avatar: 'YP', league: 'Diamond', current: true },
    { rank: 4, name: 'Emma Davis', xp: 1950, avatar: 'ED', league: 'Platinum' },
    { rank: 5, name: 'Alex Turner', xp: 1800, avatar: 'AT', league: 'Platinum' },
    { rank: 6, name: 'John Doe', xp: 1650, avatar: 'JD', league: 'Gold' },
    { rank: 7, name: 'Jane Smith', xp: 1500, avatar: 'JS', league: 'Gold' },
];

const PracticeLeaderboard = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === 'dark';

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-8 p-4">

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-4 ring-2 ring-yellow-500/20">
                    <Trophy size={48} className="text-yellow-500" fill="currentColor" />
                </div>
                <h1 className={`text-3xl font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Diamond League')}</h1>
                <p className={isDark ? 'text-gray-400' : 'text-slate-500'}>{t('Top 10 advance to the next league!')}</p>
            </div>

            <div className="space-y-3">
                {users.map((user, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          flex items-center justify-between p-4 rounded-2xl border transition-all
                          ${user.current
                                ? 'bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10'
                                : isDark
                                    ? 'bg-[#18181b]/60 border-white/5 hover:bg-[#18181b]/80'
                                    : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`
                                w-8 font-bold text-center
                                ${index === 0 ? 'text-yellow-500 text-xl' :
                                    index === 1 ? 'text-slate-400 text-xl' :
                                        index === 2 ? 'text-orange-500 text-xl' : (isDark ? 'text-gray-500' : 'text-slate-400')}
                            `}>
                                {user.rank}
                            </span>

                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                ${user.current ? 'bg-violet-500 text-white' : (isDark ? 'bg-gray-800 text-gray-300' : 'bg-slate-200 text-slate-600')}
                            `}>
                                {user.avatar}
                            </div>

                            <div>
                                <h3 className={`font-bold ${user.current ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-gray-200' : 'text-slate-700')}`}>
                                    {user.name} {user.current && `(${t('You')})`}
                                </h3>
                                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{t(user.league)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-bold text-yellow-500">{user.xp} XP</span>
                            {index < 3 && <Medal size={16} className={index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : 'text-orange-500'} />}
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default PracticeLeaderboard;
