import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Megaphone, 
  Workflow, 
  Monitor, 
  Bot, 
  TrendingUp 
} from 'lucide-react';

const helpItems = [
  {
    icon: Search,
    title: "Market Analysis",
    description: "Deep-dive market intelligence to position your brand effectively."
  },
  {
    icon: Megaphone,
    title: "Campaign Execution",
    description: "End-to-end management of high-ROI marketing campaigns."
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Custom n8n architectures to eliminate manual operational tasks."
  },
  {
    icon: Monitor,
    title: "Digital Transformation",
    description: "Modernizing web assets for conversion and user experience."
  },
  {
    icon: Bot,
    title: "Intelligent Agents",
    description: "24/7 AI sales and support agents deployed across channels."
  },
  {
    icon: TrendingUp,
    title: "Cost Optimization",
    description: "Reduce operational overhead while scaling output capabilities."
  }
];

export const HowWeHelp: React.FC = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 md:sticky md:top-24">
                 <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-6 leading-tight"
                >
                    Strategic Implementation for <span className="text-brand-400">Market Dominance</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 mb-8"
                >
                    We don't just provide tools; we engineer complete systems. Our approach integrates strategy, automation, and AI to create a self-sustaining growth engine for your business.
                </motion.p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {helpItems.map((item, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-brand-500/40 hover:bg-slate-800/50 transition-all duration-200 backdrop-blur-sm"
                >
                <item.icon size={24} className="text-brand-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                </p>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};