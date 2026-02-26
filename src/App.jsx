
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';


import Practice from './pages/Practice';
import SavedNotes from './pages/SavedNotes';
import Settings from './pages/Settings';
import About from './pages/About';



import SkillPrintPage from './pages/SkillPrintPage';
import StudyMaterialPage from './pages/StudyMaterialPage';
import PlacementPrepPage from './pages/PlacementPrepPage';


import NeuralBackground from './components/NeuralBackground';


function App() {

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex h-screen overflow-hidden relative">
            <NeuralBackground />
            <Sidebar />
            <main className="flex-1 overflow-y-auto md:ml-72 bg-white dark:bg-slate-950 transition-colors duration-300">

              <Routes>
                <Route path="/" element={<Home />} />
               
           
           
             
                <Route path="/saved" element={<SavedNotes />} />
                <Route path="/about" element={<About />} />
            
                <Route path="/settings" element={<Settings />} />
               
              
                <Route path="/skillprint" element={<SkillPrintPage />} />
                <Route path="/study-material" element={<StudyMaterialPage />} />
                <Route path="/placement-prep" element={<PlacementPrepPage />} />

              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
