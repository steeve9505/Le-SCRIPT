import React from 'react';
import Layout from '../../components/Layout/Layout';

const AdminPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔧 Panel Admin</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Statistiques</h2>
            <p className="text-gray-600 mb-2">Utilisateurs totaux: 0</p>
            <p className="text-gray-600 mb-2">Projets: 0</p>
            <p className="text-gray-600 mb-4">Réactions: 0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">⚙️ Configuration</h2>
            <p className="text-gray-600 mb-4">Gérez les seuils de certification</p>
            <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
              Paramètres
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;