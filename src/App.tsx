import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { JoinPage } from './pages/JoinPage';
import { DashboardPage } from './pages/DashboardPage';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FirebaseProvider } from './components/FirebaseProvider';
import { EducationBackground } from './components/EducationBackground';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <EducationBackground />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/rejoindre" element={<JoinPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected Student Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Teacher Routes */}
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}

export default App;

