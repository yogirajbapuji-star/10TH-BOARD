
import React from 'react';
import { AppPhase } from '../types';
import { FileText, Download, Timer, ExternalLink, Trophy } from 'lucide-react';

interface Props {
  currentPhase: AppPhase;
}

const PaperSolving: React.FC<Props> = ({ currentPhase }) => {
  const isSolvingPhase = currentPhase === AppPhase.PAPER_SOLVING;

  const mockPapers = [
    { id: 1, subject: 'Mathematics Part 1', year: '2023 March', completed: true },
    { id: 2, subject: 'Science & Tech Part 1', year: '2023 March', completed: false },
    { id: 3, subject: 'Geography', year: '2022 July', completed: false },
    { id: 4, subject: 'English', year: '2024 Model', completed: false },
    { id: 5, subject: 'Mathematics Part 2', year: '2024 Model', completed: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {!isSolvingPhase && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl text-amber-600 dark:text-amber-400">
             <Timer size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-amber-900 dark:text-amber-200">Prepare for Phase 2!</h3>
            <p className="text-amber-800 dark:text-amber-300 text-sm">Paper solving mode unlocks in the last 20 days. Complete your syllabus first to gain confidence.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText size={24} className="text-indigo-600" />
            Previous Year Papers (PYQs)
          </h3>
          <div className="grid gap-4">
            {mockPapers.map(paper => (
              <div key={paper.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paper.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {paper.completed ? <Trophy size={20} /> : <FileText size={20} />}
                  </div>
                  <div>
                    <div className="font-bold">{paper.subject}</div>
                    <div className="text-xs text-slate-500">{paper.year}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600">
                    <Download size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                    <Timer size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ExternalLink size={24} className="text-indigo-600" />
            Quick Resources
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 space-y-4">
             <ResourceLink title="MSBSHSE Board Website" desc="Official circulars & timetables" />
             <ResourceLink title="eBalbharati Textbooks" desc="PDF versions of all subjects" />
             <ResourceLink title="Question Bank 2024" desc="Compiled by subject experts" />
             <ResourceLink title="Marking Scheme" desc="Understand the step-wise evaluation" />
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl">
            <h4 className="font-bold text-lg mb-2">Timed Practice Mode</h4>
            <p className="text-slate-400 text-sm mb-4">Solve 80-mark papers in exactly 3 hours to build exam stamina.</p>
            <button className="w-full py-3 bg-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
              <Timer size={20} />
              Start Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceLink: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
    <div>
      <div className="font-bold group-hover:text-indigo-600 transition-colors">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
    <ExternalLink size={16} className="text-slate-400" />
  </a>
);

export default PaperSolving;
