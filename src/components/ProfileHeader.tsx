import { BadgeCheck, Heart, Award, Users } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <div className="relative w-full pt-20 pb-16 px-6 flex flex-col items-center text-center overflow-hidden border-b border-white/10">
      {/* 3D-like glowing orb backgrounds */}
      <div className="absolute top-[-20%] left-[20%] w-96 h-96 bg-brand-purple rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-brand-neon rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 w-32 h-32 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl flex items-center justify-center overflow-hidden mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        {/* Glowing key logo */}
        <div className="text-brand-neon flex flex-col items-center drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">
            <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C33.4 10 20 23.4 20 40C20 54.5 30.3 66.6 44 69.3V80H40C37.8 80 36 81.8 36 84C36 86.2 37.8 88 40 88H44V92C44 94.2 45.8 96 48 96H52C54.2 96 56 94.2 56 92V88H60C62.2 88 64 86.2 64 84C64 81.8 62.2 80 60 80H56V69.3C69.7 66.6 80 54.5 80 40C80 23.4 66.6 10 50 10ZM50 62C37.9 62 28 52.1 28 40C28 27.9 37.9 18 50 18C62.1 18 72 27.9 72 40C72 52.1 62.1 62 50 62Z"/>
              <path d="M42 36C42 40.4 45.6 44 50 44C54.4 44 58 40.4 58 36H42Z"/>
            </svg>
        </div>
      </div>
      
      <h1 className="text-4xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-md">Mind and Keys</h1>
      <h2 className="text-lg text-brand-neon mb-2 font-medium">by Mukesh Karpagaraja</h2>
      <p className="max-w-lg mx-auto leading-relaxed text-gray-300 mb-8 font-light">
        Psychologist <span className="text-brand-purple">•</span> Assistant Professor <span className="text-brand-purple">•</span> Helping Students Crack UGC NET
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <div className="flex items-center gap-1.5 glass-panel px-4 py-2 rounded-full text-sm font-medium hover:border-brand-gold/50 transition-colors">
          <Award className="w-4 h-4 text-brand-gold drop-shadow-[0_0_5px_rgba(195,161,84,0.5)]" />
          <span className="text-gray-200">Top 1%</span>
        </div>
        <div className="flex items-center gap-1.5 glass-panel px-4 py-2 rounded-full text-sm font-medium hover:border-red-400/50 transition-colors">
          <Heart className="w-4 h-4 text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
          <span className="text-gray-200">Community Care</span>
        </div>
        <div className="flex items-center gap-1.5 glass-panel px-4 py-2 rounded-full text-sm font-medium hover:border-brand-neon/50 transition-colors">
          <BadgeCheck className="w-4 h-4 text-brand-neon drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" />
          <span className="text-gray-200">Hustler</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-brand-neon glass-panel px-5 py-2.5 rounded-xl border-brand-neon/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
        <Users className="w-4 h-4" />
        <span className="font-bold text-white text-base">152+</span> Bookings
      </div>
    </div>
  );
}
