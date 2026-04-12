import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-12 lg:pt-40 lg:pb-20 bg-transparent relative overflow-hidden">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <img 
          src="/hero-image.png" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-1/4 w-32 h-32 bg-khamoun-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-20 z-0"></div>
      <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-khamoun-accent rounded-full mix-blend-multiply filter blur-2xl opacity-20 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-slate-900 space-y-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              L'excellence éducative ivoirienne, <span className="text-khamoun-primary">accessible à tous.</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-xl font-medium">
              Plateforme numérique et espaces physiques d'apprentissage pour les élèves du secondaire (6ème à la Terminale). Aligné sur les programmes du MENA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigate('/rejoindre')}
                className="bg-khamoun-primary text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
              >
                Rejoindre l'aventure <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="/hero-image.png" 
                alt="Étudiants apprenant ensemble" 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
