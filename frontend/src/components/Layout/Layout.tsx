import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-cyan-600 hover:text-cyan-700"
          >
            🎵 LE SCRIPT
          </button>
          <nav className="space-x-4 flex items-center">
            <button onClick={() => navigate('/projects')} className="text-gray-600 hover:text-cyan-600">
              Projets
            </button>
            <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-cyan-600">
              Dashboard
            </button>
            <button onClick={() => navigate('/profile')} className="text-gray-600 hover:text-cyan-600">
              Profil
            </button>
            {user?.role === 'admin' && (
              <button onClick={() => navigate('/admin')} className="text-gray-600 hover:text-cyan-600">
                Admin
              </button>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
};

export default Layout;