import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GrievanceProvider } from './context/GrievanceContext';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SubmitGrievancePage from './pages/SubmitGrievancePage';

// Protected route component

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user.isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={
          <DashboardPage />
      } />
      <Route path="/submit" element={
          <SubmitGrievancePage />
      } />
      <Route path="*" element={<Navigate to={user.isLoggedIn ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GrievanceProvider>
        <Router>
          <GlobalStyles />
          <AppRoutes />
        </Router>
      </GrievanceProvider>
    </AuthProvider>
  );
};

export default App;
