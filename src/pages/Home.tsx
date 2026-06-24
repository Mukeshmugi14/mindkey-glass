import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import PurchasedCourseCard from '../components/PurchasedCourseCard';
import Certifications from '../components/Certifications';
import StudySchedule from '../components/StudySchedule';
import Leaderboard from '../components/Leaderboard';
import Testimonials from '../components/Testimonials';
import AboutMe from '../components/AboutMe';
import ProfileHeader from '../components/ProfileHeader';
import { testimonials } from '../data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="pt-14">
        <ProfileHeader />
      </div>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-24 md:pb-16 space-y-16 sm:space-y-24">
        {/* Dashboard Section */}
        <section id="dashboard" className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center border border-brand-gold/30">📊</span>
            Your Dashboard
          </h2>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6 sm:gap-8 lg:gap-10 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6 sm:space-y-8">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {isLoading ? (
                  <>
                    <div className="animate-pulse bg-white/5 rounded-2xl h-24"></div>
                    <div className="animate-pulse bg-white/5 rounded-2xl h-24"></div>
                  </>
                ) : (
                  <>
                    <motion.div variants={itemVariants}>
                      <PurchasedCourseCard 
                        title="UGC NET Psychology Fast Track Units 1–4" 
                        progress={65} 
                        totalModules={20} 
                        completedModules={13} 
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <PurchasedCourseCard 
                        title="UGC NET Psychology Notes (All 10 Units)" 
                        progress={30} 
                        totalModules={10} 
                        completedModules={3} 
                      />
                    </motion.div>
                  </>
                )}
              </div>
              <motion.div variants={itemVariants}>
                <Certifications />
              </motion.div>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <motion.div variants={itemVariants}>
                <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/[0.02] shadow-lg">
                  <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/5 border border-white/[0.02] rounded-xl p-3 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-brand-purple-light">📅</span>
                      </div>
                      <span className="text-xs text-gray-300 font-medium">Book 1:1</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/5 border border-white/[0.02] rounded-xl p-3 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-blue-400">📝</span>
                      </div>
                      <span className="text-xs text-gray-300 font-medium">Mock Test</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/5 border border-white/[0.02] rounded-xl p-3 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-emerald-400">❓</span>
                      </div>
                      <span className="text-xs text-gray-300 font-medium">Ask Doubt</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/5 border border-white/[0.02] rounded-xl p-3 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-brand-gold">💬</span>
                      </div>
                      <span className="text-xs text-gray-300 font-medium">Community</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <StudySchedule />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Leaderboard />
              </motion.div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials testimonials={testimonials} isLoading={isLoading} />
      </div>

      {/* About Me Section */}
      <div id="about">
        <AboutMe />
      </div>
    </>
  );
}
