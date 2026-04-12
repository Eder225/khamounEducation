import React from 'react';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 bg-white inline-block p-1.5 rounded-lg">
              <Logo className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-xs text-slate-400">
              Plateforme numérique d'enseignement secondaire dédiée aux élèves et enseignants de Côte d'Ivoire.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Plateforme</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Pour les élèves</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Pour les enseignants</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Espaces Physiques</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Entreprise</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Notre mission</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Partenaires</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Ressources</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-khamoun-primary transition-colors">Programme MENA</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Khamoun Education. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
