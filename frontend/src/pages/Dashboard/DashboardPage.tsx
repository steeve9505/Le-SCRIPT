import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Layout from '../../components/Layout/Layout';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">👤 Profil</h2>
            <p className="text-gray-600 mb-4">Email: {user?.email}</p>
            <p className="text-gray-600 mb-4">Rôle: {user?.role}</p>
            <button
              onClick={() => navigate('/profile')}
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Éditer Profil
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Statistiques</h2>
            <p className="text-gray-600 mb-2">Points totaux: 0</p>
            <p className="text-gray-600 mb-2">Projets: 0</p>
            <p className="text-gray-600 mb-4">Certifications: 0</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;