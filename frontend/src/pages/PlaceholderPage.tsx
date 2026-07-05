import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Sparkles, Lock, Cpu } from 'lucide-react';

export const PlaceholderPage: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-70px)] overflow-hidden flex items-center justify-center bg-transparent">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-500 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] pointer-events-none" 
      />

      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        {/* Glow border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-md opacity-50" />
        
        <div className="relative bg-[var(--bg-panel)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[2.5rem] p-12 flex flex-col items-center text-center shadow-2xl overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{ 
              backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Floating Icon Animation */}
          <div className="relative z-10 flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-28 h-28"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full bg-[var(--hover-bg)] border border-[var(--border-color)] rounded-full flex items-center justify-center shadow-inner backdrop-blur-md">
                {title.toLowerCase().includes('setting') ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <Settings size={48} className="text-[var(--text-primary)] opacity-90" />
                  </motion.div>
                ) : (
                  <Cpu size={48} className="text-[var(--text-primary)] opacity-90" />
                )}
                
                {/* Lock Badge */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[var(--bg-panel)] shadow-xl"
                >
                  <Lock size={16} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative z-10 text-3xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-lg text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed mb-8"
          >
            {desc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-[var(--hover-bg)] border border-[var(--border-color)] rounded-full text-sm font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-md"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span>Development in Progress</span>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
