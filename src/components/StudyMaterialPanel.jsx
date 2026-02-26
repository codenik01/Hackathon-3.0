import React, { useState } from 'react';
import { Book, ChevronRight, FileText, Download, ExternalLink, X, Database, Code, Layout, Server, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const StudyMaterialPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const { t } = useLanguage();

    const togglePanel = () => setIsOpen(!isOpen);

    const materials = [
        {
            category: "Core Languages",
            icon: Cpu,
            items: [
                { title: "Let Us C By Yashwant Kanetkar (1)", type: "PDF", size: "2.5 MB", url: "https://drive.google.com/file/d/1wvIEyYxuh8RFdbmhRNkqyPQEdUyIlXAy/view?usp=sharing" },
                { title: "C++ (CPP) Mastery Guide", type: "PDF", size: "1.5 MB", url: "https://drive.google.com/file/d/1oZ_ER7lrIq0vC2rBwU-pS9ZjxdXi6j0x/view?usp=sharing" },
                { title: "Java Complete Reference", type: "PDF", size: "2.8 MB", url: "https://drive.google.com/file/d/1P6DRPfZ8m_45mRa7VoAeplpS9QggNsLj/view?usp=sharing" },
                { title: "Python for Beginners", type: "PDF", size: "1.9 MB", url: "https://drive.google.com/file/d/1VnvEZ6TNFb3CgyDVWEubuMU9Aja8fCKF/view?usp=sharing" },
            ]
        },
        {
            category: "Frontend Web",
            icon: Layout,
            items: [
                { title: "HTML5", type: "Docs", url: "https://drive.google.com/file/d/1pyIxtWh6XFmBVW_h3H-RE7dHHyBrTXDu/view?usp=sharing" },
                { title: "CSS3", type: "PDF", size: "1.8 MB", url: "https://drive.google.com/file/d/17k9DvWlE8Uh27HiY7HtNn4hiyyx6XBVi/view?usp=sharing" },
                { title: "JavaScript (JS)", type: "PDF", size: "2.4 MB", url: "https://drive.google.com/file/d/1RqhPMces70IvHEjRbMokqnW-Gh5stylo/view?usp=sharing" },
                { title: "React", type: "PDF", size: "1.1 MB", url: "https://drive.google.com/file/d/1E8Vg4NAUGIFFeIz5C-aJ3xvs-2HRYmqN/view?usp=sharing" },
            ]
        },
        {
            category: "Backend & Server",
            icon: Server,
            items: [
                { title: "Node.js", type: "PDF", size: "900 KB", url: "https://drive.google.com/file/d/1mgBBZB5XhkWwAn1AAdf6eAZ51jTeynyq/view?usp=sharing" },
                { title: "Express.js", type: "Link", url: "https://drive.google.com/file/d/1aOE79-lDAN2D3ZIZmEkN-phILs1P8aP9/view?usp=sharing" },
            ]
        },
        {
            category: "Databases",
            icon: Database,
            items: [
                { title: "SQL (MySQL/Postgres)", type: "PDF", size: "1.4 MB", url: "https://drive.google.com/file/d/1vGL0LyLF5tMg3ZG5aeweJvEnis80SHQm/view?usp=sharing" },
                { title: "MongoDB", type: "Link", url: "https://drive.google.com/file/d/1zRf2tFM-7IKn81q2-eQxnLxWvt4KRo-Q/view?usp=sharing" },
            ]
        },
        {
            category: "Algorithms",
            icon: Code,
            items: [
                { title: "DSA (Data Structures)", type: "PDF", size: "3.5 MB", url: "https://drive.google.com/file/d/1RwAmHYUH2MFu-iQ4sWoJSmr4eA6jyICt/view?usp=sharing" },
            ]
        }
    ];

    const handleItemClick = (item) => {
        if (!item.url) return;

        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        // If it's a local file (starts with /), suggest download
        if (item.url.startsWith('/')) {
            link.download = item.title;
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ x: 10 }}
                animate={{ x: 0 }}
                whileHover={{ x: -5 }}
                onClick={togglePanel}
                className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-l-xl shadow-2xl transition-all
                    ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 'bg-white text-indigo-600 shadow-slate-200 border border-slate-100'}
                `}
            >
                <div className="flex flex-col items-center gap-1">
                    {isOpen ? <ChevronRight size={20} /> : <Book size={20} />}
                    <span className="text-[10px] font-bold writing-vertical-rl transform rotate-180 py-2">
                        {t('Study Material')}
                    </span>
                </div>
            </motion.button>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className={`fixed right-0 top-0 h-full w-80 z-50 shadow-2xl border-l
                    ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800/10 dark:border-white/10 flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Book className="text-indigo-500" /> {t('Resources')}
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                        {materials.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                    <section.icon size={14} className="text-indigo-400" />
                                    {t(section.category)}
                                </h3>
                                <div className="space-y-3">
                                    {section.items.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleItemClick(item)}
                                            className={`p-3 rounded-xl border transition-all cursor-pointer group
                                                ${theme === 'dark'
                                                    ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-indigo-500/50'
                                                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-indigo-500/50 shadow-sm'
                                                }
                                            `}
                                        >

                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} className={
                                                        theme === 'dark' ? 'text-slate-400 group-hover:text-indigo-400' : 'text-slate-500 group-hover:text-indigo-500'
                                                    } />
                                                    <span className="font-semibold text-sm">{item.title}</span>
                                                </div>
                                                {item.type === 'PDF' ? (
                                                    <Download size={14} className="text-slate-400 group-hover:text-indigo-400" />
                                                ) : (
                                                    <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 pl-6">
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded
                                                    ${item.type === 'PDF' ? 'bg-red-500/10 text-red-500' :
                                                        item.type === 'Docs' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}
                                                `}>
                                                    {item.type}
                                                </span>
                                                {item.size && (
                                                    <span className="text-[10px] text-slate-500">{item.size}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default StudyMaterialPanel;
