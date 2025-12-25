
import React, { useState, useEffect } from 'react';
import { Clock, Zap, BookOpen, Coffee, Briefcase, GraduationCap, PauseCircle } from 'lucide-react';
import { FIXED_SCHEDULE } from '../constants';

interface Props {
  isStarted: boolean;
}

const LiveClock: React.FC<Props> = ({ isStarted }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const hours24 = now.getHours() + now.getMinutes() / 60;

  const currentBlock = FIXED_SCHEDULE.find(block => hours24 >= block.start && hours24 < block.end);

  const getIcon = (category: string) => {
    switch (category) {
      case 'coaching': return <Briefcase size={16} />;
      case 'school': return <GraduationCap size={16} />;
      case 'self': return <BookOpen size={16} />;
      default: return <Coffee size={16} />;
    }
  };

  const today = new Date();
  const marchFirst = new Date(today.getFullYear(), 2, 1);
  const isBeforeMarch = today < marchFirst;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[1.5rem] text-white">
      <div className="flex items-center gap-3 pr-4 sm:border-r border-white/20">
        <div className="p-2 bg-white/20 rounded-xl animate-pulse">
          <Clock size={20} />
        </div>
        <div className="text-2xl font-black font-heading tabular-nums min-w-[120px]">
          {timeString}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {!isStarted ? (
          <>
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <PauseCircle size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">Status</p>
              <p className="text-sm font-extrabold">{isBeforeMarch ? "Preparation Paused ⏸️" : "Waiting for Start 🚀"}</p>
            </div>
          </>
        ) : currentBlock ? (
          <>
            <div className={`p-2 rounded-xl bg-green-500/20 text-green-400`}>
              {getIcon(currentBlock.category)}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">Current Block</p>
              <p className="text-sm font-extrabold whitespace-nowrap">{currentBlock.task} {currentBlock.type === 'study' ? '📚' : '⏰'}</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Coffee size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none mb-1">Rest Time</p>
              <p className="text-sm font-extrabold">Recharge Your Brain 🔋</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveClock;
