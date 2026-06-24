import { Bell, X, Award, BookOpen, Video } from 'lucide-react';
import { useState, useEffect } from 'react';

type NotificationType = 'badge' | 'content' | 'live';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'badge',
      title: 'New Badge Unlocked!',
      message: 'You earned the "Top 1%" badge for completing the mock test.',
      time: 'Just now',
      isRead: false,
    },
    {
      id: '2',
      type: 'live',
      title: 'Upcoming Live Session',
      message: 'Unit 1 Revision starts in 30 minutes.',
      time: '30m ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'content',
      title: 'New Material Added',
      message: 'Handwritten notes for Unit 5 are now available.',
      time: '2h ago',
      isRead: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'badge': return <Award className="w-4 h-4 text-brand-gold" />;
      case 'live': return <Video className="w-4 h-4 text-blue-400" />;
      case 'content': return <BookOpen className="w-4 h-4 text-brand-purple-light" />;
    }
  };

  const getBg = (type: NotificationType) => {
    switch (type) {
      case 'badge': return 'bg-brand-gold/20 border-brand-gold/30';
      case 'live': return 'bg-blue-500/20 border-blue-500/30';
      case 'content': return 'bg-brand-purple/20 border-brand-purple/30';
    }
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 sm:right-6 glass-panel p-2.5 rounded-full hover:bg-white/10 transition-colors border-white/10 group"
      >
        <Bell className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#150f1f]"></span>
        )}
      </button>

      {isOpen && (
        <div className="fixed top-16 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-96 glass-panel rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/10 overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="bg-[#2a1f3c]/50 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
            <h3 className="font-bold text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <span className="bg-brand-purple text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount} New</span>}
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto bg-black/20 p-2">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-3 rounded-xl mb-2 flex gap-3 transition-colors hover:bg-white/5 ${!notif.isRead ? 'bg-white/5' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${getBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div>
                  <div className="flex justify-between items-start gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-white leading-tight">{notif.title}</h4>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
