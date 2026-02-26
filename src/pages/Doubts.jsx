
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Send, Trash, Copy, Save, Mic, Clock, X, Search, Trash2, Settings as SettingsIcon, Paperclip, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KNOWLEDGE_BASE } from '../data/KnowledgeBase';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Robust formatting component instead of crashing ReactMarkdown
const FormattedMessage = ({ text }) => {
    if (!text) return null;

    // Split into segments to handle code blocks
    const segments = text.split(/(```[\s\S]*?```)/g);

    return (
        <div className="space-y-2">
            {segments.map((segment, idx) => {
                if (segment.startsWith('```')) {
                    // Extract code block content
                    const lines = segment.split('\n');
                    const lang = lines[0].replace('```', '').trim() || 'text';
                    const code = lines.slice(1, -1).join('\n');

                    return (
                        <div key={idx} className="my-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50 shadow-sm bg-gray-50 dark:bg-[#0d1117]">
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono">{lang}</span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(code)}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                    title="Copy Code"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                            <div className="p-4 overflow-x-auto">
                                <pre className="font-mono text-[13px] leading-relaxed text-gray-800 dark:text-gray-300">
                                    <code>{code}</code>
                                </pre>
                            </div>
                        </div>
                    );
                }

                // Normal text processing
                return segment.split('\n').map((line, lineIdx) => {
                    const key = `${idx}-${lineIdx}`;

                    if (line.startsWith('### ')) return <h3 key={key} className="text-lg font-bold text-black dark:text-white mt-5 mb-2 tracking-tight">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('## ')) return <h2 key={key} className="text-xl font-bold text-black dark:text-white mt-6 mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 tracking-tight">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('**') && line.endsWith('**')) return <strong key={key} className="block font-bold text-black dark:text-white my-2 leading-tight">{line.replace(/\*\*/g, '')}</strong>;
                    if (line.startsWith('• ')) return <li key={key} className="ml-4 text-gray-800 dark:text-gray-300 list-disc marker:text-gray-400 dark:marker:text-gray-500 pl-2 mb-1.5 leading-relaxed font-normal">{parseInlineStyles(line.replace('• ', ''))}</li>;

                    if (!line.trim()) return <div key={key} className="h-2"></div>;

                    return <p key={key} className="text-gray-800 dark:text-gray-300 leading-6 mb-1.5 text-[14px]">{parseInlineStyles(line)}</p>;
                });
            })}
        </div>
    );
};

// Helper to parse **bold** and `code` inline
const parseInlineStyles = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-black dark:text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index} className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded-md text-red-600 dark:text-yellow-300 font-mono text-[12px] font-semibold">{part.slice(1, -1)}</code>;
        }
        return part;
    });
};

const Doubts = () => {
    const { isDark } = useTheme();
    const { language } = useLanguage();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 'intro',
            sender: 'ai',
            text: "### 👋 Namaste! I am SkillSphere AI (Senior Engineer Mode).\n\nI am here to be your **Personal Coding Tutor & Architect**.\n\n**My Superpowers:**\n• **12-Step Deep Dive Answers** (Theory -> Code -> Intuition)\n• **File Analysis** (Upload broken code, I'll fix it)\n• **Voice-to-Code** (Speak your logic, I'll write it)\n\nAsk me anything: *'Explain Recursion'*, *'Fix this React bug'*, or *'System Design for Uber'*.",
            timestamp: new Date()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [activeProvider, setActiveProvider] = useState('SkillSphere AI Hybrid');

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();

        let langCode = 'en-US';
        if (language === 'Hindi') langCode = 'hi-IN';
        else if (language === 'Marathi') langCode = 'mr-IN';
        else if (language === 'Hinglish') langCode = 'en-IN';

        recognition.lang = langCode;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + (prev ? ' ' : '') + transcript);
        };
        recognition.start();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("File is too large (Max 10MB)");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setAttachment({
                name: file.name,
                content: ev.target.result,
                type: file.type
            });
        };
        reader.readAsText(file);
    };

    const handleSend = async () => {
        if (!input.trim() && !attachment) return;

        const userText = input;
        const currentAttachment = attachment;
        const lowerInput = userText.toLowerCase();

        // Add User Message to UI
        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: userText,
            timestamp: new Date(),
            attachment: currentAttachment
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setAttachment(null);
        setIsLoading(true);

        // Advanced Local Fallback engine with Keyword priority
        const checkLocalKB = () => {
            const text = lowerInput;

            // Priority 1: Specific Topics (Catch these before generic 'cpp')
            if (text.includes('loop') || text.includes('lop') || text.includes('for') || text.includes('while')) return KNOWLEDGE_BASE['loop'];
            if (text.includes('array') || text.includes('arr') || text.includes('[]')) return KNOWLEDGE_BASE['array'];
            if (text.includes('prime')) return KNOWLEDGE_BASE['prime'];
            if (text.includes('fibonacci')) return KNOWLEDGE_BASE['fibonacci'];
            if (text.includes('factorial')) return KNOWLEDGE_BASE['factorial'];
            if (text.includes('recur') || text.includes('stack')) return KNOWLEDGE_BASE['recursion'];

            // Priority 2: Generic Languages
            if (text.includes('cpp') || text.includes('c++') || text.includes('coding')) return KNOWLEDGE_BASE['cpp'];
            if (text.includes('react')) return KNOWLEDGE_BASE['react'];
            if (text.includes('js') || text.includes('javascript')) return KNOWLEDGE_BASE['js'];

            return KNOWLEDGE_BASE['universal'];
        };

        try {
            // ⚡ USER'S KEYS (Restored for functionality)
            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY
            const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_KEY

            // 5. The "Senior Teacher" System Prompt
            const SYSTEM_PROMPT = `
            You are an Advanced AI Coding Assistant (Senior Software Engineer & Teacher).
            Answer the following query using deep theory, examples, and line-by-line logic.
            Query: "${userText}"
            ${currentAttachment ? "[File Attached]: " + currentAttachment.content : ""}
            `;

            // --- ENGINE 1: GEMINI ---
            try {
                const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

                const result = await model.generateContentStream(SYSTEM_PROMPT);

                const aiMessageId = Date.now() + 1;
                setMessages(prev => [...prev, {
                    id: aiMessageId,
                    sender: 'ai',
                    text: "⚡ SkillSphere Teacher Active...",
                    timestamp: new Date(),
                    isStreaming: true
                }]);

                let fullResponse = "";
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    fullResponse += chunkText;
                    setMessages(prev => {
                        const newMsgs = [...prev];
                        const aiMsgIndex = newMsgs.findIndex(m => m.id === aiMessageId);
                        if (aiMsgIndex !== -1) newMsgs[aiMsgIndex].text = fullResponse;
                        return newMsgs;
                    });
                }
                setMessages(prev => {
                    const newMsgs = [...prev];
                    const aiMsgIndex = newMsgs.findIndex(m => m.id === aiMessageId);
                    if (aiMsgIndex !== -1) {
                        newMsgs[aiMsgIndex].text = fullResponse;
                        newMsgs[aiMsgIndex].isStreaming = false;
                    }
                    return newMsgs;
                });
                return;
            } catch (err) { console.warn("Gemini Engine Skip"); }

            // --- ENGINE 2: OPENAI ---
            try {
                const res = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o",
                        messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userText }],
                        stream: false
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    setMessages(prev => [...prev, {
                        id: Date.now() + 2,
                        sender: 'ai',
                        text: data.choices[0].message.content,
                        timestamp: new Date(),
                        isStreaming: false
                    }]);
                    return;
                }
            } catch (err) { console.warn("OpenAI Engine Skip"); }

            // --- ENGINE 3: LOCAL ---
            const localResponse = checkLocalKB();
            const aiMessageId = Date.now() + 3;
            setMessages(prev => [...prev, {
                id: aiMessageId,
                sender: 'ai',
                text: "⚡ Neural Synthesis (Local Mode)...",
                timestamp: new Date(),
                isStreaming: true
            }]);

            // Realistic 1s delay for presentation depth
            setTimeout(() => {
                setMessages(prev => {
                    const newMsgs = [...prev];
                    const aiMsgIndex = newMsgs.findIndex(m => m.id === aiMessageId);
                    if (aiMsgIndex !== -1) {
                        newMsgs[aiMsgIndex].text = localResponse;
                        newMsgs[aiMsgIndex].isStreaming = false;
                    }
                    return newMsgs;
                });
            }, 1000);

        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 4,
                sender: 'ai',
                text: "### ⚠️ System Error\nAll engines are offline. Please check your internet connection.",
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear chat history?')) {
            setMessages([]);
            localStorage.removeItem('doubtHistory');
        }
    };

    return (
        <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
            {/* Header */}
            <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex justify-between items-center shadow-sm`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Search className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            SkillSphere Infinity
                        </h1>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            AI Hybrid Active
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/history" className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <Clock size={20} />
                    </Link>
                    <button onClick={clearHistory} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                        <Trash2 size={20} />
                    </button>
                    <Link to="/" className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <X size={20} />
                    </Link>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} `}
                        >
                            <div className={`max-w-[85%] lg:max-w-[75%] rounded-2xl shadow-md ${msg.sender === 'user'
                                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none'
                                : isDark ? 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                }`}>
                                <div className="p-4">
                                    {msg.attachment && (
                                        <div className="mb-3 p-3 bg-black/10 rounded-lg flex items-center gap-3 border border-white/10">
                                            <FileCode className="w-5 h-5 opacity-70" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{msg.attachment.name}</p>
                                                <p className="text-xs opacity-60">File Attachment</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="prose prose-invert max-w-none">
                                        {msg.sender === 'user' ? (
                                            <p className="whitespace-pre-wrap">{msg.text}</p>
                                        ) : (
                                            <FormattedMessage text={msg.text} />
                                        )}
                                    </div>

                                    {/* Footer Info */}
                                    <div className={`mt-2 flex items-center justify-between text-[10px] ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        {msg.sender === 'ai' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => navigator.clipboard.writeText(msg.text)} className="hover:text-white transition-colors">
                                                    <Copy size={12} />
                                                </button>
                                                <button className="hover:text-white transition-colors">
                                                    <Save size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start pl-2"
                    >
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-blue-400 border border-gray-700/50' : 'bg-blue-50 text-blue-600'}`}>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                            Accessing Neural Lattice...
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}>
                {attachment && (
                    <div className="mb-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg flex justify-between items-center animate-in slide-in-from-bottom-2 fade-in">
                        <span className="text-sm text-blue-400 flex items-center gap-2">
                            <Paperclip size={14} /> {attachment.name}
                        </span>
                        <button onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-400 transition-colors">
                            <X size={14} />
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-2 max-w-5xl mx-auto">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".js,.jsx,.py,.cpp,.c,.java,.html,.css,.sql,.json,.txt"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-3 rounded-xl transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                        title="Attach Code File"
                    >
                        <Paperclip size={20} />
                    </button>

                    <div className={`flex-1 flex items-center gap-2 rounded-xl border px-3 py-1 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything... (e.g., 'Explain Arrays')"
                            className="flex-1 bg-transparent border-none outline-none py-3 text-sm placeholder-gray-500"
                        />
                        <button
                            onClick={handleVoiceInput}
                            className={`p-2 rounded-lg transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-400'}`}
                            title="Voice Input"
                        >
                            <Mic size={18} />
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!input.trim() && !attachment}
                        className={`p-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center ${input.trim() || attachment
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/40'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Send size={20} />
                    </motion.button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-500">
                        AI can make mistakes. | Mode: <span className="text-green-500 font-medium">Triple-Engine Failover (Gemini/OpenAI/Local)</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Doubts;
