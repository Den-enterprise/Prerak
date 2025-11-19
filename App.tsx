import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyUs } from './components/WhyUs';
import { Contact } from './components/Contact';
import { HowWeHelp } from './components/HowWeHelp';
import { Background3D } from './components/Background3D';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-500 selection:text-white relative">
      <Background3D />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <HowWeHelp />
        <WhyUs />
        <Portfolio />
      </main>
      <Contact />
    </div>
  );
};

export default App;