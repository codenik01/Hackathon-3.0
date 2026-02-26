
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'English';
    });

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'hi', name: 'Hindi', native: 'हिंदी' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'hin', name: 'Hinglish', native: 'Hinglish' }
    ];

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
        // You could also set dir="rtl" or change font based on language here if needed
    }, [language]);

    const t = (key) => {
        // Basic dictionary for key phrases - in a real app this would be more extensive
        const dictionary = {
            'home': {
                'English': 'Home',
                'Hindi': 'होम',
                'Marathi': 'मुख्यपृष्ठ',
                'Hinglish': 'Home'
            },
            'Dashboard': {
                'English': 'Dashboard',
                'Hindi': 'डैशबोर्ड',
                'Marathi': 'डॅशबोर्ड',
                'Hinglish': 'Dashboard'
            },
            'Goals': {
                'English': 'Goals',
                'Hindi': 'लक्ष्य',
                'Marathi': 'ध्येय',
                'Hinglish': 'Goals'
            },
            'SkillPrint': {
                'English': 'SkillPrint',
                'Hindi': 'स्किलप्रिंट',
                'Marathi': 'स्किलप्रिंट',
                'Hinglish': 'SkillPrint'
            },
            'Study Material': {
                'English': 'Study Material',
                'Hindi': 'अध्ययन सामग्री',
                'Marathi': 'अभ्यास साहित्य',
                'Hinglish': 'Study Material'
            },
            'Placement Prep': {
                'English': 'Placement Prep',
                'Hindi': 'प्लेसमेंट तैयारी',
                'Marathi': 'प्लेसमेंट तयारी',
                'Hinglish': 'Placement Prep'
            },
            'doubts': {
                'English': 'Ask Doubts',
                'Hindi': 'शंका पूछें',
                'Marathi': 'शंका विचारा',
                'Hinglish': 'Doubts Pucho'
            },
            'Practice': {
                'English': 'Practice',
                'Hindi': 'अभ्यास',
                'Marathi': 'सराव',
                'Hinglish': 'Practice'
            },
            'Analysis': {
                'English': 'Analysis',
                'Hindi': 'विश्लेषण',
                'Marathi': 'विश्लेषण',
                'Hinglish': 'Analysis'
            },
            'saved': {
                'English': 'Saved Notes',
                'Hindi': 'सेव किए गए नोट्स',
                'Marathi': 'जतन केलेल्या नोट्स',
                'Hinglish': 'Saved Notes'
            },
            'About': {
                'English': 'About',
                'Hindi': 'हमारे बारे में',
                'Marathi': 'आमच्याबद्दल',
                'Hinglish': 'About'
            },
            'History': {
                'English': 'History',
                'Hindi': 'इतिहास',
                'Marathi': 'इतिहास',
                'Hinglish': 'History'
            },
            'settings': {
                'English': 'Settings',
                'Hindi': 'सेटिंग्स',
                'Marathi': 'सेटिंग्ज',
                'Hinglish': 'Settings'
            },
            'Profile': {
                'English': 'Profile',
                'Hindi': 'प्रोफ़ाइल',
                'Marathi': 'प्रोफाइल',
                'Hinglish': 'Profile'
            },
            'welcome': {
                'English': 'Welcome to SkillSphere',
                'Hindi': 'SkillSphere में आपका स्वागत है',
                'Marathi': 'SkillSphere मध्ये आपले स्वागत आहे',
                'Hinglish': 'SkillSphere mein Swagat hai'
            },
            'Welcome Back, Warrior! 🚀': {
                'English': 'Welcome Back, Warrior! 🚀',
                'Hindi': 'वापसी पर स्वागत है, योद्धा! 🚀',
                'Marathi': 'पुनरागमन केल्याबद्दल स्वागत, योद्धा! 🚀',
                'Hinglish': 'Welcome Back, Warrior! 🚀'
            },
            'Your learning journey is on fire today.': {
                'English': 'Your learning journey is on fire today.',
                'Hindi': 'आपकी सीखने की यात्रा आज जोरों पर है।',
                'Marathi': 'तुमचा शिकण्याचा प्रवास आज जोरात आहे.',
                'Hinglish': 'Aapki learning journey aaj fire pe hai.'
            },
            'Build Your Logic. Master Coding.': {
                'English': 'Build Your Logic. Master Coding.',
                'Hindi': 'अपनी लॉजिक बनाएं। कोडिंग में महारत हासिल करें।',
                'Marathi': 'तुमचे लॉजिक तयार करा. कोडिंगमध्ये प्रभुत्व मिळवा.',
                'Hinglish': 'Apni Logic Banaye. Master Coding.'
            },
            'The ultimate platform to learn theory, clear doubts with AI, and master programming logic in English, Hindi, Marathi, or Hinglish.': {
                'English': 'The ultimate platform to learn theory, clear doubts with AI, and master programming logic in English, Hindi, Marathi, or Hinglish.',
                'Hindi': 'अंग्रेजी, हिंदी, मराठी या हिंग्लिश में थ्योरी सीखने, एआई के साथ संदेह दूर करने और प्रोग्रामिंग लॉजिक में महारत हासिल करने का अंतिम मंच।',
                'Marathi': 'इंग्रजी, हिंदी, मराठी किंवा हिंग्लिशमध्ये थिअरी शिकण्यासाठी, AI सह शंकांचे निरसन करण्यासाठी आणि प्रोग्रामिंग लॉजिकमध्ये प्रभुत्व मिळवण्यासाठी अंतिम प्लॅटफॉर्म.',
                'Hinglish': 'Theory seekhne, AI ke sath doubts clear karne aur English, Hindi, Marathi, ya Hinglish mein programming logic master karne ka ultimate platform.'
            },
            'Start Practice': {
                'English': 'Start Practice',
                'Hindi': 'अभ्यास शुरू करें',
                'Marathi': 'सराव सुरू करा',
                'Hinglish': 'Practice Start Karein'
            },
            'Ask AI': {
                'English': 'Ask AI',
                'Hindi': 'एआई से पूछें',
                'Marathi': 'AI ला विचारा',
                'Hinglish': 'AI se Pucho'
            },
            'Set Goals': {
                'English': 'Set Goals',
                'Hindi': 'लक्ष्य निर्धारित करें',
                'Marathi': 'ध्येय निश्चित करा',
                'Hinglish': 'Goals Set Karein'
            },
            'Total XP': {
                'English': 'Total XP',
                'Hindi': 'कुल एक्सपी',
                'Marathi': 'एकूण एक्सपी',
                'Hinglish': 'Total XP'
            },
            'Streak': {
                'English': 'Streak',
                'Hindi': 'लगातार दिन',
                'Marathi': 'सलग दिवस',
                'Hinglish': 'Streak'
            },
            'Hours Learnt': {
                'English': 'Hours Learnt',
                'Hindi': 'सीखे गए घंटे',
                'Marathi': 'शिकलेले तास',
                'Hinglish': 'Hours Learnt'
            },
            'Modules': {
                'English': 'Modules',
                'Hindi': 'मॉड्यूल',
                'Marathi': 'मॉड्यूल्स',
                'Hinglish': 'Modules'
            },
            'Learning Activity': {
                'English': 'Learning Activity',
                'Hindi': 'सीखने की गतिविधि',
                'Marathi': 'शिकण्याची कृती',
                'Hinglish': 'Learning Activity'
            },
            'Skill Radar': {
                'English': 'Skill Radar',
                'Hindi': 'कौशल्य रडार',
                'Marathi': 'कौशल्य रडार',
                'Hinglish': 'Skill Radar'
            },
            'Recent Activity': {
                'English': 'Recent Activity',
                'Hindi': 'हाली की गतिविधि',
                'Marathi': 'अलीकडील कृती',
                'Hinglish': 'Recent Activity'
            },
            'Map': {
                'English': 'Map',
                'Hindi': 'नक्शा',
                'Marathi': 'नकाशा',
                'Hinglish': 'Map'
            },
            'Leaderboard': {
                'English': 'Leaderboard',
                'Hindi': 'लीडरबोर्ड',
                'Marathi': 'लीडरबोर्ड',
                'Hinglish': 'Leaderboard'
            },
            'Rank': {
                'English': 'Rank',
                'Hindi': 'रैंक',
                'Marathi': 'रँक',
                'Hinglish': 'Rank'
            },
            'Diamond League': {
                'English': 'Diamond League',
                'Hindi': 'डायमंड लीग',
                'Marathi': 'डायमंड लीग',
                'Hinglish': 'Diamond League'
            },
            'Top 10 advance to the next league!': {
                'English': 'Top 10 advance to the next league!',
                'Hindi': 'शीर्ष 10 अगली लीग में आगे बढ़ेंगे!',
                'Marathi': 'टॉप 10 पुढील लीगमध्ये जातील!',
                'Hinglish': 'Top 10 agle league mein jayenge!'
            },
            'Code Mastery Path': {
                'English': 'Code Mastery Path',
                'Hindi': 'कोड मास्टरी पथ',
                'Marathi': 'कोड मास्टरी पाथ',
                'Hinglish': 'Code Mastery Path'
            },
            'Master C, C++, Python, Web Dev & DSA to become a dev legend!': {
                'English': 'Master C, C++, Python, Web Dev & DSA to become a dev legend!',
                'Hindi': 'डेव लीजेंड बनने के लिए C, C++, Python, Web Dev और DSA में महारत हासिल करें!',
                'Marathi': 'डेव्ह लीजेंड होण्यासाठी C, C++, Python, Web Dev आणि DSA वर प्रभुत्व मिळवा!',
                'Hinglish': 'Dev legend banne ke liye C, C++, Python, Web Dev aur DSA master karein!'
            },
            'Select a topic to start your quest': {
                'English': 'Select a topic to start your quest',
                'Hindi': 'अपनी खोज शुरू करने के लिए एक विषय चुनें',
                'Marathi': 'तुमचा शोध सुरू करण्यासाठी एक विषय निवडा',
                'Hinglish': 'Quest start karne ke liye topic select karein'
            },
            'Start': {
                'English': 'Start',
                'Hindi': 'शुरू करें',
                'Marathi': 'सुरू करा',
                'Hinglish': 'Start'
            },
            'Units': {
                'English': 'Units',
                'Hindi': 'इकाइयाँ',
                'Marathi': 'युनिट्स',
                'Hinglish': 'Units'
            },
            'Documentation': {
                'English': 'Documentation',
                'Hindi': 'दस्तावेज़ीकरण',
                'Marathi': 'दस्तऐवजीकरण',
                'Hinglish': 'Documentation'
            },
            'Languages': {
                'English': 'Languages',
                'Hindi': 'भाषाएं',
                'Marathi': 'भाषा',
                'Hinglish': 'Languages'
            },
            'Your learning journey is on fire today.': {
                'English': 'Your learning journey is on fire today.',
                'Hindi': 'आपकी सीखने की यात्रा आज जोरों पर है।',
                'Marathi': 'तुमचा शिकण्याचा प्रवास आज जोरात आहे.',
                'Hinglish': 'Aapki learning journey aaj fire pe hai.'
            },
            'Meet The Visionaries': {
                'English': 'Meet The Visionaries',
                'Hindi': 'दूरदर्शी लोगों से मिलें',
                'Marathi': 'स्वप्न पाहणाऱ्यांना भेटा',
                'Hinglish': 'Meet The Visionaries'
            },
            'THE INNOVATORS': {
                'English': 'THE INNOVATORS',
                'Hindi': 'नवाचार करने वाले',
                'Marathi': 'इनोव्हेटर्स',
                'Hinglish': 'THE INNOVATORS'
            },
            'A multidisciplinary team dedicated to revolutionizing education through AI-driven personalization.': {
                'English': 'A multidisciplinary team dedicated to revolutionizing education through AI-driven personalization.',
                'Hindi': 'एआई-संचालित वैयक्तिकरण के माध्यम से शिक्षा में क्रांति लाने के लिए समर्पित एक बहु-विषयक टीम।',
                'Marathi': 'AI-सक्षम वैयक्तिकरणाद्वारे शिक्षणामध्ये क्रांती घडवून आणण्यासाठी समर्पित एक बहुविद्याशाखीय टीम.',
                'Hinglish': 'AI-driven personalization ke sath education solve karne wali team.'
            },
            'Team Leader': {
                'English': 'Team Leader',
                'Hindi': 'टीम लीडर',
                'Marathi': 'टीम लीडर',
                'Hinglish': 'Team Leader'
            },
            'Co-Leader': {
                'English': 'Co-Leader',
                'Hindi': 'सह-नेता',
                'Marathi': 'सह-नेते',
                'Hinglish': 'Co-Leader'
            },
            'Core Architect': {
                'English': 'Core Architect',
                'Hindi': 'कोर आर्किटेक्ट',
                'Marathi': 'कोर आर्किटेक्ट',
                'Hinglish': 'Core Architect'
            },
            'UI/UX Lead': {
                'English': 'UI/UX Lead',
                'Hindi': 'यूआई/यूएक्स लीड',
                'Marathi': 'UI/UX लीड',
                'Hinglish': 'UI/UX Lead'
            },
            'Backend Specialist': {
                'English': 'Backend Specialist',
                'Hindi': 'बैकएंड विशेषज्ञ',
                'Marathi': 'बॅकएंड स्पेशलिस्ट',
                'Hinglish': 'Backend Specialist'
            },
            'SkillSphere: The Future of Personalized Learning': {
                'English': 'SkillSphere: The Future of Personalized Learning',
                'Hindi': 'SkillSphere: व्यक्तिगत शिक्षा का भविष्य',
                'Marathi': 'SkillSphere: वैयक्तिक शिक्षणाचे भविष्य',
                'Hinglish': 'SkillSphere: Future of Learning'
            },
            'Diamond League': {
                'English': 'Diamond League',
                'Hindi': 'डायमंड लीग',
                'Marathi': 'डायमंड लीग',
                'Hinglish': 'Diamond League'
            },
            'Platinum': {
                'English': 'Platinum',
                'Hindi': 'प्लेटिनम',
                'Marathi': 'प्लॅटिनम',
                'Hinglish': 'Platinum'
            },
            'Gold': {
                'English': 'Gold',
                'Hindi': 'गोल्ड',
                'Marathi': 'गोल्ड',
                'Hinglish': 'Gold'
            },
            'You': {
                'English': 'You',
                'Hindi': 'आप',
                'Marathi': 'तुम्ही',
                'Hinglish': 'Aap'
            },
            'Excellent!': {
                'English': 'Excellent!',
                'Hindi': 'उत्कृष्ट!',
                'Marathi': 'उत्कृष्ट!',
                'Hinglish': 'Excellent!'
            },
            'Incorrect': {
                'English': 'Incorrect',
                'Hindi': 'गलत',
                'Marathi': 'चुकीचे',
                'Hinglish': 'Incorrect'
            },
            'Check': {
                'English': 'Check',
                'Hindi': 'जांचें',
                'Marathi': 'तपासा',
                'Hinglish': 'Check'
            },
            'Next': {
                'English': 'Next',
                'Hindi': 'अगला',
                'Marathi': 'पुढील',
                'Hinglish': 'Next'
            },
            'Finish': {
                'English': 'Finish',
                'Hindi': 'समाप्त',
                'Marathi': 'समाप्त',
                'Hinglish': 'Finish'
            },
            'Quest Completed!': {
                'English': 'Quest Completed!',
                'Hindi': 'खोज पूरी हुई!',
                'Marathi': 'शोध पूर्ण झाला!',
                'Hinglish': 'Quest Completed!'
            },
            'Score': {
                'English': 'Score',
                'Hindi': 'स्कोर',
                'Marathi': 'स्कोर',
                'Hinglish': 'Score'
            },
            'Accuracy': {
                'English': 'Accuracy',
                'Hindi': 'सटीकता',
                'Marathi': 'अचूकता',
                'Hinglish': 'Accuracy'
            },
            'Back to Path': {
                'English': 'Back to Path',
                'Hindi': 'पथ पर वापस',
                'Marathi': 'पाथवर परत जा',
                'Hinglish': 'Back to Path'
            },
            'Generating Quest...': {
                'English': 'Generating Quest...',
                'Hindi': 'खोज तैयार की जा रही है...',
                'Marathi': 'शोध तयार केला जात आहे...',
                'Hinglish': 'Quest Generate ho raha hai...'
            },
            'Settings': {
                'English': 'Settings',
                'Hindi': 'सेटिंग्स',
                'Marathi': 'सेटिंग्ज',
                'Hinglish': 'Settings'
            },
            'Customize your SkillSphere experience': {
                'English': 'Customize your SkillSphere experience',
                'Hindi': 'अपने SkillSphere अनुभव को अनुकूलित करें',
                'Marathi': 'तुमचा SkillSphere अनुभव सानुकूलित करा',
                'Hinglish': 'SkillSphere experience customize karein'
            },
            'Appearance': {
                'English': 'Appearance',
                'Hindi': 'दिखावट',
                'Marathi': 'दिसणे',
                'Hinglish': 'Appearance'
            },
            'Switch between Dark and Light mode': {
                'English': 'Switch between Dark and Light mode',
                'Hindi': 'डार्क और लाइट मोड के बीच स्विच करें',
                'Marathi': 'डार्क आणि लाईट मोडमध्ये स्विच करा',
                'Hinglish': 'Dark aur Light mode switch karein'
            },
            'Dark Mode': {
                'English': 'Dark Mode',
                'Hindi': 'डार्क मोड',
                'Marathi': 'डार्क मोड',
                'Hinglish': 'Dark Mode'
            },
            'Light Mode': {
                'English': 'Light Mode',
                'Hindi': 'लाइट मोड',
                'Marathi': 'लाइट मोड',
                'Hinglish': 'Light Mode'
            },
            'Language / भाषा': {
                'English': 'Language / भाषा',
                'Hindi': 'भाषा / Language',
                'Marathi': 'भाषा / Language',
                'Hinglish': 'Language / भाषा'
            },
            'Select your preferred language': {
                'English': 'Select your preferred language',
                'Hindi': 'अपनी पसंद की भाषा चुनें',
                'Marathi': 'तुमची पसंतीची भाषा निवडा',
                'Hinglish': 'Apni language choose karein'
            },
            'Danger Zone': {
                'English': 'Danger Zone',
                'Hindi': 'खतरे का क्षेत्र',
                'Marathi': 'धोकादायक क्षेत्र',
                'Hinglish': 'Danger Zone'
            },
            'Logging out will reset all your progress, goals, and history.': {
                'English': 'Logging out will reset all your progress, goals, and history.',
                'Hindi': 'लॉग आउट करने से आपकी सभी प्रगति, लक्ष्य और इतिहास रीसेट हो जाएंगे।',
                'Marathi': 'लॉग आउट केल्याने तुमची सर्व प्रगती, ध्येये आणि इतिहास रीसेट होईल.',
                'Hinglish': 'Logout karne se progress, goals aur history reset ho jayegi.'
            },
            'Logout & Reset': {
                'English': 'Logout & Reset',
                'Hindi': 'लॉग आउट और रीसेट',
                'Marathi': 'लॉग आउट आणि रीसेट',
                'Hinglish': 'Logout & Reset'
            },
            'Learning Analytics': {
                'English': 'Learning Analytics',
                'Hindi': 'लर्निंग एनालिटिक्स',
                'Marathi': 'शिकण्याचे विश्लेषण',
                'Hinglish': 'Learning Analytics'
            },
            'Track your progress and identify areas for improvement.': {
                'English': 'Track your progress and identify areas for improvement.',
                'Hindi': 'अपनी प्रगति पर नज़र रखें और सुधार के क्षेत्रों की पहचान करें।',
                'Marathi': 'तुमच्या प्रगतीचा मागोवा घ्या आणि सुधारणेची क्षेत्रे ओळखा.',
                'Hinglish': 'Progress track karein aur improvement areas pehchanein.'
            },
            'Current Level': {
                'English': 'Current Level',
                'Hindi': 'वर्तमान स्तर',
                'Marathi': 'सध्याची पातळी',
                'Hinglish': 'Current Level'
            },
            'Quizzes Taken': {
                'English': 'Quizzes Taken',
                'Hindi': 'क्विज़ लिए गए',
                'Marathi': 'क्विझ घेतले',
                'Hinglish': 'Quizzes Taken'
            },
            'Avg Score': {
                'English': 'Avg Score',
                'Hindi': 'औसत स्कोर',
                'Marathi': 'सरासरी स्कोर',
                'Hinglish': 'Avg Score'
            },
            'Study Time': {
                'English': 'Study Time',
                'Hindi': 'अध्ययन का समय',
                'Marathi': 'अभ्यासाची वेळ',
                'Hinglish': 'Study Time'
            },
            'Day Streak': {
                'English': 'Day Streak',
                'Hindi': 'दिनों का सिलसिला',
                'Marathi': 'दिवसांची मालिका',
                'Hinglish': 'Day Streak'
            },
            'Subject Mastery': {
                'English': 'Subject Mastery',
                'Hindi': 'विषय में महारत',
                'Marathi': 'विषय प्रभुत्व',
                'Hinglish': 'Subject Mastery'
            },
            'Your Strengths': {
                'English': 'Your Strengths',
                'Hindi': 'आपकी खूबियां',
                'Marathi': 'तुमची बलस्थाने',
                'Hinglish': 'Your Strengths'
            },
            'Focus Areas': {
                'English': 'Focus Areas',
                'Hindi': 'ध्यान केंद्रित करने वाले क्षेत्र',
                'Marathi': 'लक्ष केंद्रित करण्याची क्षेत्रे',
                'Hinglish': 'Focus Areas'
            },
            'No data yet. Take quizzes to see mastery!': {
                'English': 'No data yet. Take quizzes to see mastery!',
                'Hindi': 'अभी तक कोई डेटा नहीं है। महारत देखने के लिए क्विज़ लें!',
                'Marathi': 'अद्याप कोणताही डेटा नाही. प्रभुत्व पाहण्यासाठी क्विझ घ्या!',
                'Hinglish': 'No data yet. Quiz lo mastery dekhne ke liye!'
            },
            'Chat History': {
                'English': 'Chat History',
                'Hindi': 'चैट इतिहास',
                'Marathi': 'चॅट इतिहास',
                'Hinglish': 'Chat History'
            },
            'Review and search your past learning conversations': {
                'English': 'Review and search your past learning conversations',
                'Hindi': 'अपनी पिछली सीखने वाली बातचीत की समीक्षा करें और खोजें',
                'Marathi': 'तुमच्या मागील शिकण्याच्या संभाषणांचे पुनरावलोकन करा आणि शोधा',
                'Hinglish': 'Apne past learning conversations review aur search karein'
            },
            'Search conversations...': {
                'English': 'Search conversations...',
                'Hindi': 'बातचीत खोजें...',
                'Marathi': 'संभाषण शोधा...',
                'Hinglish': 'Conversations search karein...'
            },
            'No matches found': {
                'English': 'No matches found',
                'Hindi': 'कोई मिलान नहीं मिला',
                'Marathi': 'काहीही आढळले नाही',
                'Hinglish': 'No matches found'
            },
            'No conversations found': {
                'English': 'No conversations found',
                'Hindi': 'कोई बातचीत नहीं मिली',
                'Marathi': 'कोणतेही संभाषण आढळले नाही',
                'Hinglish': 'No conversations found'
            },
            'Try searching for a different keyword.': {
                'English': 'Try searching for a different keyword.',
                'Hindi': 'एक अलग कीवर्ड खोजने का प्रयास करें।',
                'Marathi': 'वेगळा कीवर्ड शोधण्याचा प्रयत्न करा.',
                'Hinglish': 'Doosra keyword try karein.'
            },
            'Your chat history will appear here once you ask some doubts.': {
                'English': 'Your chat history will appear here once you ask some doubts.',
                'Hindi': 'एक बार जब आप कुछ संदेह पूछते हैं, तो आपका चैट इतिहास यहां दिखाई देगा।',
                'Marathi': 'एकदा तुम्ही काही शंका विचारल्या की तुमचा चॅट इतिहास येथे दिसेल.',
                'Hinglish': 'Doubt poochne ke baad chat history yahan dikhegi.'
            },
            'Question': {
                'English': 'Question',
                'Hindi': 'प्रश्न',
                'Marathi': 'प्रश्न',
                'Hinglish': 'Question'
            },
            'Answer': {
                'English': 'Answer',
                'Hindi': 'उत्तर',
                'Marathi': 'उत्तर',
                'Hinglish': 'Answer'
            },
            'Save': {
                'English': 'Save',
                'Hindi': 'सहेजें',
                'Marathi': 'जतन करा',
                'Hinglish': 'Save'
            },
            'Edit Profile': {
                'English': 'Edit Profile',
                'Hindi': 'प्रोफ़ाइल संपादित करें',
                'Marathi': 'प्रोफाइल संपादित करा',
                'Hinglish': 'Profile Edit karein'
            },
            'About Me': {
                'English': 'About Me',
                'Hindi': 'मेरे बारे में',
                'Marathi': 'माझ्याबद्दल',
                'Hinglish': 'About Me'
            },
            'Your Learning Goals 🎯': {
                'English': 'Your Learning Goals 🎯',
                'Hindi': 'आपके सीखने के लक्ष्य 🎯',
                'Marathi': 'तुमचे शिकण्याचे ध्येय 🎯',
                'Hinglish': 'Aapke Learning Goals 🎯'
            },
            'Set targets, track time, and earn XP!': {
                'English': 'Set targets, track time, and earn XP!',
                'Hindi': 'लक्ष्य निर्धारित करें, समय ट्रैक करें और XP अर्जित करें!',
                'Marathi': 'लक्ष्य सेट करा, वेळ मागोवा आणि XP मिळवा!',
                'Hinglish': 'Targets set karein, time track karein, aur XP earn karein!'
            },
            'Daily Goals (50 XP)': {
                'English': 'Daily Goals (50 XP)',
                'Hindi': 'दैनिक लक्ष्य (50 XP)',
                'Marathi': 'दैनिक ध्येय (50 XP)',
                'Hinglish': 'Daily Goals (50 XP)'
            },
            'Weekly Goals (200 XP)': {
                'English': 'Weekly Goals (200 XP)',
                'Hindi': 'साप्ताहिक लक्ष्य (200 XP)',
                'Marathi': 'साप्ताहिक ध्येय (200 XP)',
                'Hinglish': 'Weekly Goals (200 XP)'
            },
            'Add': {
                'English': 'Add',
                'Hindi': 'जोड़ें',
                'Marathi': 'जोडा',
                'Hinglish': 'Add'
            },
            'Pause': {
                'English': 'Pause',
                'Hindi': 'विराम',
                'Marathi': 'विराम',
                'Hinglish': 'Pause'
            },
            'Start Timer': {
                'English': 'Start Timer',
                'Hindi': 'टाइमर शुरू करें',
                'Marathi': 'टाइमर सुरू करा',
                'Hinglish': 'Timer Start karein'
            },
            'AI-POWERED': {
                'English': 'AI-POWERED',
                'Hindi': 'एआई-संचालित',
                'Marathi': 'AI-द्वारे समर्थित',
                'Hinglish': 'AI-POWERED'
            },
            'SkillPrint 🧬': {
                'English': 'SkillPrint 🧬',
                'Hindi': 'स्किलप्रिंट 🧬',
                'Marathi': 'स्किलप्रिंट 🧬',
                'Hinglish': 'SkillPrint 🧬'
            },
            'Generate personalized project tasks & assignments.': {
                'English': 'Generate personalized project tasks & assignments.',
                'Hindi': 'व्यक्तिगत प्रोजेक्ट कार्य और असाइनमेंट तैयार करें।',
                'Marathi': 'वैयक्तिकृत प्रकल्प कार्ये आणि असाइनमेंट तयार करा.',
                'Hinglish': 'Personalized project tasks aur assignments generate karein.'
            },
            'What do you want to practice?': {
                'English': 'What do you want to practice?',
                'Hindi': 'आप क्या अभ्यास करना चाहते हैं?',
                'Marathi': 'तुम्हाला काय सराव करायचा आहे?',
                'Hinglish': 'Aap kya practice karna chahte hain?'
            },
            'Difficulty Level': {
                'English': 'Difficulty Level',
                'Hindi': 'कठिनाई का स्तर',
                'Marathi': 'काठीण्य पातळी',
                'Hinglish': 'Difficulty Level'
            },
            'Beginner': {
                'English': 'Beginner', 'Hindi': 'शुरुआती', 'Marathi': 'शुरुवात', 'Hinglish': 'Beginner'
            },
            'Intermediate': {
                'English': 'Intermediate', 'Hindi': 'मध्यवर्ती', 'Marathi': 'मध्यम', 'Hinglish': 'Intermediate'
            },
            'Advanced': {
                'English': 'Advanced', 'Hindi': 'उन्नत', 'Marathi': 'प्रगत', 'Hinglish': 'Advanced'
            },
            'Expert': {
                'English': 'Expert', 'Hindi': 'विशेषज्ञ', 'Marathi': 'तज्ञ', 'Hinglish': 'Expert'
            },
            'Generating...': {
                'English': 'Generating...', 'Hindi': 'तैयार किया जा रहा है...', 'Marathi': 'तयार केले जात आहे...', 'Hinglish': 'Generate ho raha hai...'
            },
            'Generate SkillPrint': {
                'English': 'Generate SkillPrint', 'Hindi': 'स्किल्प्रिंट तैयार करें', 'Marathi': 'स्किल्प्रिंट तयार करा', 'Hinglish': 'SkillPrint Generate karein'
            },
            'Hello! I am your SkillSphere AI. Ask me any doubt about coding, logic, or algorithms in your preferred language.': {
                'English': 'Hello! I am your SkillSphere AI. Ask me any doubt about coding, logic, or algorithms in your preferred language.',
                'Hindi': 'नमस्ते! मैं आपका SkillSphere AI हूँ। अपनी पसंद की भाषा में कोडिंग, लॉजिक या एल्गोरिदम के बारे में कोई भी संदेह मुझसे पूछें।',
                'Marathi': 'नमस्कार! मी तुमचा SkillSphere AI आहे. तुमच्या पसंतीच्या भाषेत कोडिंग, लॉजिक किंवा अल्गोरिदमबद्दल मला कोणतीही शंका विचारा.',
                'Hinglish': 'Hi! Main aapka SkillSphere AI hoon. Coding, logic, ya algorithms pe koi bhi doubt apni language mein poochein.'
            },
            'Ask Doubts 🤖': {
                'English': 'Ask Doubts 🤖', 'Hindi': 'संदेह पूछें 🤖', 'Marathi': 'शंका विचारा 🤖', 'Hinglish': 'Doubts poochein 🤖'
            },
            'Powered by': {
                'English': 'Powered by', 'Hindi': 'द्वारा संचालित', 'Marathi': 'द्वारे समर्थित', 'Hinglish': 'Powered by'
            },
            'Type your doubt here...': {
                'English': 'Type your doubt here...', 'Hindi': 'अपना संदेह यहाँ टाइप करें...', 'Marathi': 'तुमची शंका येथे टाईप करा...', 'Hinglish': 'Apna doubt yahan type karein...'
            },
            'Recent History': {
                'English': 'Recent History', 'Hindi': 'हालिया इतिहास', 'Marathi': 'अलीकडील इतिहास', 'Hinglish': 'Recent History'
            },
            'Search history...': {
                'English': 'Search history...', 'Hindi': 'इतिहास खोजें...', 'Marathi': 'इतिहास शोधा...', 'Hinglish': 'History search karein...'
            },
            'Copied!': {
                'English': 'Copied!', 'Hindi': 'कॉपी किया गया!', 'Marathi': 'कॉपी केले!', 'Hinglish': 'Copy ho gaya!'
            },
            'Saved to Notes successfully!': {
                'English': 'Saved to Notes successfully!', 'Hindi': 'नोट्स में सफलतापूर्वक सहेजा गया!', 'Marathi': 'नोट्समध्ये यशस्वीरित्या जतन केले!', 'Hinglish': 'Notes mein save ho gaya!'
            },
            'Fix API Keys': {
                'English': 'Fix API Keys', 'Hindi': 'API कुंजी ठीक करें', 'Marathi': 'API कीज दुरुस्त करा', 'Hinglish': 'API Keys fix karein'
            },
            'Career Accelerator': {
                'English': 'Career Accelerator', 'Hindi': 'करियर एक्सीलरेटर', 'Marathi': 'करियर एक्सीलरेटर', 'Hinglish': 'Career Accelerator'
            },
            'Placement Prep 💼': {
                'English': 'Placement Prep 💼', 'Hindi': 'प्लेसमेंट तैयारी 💼', 'Marathi': 'प्लेसमेंट तयारी 💼', 'Hinglish': 'Placement Prep 💼'
            },
            'Your all-in-one arsenal for cracking top-tier product and service-based companies.': {
                'English': 'Your all-in-one arsenal for cracking top-tier product and service-based companies.',
                'Hindi': 'टॉप-टियर प्रोडक्ट और सर्विस-आधारित कंपनियों को क्रैक करने के लिए आपका ऑल-इन-वन शस्त्रागार।',
                'Marathi': 'टॉप-टियर उत्पादन आणि सेवा-आधारित कंपन्या क्रॅक करण्यासाठी तुमचे सर्व-इन-वन शस्त्रागार.',
                'Hinglish': 'Top companies crack karne ke liye aapka all-in-one arsenal.'
            },
            'From DSA marathons to soft skills boosters.': {
                'English': 'From DSA marathons to soft skills boosters.',
                'Hindi': 'DSA मैराथन से लेकर सॉफ्ट स्किल्स बूस्टर तक।',
                'Marathi': 'DSA मॅरेथॉनपासून सॉफ्ट स्किल्स बूस्टरपर्यंत.',
                'Hinglish': 'DSA marathons se soft skills boosters tak.'
            },
            'Interview Preparation': {
                'English': 'Interview Preparation', 'Hindi': 'साक्षात्कार की तैयारी', 'Marathi': 'मुलाखतीची तयारी', 'Hinglish': 'Interview Preparation'
            },
            'Master HR and Technical rounds with AI feedback and curated question banks.': {
                'English': 'Master HR and Technical rounds with AI feedback and curated question banks.',
                'Hindi': 'एआई फीडबैक और क्यूरेटेड प्रश्न बैंकों के साथ एचआर और तकनीकी राउंड में महारत हासिल करें।',
                'Marathi': 'AI फीडबॅक आणि क्युरेट केलेल्या प्रश्न संचांसह HR आणि तांत्रिक फेऱ्यांमध्ये प्रभुत्व मिळवा.',
                'Hinglish': 'AI feedback aur curated question banks ke saath interview master karein.'
            },
            'DSA': {
                'English': 'DSA', 'Hindi': 'DSA', 'Marathi': 'DSA', 'Hinglish': 'DSA'
            },
            'Deep dive into Data Structures and Algorithms with curated practice questions.': {
                'English': 'Deep dive into Data Structures and Algorithms with curated practice questions.',
                'Hindi': 'क्यूरेटेड अभ्यास प्रश्नों के साथ डेटा स्ट्रक्चर और एल्गोरिदम में गहराई से उतरें।',
                'Marathi': 'क्युरेट केलेल्या सराव प्रश्नांसह डेटा स्ट्रक्चर्स आणि अल्गोरिदममध्ये खोलवर जा.',
                'Hinglish': 'Curated practice questions ke saath DSA mein deep dive karein.'
            },
            'Aptitude & Reasoning': {
                'English': 'Aptitude & Reasoning', 'Hindi': 'एप्टीट्यूड और रीजनिंग', 'Marathi': 'योग्यता आणि तर्क', 'Hinglish': 'Aptitude & Reasoning'
            },
            'Master quantitative, verbal, and logical reasoning tests.': {
                'English': 'Master quantitative, verbal, and logical reasoning tests.',
                'Hindi': 'मात्रात्मक, मौखिक और तार्किक तर्क परीक्षणों में महारत हासिल करें।',
                'Marathi': 'परिमाणात्मक, मौखिक आणि तार्किक तर्क चाचण्यांमध्ये प्रभुत्व मिळवा.',
                'Hinglish': 'Quantitative, verbal, aur logical reasoning tests master karein.'
            },
            'Company-wise Roadmap': {
                'English': 'Company-wise Roadmap', 'Hindi': 'कंपनी-वार रोडमैप', 'Marathi': 'कंपनीनुसार रोडमॅप', 'Hinglish': 'Company-wise Roadmap'
            },
            'Curated paths for Google, Amazon, TCS, Infosys, and more.': {
                'English': 'Curated paths for Google, Amazon, TCS, Infosys, and more.',
                'Hindi': 'गूगल, अमेज़ॅन, टीसीएस, इंफोसिस और अन्य के लिए क्यूरेटेड पथ।',
                'Marathi': 'Google, Amazon, TCS, Infosys आणि अधिकसाठी क्युरेट केलेले मार्ग.',
                'Hinglish': 'Google, Amazon, TCS, Infosys, aur more ke liye curated paths.'
            },
            'Available': {
                'English': 'Available', 'Hindi': 'उपलब्ध', 'Marathi': 'उपलब्ध', 'Hinglish': 'Available'
            },
            'Resources': {
                'English': 'Resources', 'Hindi': 'संसाधन', 'Marathi': 'संसाधने', 'Hinglish': 'Resources'
            },
            'Full Module Content': {
                'English': 'Full Module Content', 'Hindi': 'पूर्ण मॉड्यूल सामग्री', 'Marathi': 'पूर्ण मॉड्यूल सामग्री', 'Hinglish': 'Full Module Content'
            },
            'Study Material 📚': {
                'English': 'Study Material 📚', 'Hindi': 'अध्ययन सामग्री 📚', 'Marathi': 'अभ्यास साहित्य 📚', 'Hinglish': 'Study Material 📚'
            },
            'A curated collection of the best resources for C, C++, Java, Web Dev, Python, and DSA. Click any topic to download or view.': {
                'English': 'A curated collection of the best resources for C, C++, Java, Web Dev, Python, and DSA. Click any topic to download or view.',
                'Hindi': 'C, C++, Java, Web Dev, Python और DSA के लिए सर्वश्रेष्ठ संसाधनों का एक क्यूरेटेड संग्रह। डाउनलोड करने या देखने के लिए किसी भी विषय पर क्लिक करें।',
                'Marathi': 'C, C++, Java, Web Dev, Python आणि DSA साठी सर्वोत्तम संसाधनांचा एक क्युरेट केलेला संग्रह. डाउनलोड करण्यासाठी किंवा पाहण्यासाठी कोणत्याही विषयावर क्लिक करा.',
                'Hinglish': 'C, C++, Java, Web Dev, Python, aur DSA ke best resources ka collection. Download ya view karne ke liye click karein.'
            },
            'Core Languages': {
                'English': 'Core Languages', 'Hindi': 'कोर भाषाएं', 'Marathi': 'मूळ भाषा', 'Hinglish': 'Core Languages'
            },
            'Frontend Web': {
                'English': 'Frontend Web', 'Hindi': 'फ्रंटएंड वेब', 'Marathi': 'फ्रंटएंड वेब', 'Hinglish': 'Frontend Web'
            },
            'Backend & Server': {
                'English': 'Backend & Server', 'Hindi': 'बैकएंड और सर्वर', 'Marathi': 'बॅकएंड आणि सर्व्हर', 'Hinglish': 'Backend & Server'
            },
            'Databases': {
                'English': 'Databases', 'Hindi': 'डेटाबेस', 'Marathi': 'डेटाबेस', 'Hinglish': 'Databases'
            },
            'Algorithms & Logic': {
                'English': 'Algorithms & Logic', 'Hindi': 'एल्गोरिदम और लॉजिक', 'Marathi': 'अल्गोरिदम आणि लॉजिक', 'Hinglish': 'Algorithms & Logic'
            },
            'Saved Notes': {
                'English': 'Saved Notes', 'Hindi': 'सहेजे गए नोट्स', 'Marathi': 'जतन केलेल्या नोट्स', 'Hinglish': 'Saved Notes'
            },
            'Access your saved learning materials and snippets.': {
                'English': 'Access your saved learning materials and snippets.',
                'Hindi': 'अपनी सहेजी गई शिक्षण सामग्री और स्निपेट्स तक पहुँचें।',
                'Marathi': 'तुमच्या जतन केलेल्या शिक्षण सामग्री आणि स्निपेट्समध्ये प्रवेश करा.',
                'Hinglish': 'Apne saved learning materials aur snippets access karein.'
            },
            'Search notes...': {
                'English': 'Search notes...', 'Hindi': 'नोट्स खोजें...', 'Marathi': 'नोट्स शोधा...', 'Hinglish': 'Notes search karein...'
            },
            'Note copied to clipboard!': {
                'English': 'Note copied to clipboard!', 'Hindi': 'नोट क्लिपबोर्ड पर कॉपी किया गया!', 'Marathi': 'नोट क्लिपबोर्डवर कॉपी केली!', 'Hinglish': 'Note clipboard pe copy ho gaya!'
            },
            'No notes found. Start learning and save some notes!': {
                'English': 'No notes found. Start learning and save some notes!',
                'Hindi': 'कोई नोट्स नहीं मिले। सीखना शुरू करें और कुछ नोट्स सहेजें!',
                'Marathi': 'कोणतीही नोट्स आढळली नाहीत. शिकणे सुरू करा आणि काही नोट्स जतन करा!',
                'Hinglish': 'No notes found. Seekhna shuru karein aur notes save karein!'
            },
            'Copy': {
                'English': 'Copy', 'Hindi': 'कॉपी करें', 'Marathi': 'कॉपी करा', 'Hinglish': 'Copy'
            },
            'Download PDF': {
                'English': 'Download PDF', 'Hindi': 'पीडीएफ डाउनलोड करें', 'Marathi': 'पीडीएफ डाउनलोड करा', 'Hinglish': 'PDF Download karein'
            },
            'Algorithms': {
                'English': 'Algorithms', 'Hindi': 'एल्गोरिदम', 'Marathi': 'अल्गोरिदम', 'Hinglish': 'Algorithms'
            },
            'Study Material': {
                'English': 'Study Material', 'Hindi': 'अध्ययन सामग्री', 'Marathi': 'अभ्यास साहित्य', 'Hinglish': 'Study Material'
            },
            'Comprehensive Theory': {
                'English': 'Comprehensive Theory', 'Hindi': 'व्यापक सिद्धांत', 'Marathi': 'सर्वसमावेशक सिद्धांत', 'Hinglish': 'Comprehensive Theory'
            },
            'Deep dive into Javascript, Python, C++, and Java concepts efficiently explained in your preferred language.': {
                'English': 'Deep dive into Javascript, Python, C++, and Java concepts efficiently explained in your preferred language.',
                'Hindi': 'जावास्क्रिप्ट, पायथन, सी ++ और जावा अवधारणाओं में गहराई से उतरें जो आपकी पसंदीदा भाषा में कुशलता से समझाए गए हैं।',
                'Marathi': 'तुमच्या पसंतीच्या भाषेत कार्यक्षमतेने स्पष्ट केलेल्या जावास्क्रिप्ट, पायथन, सी ++ आणि जावा संकल्पनांमध्ये खोलवर जा.',
                'Hinglish': 'Javascript, Python, C++, aur Java concepts apni language mein deep dive karein.'
            },
            'AI Logic Mentor': {
                'English': 'AI Logic Mentor', 'Hindi': 'एआई लॉजिक मेंटर', 'Marathi': 'AI लॉजिक मेंटर', 'Hinglish': 'AI Logic Mentor'
            },
            'Stuck on logic? Our GPT-4o powered AI explains complex algorithms simply in Hinglish, Hindi, or Marathi.': {
                'English': 'Stuck on logic? Our GPT-4o powered AI explains complex algorithms simply in Hinglish, Hindi, or Marathi.',
                'Hindi': 'लॉजिक पर अटक गए? हमारा GPT-4o संचालित AI हिंग्लिश, हिंदी या मराठी में जटिल एल्गोरिदम को आसानी से समझाता है।',
                'Marathi': 'लॉजिकवर अडकलात? आमचे GPT-4o समर्थित AI हिंग्लिश, हिंदी किंवा मराठीत जटिल अल्गोरिदम सहजपणे स्पष्ट करते.',
                'Hinglish': 'Logic mein stuck? Humara AI Hinglish, Hindi, ya Marathi mein algorithms explain karega.'
            },
            'Multi-Language Support': {
                'English': 'Multi-Language Support', 'Hindi': 'बहु-भाषा समर्थन', 'Marathi': 'बहु-भाषा समर्थन', 'Hinglish': 'Multi-Language Support'
            },
            'Learn in the language you are most comfortable with. Break the language barrier and focus on logic.': {
                'English': 'Learn in the language you are most comfortable with. Break the language barrier and focus on logic.',
                'Hindi': 'उस भाषा में सीखें जिसमें आप सबसे अधिक सहज हैं। भाषा की बाधा को तोड़ें और लॉजिक पर ध्यान केंद्रित करें।',
                'Marathi': 'तुम्हाला सर्वात सोयीस्कर वाटणाऱ्या भाषेत शिका. भाषेचा अडथळा मोडा आणि लॉजिकवर लक्ष केंद्रित करा.',
                'Hinglish': 'Apni comfortable language mein seekhein. Language barrier break karke logic pe focus karein.'
            },
            'Active Learners': {
                'English': 'Active Learners', 'Hindi': 'सक्रिय शिक्षार्थी', 'Marathi': 'सक्रिय शिकणारे', 'Hinglish': 'Active Learners'
            },
            'Doubts Solved': {
                'English': 'Doubts Solved', 'Hindi': 'संदेह हल किए गए', 'Marathi': 'शंकांचे निरसन झाले', 'Hinglish': 'Doubts Solved'
            },
            'Concepts': {
                'English': 'Concepts', 'Hindi': 'अवधारणाएँ', 'Marathi': 'संकल्पना', 'Hinglish': 'Concepts'
            },
            'Languages': {
                'English': 'Languages', 'Hindi': 'भाषाएँ', 'Marathi': 'भाषा', 'Hinglish': 'Languages'
            },
            'Recent': {
                'English': 'Recent', 'Hindi': 'हाल ही में', 'Marathi': 'अलीकडील', 'Hinglish': 'Recent'
            },
            'Auto-fill for': {
                'English': 'Auto-fill for', 'Hindi': 'इसके लिए ऑटो-फिल', 'Marathi': 'यासाठी ऑटो-फिल', 'Hinglish': 'Auto-fill for'
            },
            'No recent activity. Start a quiz!': {
                'English': 'No recent activity. Start a quiz!',
                'Hindi': 'कोई हालिया गतिविधि नहीं। प्रश्नोत्तरी शुरू करें!',
                'Marathi': 'काही अलीकडील कृती नाही. क्विझ सुरू करा!',
                'Hinglish': 'No recent activity. Quiz start karein!'
            }
        };

        if (dictionary[key] && dictionary[key][language]) {
            return dictionary[key][language];
        }
        return key; // Fallback to key if translation missing
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, languages, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
