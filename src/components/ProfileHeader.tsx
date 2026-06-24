import { motion } from 'motion/react';
import HeroBackground3D from './HeroBackground3D';

export default function ProfileHeader() {
  return (
    <div 
      className="relative w-full pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden border-b border-black/5 dark:border-white/[0.02] min-h-[70vh] sm:min-h-[auto] justify-center transition-all duration-500"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="absolute inset-0 z-0 force-dark">
        <HeroBackground3D />
        
        {/* 3D-like glowing orb backgrounds - Subtler for minimalism */}
        <div className="absolute top-[-20%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-purple rounded-full filter blur-[100px] sm:blur-[150px] opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-brand-gold rounded-full filter blur-[100px] sm:blur-[150px] opacity-15 pointer-events-none"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Logo Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="force-dark"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-10 relative flex items-center justify-center rounded-full bg-brand-purple border border-brand-gold/10 p-3 sm:p-4 shadow-[0_0_30px_rgba(203,168,100,0.15)] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-brand-gold/10 before:to-transparent before:opacity-20 mx-auto"
          >
            <img 
              src="/logo.png" 
              alt="Mind & Keys" 
              className="w-full h-full object-contain mix-blend-lighten relative z-10"
              onError={(e) => {
                // Fallback to minimal SVG if logo isn't uploaded yet
                e.currentTarget.style.display = 'none';
                document.getElementById('fallback-logo')?.classList.remove('hidden');
              }}
            />
            <div id="fallback-logo" className="hidden relative z-10 flex flex-col items-center">
              <svg viewBox="0 0 100 120" className="w-10 h-12 sm:w-12 sm:h-14 drop-shadow-[0_0_15px_rgba(203,168,100,0.4)]" xmlns="http://www.w3.org/2000/svg">
                <path d="
                  M50,10
                  C35,10 25,18 25,28
                  C25,32 27,36 31,39
                  C23,43 20,52 24,60
                  C27,67 36,70 46,70
                  L46,92
                  C40,92 36,96 36,102
                  C36,108 40,112 46,112
                  L46,116
                  C46,118 54,118 54,116
                  L54,112
                  C60,112 64,108 64,102
                  C64,96 60,92 54,92
                  L54,70
                  C64,70 73,67 76,60
                  C80,52 77,43 69,39
                  C73,36 75,32 75,28
                  C75,18 65,10 50,10
                  Z
  
                  M49,12
                  L51,12
                  L51,68
                  L49,68
                  Z
  
                  M45,18
                  C38,18 32,23 32,28
                  C32,36 45,38 45,38
                  L45,18
                  Z
  
                  M55,18
                  C62,18 68,23 68,28
                  C68,36 55,38 55,38
                  L55,18
                  Z
  
                  M45,45
                  L40,44
                  C32,42 30,50 32,54
                  C34,58 40,62 45,62
                  L45,45
                  Z
  
                  M55,45
                  L60,44
                  C68,42 70,50 68,54
                  C66,58 60,62 55,62
                  L55,45
                  Z
  
                  M46,98
                  L42,98
                  C41,98 40,99 40,102
                  C40,105 41,106 42,106
                  L46,106
                  L46,98
                  Z
  
                  M54,98
                  L58,98
                  C59,98 60,99 60,102
                  C60,105 59,106 58,106
                  L54,106
                  L54,98
                  Z
                " fill="#cba864" fillRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Minimalist Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-[0.2em] sm:tracking-[0.25em] text-brand-gold-light uppercase mb-3 sm:mb-4 drop-shadow-sm text-center px-2"
        >
          Mind & Keys
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs md:text-sm text-gray-400 font-light tracking-[0.15em] uppercase mb-8 sm:mb-0"
        >
          <span>Psychologist</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-brand-gold/50"></span>
          <span>Assistant Professor</span>
        </motion.div>

        {/* Mobile Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="sm:hidden mt-10 flex flex-col items-center justify-center gap-2 text-gray-500"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-4 h-6 border border-gray-600 rounded-full flex justify-center p-1"
          >
            <div className="w-0.5 h-1.5 bg-brand-gold/70 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
