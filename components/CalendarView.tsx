
import React from 'react';
import { UserData, DayStatus } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Props {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const CalendarView: React.FC<Props> = ({ userData, setUserData }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const toggleDayStatus = (dateStr: string) => {
    setUserData(prev => {
      const currentLog = prev.logs?.[dateStr];
      let nextStatus = DayStatus.COMPLETED;
      if (currentLog?.status === DayStatus.COMPLETED) nextStatus = DayStatus.PARTIAL;
      else if (currentLog?.status === DayStatus.PARTIAL) nextStatus = DayStatus.MISSED;
      else if (currentLog?.status === DayStatus.MISSED) nextStatus = DayStatus.FUTURE;

      return {
        ...prev,
        logs: {
          ...prev.logs,
          [dateStr]: { date: dateStr, status: nextStatus }
        }
      };
    });
  };

  const getStatusColor = (status?: DayStatus) => {
    switch (status) {
      case DayStatus.COMPLETED: return 'bg-emerald-500 text-white border-emerald-400';
      case DayStatus.PARTIAL: return 'bg-amber-400 text-white border-amber-300';
      case DayStatus.MISSED: return 'bg-rose-500 text-white border-rose-400';
      default: return 'bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600 text-slate-400';
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`} className="h-10 sm:h-14" />);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const log = userData.logs?.[dateStr];
      const isToday = dateStr === today.toISOString().split('T')[0];
      const isPast = date < today;

      cells.push(
        <button
          key={day}
          onClick={() => toggleDayStatus(dateStr)}
          className={`h-10 sm:h-14 rounded-xl border flex flex-col items-center justify-center relative transition-all hover:scale-105 active:scale-95 group ${getStatusColor(log?.status)} ${isToday ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : ''}`}
        >
          <span className="text-xs sm:text-sm font-bold">{day}</span>
          {log?.status && (
            <div className="absolute top-1 right-1">
               {log.status === DayStatus.COMPLETED && <CheckCircle2 size={10} />}
               {log.status === DayStatus.MISSED && <XCircle size={10} />}
               {log.status === DayStatus.PARTIAL && <AlertCircle size={10} />}
            </div>
          )}
          {isToday && <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-extrabold font-heading">{monthName}</h3>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{currentYear} Attendance</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setCurrentMonth(prev => prev === 0 ? 11 : prev - 1); if(currentMonth === 0) setCurrentYear(prev => prev - 1); }}
            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
          ><ChevronLeft size={20} /></button>
          <button 
            onClick={() => { setCurrentMonth(prev => prev === 11 ? 0 : prev + 1); if(currentMonth === 11) setCurrentYear(prev => prev + 1); }}
            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
          ><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2">{d}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {renderCells()}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-50 dark:border-slate-700">
        <LegendItem color="bg-emerald-500" label="Completed" />
        <LegendItem color="bg-amber-400" label="Partial" />
        <LegendItem color="bg-rose-500" label="Missed" />
        <LegendItem color="bg-slate-100" label="Planned" />
      </div>
    </div>
  );
};

const LegendItem: React.FC<{ color: string, label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

export default CalendarView;
