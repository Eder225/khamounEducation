import React from 'react';

export const CTA = () => {
  return (
    <section className="bg-transparent border-t border-slate-200/50 py-10 md:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
          Prêt à commencer ?
        </h2>
        <p className="mt-3 text-base md:text-lg text-slate-600">
          Rejoignez des milliers d'élèves et d'enseignants sur Khamoun Education.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/rejoindre"
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-bold rounded-full text-white bg-khamoun-primary hover:opacity-90 transition-opacity"
            >
              Rejoindre l'aventure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
