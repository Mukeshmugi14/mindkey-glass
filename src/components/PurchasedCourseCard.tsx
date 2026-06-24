import { Play, CheckCircle } from 'lucide-react';

interface PurchasedCourseCardProps {
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export default function PurchasedCourseCard({ title, progress, totalModules, completedModules }: PurchasedCourseCardProps) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 hover:-translate-y-1 transition-transform cursor-pointer group">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-brand-gold drop-shadow-[0_0_5px_rgba(195,161,84,0.5)] transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="flex-grow">
        <h4 className="font-bold text-white text-sm mb-1 group-hover:text-brand-gold transition-colors">{title}</h4>
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3 text-brand-gold" />
          {completedModules} / {totalModules} Modules
        </p>
      </div>
      
      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold/20 group-hover:border-brand-gold/30 transition-colors shrink-0">
        <Play className="w-4 h-4 text-white group-hover:text-brand-gold ml-1" />
      </div>
    </div>
  );
}
