import React from 'react';
import Layout from '../../components/Layout/Layout';

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">👤 Mon Profil</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Nom d'Artiste</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Votre nom d'artiste"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Bio</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 h-32"
                placeholder="Décrivez-vous..."
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-cyan-600"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;