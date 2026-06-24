import { Calendar, Clock, Video } from 'lucide-react';

export default function StudySchedule() {
  const schedule = [
    {
      date: 'Today',
      items: [
        { time: '18:00 PM', title: 'Live: Unit 1 Revision', type: 'webinar' },
        { time: '20:00 PM', title: 'Daily Mock Test', type: 'test' }
      ]
    },
    {
      date: 'Tomorrow',
      items: [
        { time: '19:00 PM', title: 'Doubt Clearing Session', type: 'webinar' }
      ]
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border-brand-purple/20">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-purple-light" />
          <h3 className="font-bold text-white text-lg">Study Schedule</h3>
        </div>
        <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-light transition-colors">
          Book Session
        </button>
      </div>

      <div className="space-y-5">
        {schedule.map((day, idx) => (
          <div key={idx}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{day.date}</h4>
            <div className="space-y-3">
              {day.items.map((item, i) => (
                <div key={i} className="flex gap-4 items-start relative before:absolute before:left-[11px] before:top-6 before:bottom-[-16px] before:w-[2px] before:bg-white/5 last:before:hidden">
                  <div className="w-6 h-6 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center shrink-0 z-10 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex-grow group hover:border-brand-purple/30 transition-colors cursor-pointer">
                    <h5 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors mb-1">{item.title}</h5>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                      {item.type === 'webinar' && <span className="flex items-center gap-1 text-blue-400"><Video className="w-3 h-3" /> Live</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
