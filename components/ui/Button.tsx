import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 tracking-wide uppercase text-xs md:text-sm";
  
  const variants = {
    // Neon Violet with Glow
    primary: "bg-brand-600 text-white hover:bg-brand-500 border border-brand-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:-translate-y-0.5",
    // Cyber Dark
    secondary: "bg-slate-900/80 text-slate-200 border border-slate-700 hover:border-brand-500/50 hover:text-brand-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] backdrop-blur-md",
    // Outline
    outline: "border border-brand-500/50 text-brand-400 hover:bg-brand-500/10 hover:border-brand-400"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};