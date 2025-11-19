import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const elementId = id.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-brand-900/20 py-3' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
              <span className="text-xl md:text-2xl font-black text-white tracking-tighter">
                SCALE<span className="text-brand-500">PLUS</span><span className="text-accent-400">.AI</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-300 hover:text-brand-300 font-medium text-sm transition-colors bg-transparent border-none cursor-pointer hover:tracking-wide duration-200 uppercase tracking-wider"
                >
                  {link.name}
                </button>
              ))}
              <Button variant="primary" className="px-6 py-2 text-[10px] font-bold tracking-widest" onClick={() => scrollToSection('contact')}>
                GET STARTED
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 focus:outline-none hover:text-brand-400 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-28 px-6 pb-10 md:hidden flex flex-col h-screen"
          >
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
             
            <div className="flex flex-col space-y-4 mb-auto relative z-10">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="group flex items-center justify-between w-full text-left py-4 border-b border-white/5 text-2xl font-bold text-white active:text-brand-400"
                >
                  {link.name}
                  <ChevronRight size={24} className="text-slate-600 group-hover:text-brand-400 transition-colors" />
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pb-8 relative z-10"
            >
              <Button variant="primary" className="w-full py-4 text-lg shadow-xl shadow-brand-500/20" onClick={() => scrollToSection('contact')}>
                Book Strategy Call
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};