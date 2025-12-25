
import React from 'react';
import { UserData } from '../types';
import { Trash2, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

interface Props {
  userData: UserData;
  toggleWeakSubject: (id: string) => void;
  resetProgress: () => void;
}

const Settings: React.FC<Props> = ({ userData, toggleWeakSubject, resetProgress }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold">Preferences & Settings</h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Weak Subject Tracking</h3>
          <p className="text-sm text-slate-500">Mark subjects where you need extra study time. The planner will auto-allocate focus slots for these.</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userData.subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => toggleWeakSubject(subject.id)}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                subject.isWeak 
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                  : 'border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <span className="font-medium text-sm">{subject.name}</span>
              {subject.isWeak ? (
                <AlertTriangle className="text-orange-600" size={18} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Danger Zone</h3>
          <p className="text-sm text-slate-500">Manage your stored data and application state.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">Reset All Progress</div>
              <div className="text-xs text-slate-500">Clear all completion status and start from Day 1.</div>
            </div>
            <button 
              onClick={resetProgress}
              className="px-4 py-2 bg-rose-100 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-200 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Reset Data
            </button>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
          <ShieldCheck size={16} />
          <span className="text-xs font-medium">Data is stored locally on your device</span>
        </div>
        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
          Made for SSC Students with <Heart size={10} className="text-rose-500 fill-rose-500" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
