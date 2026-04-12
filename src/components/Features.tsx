import React from 'react';
import { GraduationCap, CheckCircle, Users, BookOpen } from 'lucide-react';

export const Features = () => {
  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">Pensé pour chaque acteur</h2>
          <p className="text-sm md:text-base text-slate-600">
            Khamoun Education offre des interfaces dédiées pour répondre aux besoins spécifiques de chacun.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Élèves */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="bg-khamoun-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pour les Élèves</h3>
            <p className="text-sm text-slate-600 mb-5">
              Accédez aux cours de votre classe, apprenez à votre rythme, et préparez vos examens avec des ressources adaptées.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-secondary"/> 6ème à Terminale</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-secondary"/> Tableau de bord</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-secondary"/> Auto-évaluation</li>
            </ul>
          </div>

          {/* Enseignants */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="bg-khamoun-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pour les Enseignants</h3>
            <p className="text-sm text-slate-600 mb-5">
              Partagez votre savoir à l'échelle nationale, créez des exercices et suivez les performances de vos élèves.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-primary"/> Upload de vidéos</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-primary"/> Création d'exercices</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-primary"/> Statistiques avancées</li>
            </ul>
          </div>

          {/* Établissements */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="bg-khamoun-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pour les Établissements</h3>
            <p className="text-sm text-slate-600 mb-5">
              Intégrez Khamoun Education dans votre lycée ou collège privé pour offrir un soutien scolaire de qualité.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-accent"/> Licences groupées</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-accent"/> Suivi global</li>
              <li className="flex items-center gap-2 text-xs font-medium text-slate-700"><CheckCircle size={14} className="text-khamoun-accent"/> Continuité pédagogique</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
