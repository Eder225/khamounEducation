import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Building2, Baby, Briefcase, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const JoinPage = () => {
  const [role, setRole] = useState<'parent' | 'teacher'>('parent');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16 relative z-10 overflow-hidden">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 text-center mb-8 max-w-2xl leading-tight relative z-10">
          Rejoindre Khamoun Education : <br className="hidden md:block" />
          <span className="text-khamoun-secondary">Formulaire de Contact</span>
        </h1>

        <div className="w-full max-w-xl relative z-10">
          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-200/60 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                role === 'parent'
                  ? 'bg-white text-khamoun-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Je suis un Parent
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                role === 'teacher'
                  ? 'bg-white text-khamoun-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Je suis un Enseignant
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Demande envoyée !</h2>
                <p className="text-sm md:text-base text-slate-600 mb-8 max-w-md mx-auto">
                  Vos informations ont bien été enregistrées, notre équipe s'occupera de votre dossier.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-khamoun-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-md"
                >
                  Retour à l'accueil
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {role === 'parent' ? (
                  <>
                  {/* Parent Form Fields */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Nom complet du parent"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Numéro de téléphone (format CI)"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Ville / Commune"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Baby className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Nom de l'enfant"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                      </div>
                      <select
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all appearance-none"
                        defaultValue=""
                      >
                        <option value="" disabled>Niveau scolaire de l'enfant</option>
                        <option value="6eme">6ème</option>
                        <option value="5eme">5ème</option>
                        <option value="4eme">4ème</option>
                        <option value="3eme">3ème</option>
                        <option value="2nde">2nde</option>
                        <option value="1ere">1ère</option>
                        <option value="terminale">Terminale</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-khamoun-primary text-white font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-md mt-6"
                  >
                    Être recontacté pour une inscription
                  </button>
                </>
              ) : (
                <>
                  {/* Teacher Form Fields */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Nom complet de l'enseignant"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Matière enseignée (Maths, Physique, Français...)"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Années d'expérience"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-khamoun-primary focus:border-transparent transition-all"
                        placeholder="Numéro de téléphone / WhatsApp (format CI)"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-khamoun-primary text-white font-bold py-3 rounded-lg text-base hover:opacity-90 transition-opacity shadow-md mt-6"
                  >
                    Proposer ma candidature
                  </button>
                </>
              )}
              </form>
            )}
          </div>

          {/* Security Note */}
          <p className="text-center text-slate-500 mt-8 text-sm font-medium">
            Vos données sont sécurisées et nous vous recontacterons sous 48h.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
