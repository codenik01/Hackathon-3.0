
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Users, Brain, Shield, Zap, Eye, Cpu } from 'lucide-react';

const About = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();

    const teamMembers = [
        { name: "Kartik Shete", role: t("Team Leader") },
        { name: "Purva Lad", role: t("Co-Leader") },
        { name: "Chanksha Patil", role: t("Core Architect") },
        { name: "Sunil Kumbhar", role: t("UI/UX Lead") },
        { name: "Shriram Jagdale", role: t("Backend Specialist") }
    ];

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300
      ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto space-y-16"
            >
                {/* HEADER SECTION */}
                <div className="text-center space-y-6">
                    <h1 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase">
                        {t('Meet The Visionaries')}
                    </h1>
                    <h2 className={`text-5xl md:text-6xl font-extrabold tracking-tight
                        ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
                    `}>
                        {t('THE INNOVATORS')}
                    </h2>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        {t('A multidisciplinary team dedicated to revolutionizing education through AI-driven personalization.')}
                    </p>
                </div>

                {/* TEAM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl border text-center relative overflow-hidden group
                                ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}
                            `}
                        >
                            <div className="bg-indigo-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
                                <Users size={20} />
                            </div>
                            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {member.name}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">{member.role}</p>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </motion.div>
                    ))}
                </div>

                {/* MAIN CONTENT AREA */}
                <div className={`p-8 md:p-12 rounded-3xl border space-y-12
                    ${theme === 'dark' ? 'bg-slate-800/20 border-slate-800 backdrop-blur-sm' : 'bg-white/50 border-slate-200'}
                `}>

                    {/* Intro */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold flex items-center gap-3">
                            <Brain className="text-indigo-400" />
                            {t('SkillSphere: The Future of Personalized Learning')}
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-400">
                            SkillSphere represents a paradigm shift in how we approach professional development and academic growth. For decades, the global education system has operated on a "one-size-fits-all" model—a static curriculum delivered at a uniform pace to learners with vastly different cognitive profiles, background knowledge, and professional aspirations. This legacy approach inevitably leaves behind those who need more support while failing to challenge high-performers, resulting in a systemic drain on human potential.
                        </p>
                        <p className="text-lg leading-relaxed text-slate-400">
                            Recognizing this critical gap, <strong className="text-indigo-400">THE INNOVATORS</strong> engineered SkillSphere—an AI-powered Personalization Engine designed to deliver truly bespoke learning experiences. Our core philosophy is built upon the integration of high-level architectural mapping and deep-dive content intelligence. By leveraging a dual-AI framework, SkillSphere doesn't just suggest courses; it architecturally adapts the entire learning journey to the individual.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <Zap className="text-yellow-400 mb-4 h-8 w-8" />
                            <h4 className="text-xl font-bold mb-2">Neural Optimization</h4>
                            <p className="text-slate-500">Our engine analyzes over 50 data points from initial diagnostics to predict the most effective learning sequence for each user.</p>
                        </div>
                        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <Shield className="text-emerald-400 mb-4 h-8 w-8" />
                            <h4 className="text-xl font-bold mb-2">Integrity First</h4>
                            <p className="text-slate-500">SkillSphere prioritizes ethical AI usage, ensuring data privacy and transparency in every generated path.</p>
                        </div>
                    </div>

                    {/* Tech Foundation */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <Cpu className="text-pink-400" />
                            Use of Hybrid Intelligence Architecture
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-400">
                            The technical foundation of SkillSphere is as robust as its educational vision. Utilizing a Node.js and React monorepo architecture, we've implemented a hybrid intelligence model. The <strong>Gemini Path Engine</strong> takes the lead in structure, analyzing professional goals to create five-module progressive trees. Once a learner enters a module, the <strong>OpenAI Content Intelligence</strong> takes over, instantly generating interactive, Markdown-rendered lessons that include real-world exercises and context-aware examples.
                        </p>
                    </div>

                    {/* Visual Excellence */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <Eye className="text-cyan-400" />
                            Visual Excellence as Usability
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-400">
                            Visual excellence is not just an aesthetic choice but a usability requirement. The SkillSphere interface features "Level Backgrounds"—a multi-layered, interactive CSS environment that provides visual depth without distracting from the learning task. With integrated Dark and Light mode support, the platform ensures comfort for long-duration study sessions, catering to the biological needs of the learner's circadian rhythm.
                        </p>
                    </div>

                    {/* Future Outlook */}
                    <div className={`p-8 rounded-2xl border-l-4 border-indigo-500 
                        ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-50'}
                    `}>
                        <h3 className="text-xl font-bold mb-4 text-indigo-400">Looking Toward The Future</h3>
                        <p className="text-lg leading-relaxed text-slate-400 italic">
                            "THE INNOVATORS plan to expand SkillSphere with real-time mentor integration and AI-driven peer groups. We believe that by democratizing high-end personalized education, we can close the global skills gap and empower a new generation of professionals to reach their full potential. SkillSphere is more than a platform; it is a commitment to the endless possibilities of human growth, powered by the most advanced technology available today."
                        </p>
                    </div>

                    {/* Conclusion */}
                    <div className="text-slate-500 leading-relaxed border-t border-slate-700/50 pt-8">
                        <p>
                            In conclusion, this project serves as a testament to what a dedicated team can achieve when they combine technical prowess with a deep empathy for the learner's journey. From the team leader <strong>Kartik Shete's</strong> vision to the collective execution of <strong>Purva, Chanksha, Sunil, and Shriram</strong>, SkillSphere is built by innovators, for innovators.
                        </p>
                    </div>

                </div>

            </motion.div>
        </div>
    );
};

export default About;
