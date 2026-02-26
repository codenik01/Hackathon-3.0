import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Briefcase, CheckCircle, Code2, MessageSquare, Terminal, FileText, Globe, Cpu, Hash, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const PlacementPrepPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();

    const sections = [
        {
            title: "Interview Preparation",
            icon: MessageSquare,
            description: "Master HR and Technical rounds with AI feedback and curated question banks.",
            color: "from-blue-500 to-indigo-600",
            status: "Available",
            items: [
                { title: "100 Imp LeetCode Questions", url: "https://drive.google.com/file/d/14qFg1TI-D91pFdsY1aSmaMO-QF3Hh0OV/view?usp=drive_link" },
                { title: "Interview Guide", url: "https://drive.google.com/file/d/12KkW4mt14TC_FlrfrxypNh9iffONatt0/view?usp=drive_link" },
                { title: "Commonly Asked Que", url: "https://drive.google.com/file/d/14hf23eO4UYFM-iUk3kYffUHKLLufTIGl/view?usp=drive_link" },
                { title: "Internship Preparation Guide", url: "https://drive.google.com/file/d/1SzRLaa97ZrZEl7CKI7JybX3ZmzvFLS79/view?usp=drive_link" }
            ]
        },
        {
            title: "DSA",
            icon: Terminal,
            description: "Deep dive into Data Structures and Algorithms with curated practice questions.",
            color: "from-orange-500 to-red-600",
            status: "Available",
            items: [
                { title: "DSA Imp Questions", url: "https://drive.google.com/file/d/1UIf6QaHn0C0jhwlpzcMNsR_BWXSBYIcn/view?usp=drive_link" },
                { title: "Imp 170 Que", url: "https://drive.google.com/file/d/17GuAir5kt0TKMLxNXfY7g0mUzYN9REJd/view?usp=drive_link" },
                { title: "Imp Problem List", url: "https://docs.google.com/spreadsheets/d/1-uIr_3175loPtLlNLwyIS6vILLOqjCFH/edit?usp=drive_link&ouid=100440384405065744893&rtpof=true&sd=true" },
                { title: "Beginners Sheet", url: "https://drive.google.com/file/d/1-3TL0aA1yruvKK_YJp86epPubfC5QiY0/view?usp=drive_link" }
            ]
        },
        {
            title: "Aptitude & Reasoning",
            icon: Cpu,
            description: "Master quantitative, verbal, and logical reasoning tests.",
            color: "from-emerald-500 to-teal-600",
            status: "Available",
            items: [
                { title: "Deloitte Que", url: "https://drive.google.com/file/d/1yMNHyBKn93RFgMvKvJujHNkdeDvcnXRC/view?usp=sharing" },
                { title: "Goldman Sachs", url: "https://drive.google.com/file/d/1ioyrLr_gpFTZ2zicDW7V1nT1LvedRudj/view?usp=sharing" },
                { title: "Oracle", url: "https://drive.google.com/file/d/11SD_G2RvcTEOE0E2hKGVQ-yfTe9oeRGK/view?usp=sharing" },
                { title: "Accenture", url: "https://drive.google.com/file/d/1Bf2O-5S8lYnLz8N-jE1z7zH5Y6Rzq7u4/view?usp=sharing" },
                { title: "TCS", url: "https://drive.google.com/file/d/1mCCZzRSyLO_vE7R9UfruJLRncsbm1xev/view?usp=sharing" },
                { title: "Infosys", url: "https://drive.google.com/file/d/1hioEs-YUuWNN2PTgn9SEC-cx6z1CCW2D/view?usp=sharing" }
            ]
        },
        {
            title: "Company-wise Roadmap",
            icon: Globe,
            description: "Curated paths for Google, Amazon, TCS, Infosys, and more.",
            color: "from-purple-500 to-pink-600",
            status: "Available",
            items: [
                { title: "MAANG Interview Preparation", url: "https://drive.google.com/file/d/19LmDju0KTtu3049LRT3Rm3JCztTMO23V/view?usp=drive_link" },
                { title: "SDE Interview Amazon", url: "https://drive.google.com/file/d/1Zl2Y178o8W-hEYDbRHsjpsEdUgLD3s64/view?usp=drive_link" },
                { title: "SDE Interview at Google", url: "https://drive.google.com/file/d/1WJPx_B3N9u01yaVznIBXm5E9zGv0hfTJ/view?usp=drive_link" },
                { title: "SDE Interview at Microsoft", url: "https://drive.google.com/file/d/1lnTQhYjRH57ZA3MLu0AjiiF28sFRcPlW/view?usp=drive_link" },
                { title: "Adobe LeetCode", url: "https://drive.google.com/file/d/17ZHtDgJMtAzIxq-D4yKftpCmRUL-6fK7/view?usp=drive_link" },
                { title: "Adobe DSA", url: "https://drive.google.com/file/d/1bsuXN4ywdZ-HAELo1Dqrf1t6fEGRGSJn/view?usp=drive_link" },
                { title: "Amazon LeetCode 1", url: "https://drive.google.com/file/d/1NpxHEXo48NAway0luJjGHFAhXas6yB29/view?usp=drive_link" },
                { title: "Amazon LeetCode 2", url: "https://drive.google.com/file/d/15gHKFIB7UIay2CRd9ys77KypBZbjxB4i/view?usp=drive_link" },
                { title: "Amazon DSA", url: "https://drive.google.com/file/d/1pMBBTZitLDbXYXh9ERv1BvliDueQQ2d9/view?usp=drive_link" },
                { title: "Apple LeetCode", url: "https://drive.google.com/file/d/1th09NtmpGke55ehV5lli2PxAkU4ZRFYS/view?usp=drive_link" },
                { title: "Expedia LeetCode", url: "https://drive.google.com/file/d/1lFRRHyJcVijDkpl_Bapce7O51-AZEUvy/view?usp=drive_link" },
                { title: "Facebook LeetCode", url: "https://drive.google.com/file/d/1z5N-r3rlSayU5xTJMlgGOT0wjnvDbSuN/view?usp=drive_link" },
                { title: "Goldman Sachs LeetCode", url: "https://drive.google.com/file/d/1x23aXbdRKomv2BwhwoURyf7Ihkl0y4dm/view?usp=drive_link" },
                { title: "Google LeetCode", url: "https://drive.google.com/file/d/1RQl0-2cLNdpx8oXQe3EVHwxAllMqTMQe/view?usp=drive_link" },
                { title: "Google Que 1", url: "https://drive.google.com/file/d/1Dw7gUQw5rshyCQanEhctdPecViXNr8fR/view?usp=drive_link" },
                { title: "JP Morgan LeetCode", url: "https://drive.google.com/file/d/1KQUcgzZcDQxLg8_zALeTYCic--qdFqXY/view?usp=drive_link" },
                { title: "Oracle DSA Interview Que", url: "https://drive.google.com/file/d/1GMQvKtR6qnn0ffEyv7pOZql9twly52dA/view?usp=drive_link" },
                { title: "Oracle LeetCode", url: "https://drive.google.com/file/d/1VVAQ5V9sJqmvbGZxCvxDHK5v5aHAWd5a/view?usp=drive_link" },
                { title: "Twitter LeetCode", url: "https://drive.google.com/file/d/11IWBZTHa49WIz2EnFMd-3q_y6mKQWS3w/view?usp=drive_link" },
                { title: "Uber LeetCode", url: "https://drive.google.com/file/d/1MIt8Bg0I2WJUEwsiYEhqmyLMS3NH1e_z/view?usp=drive_link" },
                { title: "Visa LeetCode", url: "https://drive.google.com/file/d/1iIPFRcwcNNuwz9GyhijVOZxzJv6exuhU/view?usp=drive_link" },
                { title: "Top Google Que 1", url: "https://drive.google.com/file/d/1PixyRr1E3Wo7cg_bOHiTUXsyEKhTozCn/view?usp=drive_link" },
                { title: "Top Google Que 2", url: "https://drive.google.com/file/d/18RTDnkpH9bDEROq44P4YvXCKTcYt8gWz/view?usp=drive_link" },
                { title: "WalmartLabs LeetCode", url: "https://drive.google.com/file/d/1QxQTZ78UEXM-8-DExUxsXMS4vj6yrmBQ/view?usp=drive_link" },
                { title: "VMware LeetCode", url: "https://drive.google.com/file/d/1xsbS8Q4Ybax2XpxRaFTnsYmVjB96k_Tw/view?usp=drive_link" }
            ]
        }
    ];

    const handleItemClick = (url) => {
        if (!url) {
            alert("Module content coming soon!");
            return;
        }
        window.open(url, '_blank');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-bold mb-6"
                    >
                        <Briefcase size={16} /> <span>{t('Career Accelerator')}</span>
                    </motion.div>
                    <h1 className={`text-5xl md:text-6xl font-black mb-6 tracking-tight 
                        ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
                    `}>
                        {t('Placement Prep 💼')}
                    </h1>
                    <p className="text-slate-500 text-xl max-w-3xl leading-relaxed">
                        {t('Your all-in-one arsenal for cracking top-tier product and service-based companies.')}
                        {t('From DSA marathons to soft skills boosters.')}
                    </p>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            className={`group relative overflow-hidden p-8 rounded-[2.5rem] border transition-all
                                ${theme === 'dark'
                                    ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 shadow-2xl shadow-indigo-500/5'
                                    : 'bg-white border-slate-200 hover:border-indigo-400 shadow-xl shadow-slate-200/50'
                                }
                            `}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-4 rounded-3xl bg-gradient-to-br ${section.color} text-white shadow-lg`}>
                                    <section.icon size={32} />
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg
                                    ${section.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' :
                                        section.status === 'Coming Soon' ? 'bg-slate-500/10 text-slate-500' :
                                            'bg-purple-500/10 text-purple-500'}
                                `}>
                                    {t(section.status)}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{t(section.title)}</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                {t(section.description)}
                            </p>

                            {/* Sub-items list */}
                            {section.items && section.items.length > 0 && (
                                <div className="space-y-3 mb-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t('Resources')}</p>
                                    {section.items.map((item, iIdx) => (
                                        <div
                                            key={iIdx}
                                            onClick={() => handleItemClick(item.url)}
                                            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all
                                                ${theme === 'dark'
                                                    ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-indigo-500'
                                                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-indigo-400 shadow-sm'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                                                    <Hash size={14} />
                                                </div>
                                                <span className="text-sm font-bold">{item.title}</span>
                                            </div>
                                            <LinkIcon size={14} className="text-slate-400" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => section.items.length === 0 && handleItemClick(null)}
                                className={`flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-4
                                    ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}
                                `}
                            >
                                {section.items.length > 0 ? t('Full Module Content') : t('Explore Module')} <CheckCircle size={18} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default PlacementPrepPage;
