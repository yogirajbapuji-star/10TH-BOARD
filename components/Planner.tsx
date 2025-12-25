
import React from 'react';
import { UserData, DailySchedule, ChapterStatus } from '../types';
import { Clock, Briefcase, GraduationCap, BookOpen, Coffee, AlertTriangle, CalendarDays, Zap, PenTool, Search } from 'lucide-react';

interface Props {
  userData: UserData;
  daysRemaining: number;
}

interface ScheduleBlock {
  time: string;
  task: string;
  type: 'busy' | 'study' | 'rest';
  category: 'coaching' | 'school' | 'self' | 'rest';
  tip?: string;
}

const Planner: React.FC<Props> = ({ userData, daysRemaining }) => {
  const isSolvingPhase = daysRemaining <= 20;

  const incompleteChapters = userData.subjects.reduce((acc, sub) => 
    acc + sub.chapters.filter(ch => ch.status !== ChapterStatus.COMPLETED).length, 0
  );

  const schedule: ScheduleBlock[] = [
    { 
      time: "06:00 - 09:00", 
      task: "Coaching Class", 
      type: "busy", 
      category: "coaching" 
    },
    { 
      time: "09:30 - 11:30", 
      task: isSolvingPhase ? "Paper Solving (Timed)" : "Self Study: Math/Science Concepts", 
      type: "study", 
      category: "self",
      tip: "Focus on problem-solving during your peak brain hours."
    },
    { 
      time: "12:00 - 17:00", 
      task: "School Hours", 
      type: "busy", 
      category: "school" 
    },
    { 
      time: "17:00 - 18:00", 
      task: isSolvingPhase ? "Paper Analysis" : "Self Study: History/Geography", 
      type: "study", 
      category: "self" 
    },
    { 
      time: "18:00 - 20:00", 
      task: "Coaching Class", 
      type: "busy", 
      category: "coaching" 
    },
    { 
      time: "20:30 - 22:00", 
      task: isSolvingPhase ? "PYQ Flashcard Review" : "English Grammar & Writing Skills", 
      type: "study", 
      category: "self",
      tip: "Practice one letter or summary today. Use 5 new vocabulary words."
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-heading">Digital Study Desk</h2>
          <p className="text-slate-400 font-medium">Balancing fixed commitments with focused study.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-2.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           <CalendarDays className="text-[#4A90E2]" size={20} />
           <span className="font-black text-[#4A90E2]">Day {340 - daysRemaining} / 340</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Timeline View */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-700">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex gap-10 mb-8 relative group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${
                  item.type === 'busy' ? 'bg-[#F5A623] text-white shadow-[#F5A623]/20' : 
                  item.type === 'study' ? 'bg-[#4A90E2] text-white shadow-blue-200/50' : 
                  'bg-slate-100 text-slate-400'
                }`}>
                  {item.category === 'coaching' && <Briefcase size={20} />}
                  {item.category === 'school' && <GraduationCap size={20} />}
                  {item.category === 'self' && <BookOpen size={20} />}
                </div>

                <div className="flex-1">
                  <div className={`p-6 rounded-[2rem] border transition-all ${
                    item.type === 'busy' 
                      ? 'bg-[#F5A623]/5 border-[#F5A623]/20 opacity-80' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 card-glow shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                        item.type === 'busy' ? 'text-[#F5A623]' : 'text-[#4A90E2]'
                      }`}>{item.time}</span>
                      {item.type === 'busy' && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5A623]/10 text-[#F5A623] rounded-full text-[10px] font-black uppercase">
                          <Zap size={10} /> Busy Slot
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-800 dark:text-white font-heading tracking-tight">{item.task}</h4>
                    {item.tip && (
                      <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                         <Search size={14} className="text-[#4A90E2] mt-0.5 flex-shrink-0" />
                         <p className="text-xs text-[#4A90E2] font-semibold italic">{item.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Alerts & Tips */}
        <div className="space-y-8 text-left">
          <div className="p-8 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100 dark:shadow-none space-y-6">
            <h4 className="text-xl font-extrabold font-heading flex items-center gap-3">
              <PenTool size={24} /> 
              English Focus
            </h4>
            <div className="space-y-4">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Vocabulary Builder</p>
                 <p className="text-sm font-bold">Pick 3 words from today's lesson and write their synonyms.</p>
               </div>
               <div className="h-px w-full bg-white/20" />
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Writing Habit</p>
                 <p className="text-sm font-bold">Draft a 50-word summary of a news article today.</p>
               </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
            <h4 className="font-extrabold font-heading text-lg">Language Confidence</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2] mt-1.5" />
                <p className="text-xs font-medium text-slate-500">Read the lesson aloud to improve pronunciation.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] mt-1.5" />
                <p className="text-xs font-medium text-slate-500">Underline 'Figures of Speech' in poems for easy marks.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
