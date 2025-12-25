
import React, { useState } from 'react';
import { UserData, ChapterStatus, SubjectMedium } from '../types';
import { ChevronDown, CheckCircle2, Circle, PlayCircle, Trophy, BookOpen, Star, Sparkles } from 'lucide-react';

interface Props {
  userData: UserData;
  updateChapterStatus: (subjectId: string, chapterId: string, status: ChapterStatus) => void;
}

const Syllabus: React.FC<Props> = ({ userData, updateChapterStatus }) => {
  const [expanded, setExpanded] = useState<string[]>(userData.subjects.map(s => s.id));
  const [recentComplete, setRecentComplete] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const onStatusChange = (sId: string, cId: string, status: ChapterStatus) => {
    if (status === ChapterStatus.COMPLETED) {
      setRecentComplete(cId);
      setTimeout(() => setRecentComplete(null), 2000);
    }
    updateChapterStatus(sId, cId, status);
  };

  const getStatusLabel = (status: ChapterStatus, medium: SubjectMedium) => {
    if (medium === 'Marathi') {
      switch (status) {
        case ChapterStatus.COMPLETED: return 'पूर्ण';
        case ChapterStatus.IN_PROGRESS: return 'सुरू';
        default: return 'बाकी';
      }
    }
    switch (status) {
      case ChapterStatus.COMPLETED: return 'Done';
      case ChapterStatus.IN_PROGRESS: return 'Live';
      default: return 'Wait';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-heading">Board Syllabus</h2>
          <p className="text-slate-400 font-medium">One chapter at a time, you're building a future.</p>
        </div>
        <div className="flex gap-2">
           <Badge color="bg-[#2ECC71]" text="Mastered" />
           <Badge color="bg-[#4A90E2]" text="Learning" />
           <Badge color="bg-slate-200" text="Pending" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userData.subjects.map(subject => {
          const completedCount = subject.chapters.filter(c => c.status === ChapterStatus.COMPLETED).length;
          const progress = Math.round((completedCount / subject.chapters.length) * 100);
          const isExpanded = expanded.includes(subject.id);
          const isMarathiSubject = subject.medium === 'Marathi';

          return (
            <div key={subject.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleExpand(subject.id)}
                className="w-full p-6 lg:p-8 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${
                    subject.medium === 'Marathi' ? 'bg-[#F5A623] shadow-[#F5A623]/20' : 
                    subject.medium === 'Sanskrit' ? 'bg-purple-500 shadow-purple-200' : 
                    'bg-[#4A90E2] shadow-blue-200'
                  }`}>
                    <BookOpen size={24} />
                    <span className="text-[8px] font-black uppercase mt-1 tracking-widest">{subject.medium}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-extrabold text-xl font-heading text-slate-800 dark:text-white">{subject.name}</h3>
                      {subject.isWeak && (
                        <span className="text-[10px] bg-red-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse">Priority</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {completedCount} / {subject.chapters.length} {isMarathiSubject ? 'धडे पूर्ण' : 'Completed'} • {progress}% {isMarathiSubject ? 'प्रगती' : 'Mastery'}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 transition-all ${isExpanded ? 'rotate-180 bg-blue-50 text-[#4A90E2]' : 'text-slate-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] border-t border-slate-50 dark:border-slate-700' : 'max-h-0 overflow-hidden'}`}>
                <div className="p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subject.chapters.map(chapter => (
                    <div 
                      key={chapter.id} 
                      className={`relative p-5 rounded-3xl border-2 flex items-center justify-between group transition-all duration-300 ${
                        chapter.status === ChapterStatus.COMPLETED 
                          ? 'border-[#2ECC71]/20 bg-[#2ECC71]/5' 
                          : 'border-slate-50 dark:border-slate-700 hover:border-[#4A90E2]/30'
                      }`}
                    >
                      {recentComplete === chapter.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 rounded-3xl z-20 animate-fade-up">
                          <div className="text-[#2ECC71] flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                            <Sparkles size={16} /> {isMarathiSubject ? 'छान!' : 'Well Done!'} <Sparkles size={16} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 flex-1">
                        <StatusIcon status={chapter.status} />
                        <div className="flex flex-col">
                           <span className={`text-sm font-bold ${
                            chapter.status === ChapterStatus.COMPLETED ? 'text-[#2ECC71] dark:text-[#2ECC71]' : 'text-slate-700 dark:text-slate-300'
                          }`}>{chapter.name}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                             {getStatusLabel(chapter.status, subject.medium)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <ActionButton 
                          active={chapter.status === ChapterStatus.NOT_STARTED} 
                          onClick={() => onStatusChange(subject.id, chapter.id, ChapterStatus.NOT_STARTED)}
                          color="bg-slate-200"
                        />
                        <ActionButton 
                          active={chapter.status === ChapterStatus.IN_PROGRESS} 
                          onClick={() => onStatusChange(subject.id, chapter.id, ChapterStatus.IN_PROGRESS)}
                          color="bg-[#4A90E2]"
                        />
                        <ActionButton 
                          active={chapter.status === ChapterStatus.COMPLETED} 
                          onClick={() => onStatusChange(subject.id, chapter.id, ChapterStatus.COMPLETED)}
                          color="bg-[#2ECC71]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Badge: React.FC<{ color: string, text: string }> = ({ color, text }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-sm">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{text}</span>
  </div>
);

const StatusIcon: React.FC<{ status: ChapterStatus }> = ({ status }) => {
  if (status === ChapterStatus.COMPLETED) return <Trophy className="text-[#2ECC71]" size={20} />;
  if (status === ChapterStatus.IN_PROGRESS) return <PlayCircle className="text-[#4A90E2]" size={20} />;
  return <Circle className="text-slate-200" size={20} />;
};

const ActionButton: React.FC<{ active: boolean, onClick: () => void, color: string }> = ({ active, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`w-6 h-6 rounded-lg ${color} transition-all hover:scale-125 border-4 ${
      active ? 'border-white dark:border-slate-800 ring-2 ring-slate-200 dark:ring-slate-600' : 'border-transparent opacity-40 grayscale'
    }`}
  />
);

export default Syllabus;
