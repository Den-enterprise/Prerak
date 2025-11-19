import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../constants';
import { Button } from './ui/Button';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative">
       {/* Noise overlay kept for texture, but background color removed to show 3D scene */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Investment Plans
          </h2>
          <p className="text-lg text-slate-400">
            Transparent pricing for scalable AI infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              data-interactive="true"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl p-8 border transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-slate-900/60 border-brand-500 shadow-[0_0_30px_rgba(139,92,246,0.15)] md:-mt-4 z-10 backdrop-blur-xl' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-600 backdrop-blur-md'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white px-4 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-lg">
                  Recommended
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
              </div>
              <div className="w-full h-px bg-white/5 mb-6"></div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.highlight ? 'primary' : 'secondary'} 
                className="w-full"
                onClick={() => document.getElementById('contact')?.scrollIntoView()}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};