import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { WorkItem } from '../types';

const ProjectCard: React.FC<{ item: WorkItem; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Determine if the card is currently visible in the viewport
  const isInView = useInView(cardRef, { margin: "0px 0px -10% 0px", amount: 0.1 });

  // Logic to handle video stopping:
  // If the original src has 'autoplay=1', we switch it to 'autoplay=0' when out of view.
  // If it doesn't have autoplay, we leave it as is.
  let embedSrc = item.embedSrc;
  if (embedSrc && embedSrc.includes('autoplay=1')) {
    embedSrc = isInView ? embedSrc : embedSrc.replace('autoplay=1', 'autoplay=0');
  }

  const isVideo = !!embedSrc;

  // Parallax y-axis movement for the content inside.
  // We disable this for videos to ensure controls aren't cropped.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <motion.div
      ref={cardRef}
      data-interactive="true"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative h-full perspective-1000"
    >
      {/* Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-all duration-500 shadow-2xl shadow-black/50 h-full flex flex-col">
        
        {/* Media Area with Parallax */}
        <div className="relative w-full aspect-video overflow-hidden bg-black group">
           {/* Mobile Overlay / Desktop Hover Overlay */}
           <div className="absolute inset-0 bg-brand-900/20 z-10 pointer-events-none mix-blend-overlay transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
           
           {/* Parallax Wrapper */}
           <motion.div 
             style={isVideo ? undefined : { y }} 
             className={`w-full relative will-change-transform ${isVideo ? 'h-full' : 'h-[120%] -mt-[10%]'}`} 
           >
               {embedSrc ? (
                 <iframe 
                   src={embedSrc}
                   className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-auto"
                   allow="autoplay; fullscreen"
                   style={{ border: 'none' }}
                 ></iframe>
               ) : (
                 <img 
                   src={item.imageUrl} 
                   alt={item.title}
                   className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                 />
               )}
           </motion.div>

           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 z-20 pointer-events-none"></div>
           
           {/* Category Badge */}
           <div className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2 shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1">
              <Layers size={12} className="text-brand-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">{item.category}</span>
           </div>
        </div>

        {/* Content Area - pointer-events-none to allow clicking through the top gradient overlap to video controls */}
        <div className="relative z-30 -mt-16 p-6 md:p-8 flex-grow flex flex-col justify-end bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none">
          <div className="transform transition-transform duration-300 group-hover:translate-x-2 pointer-events-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors drop-shadow-lg">
              {item.title}
            </h3>
            
             {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {item.tags?.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800/50 group-hover:border-brand-500/30 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
          </div>
          
           {/* Interactive Arrow that appears/moves on hover */}
           <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 pointer-events-auto">
              <div className="p-3 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-500/40 hover:bg-brand-500 transition-colors">
                 <ArrowUpRight size={20} />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/5 pb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-sm bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold uppercase tracking-widest">
                    Proven Results
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Sample Work</span>
            </h2>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={scrollToContact}
            className="hidden md:flex items-center px-6 py-3 bg-transparent hover:bg-brand-900/20 border border-brand-500/30 rounded-lg text-brand-300 font-semibold transition-all group uppercase text-xs tracking-wider"
          >
            Launch Project <ArrowUpRight className="ml-2 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {PORTFOLIO_ITEMS.map((item, index) => (
             <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* AI Disclaimer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-28 relative rounded-xl overflow-hidden p-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
        >
           <div className="bg-[#08080e] rounded-xl p-8 md:p-10 md:flex items-center justify-between gap-8 relative overflow-hidden">
               {/* Subtle Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-500/5 blur-3xl"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 md:mb-0">
                  <div className="p-4 bg-brand-500/10 rounded-2xl border border-brand-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    <Sparkles className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Enterprise-Grade AI Production</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                       All assets showcased above were generated using our proprietary diffusion pipelines and motion models, significantly reducing production costs.
                    </p>
                  </div>
               </div>
               
               <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={scrollToContact}
                    className="block md:inline-block text-center text-xs font-bold uppercase tracking-widest text-white bg-brand-600 hover:bg-brand-500 px-8 py-4 rounded-lg shadow-lg shadow-brand-500/20 transition-all w-full md:w-auto cursor-pointer hover:-translate-y-1"
                  >
                    Start Generation
                  </button>
               </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};