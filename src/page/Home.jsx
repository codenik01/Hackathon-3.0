import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, MessageCircleQuestion, ArrowRight, CheckCircle, Terminal, Cpu, Target, X, Dna } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// Import extracted components
import GoalsSection from '../components/GoalsSection';
import SkillPrintSection from '../components/SkillPrintSection';

const Home = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();

    const [showGoals, setShowGoals] = useState(false);
    const [showSkillPrint, setShowSkillPrint] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background elements are handled by NeuralBackground in App.jsx */}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24"
            >

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest">v1.0.0 Now Live</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl leading-tight heading-hero pb-2">
                        {t("Build Your Logic. Master Coding.")}
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                        {t("The ultimate platform to learn theory, clear doubts with AI, and master programming logic in English, Hindi, Marathi, or Hinglish.")}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6 flex-wrap">

                        <Link to="/doubts" className="btn btn-secondary group w-full md:w-auto">
                            {t("Ask AI")} <MessageCircleQuestion size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                        </Link>

                        {/* Goals Button */}
                        <button
                            onClick={() => setShowGoals(true)}
                            className="btn btn-secondary group border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10 w-full md:w-auto"
                        >
                            {t("Set Goals")} <Target size={20} className="text-pink-400 group-hover:scale-110 transition-transform" />
                        </button>



                        <Link to="/practice" className="btn btn-primary group bg-emerald-500 hover:bg-emerald-600 border-none text-white shadow-emerald-500/20 w-full md:w-auto">
                            {t("Start Practice")} <Terminal size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <motion.div variants={itemVariants} className="card-glass card-hover p-8 group">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 font-mono">{t('Comprehensive Theory')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {t('Deep dive into Javascript, Python, C++, and Java concepts efficiently explained in your preferred language.')}
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-glass card-hover p-8 relative overflow-hidden group border-indigo-500/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-125" />
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <Cpu size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 font-mono relative z-10">{t('AI Logic Mentor')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
                            {t('Stuck on logic? Our GPT-4o powered AI explains complex algorithms simply in Hinglish, Hindi, or Marathi.')}
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-glass card-hover p-8 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Terminal size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 font-mono">{t('Multi-Language Support')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {t('Learn in the language you are most comfortable with. Break the language barrier and focus on logic.')}
                        </p>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div variants={itemVariants} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 dark:border-white/5 pt-12">
                    {[
                        { label: 'Active Learners', value: '10k+' },
                        { label: 'Doubts Solved', value: '50k+' },
                        { label: 'Concepts', value: '100+' },
                        { label: 'Languages', value: '4' },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center group cursor-default">
                            <h4 className="text-4xl font-bold font-mono text-slate-800 dark:text-white group-hover:text-indigo-500 transition-colors mb-2">{stat.value}</h4>
                            <p className="text-sm text-slate-500 font-medium tracking-wider uppercase">{t(stat.label)}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Goals Modal */}
                <AnimatePresence>
                    {showGoals && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                            >
                                <GoalsSection onClose={() => setShowGoals(false)} isModal={true} />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* SkillPrint Modal */}
                <AnimatePresence>
                    {showSkillPrint && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                            >
                                <SkillPrintSection onClose={() => setShowSkillPrint(false)} isModal={true} />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default Home;
