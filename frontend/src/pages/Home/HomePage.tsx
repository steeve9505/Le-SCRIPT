import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🎵 LE SCRIPT</h1>
          <div className="space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-cyan-600 px-4 py-2 rounded font-bold hover:bg-gray-100"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="bg-white text-cyan-600 px-4 py-2 rounded font-bold hover:bg-gray-100"
              >
                Se Connecter
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Pour les artistes et par le public</h2>
          <p className="text-xl text-gray-600 mb-8">
            Obtenez des certifications instantanées basées sur les réactions du public
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-cyan-600"
          >
            Commencer Maintenant 🚀
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">✨ Caractéristiques</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-4">🎵 Pour les Artistes</h4>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Publiez vos projets</li>
                <li>✅ Obtenez des certifications</li>
                <li>✅ Ajouter liens streaming</li>
                <li>✅ Certificats professionnels</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-4">⭐ Pour les Certifieurs</h4>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Votez sur les projets</li>
                <li>✅ Gagnez des badges</li>
                <li>✅ Utilisez les jokers</li>
                <li>✅ Influencez les certifications</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-4">🏆 Les Certifications</h4>
              <ul className="space-y-2 text-gray-600">
                <li>🥉 Bronze (50 pts)</li>
                <li>🥇 Or (250 pts)</li>
                <li>💿 Platine (500 pts)</li>
                <li>💎 Diamant (1000 pts)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;