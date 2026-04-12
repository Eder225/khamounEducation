import React from 'react';
import { Monitor, Wifi, Users, MapPin } from 'lucide-react';

export const PhysicalSpaces = () => {
  return (
    <section id="espaces" className="py-12 md:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">Les Espaces Khamoun</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Des lieux physiques d'apprentissage collectif pour garantir un accès équitable et un environnement propice à l'étude.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-khamoun-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Monitor className="text-khamoun-primary" size={32} />
            </div>
            <h4 className="text-xl text-slate-900 font-bold mb-3">Matériel Numérique</h4>
            <p className="text-slate-600 text-sm">Postes informatiques et tablettes connectés à disposition de chaque membre.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-khamoun-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wifi className="text-khamoun-primary" size={32} />
            </div>
            <h4 className="text-xl text-slate-900 font-bold mb-3">Connectivité</h4>
            <p className="text-slate-600 text-sm">Internet haut débit stable et sécurisé dédié exclusivement aux espaces.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-khamoun-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-khamoun-primary" size={32} />
            </div>
            <h4 className="text-xl text-slate-900 font-bold mb-3">Encadrement</h4>
            <p className="text-slate-600 text-sm">Tuteurs et encadrants présents sur place pour orienter et aider les élèves.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-khamoun-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="text-khamoun-primary" size={32} />
            </div>
            <h4 className="text-xl text-slate-900 font-bold mb-3">Sessions Collectives</h4>
            <p className="text-slate-600 text-sm">Travail en groupe, entraide et préparation intensive aux examens.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
