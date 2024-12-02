import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { PageLayout } from './components/layout/PageLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Home } from './pages/Home';
import { DataCollection } from './pages/DataCollection';
import { Analysis } from './pages/Analysis';
import { Visualization } from './pages/Visualization';
import { ForgotPasswordForm } from './components/forms/ForgotPasswordForm';
import { ResetPasswordForm } from './components/forms/ResetPasswordForm';
import { LoginForm } from './components/forms/LoginForm';
import { RegistrationForm } from './components/forms/RegistrationForm';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <Dashboard />
                  </PageLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="data-collection" replace />} />
              <Route path="data-collection" element={<DataCollection />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="visualization" element={<Visualization />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;