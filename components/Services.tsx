import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Core <span className="text-brand-400">Capabilities</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Full-stack AI infrastructure designed to replace manual inputs with automated logic.
            </p>
          </div>
          <div>
             <button onClick={() => document.getElementById('contact')?.scrollIntoView()} className="text-brand-300 font-bold hover:text-white transition-colors flex items-center gap-3 text-lg group uppercase tracking-wider text-sm">
                View Service Catalog <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              data-interactive="true"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#0a0a12] rounded-xl p-8 border border-white/5 hover:border-brand-500 transition-all duration-300 group relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-brand-500/10"></div>
              
              <div className="w-14 h-14 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-brand-400 group-hover:text-accent-400 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm font-medium border-l-2 border-transparent pl-0 group-hover:border-brand-500/50 group-hover:pl-4 transition-all duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};