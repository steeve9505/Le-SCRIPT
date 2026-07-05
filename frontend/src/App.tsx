import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AdminPage from './pages/Admin/AdminPage';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />}
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/auth" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;