import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, ShieldCheck, BarChart } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-ai" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-brand-900/30 border border-brand-800/50 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 rounded-sm backdrop-blur-sm">
              Why Scale Plus AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Engineering Growth Through <span className="text-brand-400">Automated Precision</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Traditional agencies rely on manual headcount. We rely on code. This fundamental shift allows us to deliver results with higher accuracy, speed, and ROI than legacy competitors.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700">
                   <TrendingUp className="text-brand-400 w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white mb-1">Unit Economics that Make Sense</h3>
                   <p className="text-slate-400 text-sm">Reduce CAC by up to 40% by replacing human SDRs with autonomous agents.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700">
                   <ShieldCheck className="text-brand-400 w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white mb-1">Enterprise Reliability</h3>
                   <p className="text-slate-400 text-sm">Systems built on redundant, secure architectures designed for scale.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700">
                   <BarChart className="text-brand-400 w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white mb-1">Data-Driven Decisions</h3>
                   <p className="text-slate-400 text-sm">Every action is logged, analyzed, and optimized by our proprietary algorithms.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            {/* Abstract Visual */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold mb-8">Performance Metrics</h3>
              
              {/* Mock Charts */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-slate-400 text-sm mb-2 font-medium">
                    <span>Lead Velocity</span>
                    <span className="text-brand-400">+142%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-brand-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 text-sm mb-2 font-medium">
                    <span>Operational Cost</span>
                    <span className="text-emerald-400">-65%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '35%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-slate-600"
                    ></motion.div>
                  </div>
                </div>
                
                <div className="pt-8 flex items-center gap-4">
                    <div className="flex-1 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1 uppercase">System Uptime</p>
                        <p className="text-2xl font-bold text-white">99.9%</p>
                    </div>
                    <div className="flex-1 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1 uppercase">ROI Avg</p>
                        <p className="text-2xl font-bold text-white">5.2x</p>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};