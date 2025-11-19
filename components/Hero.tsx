import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      
      {/* Violet/Cyan Glow Backdrop - Optimized Blur for Less Lag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-900/20 blur-[60px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-600/10 blur-[60px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-brand-950/50 border border-brand-500/30 text-brand-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse"></span>
              Next-Gen AI Architecture
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight drop-shadow-2xl">
              Scale Your Business With <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-brand-500 neon-text">Intelligent Logic</span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-400 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-medium px-2">
              We deploy autonomous 24/7 agents, self-healing n8n workflows, and generative marketing assets. The future of automation is here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center w-full sm:w-auto px-4 sm:px-0">
              <Button variant="primary" className="h-12 md:h-14 px-8 md:px-10 text-sm md:text-base shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Transformation
              </Button>
              <Button variant="secondary" className="h-12 md:h-14 px-8 md:px-10 text-sm md:text-base border-brand-900/50 hover:bg-brand-950/50 w-full sm:w-auto" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                View Solutions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};