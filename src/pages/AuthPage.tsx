import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firebase-errors';
import { Logo } from '../components/Logo';

export const AuthPage = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Veuillez saisir votre email pour réinitialiser votre mot de passe.");
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const resetEmail = email.includes('@') ? email : `${email}@khamoun.ci`;
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccess("Un email de réinitialisation a été envoyé à votre adresse.");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi de l'email de réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Allow users to just type a username, we'll append a dummy domain if no @ is present
      const loginEmail = email.includes('@') ? email : `${email}@khamoun.ci`;
      
      const result = await signInWithEmailAndPassword(auth, loginEmail, password);
      const user = result.user;
      
      // Fetch actual role from Firestore for smart redirection
      const userDocRef = doc(db, 'users', user.uid);
      let userDoc = await getDoc(userDocRef);
      
      // AUTO-REPAIR: If profile doesn't exist, create it automatically
      if (!userDoc.exists()) {
        const newProfile = {
          uid: user.uid,
          email: user.email || loginEmail,
          name: user.displayName || email.split('@')[0],
          role: 'admin', // Default to admin to ensure full access for the owner
          createdAt: serverTimestamp()
        };
        
        try {
          await setDoc(userDocRef, newProfile);
          userDoc = await getDoc(userDocRef);
        } catch (createErr) {
          console.error("Auto-repair failed:", createErr);
          setError("Erreur lors de la création de votre profil. Contactez le support.");
          await auth.signOut();
          return;
        }
      }

      const userData = userDoc.data();
      if (!userData) {
        setError("Profil utilisateur invalide.");
        await auth.signOut();
        return;
      }
      
      const actualRole = userData.role;

      // Smart redirection based on actual role
      if (actualRole === 'teacher' || actualRole === 'admin') {
        navigate('/teacher');
      } else if (actualRole === 'student' || actualRole === 'parent') {
        navigate('/dashboard');
      } else {
        setError("Rôle utilisateur non reconnu.");
        await auth.signOut();
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error && 'code' in err) {
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError("Identifiants incorrects.");
            break;
          case 'auth/email-already-in-use':
            setError("Cet identifiant est déjà utilisé.");
            break;
          case 'auth/weak-password':
            setError("Le mot de passe doit faire au moins 6 caractères.");
            break;
          default:
            setError("Une erreur est survenue lors de l'authentification.");
        }
      } else {
        setError("Une erreur est survenue.");
      }
      
      if (err instanceof Error && 'code' in err && err.code === 'permission-denied') {
        handleFirestoreError(err, OperationType.CREATE, 'users');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-transparent font-sans overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col relative bg-white/80 backdrop-blur-sm overflow-y-auto">
        <div className="pt-4 pb-2 flex justify-center cursor-pointer" onClick={() => navigate('/')}>
          <Logo className="h-14 md:h-16 w-auto object-contain" />
        </div>

        <div className="max-w-sm w-full mx-auto flex-1 flex flex-col justify-center px-6 pb-6">
          <h1 className="text-lg font-bold text-slate-900 mb-1 text-center">
            Bienvenue
          </h1>
          <p className="text-xs text-slate-600 text-center mb-4">
            Connectez-vous à votre espace Khamoun
          </p>

          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-lg mb-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                role === 'student'
                  ? 'bg-white text-khamoun-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Élève
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                role === 'teacher'
                  ? 'bg-white text-khamoun-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Professeur
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="p-2 bg-red-50 text-red-600 text-[11px] rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-2 bg-green-50 text-green-600 text-[11px] rounded-md">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[11px] font-medium text-khamoun-primary mb-1">
                Identifiant ou Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-2 focus:ring-khamoun-primary focus:border-khamoun-primary outline-none transition-colors text-xs"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-[11px] font-medium text-khamoun-primary">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[10px] text-khamoun-primary hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-slate-300 focus:ring-2 focus:ring-khamoun-primary focus:border-khamoun-primary outline-none transition-colors text-xs"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-khamoun-primary text-white py-2 rounded font-bold text-xs hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? 'Chargement...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 text-center text-[10px] text-slate-500 leading-tight">
            <p>
              Les comptes sont créés par l'administration de votre établissement.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Testimonial */}
      <div className={`hidden md:flex w-full md:w-1/2 backdrop-blur-sm flex-col justify-between relative overflow-hidden h-full transition-colors duration-500 text-white ${
        role === 'teacher' ? 'bg-khamoun-secondary/80' : 'bg-khamoun-primary/80'
      }`}>
        <div className="p-8 lg:p-10 z-10">
          {role === 'student' && (
            <>
              <blockquote className="text-base lg:text-lg font-bold leading-tight mb-2">
                "Mon mentor chez Khamoun est attentif et bienveillant, et m'aide à me motiver et me guider."
              </blockquote>
              <p className="text-white/80 text-sm font-medium">
                Chris - Élève en classe de 4ème
              </p>
            </>
          )}
          {role === 'teacher' && (
            <>
              <blockquote className="text-base lg:text-lg font-bold leading-tight mb-2">
                "Khamoun me permet de suivre la progression de mes élèves en temps réel et d'adapter mon enseignement."
              </blockquote>
              <p className="text-white/80 text-sm font-medium">
                M. Kouassi - Professeur de Mathématiques
              </p>
            </>
          )}
        </div>
        
        <div className="relative flex-1 w-full flex items-end justify-center overflow-hidden">
          <img 
            key={role}
            src={role === 'teacher' ? "/teacher-auth.png" : "/student-auth.png"} 
            alt={role === 'teacher' ? "Teacher" : "Student"} 
            className="object-contain object-bottom w-full h-[90%] max-h-[450px] animate-in fade-in slide-in-from-bottom-4 duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
