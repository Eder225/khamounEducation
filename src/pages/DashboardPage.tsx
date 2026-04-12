import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Monitor,
  Trophy,
  User,
  HelpCircle,
  LogOut,
  Plus,
  Bell,
  Award,
  Play,
  CheckCircle2,
  CalendarCheck,
  Medal,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '../components/Logo';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CourseProgress {
  id: string;
  name: string;
  subject: string;
  chapters: number;
  progress: number;
  color: string;
  progressColor: string;
  emoji: string;
}

interface LeaderboardEntry {
  rank: number;
  initial: string;
  name: string;
  pts: number;
  isMe?: boolean;
}

// ─── Static mock data (remplace par tes vraies données Firestore) ─────────────
const COURSES: CourseProgress[] = [
  {
    id: '1',
    name: 'Fonctions et équations',
    subject: 'Mathématiques',
    chapters: 8,
    progress: 72,
    color: 'bg-purple-50',
    progressColor: 'bg-khamoun-primary',
    emoji: '📐',
  },
  {
    id: '2',
    name: 'Cinématique du point matériel',
    subject: 'Physique-Chimie',
    chapters: 5,
    progress: 10,
    color: 'bg-orange-50',
    progressColor: 'bg-khamoun-secondary',
    emoji: '⚗️',
  },
  {
    id: '3',
    name: 'Le Roman africain moderne',
    subject: 'Français',
    chapters: 4,
    progress: 45,
    color: 'bg-green-50',
    progressColor: 'bg-khamoun-accent',
    emoji: '📖',
  },
];

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, initial: 'K', name: 'Koné S.', pts: 1500 },
  { rank: 2, initial: '', name: 'Toi', pts: 1250, isMe: true },
  { rank: 3, initial: 'D', name: 'Diallo M.', pts: 1100 },
];

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Tableau de bord', icon: LayoutDashboard, to: '/dashboard', badge: null },
  { label: 'Mes Cours', icon: BookOpen, to: '/dashboard/courses', badge: '3' },
  { label: 'Réservation PC', icon: Monitor, to: '/dashboard/booking', badge: null },
  { label: 'Classement', icon: Trophy, to: '/dashboard/leaderboard', badge: null },
  { label: 'Mon Profil', icon: User, to: '/dashboard/profile', badge: null },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const DashboardPage = () => {
  const { user, isAuthReady } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ name?: string; role?: string } | null>(null);

  useEffect(() => {
    if (isAuthReady && !user) {
      navigate('/auth');
      return;
    }
    const fetchUserData = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setUserData(snap.data());
      }
    };
    fetchUserData();
  }, [user, isAuthReady, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const userName = userData?.name || 'Étudiant';
  const userInitial = userName.charAt(0).toUpperCase();
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex h-screen bg-purple-50 overflow-hidden font-body text-on-surface">

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="w-64 flex-shrink-0 h-full flex flex-col bg-[#1A0B2E] z-50">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-label font-semibold tracking-[1.8px] uppercase text-white/25">
            Principal
          </p>
          {NAV_ITEMS.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const isActive = item.to === '/dashboard';
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-khamoun-primary text-white shadow-md shadow-purple-900/30'
                    : 'text-white/50 hover:bg-white/8 hover:text-white/85'
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-khamoun-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <p className="px-3 mt-4 mb-2 text-[10px] font-label font-semibold tracking-[1.8px] uppercase text-white/25">
            Progrès
          </p>
          {NAV_ITEMS.slice(3).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white/85 transition-all duration-200"
              >
                <Icon size={17} className="flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Nouvelle session CTA */}
        <div className="px-4 pb-4">
          <button className="w-full flex items-center justify-center gap-2 bg-khamoun-primary hover:bg-khamoun-primary/90 text-white text-sm font-semibold py-3 rounded-xl transition-opacity shadow-lg shadow-purple-900/30">
            <Plus size={16} />
            Nouvelle session
          </button>
        </div>

        {/* Footer links */}
        <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-1">
          <Link
            to="/dashboard/help"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <HelpCircle size={16} />
            Aide
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

        {/* User card */}
        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-9 h-9 rounded-full bg-khamoun-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{userName}</p>
              <p className="text-white/35 text-[11px]">Terminale · Élève</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Topbar */}
        <header className="flex-shrink-0 bg-white border-b border-purple-100 px-8 h-16 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="font-display font-bold text-lg text-[#1A0B2E] leading-none">
              Bonjour, {userName} 👋
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5 capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
              ⭐ 1 250 pts
            </span>
            <button className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-khamoun-primary hover:bg-purple-100 transition-colors">
              <Bell size={16} />
            </button>
            <button className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-khamoun-accent hover:bg-green-50 transition-colors">
              <Award size={16} />
            </button>
            <div className="w-9 h-9 rounded-full bg-khamoun-primary flex items-center justify-center text-white text-sm font-bold border-2 border-purple-200">
              {userInitial}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto flex gap-6">

            {/* ── Colonne principale ───────────────────────────────── */}
            <div className="flex-1 flex flex-col gap-5 min-w-0">

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {/* Cours suivis */}
                <div className="bg-white rounded-2xl p-5 border border-purple-100">
                  <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center text-khamoun-primary mb-3">
                    <BookOpen size={16} />
                  </div>
                  <p className="font-display font-bold text-2xl text-[#1A0B2E]">12</p>
                  <p className="text-xs text-on-surface-variant mt-1">Cours suivis</p>
                  <p className="text-[11px] text-khamoun-accent font-medium mt-2">↑ +2 ce mois</p>
                </div>

                {/* Score moyen */}
                <div className="bg-white rounded-2xl p-5 border border-purple-100">
                  <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-3">
                    <Medal size={16} />
                  </div>
                  <p className="font-display font-bold text-2xl text-[#1A0B2E]">
                    87<span className="text-sm text-on-surface-variant font-normal">%</span>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">Score moyen</p>
                  <p className="text-[11px] text-khamoun-accent font-medium mt-2">↑ +5 pts vs mois dernier</p>
                </div>

                {/* Sessions */}
                <div className="bg-white rounded-2xl p-5 border border-purple-100">
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-khamoun-accent mb-3">
                    <CalendarCheck size={16} />
                  </div>
                  <p className="font-display font-bold text-2xl text-[#1A0B2E]">6</p>
                  <p className="text-xs text-on-surface-variant mt-1">Sessions réservées</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-2">Prochaine : Sam 28</p>
                </div>
              </div>

              {/* Cours inachevés */}
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-base text-[#1A0B2E]">Cours inachevés</h3>
                  <button className="text-xs text-khamoun-primary font-semibold flex items-center gap-1 hover:opacity-75 transition-opacity">
                    Voir tout <ChevronRight size={13} />
                  </button>
                </div>
                <div className="space-y-4">
                  {COURSES.map((course) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${course.color} rounded-xl flex items-center justify-center text-lg flex-shrink-0`}>
                        {course.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1A0B2E] truncate">{course.name}</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          {course.subject} · {course.chapters} chapitres
                        </p>
                        <div className="h-1.5 bg-purple-50 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${course.progressColor} transition-all duration-500`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-khamoun-primary flex-shrink-0 w-9 text-right">
                        {course.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activité récente */}
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <h3 className="font-display font-bold text-base text-[#1A0B2E] mb-5">Activité récente</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-khamoun-accent flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-[#1A0B2E]">Quiz réussi</p>
                        <span className="text-[10px] text-on-surface-variant">Aujourd'hui, 10:30</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Vous avez obtenu 18/20 au quiz "Fonctions Affines".{' '}
                        <span className="text-khamoun-accent font-bold">+50 pts</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-khamoun-primary flex-shrink-0 mt-0.5">
                      <Monitor size={16} />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-[#1A0B2E]">Session terminée</p>
                        <span className="text-[10px] text-on-surface-variant">Hier, 16:00</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Session de 2h au centre Abidjan-Plateau.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Colonne droite ───────────────────────────────────── */}
            <div className="hidden lg:flex flex-col gap-5 w-64 flex-shrink-0">

              {/* Prochaine session */}
              <div className="bg-[#1A0B2E] rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-khamoun-primary/40 rounded-full blur-2xl pointer-events-none" />
                <p className="text-[10px] tracking-[1.5px] uppercase font-semibold text-white/35 mb-2">
                  Prochaine session
                </p>
                <p className="font-display font-bold text-white text-sm mb-4">
                  Centre Abidjan-Plateau
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    { key: 'Poste', val: 'PC-04' },
                    { key: 'Date', val: 'Sam 28 Mars', accent: true },
                    { key: 'Heure', val: '14h00 – 16h00' },
                  ].map(({ key, val, accent }) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-white/40">{key}</span>
                      <span className={accent ? 'text-purple-300 font-semibold' : 'text-white/80'}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-khamoun-primary hover:bg-khamoun-primary/90 text-white text-xs font-semibold py-2.5 rounded-xl transition-opacity">
                  Modifier la réservation
                </button>
              </div>

              {/* Leaderboard */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-sm text-[#1A0B2E] flex items-center gap-2">
                    <Trophy size={15} className="text-amber-500" />
                    Classement
                  </h3>
                  <button className="text-[11px] text-khamoun-primary font-semibold hover:opacity-75">
                    Complet →
                  </button>
                </div>
                <div className="space-y-2">
                  {LEADERBOARD.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-3 p-2.5 rounded-xl ${
                        entry.isMe ? 'bg-purple-50 border border-purple-200' : ''
                      }`}
                    >
                      <span className={`text-xs font-bold font-display w-4 text-center ${entry.rank === 1 ? 'text-amber-500' : 'text-on-surface-variant'}`}>
                        {entry.rank}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          entry.isMe
                            ? 'bg-khamoun-primary text-white'
                            : 'bg-purple-50 text-khamoun-primary'
                        }`}
                      >
                        {entry.isMe ? userInitial : entry.initial}
                      </div>
                      <span className="flex-1 text-xs font-medium text-[#1A0B2E]">
                        {entry.isMe ? 'Toi' : entry.name}
                        {entry.isMe && (
                          <span className="ml-1.5 bg-purple-100 text-khamoun-primary text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            MOI
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-bold text-khamoun-primary">
                        {entry.pts.toLocaleString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini CTA */}
              <div className="bg-khamoun-accent/10 border border-khamoun-accent/20 rounded-2xl p-5">
                <p className="font-display font-bold text-sm text-[#1A0B2E] mb-1">
                  Continue sur ta lancée ! 🚀
                </p>
                <p className="text-xs text-on-surface-variant mb-4">
                  Tu es à 250 pts du 1er. Un quiz suffit.
                </p>
                <button
                  onClick={() => navigate('/dashboard/courses')}
                  className="w-full bg-khamoun-accent text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Reprendre un cours
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
