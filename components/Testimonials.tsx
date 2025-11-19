import React from 'react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            Client Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-slate-900/60 backdrop-blur-sm p-8 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-slate-800 border border-slate-700" />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{t.role}, {t.company}</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">"{t.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};