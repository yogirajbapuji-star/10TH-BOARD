
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  FileCheck, 
  Settings as SettingsIcon,
  Sun,
  Moon,
  Rocket,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { UserData, ChapterStatus, AppPhase, DayLog, DayStatus } from './types';
import { INITIAL_SYLLABUS, TOTAL_DAYS, MOTIVATIONAL_QUOTES } from './constants';
import Dashboard from './components/Dashboard';
import Syllabus from './components/Syllabus';
import Planner from './components/Planner';
import PaperSolving from './components/PaperSolving';
import Settings from './components/Settings';
import LiveClock from './components/LiveClock';

const STORAGE_KEY = 'ssc_planner_data_v5';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'syllabus' | 'planner' | 'papers' | 'settings'>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark');
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.logs) parsed.logs = {};
      if (parsed.isStarted === undefined) parsed.isStarted = false;
      return parsed;
    }
    return {
      startDate: new Date().toISOString(),
      isStarted: false,
      subjects: INITIAL_SYLLABUS,
      targetDays: TOTAL_DAYS,
      logs: {}
    };
  });

  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    const interval = setInterval(() => {
      setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const daysPassed = useMemo(() => {
    if (!userData.isStarted || !userData.journeyStartedAt) return 0;
    const start = new Date(userData.journeyStartedAt).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  }, [userData.isStarted, userData.journeyStartedAt]);

  const daysRemaining = Math.max(0, TOTAL_DAYS - daysPassed);
  const currentPhase = daysRemaining <= 20 ? AppPhase.PAPER_SOLVING : AppPhase.SYLLABUS;

  const handleStartJourney = () => {
    const today = new Date();
    // Conceptually, button is for March 1st, but we allow pressing it once activated.
    // For this implementation, we check if it's already started.
    if (userData.isStarted) return;
    
    setUserData(prev => ({
      ...prev,
      isStarted: true,
      journeyStartedAt: today.toISOString()
    }));
  };

  const updateChapterStatus = (subjectId: string, chapterId: string, status: ChapterStatus) => {
    setUserData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => 
        sub.id === subjectId 
          ? { ...sub, chapters: sub.chapters.map(ch => ch.id === chapterId ? { ...ch, status } : ch) }
          : sub
      )
    }));
  };

  const toggleWeakSubject = (subjectId: string) => {
    setUserData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => sub.id === subjectId ? { ...sub, isWeak: !sub.isWeak } : sub)
    }));
  };

  const resetProgress = () => {
    if (window.confirm("Start your journey fresh? This will clear all tracked progress and reset the start button.")) {
      setUserData({
        startDate: new Date().toISOString(),
        isStarted: false,
        journeyStartedAt: undefined,
        subjects: INITIAL_SYLLABUS,
        targetDays: TOTAL_DAYS,
        logs: {}
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#F9FAFB] text-slate-900'} transition-all duration-300`}>
      {/* Desktop Sidebar */}
      <nav className="fixed bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 bg-white dark:bg-slate-800 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-700 z-50 transition-all shadow-xl lg:shadow-none">
        <div className="flex lg:flex-col h-full items-center lg:items-stretch py-2 lg:py-8">
          <div className="hidden lg:flex items-center gap-3 px-6 mb-12">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white">SSC Goal</h1>
              <p className="text-[10px] uppercase font-black text-blue-500 tracking-widest">Board 2025</p>
            </div>
          </div>

          <div className="flex flex-1 justify-around lg:flex-col lg:px-3 gap-1 lg:gap-2 w-full">
            <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavItem icon={<BookOpen size={20} />} label="Syllabus" active={activeTab === 'syllabus'} onClick={() => setActiveTab('syllabus')} />
            <NavItem icon={<CalendarDays size={20} />} label="Daily Desk" active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
            <NavItem icon={<FileCheck size={20} />} label="Practice" active={activeTab === 'papers'} onClick={() => setActiveTab('papers')} />
            <NavItem icon={<SettingsIcon size={20} />} label="Setup" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>

          <div className="hidden lg:block mt-auto px-6 space-y-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 font-bold text-sm"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
              <span>{darkMode ? 'Day Mode' : 'Focus Mode'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-64 p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto pb-24 lg:pb-12">
        {/* Animated Banner */}
        <div className="mb-12 relative overflow-hidden bg-gradient-to-r from-[#4A90E2] to-[#2ECC71] rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl shadow-blue-200/50 dark:shadow-none">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Rocket size={160} className="-rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
                <Sparkles size={14} />
                <span>{userData.isStarted ? currentPhase : 'Awaiting Kickoff'}</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold font-heading leading-tight">
                {userData.isStarted ? "Consistency Beats Pressure. 🎯" : "Prepare Your Mindset. 🌱"}
              </h2>
              <p className="text-blue-50 text-sm lg:text-base font-medium italic opacity-90 leading-relaxed">
                {userData.isStarted ? `"${quote}"` : "Your 10th Board journey officially begins with a single step."}
              </p>
            </div>
            
            <LiveClock isStarted={userData.isStarted} />
          </div>
        </div>

        <div className="animate-fade-up">
          {activeTab === 'dashboard' && (
            <Dashboard 
              userData={userData} 
              setUserData={setUserData} 
              daysRemaining={daysRemaining} 
              currentPhase={currentPhase} 
              onStartJourney={handleStartJourney}
            />
          )}
          {activeTab === 'syllabus' && <Syllabus userData={userData} updateChapterStatus={updateChapterStatus} />}
          {activeTab === 'planner' && <Planner userData={userData} daysRemaining={daysRemaining} />}
          {activeTab === 'papers' && <PaperSolving currentPhase={currentPhase} />}
          {activeTab === 'settings' && <Settings userData={userData} toggleWeakSubject={toggleWeakSubject} resetProgress={resetProgress} />}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-3 lg:px-6 lg:py-4 rounded-2xl transition-all duration-300 relative group ${
      active 
        ? 'bg-[#4A90E2] text-white shadow-lg lg:shadow-blue-100 dark:lg:shadow-none' 
        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
    }`}
  >
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full hidden lg:block" />}
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
    <span className="text-[10px] lg:text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default App;
