import React from 'react';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

export const SocialProof = () => {
  return (
    <section className="py-6 bg-slate-900/80 backdrop-blur-sm relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Conforme aux programmes officiels</p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-lg md:text-2xl font-display font-bold text-slate-200">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-khamoun-secondary" /> MENA Côte d'Ivoire
          </div>
          <div className="flex items-center gap-2 text-lg md:text-2xl font-display font-bold text-slate-200">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-khamoun-primary" /> Objectif BAC
          </div>
          <div className="flex items-center gap-2 text-lg md:text-2xl font-display font-bold text-slate-200">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-khamoun-accent" /> Objectif BEPC
          </div>
        </div>
      </div>
    </section>
  );
};
