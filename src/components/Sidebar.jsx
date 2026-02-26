
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    House,
    BookOpen,
    MessageCircleQuestion,
    Save,
    Settings,
    Menu,
    Clock,
    X,
    BarChart2,
    LayoutDashboard,
    User,
    Dna,
    Target,
    Code,
    Briefcase
} from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logic-builder-logo-black.png';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { theme } = useTheme();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { to: '/', icon: House, label: 'home' },

        
        { to: '/study-material', icon: BookOpen, label: 'Study Material' },
        { to: '/placement-prep', icon: Briefcase, label: 'Placement Prep' },
       
        { to: '/practice', icon: Code, label: 'Practice' },
      
        { to: '/saved', icon: Save, label: 'saved' },
        { to: '/about', icon: BookOpen, label: 'About' },
        { to: '/settings', icon: Settings, label: 'settings' },
       
    ];


    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 z-50 p-2 rounded-lg md:hidden shadow-lg transition-colors
          ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800'}
        `}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                className={`fixed top-0 left-0 h-full w-72 z-40 
          ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
          border-r shadow-none md:translate-x-0 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full p-6">

                    {/* Logo / Brand */}
                    <div className="mb-10 flex flex-col items-center">
                        <div className="w-40 h-auto mb-2">
                            <img
                                src={logo}
                                alt="SkillSphere Logo"
                                className="w-full h-full object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
                            />
                        </div>
                        <h1 className={`text-4xl font-black font-mono tracking-tighter mt-1
              ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
            `}>
                            AskMyNotes
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 pb-20 custom-scrollbar">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)} // Close on click (mobile)
                                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200
                  ${isActive
                                        ? 'bg-slate-800 text-white shadow-md shadow-slate-900/10 font-semibold'
                                        : theme === 'dark'
                                            ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }
                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
                                        <span className="text-sm tracking-wide">{t(item.label)}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
