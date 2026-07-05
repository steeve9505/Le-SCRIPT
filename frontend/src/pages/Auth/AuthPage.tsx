import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const handleLoginSuccess = (data: any) => {
    setToken(data.accessToken);
    setUser(data.user);
    navigate('/dashboard');
  };

  const handleRegisterSuccess = (data: any) => {
    setToken(data.accessToken);
    setUser(data.user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-600">🎵 LE SCRIPT</h1>
          <p className="text-gray-600 mt-2">Plateforme de Certification Musicale</p>
        </div>

        {isLogin ? (
          <>
            <LoginForm onSuccess={handleLoginSuccess} />
            <p className="text-center mt-4 text-gray-600">
              Pas encore inscrit ?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-cyan-600 font-bold hover:underline"
              >
                S'inscrire
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSuccess={handleRegisterSuccess} />
            <p className="text-center mt-4 text-gray-600">
              Déjà inscrit ?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-cyan-600 font-bold hover:underline"
              >
                Se connecter
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;