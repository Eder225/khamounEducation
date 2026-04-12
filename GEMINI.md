# Instructions Système pour Khamoun Education

Ce fichier sert de contexte et de guide de style pour l'assistant IA (Gemini) travaillant sur le projet Khamoun Education.

## 1. Présentation du Projet
**Khamoun Education** est une plateforme numérique et un réseau d'espaces physiques d'apprentissage dédiés aux élèves du secondaire en Côte d'Ivoire (de la 6ème à la Terminale), aligné sur le programme du MENA (Ministère de l'Éducation Nationale et de l'Alphabétisation).
L'application propose des espaces distincts pour les élèves (Tableau de bord, cours, quiz) et les professeurs (Suivi des élèves, création de devoirs, messagerie).

## 2. Stack Technique
- **Framework** : React 18+ avec Vite
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Backend / BaaS** : Firebase (Authentication, Firestore)
- **Routage** : React Router DOM
- **Icônes** : Lucide React

## 3. Design System & UI/UX
L'application utilise un design "Tech / Futuriste Léger" avec des éléments de glassmorphism et un fond de réseau neuronal global.

### Couleurs (définies dans tailwind.config.js)
- `khamoun-primary` : Violet (`#8241b0`) - Couleur principale (Boutons d'action, liens actifs).
- `khamoun-secondary` : Rouge (`#d62839`) - Couleur secondaire (Alertes, badges, éléments de distinction).
- `khamoun-accent` : Vert (`#6fb041`) - Couleur d'accentuation (Succès, progression, validation).
- **Fonds** : Utiliser `bg-slate-50`, `bg-white`, ou `bg-transparent` (pour laisser transparaître le fond animé).
- **Texte** : `text-slate-900` pour les titres, `text-slate-600` ou `text-slate-500` pour le corps du texte.

### Typographie
- **Titres (Display/Headline)** : `font-display` (Space Grotesk) avec `font-bold`.
- **Corps de texte** : `font-sans` (Inter).

### Règles de Style Spécifiques
- **Fond Global** : Le composant `<NetworkBackground />` est placé à la racine (`App.tsx`). Les conteneurs principaux des pages doivent avoir un fond transparent (`bg-transparent`) pour le laisser visible. Les cartes de contenu doivent avoir un fond opaque (`bg-white` ou `bg-slate-50`) pour garantir la lisibilité.
- **Bordures et Ombres** : Utiliser `rounded-2xl` ou `rounded-xl` pour les cartes, avec `border border-slate-200` et `shadow-sm`.
- **Boutons** : Les boutons principaux utilisent `bg-khamoun-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity`.
- **Icônes** : Toujours importer depuis `lucide-react`.

## 4. Architecture et Composants
- **Pages** : Situées dans `/src/pages/` (ex: `LandingPage.tsx`, `DashboardPage.tsx`, `TeacherDashboard.tsx`, `AuthPage.tsx`).
- **Composants Réutilisables** : Situés dans `/src/components/` (ex: `Navbar.tsx`, `Logo.tsx`, `NetworkBackground.tsx`).
- **Composants Fonctionnels** : Utiliser uniquement des composants fonctionnels React avec des Hooks (`useState`, `useEffect`, `useContext`).

## 5. Directives Firebase
- **Configuration** : La configuration est chargée depuis `firebase-applet-config.json` via `src/firebase.ts`.
- **Authentification** : Gérée via le `AuthContext` (`src/contexts/AuthContext.tsx`). Les rôles (`student`, `teacher`, `admin`) sont stockés dans la collection Firestore `users`.
- **Gestion des Erreurs** : Toute opération Firestore (create, update, delete, get) DOIT être enveloppée dans un bloc `try/catch` et utiliser la fonction `handleFirestoreError` de `src/lib/firebase-errors.ts` en cas d'erreur de permission.
- **Règles de Sécurité** : Ne jamais exposer de données sensibles. Les lectures/écritures doivent être validées par les règles Firestore (`firestore.rules`).

## 6. Bonnes Pratiques de Code
- **TypeScript** : Typage strict requis. Définir des interfaces pour les modèles de données (ex: `Student`, `Assignment`, `Message`).
- **Imports** : Toujours utiliser des imports nommés au niveau supérieur du fichier.
- **Tailwind** : Ne pas utiliser de fichiers CSS personnalisés (sauf `index.css` pour les imports de base et les polices). Tout le style doit être fait via les classes utilitaires Tailwind.
- **Responsive Design** : Utiliser l'approche mobile-first de Tailwind (`sm:`, `md:`, `lg:`).
