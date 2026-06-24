import { Trophy, Flame, Target, ChevronUp, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function GamificationManager() {
  const [isOpen, setIsOpen] = useState(false);
  
  const stats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 15,
  };

  const progress = (stats.xp / stats.nextLevelXp) * 100;

  // Generate mock heatmap data (last 30 days)
  const heatmapData = Array.from({ length: 30 }).map((_, i) => {
    // Random intensity between 0 and 4
    const intensity = Math.floor(Math.random() * 5);
    return intensity;
  });

  const getIntensityColor = (intensity: number) => {
    switch(intensity) {
      case 0: return 'bg-white/5 border-white/5';
      case 1: return 'bg-brand-purple/30 border-brand-purple/20';
      case 2: return 'bg-brand-purple/60 border-brand-purple/40';
      case 3: return 'bg-brand-gold/60 border-brand-gold/40';
      case 4: return 'bg-brand-gold border-brand-gold shadow-[0_0_5px_rgba(195,161,84,0.5)]';
      default: return 'bg-white/5 border-white/5';
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-6 left-4 sm:left-6 z-50 glass-panel px-3 sm:px-4 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_20px_rgba(195,161,84,0.15)] border-brand-gold/20"
      >
        <div className="relative">
          <Trophy className="w-6 h-6 text-brand-gold drop-shadow-[0_0_5px_rgba(195,161,84,0.8)]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#150f1f]"></div>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs text-gray-400 font-medium">Level {stats.level}</p>
          <p className="text-sm font-bold text-white">Student Rank</p>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-400 ml-1 sm:ml-2" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 sm:left-6 z-50 glass-panel w-[calc(100vw-32px)] sm:w-[340px] rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-brand-gold/20 animate-in slide-in-from-bottom-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-brand-gold" />
          Your Progress
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-1.5 transition-colors">
          <ChevronUp className="w-4 h-4 rotate-180" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Level Progress */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs text-brand-gold uppercase tracking-wider font-bold mb-0.5">Level {stats.level}</p>
              <p className="text-sm text-white font-medium">Scholar</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-mono">{stats.xp} / {stats.nextLevelXp} XP</p>
            </div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-gradient-to-r from-brand-gold-dark to-brand-gold rounded-full shadow-[0_0_10px_rgba(195,161,84,0.5)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shrink-0">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-tight mb-0.5">Streak</p>
              <p className="text-sm font-bold text-white leading-tight">{stats.streak} Days</p>
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-tight mb-0.5">Goals</p>
              <p className="text-sm font-bold text-white leading-tight">3/5</p>
            </div>
          </div>
        </div>

        {/* Study Heatmap */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
             <CalendarIcon className="w-4 h-4 text-gray-400" />
             <p className="text-xs font-semibold text-gray-300">Study Consistency (30 Days)</p>
          </div>
          <div className="grid grid-cols-10 gap-1.5">
             {heatmapData.map((intensity, idx) => (
                <div 
                  key={idx} 
                  className={`w-full aspect-square rounded-[3px] border ${getIntensityColor(intensity)} transition-colors hover:border-white/50`}
                  title={`Activity Level: ${intensity}`}
                />
             ))}
          </div>
          <div className="flex justify-end items-center gap-2 mt-3 text-[10px] text-gray-500 font-medium">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-[2px] bg-white/5 border border-white/5"></div>
              <div className="w-2 h-2 rounded-[2px] bg-brand-purple/30 border border-brand-purple/20"></div>
              <div className="w-2 h-2 rounded-[2px] bg-brand-purple/60 border border-brand-purple/40"></div>
              <div className="w-2 h-2 rounded-[2px] bg-brand-gold/60 border border-brand-gold/40"></div>
              <div className="w-2 h-2 rounded-[2px] bg-brand-gold border border-brand-gold"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
