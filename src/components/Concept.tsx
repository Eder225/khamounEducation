import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, PlayCircle, BookOpen, BarChart } from 'lucide-react';

export const Concept = () => {
  return (
    <section id="concept" className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 leading-tight">
              Tout ce dont vous avez besoin pour <span className="text-khamoun-secondary">réussir.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Une méthode pédagogique complète qui combine des cours de qualité, des exercices pratiques et un suivi personnalisé pour garantir la réussite aux examens.
            </p>
            <ul className="space-y-3">
              {[
                "Cours vidéo filmés en classe par des enseignants certifiés",
                "Exercices liés à chaque cours avec correction automatique",
                "Annales des examens BEPC et BAC avec corrigés",
                "Tableau de bord personnel de progression"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="text-khamoun-primary shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-auto md:h-[400px] w-full max-w-sm mx-auto lg:mx-0 flex flex-col gap-4 md:block">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative md:absolute md:top-0 md:left-0 md:right-8 bg-khamoun-accent rounded-2xl p-5 md:p-6 shadow-xl z-30 transform md:-rotate-2"
            >
              <div className="bg-white/30 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <PlayCircle className="text-slate-900" size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Cours Vidéo</h3>
              <p className="text-sm text-slate-800 font-medium">Des cours vivants, filmés en classe pour une immersion totale.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative md:absolute md:top-24 md:left-4 md:right-4 bg-khamoun-secondary rounded-2xl p-5 md:p-6 shadow-xl z-20 transform md:rotate-1"
            >
              <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Exercices & Annales</h3>
              <p className="text-sm text-red-100 font-medium">Pratiquez avec des QCM et préparez-vous avec les sujets d'examens.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative md:absolute md:top-48 md:left-8 md:right-0 bg-slate-800 rounded-2xl p-5 md:p-6 shadow-xl z-10 transform md:-rotate-1"
            >
              <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <BarChart className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Suivi Personnalisé</h3>
              <p className="text-sm text-slate-300 font-medium">Analysez vos performances et ciblez vos révisions efficacement.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
