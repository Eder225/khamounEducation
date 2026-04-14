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
  Search,
  MessageCircle,
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
  { label: 'Classement', icon: Trophy, to: '/dashboard/leaderboard', badge: null },
  { label: 'Mon Profil', icon: User, to: '/dashboard/profile', badge: null },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const DashboardPage = () => {
  const { user, role, isAuthReady } = useContext(AuthContext);
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
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          <div>
            <p className="px-3 mb-3 text-[10px] font-label font-bold tracking-[2px] uppercase text-white/20">
              Menu Principal
            </p>
            <div className="space-y-1">
              {NAV_ITEMS.slice(0, 2).map((item) => {
                const Icon = item.icon;
                const isActive = item.to === '/dashboard';
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-khamoun-primary text-white shadow-lg shadow-khamoun-primary/20'
                        : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-khamoun-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-3 mb-3 text-[10px] font-label font-bold tracking-[2px] uppercase text-white/20">
              Progression
            </p>
            <div className="space-y-1">
              {NAV_ITEMS.slice(2).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/40 hover:bg-white/5 hover:text-white/80 transition-all duration-200"
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 pb-6 space-y-2">
          {role === 'admin' && (
            <button 
              onClick={() => navigate('/teacher')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-khamoun-secondary bg-khamoun-secondary/10 border border-khamoun-secondary/20 hover:bg-khamoun-secondary/20 transition-all"
            >
              <User size={16} />
              <span>Mode Enseignant</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold transition-all"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Topbar */}
        <header className="flex-shrink-0 bg-white border-b border-purple-100 px-8 h-16 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="font-display font-bold text-lg text-[#1A0B2E] leading-none">
                Bonjour, {userName} 👋
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5 capitalize">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-lg border border-amber-100">
                ⭐ 1 250 pts
              </span>
            </div>
            <button className="relative w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-khamoun-primary hover:bg-purple-100 transition-colors">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-khamoun-secondary rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-lg bg-khamoun-primary flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-khamoun-primary/20">
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-display font-bold text-base text-[#1A0B2E]">Mes Cours</h3>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-khamoun-primary transition-colors" size={14} />
                    <input 
                      type="text" 
                      placeholder="Rechercher un cours..." 
                      className="pl-9 pr-4 py-1.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs focus:outline-none focus:border-khamoun-primary focus:bg-white transition-all w-full sm:w-48"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                  {['Tous', 'Maths', 'Physique', 'Français', 'Anglais'].map((cat, i) => (
                    <button 
                      key={cat} 
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                        i === 0 ? 'bg-khamoun-primary text-white shadow-md shadow-khamoun-primary/20' : 'bg-purple-50 text-on-surface-variant hover:bg-purple-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {COURSES.map((course) => (
                    <div key={course.id} className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-purple-50/50 transition-colors cursor-pointer">
                      <div className={`w-11 h-11 ${course.color} rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {course.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1A0B2E] truncate">{course.name}</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          {course.subject} · {course.chapters} chapitres
                        </p>
                        <div className="h-1.5 bg-purple-50 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${course.progressColor} transition-all duration-700 ease-out`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold text-khamoun-primary">
                          {course.progress}%
                        </span>
                        <ChevronRight size={14} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
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

              {/* Mentor Widget */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-khamoun-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <h3 className="font-display font-bold text-sm text-[#1A0B2E] mb-4 flex items-center gap-2">
                  <MessageCircle size={15} className="text-khamoun-primary" />
                  Ton Mentor
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                      👨‍🏫
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-khamoun-accent border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A0B2E]">M. Kouadio</p>
                    <p className="text-[10px] text-on-surface-variant">Disponible pour t'aider</p>
                  </div>
                </div>
                <button
                  className="w-full bg-slate-900 text-white text-[11px] font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  Poser une question
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
