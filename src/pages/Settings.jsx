
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, languages, t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className={`min-h-screen p-8 lg:p-12 transition-colors duration-300
      ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-8"
            >
                <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('Settings')}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{t('Customize your SkillSphere experience')}</p>
                    </div>
                </div>

                {/* Theme Settings */}
                <motion.section variants={itemVariants} className={`p-6 rounded-3xl border 
          ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-200'}
        `}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                                {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{t('Appearance')}</h3>
                                <p className="text-sm text-slate-500">{t('Switch between Dark and Light mode')}</p>
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300
                ${theme === 'dark'
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}
              `}
                        >
                            {theme === 'dark' ? t('Dark Mode') : t('Light Mode')}
                        </button>
                    </div>
                </motion.section>

                {/* Language Settings */}
                <motion.section variants={itemVariants} className={`p-6 rounded-3xl border
          ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-200'}
        `}>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                            <Globe size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{t('Language / भाषा')}</h3>
                            <p className="text-sm text-slate-500">{t('Select your preferred language')}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.name)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                  ${language === lang.name
                                        ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500'
                                        : theme === 'dark'
                                            ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{lang.code === 'en' ? '🇺🇸' : '🇮🇳'}</span>
                                    <div className="text-left">
                                        <p className={`font-medium ${language === lang.name ? 'text-indigo-500' : ''}`}>
                                            {lang.name}
                                        </p>
                                        <p className="text-xs text-slate-500">{lang.native}</p>
                                    </div>
                                </div>
                                {language === lang.name && (
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.section>



                {/* Danger Zone / Logout */}
                <motion.section variants={itemVariants} className={`p-6 rounded-3xl border-2 border-red-500/20 
          ${theme === 'dark' ? 'bg-red-500/5' : 'bg-red-50'}
        `}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-bold text-red-500">{t('Danger Zone')}</h3>
                            <p className="text-sm text-slate-500">{t('Logging out will reset all your progress, goals, and history.')}</p>
                        </div>
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to logout? All your data (goals, history, profile) will be deleted permanently!")) {
                                    localStorage.clear();
                                    window.location.href = '/';
                                }
                            }}
                            className="btn bg-red-500 hover:bg-red-600 text-white border-none px-8 py-3 shadow-lg shadow-red-500/20"
                        >
                            {t('Logout & Reset')}
                        </button>
                    </div>
                </motion.section>

            </motion.div>
        </div>
    );
};

export default Settings;
