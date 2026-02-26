import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Cpu, Layout, Server, Database, Code, FileText, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const StudyMaterialPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();

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
                { title: "HTML5 & Semantic Web", type: "Docs", url: "https://drive.google.com/file/d/1pyIxtWh6XFmBVW_h3H-RE7dHHyBrTXDu/view?usp=sharing" },
                { title: "CSS3 & Modern Layouts", type: "PDF", size: "1.8 MB", url: "https://drive.google.com/file/d/17k9DvWlE8Uh27HiY7HtNn4hiyyx6XBVi/view?usp=sharing" },
                { title: "JavaScript (JS) ES6+", type: "PDF", size: "2.4 MB", url: "https://drive.google.com/file/d/1RqhPMces70IvHEjRbMokqnW-Gh5stylo/view?usp=sharing" },
                { title: "React Hooks & State", type: "PDF", size: "1.1 MB", url: "https://drive.google.com/file/d/1E8Vg4NAUGIFFeIz5C-aJ3xvs-2HRYmqN/view?usp=sharing" },
            ]
        },
        {
            category: "Backend & Server",
            icon: Server,
            items: [
                { title: "Node.js (Runtime)", type: "PDF", size: "900 KB", url: "https://drive.google.com/file/d/1mgBBZB5XhkWwAn1AAdf6eAZ51jTeynyq/view?usp=sharing" },
                { title: "Express.js (Framework)", type: "Link", url: "https://drive.google.com/file/d/1aOE79-lDAN2D3ZIZmEkN-phILs1P8aP9/view?usp=sharing" },
            ]
        },
        {
            category: "Databases",
            icon: Database,
            items: [
                { title: "SQL Mastery (Relational)", type: "PDF", size: "1.4 MB", url: "https://drive.google.com/file/d/1vGL0LyLF5tMg3ZG5aeweJvEnis80SHQm/view?usp=sharing" },
                { title: "MongoDB (NoSQL)", type: "Link", url: "https://drive.google.com/file/d/1zRf2tFM-7IKn81q2-eQxnLxWvt4KRo-Q/view?usp=sharing" },
            ]
        },
        {
            category: "Algorithms & Logic",
            icon: Code,
            items: [
                { title: "DSA (Data Structures)", type: "PDF", size: "3.5 MB", url: "https://drive.google.com/file/d/1RwAmHYUH2MFu-iQ4sWoJSmr4eA6jyICt/view?usp=sharing" },
            ]
        }
    ];

    const handleItemClick = (item) => {
        if (!item.url) {
            alert("File coming soon! Please add '" + item.title + "' to your public folder.");
            return;
        }

        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        if (item.url.startsWith('/')) {
            link.download = item.title;
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 
                        ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
                    `}>
                        {t('Study Material 📚')}
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        {t('A curated collection of the best resources for C, C++, Java, Web Dev, Python, and DSA. Click any topic to download or view.')}
                    </p>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {materials.map((section, sIdx) => (
                        <div key={sIdx}>
                            <div className="flex items-center gap-3 mb-6">
                                <section.icon className="text-indigo-500" size={24} />
                                <h2 className="text-2xl font-bold">{t(section.category)}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((item, iIdx) => (
                                    <motion.div
                                        key={iIdx}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleItemClick(item)}
                                        className={`p-6 rounded-3xl border cursor-pointer transition-all shadow-lg
                                            ${theme === 'dark'
                                                ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 shadow-slate-950/50'
                                                : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-slate-50 shadow-slate-200/50'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
                                                <FileText size={24} />
                                            </div>
                                            {item.type === 'PDF' ? (
                                                <div className="text-slate-400 hover:text-indigo-500 transition-colors">
                                                    <Download size={20} />
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 hover:text-indigo-500 transition-colors">
                                                    <ExternalLink size={20} />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold mb-1 line-clamp-1">{item.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold
                                                ${item.type === 'PDF' ? 'bg-red-500/10 text-red-500' :
                                                    item.type === 'Docs' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}
                                            `}>
                                                {item.type}
                                            </span>
                                            {item.size && (
                                                <span className="text-[11px] text-slate-500 font-medium">
                                                    {item.size}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default StudyMaterialPage;
