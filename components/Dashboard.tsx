
import React from 'react';
import { UserData, AppPhase, ChapterStatus } from '../types';
import { TrendingUp, BookOpen, Star, Zap, Flame, Rocket, GraduationCap, ShieldCheck } from 'lucide-react';
import AIConsultant from './AIConsultant';
import CalendarView from './CalendarView';

interface Props {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  daysRemaining: number;
  currentPhase: AppPhase;
  onStartJourney: () => void;
}

const Dashboard: React.FC<Props> = ({ userData, setUserData, daysRemaining, currentPhase, onStartJourney }) => {
  const isStarted = userData.isStarted;
  
  const stats = userData.subjects.map(sub => {
    const total = sub.chapters.length;
    const completed = sub.chapters.filter(ch => ch.status === ChapterStatus.COMPLETED).length;
    const progress = Math.round((completed / total) * 100);
    return { name: sub.name, progress, completed, total, medium: sub.medium };
  });

  const totalChapters = userData.subjects.reduce((acc, sub) => acc + sub.chapters.length, 0);
  const completedChapters = userData.subjects.reduce((acc, sub) => 
    acc + sub.chapters.filter(ch => ch.status === ChapterStatus.COMPLETED).length, 0
  );
  const overallProgress = Math.round((completedChapters / totalChapters) * 100);

  // Check if today is before March 1st (for display purposes)
  const today = new Date();
  const marchFirst = new Date(today.getFullYear(), 2, 1); // Month is 0-indexed, 2 = March
  const isBeforeMarch = today < marchFirst;

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl shadow-blue-100 dark:shadow-none border border-slate-100 dark:border-slate-700 p-10 lg:p-16 text-center space-y-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl opacity-50" />
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full text-xs font-black uppercase tracking-widest">
              <GraduationCap size={16} />
              <span>SSC Maharashtra Board 2025</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black font-heading tracking-tight text-slate-800 dark:text-white leading-tight">
              Ready to claim <br/> your future?
            </h2>
            <p className="text-slate-500 text-base lg:text-lg font-medium max-w-md mx-auto">
              {isBeforeMarch 
                ? "Your 10th Board journey officially begins on March 1st. Get your study materials ready and prepare your mind." 
                : "The path is set. The syllabus is waiting. It's time to transform from a student into a scholar."}
            </p>
          </div>

          <div className="relative pt-4">
            <button 
              onClick={onStartJourney}
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] text-white px-10 py-6 rounded-3xl font-black text-xl lg:text-2xl shadow-2xl shadow-blue-200 dark:shadow-none hover:scale-105 transition-all active:scale-95 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Rocket size={32} className="relative z-10 animate-bounce" />
              <span className="relative z-10 uppercase tracking-tight">Start 10th Board Prep</span>
            </button>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <ShieldCheck size={12} className="inline mr-1 mb-0.5" /> Securely stored local progress
            </p>
          </div>

          {!isBeforeMarch && (
            <div className="pt-4 flex items-center justify-center gap-8">
               <div className="text-center">
                 <div className="text-2xl font-black text-[#4A90E2]">340</div>
                 <div className="text-[8px] font-bold uppercase text-slate-400">Total Days</div>
               </div>
               <div className="w-px h-8 bg-slate-100 dark:bg-slate-700" />
               <div className="text-center">
                 <div className="text-2xl font-black text-[#2ECC71]">100%</div>
                 <div className="text-[8px] font-bold uppercase text-slate-400">Focus Mode</div>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center text-slate-400 max-w-sm">
          <p className="text-xs font-medium leading-relaxed italic">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Quick Glance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Flame size={24} />}
          label="Days to Board"
          value={daysRemaining.toString()}
          sub="March 2025"
          color="text-[#F5A623]"
          bg="bg-[#F5A623]/10"
        />
        <StatCard 
          icon={<TrendingUp size={24} />}
          label="Total Progress"
          value={`${overallProgress}%`}
          sub="Syllabus tracking"
          color="text-[#2ECC71]"
          bg="bg-[#2ECC71]/10"
        />
        <StatCard 
          icon={<Zap size={24} />}
          label="Daily Slot"
          value="4.5 hrs"
          sub="Self-study goal"
          color="text-[#4A90E2]"
          bg="bg-[#4A90E2]/10"
        />
        <StatCard 
          icon={<Star size={24} />}
          label="Chapters Done"
          value={`${completedChapters}/${totalChapters}`}
          sub="Mastered topics"
          color="text-purple-500"
          bg="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-extrabold font-heading">Mastery Level</h3>
                <p className="text-slate-400 text-sm font-medium">One step closer to your dream score.</p>
              </div>
              <div className="hidden sm:flex gap-2">
                <StatusPill color="bg-[#4A90E2]" label="English" />
                <StatusPill color="bg-[#F5A623]" label="Marathi" />
              </div>
            </div>
            
            <div className="space-y-10">
              {stats.map(sub => (
                <div key={sub.name} className="space-y-3 group">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{sub.medium} Medium</span>
                      <span className="text-base font-extrabold text-slate-700 dark:text-slate-200 group-hover:text-[#4A90E2] transition-colors">{sub.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 block mb-1">{sub.completed}/{sub.total} Ch.</span>
                      <span className="text-lg font-black text-slate-800 dark:text-white">{sub.progress}%</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner p-1">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                        sub.medium === 'Marathi' ? 'bg-[#F5A623]' : sub.medium === 'Sanskrit' ? 'bg-purple-500' : 'bg-[#4A90E2]'
                      }`} 
                      style={{ width: `${sub.progress}%` }} 
                    >
                      <div className="absolute inset-0 progress-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CalendarView userData={userData} setUserData={setUserData} />
        </div>

        <div className="space-y-8">
          <AIConsultant userData={userData} daysRemaining={daysRemaining} currentPhase={currentPhase} />
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
            <h3 className="text-xl font-extrabold font-heading mb-8">Strategic Path</h3>
            <div className="space-y-8 flex-1">
              <StrategyItem 
                icon={<BookOpen size={20} />}
                title="Syllabus Mode"
                desc="Day 1 - 320: Deep concept understanding & coaching notes."
                active={currentPhase === AppPhase.SYLLABUS}
              />
              <StrategyItem 
                icon={<Rocket size={20} />}
                title="Solving Mode"
                desc="Last 20 Days: Exclusive PYQs & mock timed practice."
                active={currentPhase === AppPhase.PAPER_SOLVING}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, sub: string, color: string, bg: string }> = ({ icon, label, value, sub, color, bg }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 card-glow transition-all">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg} ${color} mb-5`}>
      {icon}
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{label}</p>
    <p className="text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">{value}</p>
    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{sub}</p>
  </div>
);

const StatusPill: React.FC<{ color: string, label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-900/50 rounded-full border border-slate-100 dark:border-slate-700">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

const StrategyItem: React.FC<{ icon: React.ReactNode, title: string, desc: string, active: boolean }> = ({ icon, title, desc, active }) => (
  <div className={`flex gap-4 p-4 rounded-2xl border transition-all ${active ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800 shadow-sm' : 'border-transparent opacity-50'}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-white text-[#4A90E2] shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
      {icon}
    </div>
    <div className="space-y-1">
      <h4 className={`text-sm font-extrabold ${active ? 'text-blue-900 dark:text-blue-100' : 'text-slate-600'}`}>{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default Dashboard;
