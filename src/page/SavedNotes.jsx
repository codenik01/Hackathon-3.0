
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Trash2, Download, Copy, FileText, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

const SavedNotes = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const [notes, setNotes] = useState([]);
    const [viewNote, setViewNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load notes from local storage (mock data if empty for demo)
        const storedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
        if (storedNotes.length === 0) {
            // Add default dummy note if empty
            const dummyNote = {
                id: Date.now(),
                title: "Introduction to Loops",
                content: "Loops are used to execute a block of code repeatedly until a specified condition is met. Common types: for, while, do-while.",
                date: new Date().toLocaleDateString(),
                language: "Python"
            };
            localStorage.setItem('savedNotes', JSON.stringify([dummyNote]));
            setNotes([dummyNote]);
        } else {
            setNotes(storedNotes);
        }
    }, []);

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('savedNotes', JSON.stringify(updatedNotes));
    };

    const copyNote = (content) => {
        navigator.clipboard.writeText(content);
        alert(t('Note copied to clipboard!'));
    };

    const downloadPDF = (note) => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(22);
        doc.text(note.title, 20, 20);

        // Add Metadata
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Created: ${note.date} | Language: ${note.language}`, 20, 30);

        // Add Content
        doc.setFontSize(12);
        doc.setTextColor(0);
        const splitText = doc.splitTextToSize(note.content, 170);
        doc.text(splitText, 20, 40);

        doc.save(`${note.title.replace(/\s+/g, '_')}.pdf`);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300
      ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{t('Saved Notes')}</h1>
                        <p className="text-slate-500">{t('Access your saved learning materials and snippets.')}</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={t('Search notes...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-10 pr-4 py-2.5 rounded-xl border w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all
                ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}
              `}
                        />
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl
                  ${theme === 'dark'
                                        ? 'bg-slate-800/50 border-slate-700/50 hover:border-primary/30'
                                        : 'bg-white border-slate-200 hover:border-primary/30'}
                `}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg 
                    ${theme === 'dark' ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'}
                  `}>
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); copyNote(note.content); }}
                                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-primary transition-colors"
                                            title="Copy Content"
                                        >
                                            <Copy size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); downloadPDF(note); }}
                                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-green-500 transition-colors"
                                            title="Download PDF"
                                        >
                                            <Download size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 transition-colors"
                                            title="Delete Note"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{note.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-4 min-h-[60px]">
                                    {note.content}
                                </p>

                                <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-700/10 dark:border-white/5">
                                    <span>{note.date}</span>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider
                    ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}
                  `}>
                                        {note.language}
                                    </span>
                                </div>

                                {/* View Overlay Trigger */}
                                <div
                                    className="absolute inset-0 cursor-pointer z-0"
                                    onClick={() => setViewNote(note)}
                                />

                                {/* Ensure buttons are clickable */}
                                <div className="absolute top-6 right-6 z-10 pointer-events-none group-hover:pointer-events-auto w-fit h-fit" />

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredNotes.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <FileText size={48} className="mx-auto mb-4 opacity-20" />
                        <p>{t('No notes found. Start learning and save some notes!')}</p>
                    </div>
                )}

                {/* Note View Modal */}
                <AnimatePresence>
                    {viewNote && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setViewNote(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative
                  ${theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-white'}
                `}
                            >
                                <button
                                    onClick={() => setViewNote(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <h2 className="text-2xl font-bold mb-2">{viewNote.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                    <span>{viewNote.date}</span>
                                    <span>•</span>
                                    <span className="font-medium text-primary">{viewNote.language}</span>
                                </div>

                                <div className={`prose max-w-none p-6 rounded-xl 
                  ${theme === 'dark' ? 'bg-slate-800/50 prose-invert' : 'bg-slate-50'}
                `}>
                                    <p className="whitespace-pre-wrap">{viewNote.content}</p>
                                </div>

                                <div className="flex justify-end gap-3 mt-8">
                                    <button
                                        onClick={() => copyNote(viewNote.content)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <Copy size={18} />
                                        {t('Copy')}
                                    </button>
                                    <button
                                        onClick={() => downloadPDF(viewNote)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                                    >
                                        <Download size={18} />
                                        {t('Download PDF')}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SavedNotes;
