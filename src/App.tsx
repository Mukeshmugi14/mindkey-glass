/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import GamificationManager from './components/GamificationManager';
import AILearningAssistant from './components/AILearningAssistant';
import NotificationCenter from './components/NotificationCenter';
import { LayoutDashboard, BookOpen, MessageSquare, User } from 'lucide-react';

import Home from './pages/Home';
import Courses from './pages/Courses';

export default function App() {
  const location = useLocation();

  const handleNavClick = (id: string) => {
    // If not on home page, wait for navigation then scroll, or just let React Router handle it.
    // Since we're using pages now, Testimonials and About are on the Home page.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-gold selection:text-black">
      <ThemeToggle />
      <NotificationCenter />
      <GamificationManager />
      <AILearningAssistant />

      {/* Sticky Navigation (Desktop) */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/[0.02] px-6 py-4 justify-center gap-8 text-sm font-medium backdrop-blur-2xl">
        <Link to="/" onClick={() => handleNavClick('dashboard')} className="text-gray-300 hover:text-brand-gold transition-colors">Dashboard</Link>
        <Link to="/courses" className="text-gray-300 hover:text-brand-gold transition-colors">Courses</Link>
        <Link to="/" onClick={() => handleNavClick('testimonials')} className="text-gray-300 hover:text-brand-gold transition-colors">Testimonials</Link>
        <Link to="/" onClick={() => handleNavClick('about')} className="text-gray-300 hover:text-brand-gold transition-colors">About</Link>
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/[0.02] px-4 py-3 flex justify-around items-center backdrop-blur-3xl pb-[calc(12px+env(safe-area-inset-bottom))]">
        <Link to="/" onClick={() => handleNavClick('dashboard')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </Link>
        <Link to="/courses" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors">
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Courses</span>
        </Link>
        <Link to="/" onClick={() => handleNavClick('testimonials')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Reviews</span>
        </Link>
        <Link to="/" onClick={() => handleNavClick('about')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">About</span>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>

      {/* Footer */}
      <footer className="glass-panel py-8 pb-24 md:pb-8 border-t border-white/[0.02] mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mind and Keys. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-brand-gold transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
