import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Priya Sharma', xp: 4500, streak: 30, isCurrentUser: false },
    { rank: 2, name: 'Rahul Desai', xp: 4200, streak: 25, isCurrentUser: false },
    { rank: 3, name: 'Anjali Gupta', xp: 3950, streak: 21, isCurrentUser: false },
    { rank: 4, name: 'You', xp: 2450, streak: 15, isCurrentUser: true },
    { rank: 5, name: 'Vikram Singh', xp: 2300, streak: 12, isCurrentUser: false },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border-brand-gold/10">
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="w-5 h-5 text-brand-gold" />
        <h3 className="font-bold text-white text-lg">Leaderboard</h3>
      </div>
      
      <div className="space-y-3">
        {leaders.map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center justify-between p-3 rounded-xl transition-all ${
              user.isCurrentUser 
                ? 'bg-brand-purple/20 border border-brand-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                : 'bg-black/20 border border-white/5 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                user.rank === 2 ? 'bg-gray-400/20 text-gray-300 border border-gray-400/30' :
                user.rank === 3 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/30' :
                'text-gray-500'
              }`}>
                {user.rank}
              </div>
              <span className={`text-sm font-medium ${user.isCurrentUser ? 'text-white' : 'text-gray-300'}`}>
                {user.name}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs">
                <Star className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-gray-300 font-mono">{user.xp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
