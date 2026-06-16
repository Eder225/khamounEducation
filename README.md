<!-- Banner -->
<div align="center">
  <img src="./public/logo.png" alt="Khamoun Education Logo" width="120" />
  <h1>Khamoun Education</h1>
  <p><strong>A video learning platform for secondary school students in Côte d'Ivoire</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase" alt="Firebase" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel" />
  </p>
</div>

---

## About

**Khamoun Education** is a web platform that connects Ivorian secondary school students (Grade 6 through Grade 12) with video lessons filmed directly in the classroom by their teachers. Teachers record their lessons in real conditions, then publish them on the platform so students can review them at their own pace, from anywhere.

The project aligns with the **MENA** (Ministère de l'Éducation Nationale et de l'Alphabétisation) curriculum and aims to democratize access to quality education at a national scale.

---

## Features

### For Students
- Personalized dashboard with per-subject progress tracking
- Access to video lessons organized by grade level and subject
- Homework and assignment tracking from teachers
- Leaderboard system to encourage engagement

### For Teachers
- Upload course content: video lessons (MP4), homework (PDF), quizzes
- Class management with per-student grade and progress tracking
- Direct messaging with individual students or entire class groups
- Submission statistics (number of students who turned in an assignment)

### General
- Secure authentication with distinct roles (`student`, `teacher`, `admin`)
- Role-based protected routes
- Responsive, mobile-first design
- Animated neural network background for a strong visual identity

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5.2 |
| Styling | Tailwind CSS 3.4 |
| Backend / BaaS | Firebase (Auth + Firestore) |
| Routing | React Router DOM 6 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/          # Reusable components (Navbar, Logo, ProtectedRoute…)
├── contexts/            # AuthContext — global authentication state
├── hooks/               # Custom hooks
├── lib/                 # Firebase utilities (error handling, helpers)
├── pages/
│   ├── LandingPage.tsx      # Public landing page
│   ├── AuthPage.tsx         # Login / Sign up
│   ├── JoinPage.tsx         # Registration page (role selection)
│   ├── DashboardPage.tsx    # Student dashboard
│   └── TeacherDashboard.tsx # Teacher dashboard
├── firebase.ts          # Firebase initialization (Auth + Firestore)
└── App.tsx              # Route configuration
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 18

```bash
# 1. Clone the repository
git clone https://github.com/Eder225/khamounEducation.git
cd khamounEducation

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Add your credentials to firebase-applet-config.json

# 4. Start the development server
npm run dev
```

### Available Scripts

```bash
npm run dev       # Development server with Vite HMR
npm run build     # Production build (TypeScript + Vite)
npm run preview   # Preview the production build locally
npm run lint      # ESLint check
```

---

## Design System

The UI follows a **Light Tech / Futuristic** aesthetic with glassmorphism elements and an animated neural network background.

| Role | Color | Hex |
|---|---|---|
| Primary | Purple | `#8241b0` |
| Secondary | Red | `#d62839` |
| Accent | Green | `#6fb041` |

**Typography:** Space Grotesk (headings) · Inter (body text)

---

## Author

Built by **Eder** — BCA/B.Sc. student at PP Savani University, Vadodara, India.

---

## License

This project is private. All rights reserved.
