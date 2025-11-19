import React, { useState } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    interest: 'Full Marketing System',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const ACCESS_KEY = "99b183c8-0426-4422-a5e1-e6bdf57eb8aa"; 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          company: formData.businessName,
          email: formData.email,
          subject: `New Lead: ${formData.interest} from ${formData.name}`,
          message: formData.message,
          from_name: "Scale Plus AI Website",
          botcheck: false // Hidden spam prevention field
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          businessName: '',
          email: '',
          interest: 'Full Marketing System',
          message: ''
        });
        // Reset status after 5 seconds to allow new submission
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || "Something went wrong. Please check your Access Key.");
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || "Network error. Please check your internet connection.");
    }
  };

  return (
    <footer id="contact" className="bg-slate-950/90 backdrop-blur-xl text-white pt-20 pb-10 border-t border-brand-900/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          {/* Left Column: Contact Info */}
          <div className="lg:w-5/12">
            <div className="inline-block mb-4 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-[10px] font-bold uppercase tracking-widest">
                Contact Us
            </div>
            <h2 className="text-3xl font-bold mb-6 text-white">Initialize Partnership</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Ready to upgrade your business infrastructure? Request a strategy consultation to see our systems in action.
            </p>
            
            <div className="space-y-6 mb-8 border-t border-white/5 pt-8">
               <div className="flex items-start gap-4 group">
                  <div className="mt-1 p-2 rounded bg-slate-900 border border-slate-800 group-hover:border-brand-500/50 transition-colors">
                     <Mail size={18} className="text-brand-500" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Email</p>
                     <a href="mailto:guptaprerak381@gmail.com" className="text-base font-medium text-white hover:text-brand-400 transition-colors">guptaprerak381@gmail.com</a>
                  </div>
               </div>
               <div className="flex items-start gap-4 group">
                   <div className="mt-1 p-2 rounded bg-slate-900 border border-slate-800 group-hover:border-brand-500/50 transition-colors">
                     <Phone size={18} className="text-brand-500" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Phone</p>
                     <p className="text-base font-medium text-white">+91 7397375970</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-7/12 bg-[#0a0a12]/80 backdrop-blur-md border border-white/5 rounded-xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Form decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl -mr-16 -mt-16"></div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6"
                >
                  <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mb-6 border border-brand-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                    <CheckCircle className="w-10 h-10 text-brand-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                  <p className="text-slate-400 max-w-md mb-8">
                    Your project details have been securely transmitted to our team. We will analyze your requirements and contact you shortly at <strong>{formData.email || 'your email'}</strong>.
                  </p>
                  <Button 
                    variant="secondary" 
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-slate-300">Request Consultation</h3>
                  
                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-200 text-sm">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold">Submission Failed</p>
                            <p className="opacity-80">{errorMessage}</p>
                        </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    
                    {/* Honeypot for spam */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-500/80 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 rounded bg-slate-950/50 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-700 text-white text-sm disabled:opacity-50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-500/80 mb-2">Company</label>
                        <input 
                          type="text" 
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 rounded bg-slate-950/50 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-700 text-white text-sm disabled:opacity-50"
                          placeholder="Company Inc."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-500/80 mb-2">Work Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 rounded bg-slate-950/50 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-700 text-white text-sm disabled:opacity-50"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-500/80 mb-2">Interest</label>
                      <div className="relative">
                          <select 
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 rounded bg-slate-950/50 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-white text-sm appearance-none disabled:opacity-50"
                          >
                          <option value="Full Marketing System">Full Marketing System</option>
                          <option value="AI Ads Generation">AI Ads Generation</option>
                          <option value="Chatbot Implementation">Chatbot Implementation</option>
                          <option value="Automation Workflows">Automation Workflows</option>
                          <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-500 text-xs">▼</div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-500/80 mb-2">Project Details</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 rounded bg-slate-950/50 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-700 text-white text-sm disabled:opacity-50"
                        placeholder="Briefly describe your goals..."
                      ></textarea>
                    </div>

                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-full py-4 text-sm disabled:opacity-80 disabled:cursor-not-allowed"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> SENDING...</>
                      ) : (
                        <>INITIATE REQUEST <ArrowRight className="w-4 h-4" /></>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-slate-600 text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Scale Plus AI. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="#" className="text-slate-600 hover:text-brand-400 text-xs uppercase tracking-wider transition-colors">Privacy</a>
             <a href="#" className="text-slate-600 hover:text-brand-400 text-xs uppercase tracking-wider transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};